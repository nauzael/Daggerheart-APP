
import React, { useState, useEffect, useMemo } from 'react';
import { campaignService } from '../services/campaignService';
import { characterService } from '../services/characterService';
import { auth } from '../firebaseConfig';
import { Campaign, Character, TraitName } from '../types';
import CharacterSheet from './CharacterSheet';
import { DOMAIN_CARDS } from '../data/domainCards';

interface GMPanelProps {
    onExit: () => void;
}

const TRAIT_ORDER: TraitName[] = ['agility', 'strength', 'finesse', 'instinct', 'presence', 'knowledge'];

const GMPanel: React.FC<GMPanelProps> = ({ onExit }) => {
    const [campaigns, setCampaigns] = useState<Campaign[]>([]);
    const [selectedCampaignId, setSelectedCampaignId] = useState<string | null>(null);
    const [newCampaignName, setNewCampaignName] = useState('');
    const [players, setPlayers] = useState<Character[]>([]);
    const [isLoadingPlayers, setIsLoadingPlayers] = useState(false);
    const [inspectingCharacter, setInspectingCharacter] = useState<Character | null>(null);
    const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set());
    const [viewingAbility, setViewingAbility] = useState<{name: string, type: string, description: string, cost?: number} | null>(null);

    // Load GM's campaigns
    useEffect(() => {
        if (!auth?.currentUser) return;
        const unsubscribe = campaignService.subscribeToMyCampaigns(setCampaigns);
        return () => unsubscribe();
    }, []);

    // Load players for selected campaign
    useEffect(() => {
        if (!selectedCampaignId || !auth?.currentUser) {
            setPlayers([]);
            return;
        }
        setIsLoadingPlayers(true);
        const unsubscribe = characterService.subscribe((chars) => {
            setPlayers(chars);
            // Update inspecting character if they are currently open and data changed remotely
            if (inspectingCharacter) {
                const updated = chars.find(c => c.id === inspectingCharacter.id);
                if (updated) setInspectingCharacter(updated);
            }
            setIsLoadingPlayers(false);
        }, 'campaign', selectedCampaignId);

        return () => unsubscribe();
    }, [selectedCampaignId]);

    const handleCreateCampaign = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newCampaignName.trim()) return;
        
        if (!auth?.currentUser) {
            alert("You must be logged in to create a campaign.");
            return;
        }

        try {
            const result = await campaignService.createCampaign(newCampaignName.trim());
            if (!result) {
                alert("Failed to create campaign. Please check your connection.");
            } else {
                setSelectedCampaignId(result.id);
            }
            setNewCampaignName('');
        } catch (e: any) {
            alert("Error creating campaign: " + e.message);
        }
    };

    const handleDeleteCampaign = async (e: React.MouseEvent, id: string) => {
        e.stopPropagation();
        if (window.confirm("Are you sure? This cannot be undone. Characters will not be deleted, but they will be unlinked.")) {
            await campaignService.deleteCampaign(id);
            if (selectedCampaignId === id) setSelectedCampaignId(null);
        }
    };

    const handleGMUpdateCharacter = async (updatedChar: Character) => {
        // Optimistic update for the inspector
        setInspectingCharacter(updatedChar);
        // Save to DB
        await characterService.save(updatedChar);
    };
    
    const toggleCardExpansion = (e: React.MouseEvent, charId: string) => {
        e.stopPropagation();
        setExpandedCards(prev => {
            const newSet = new Set(prev);
            if (newSet.has(charId)) {
                newSet.delete(charId);
            } else {
                newSet.add(charId);
            }
            return newSet;
        });
    };
    
    const selectedCampaign = campaigns.find(c => c.id === selectedCampaignId);

    // Helper to estimate thresholds for display
    const getDisplayThresholds = (char: Character) => {
        let major = char.level;
        let severe = char.level * 2;
        
        if (char.activeArmor && !char.isWolfFormActive) {
             const [baseMajor, baseSevere] = char.activeArmor.baseThresholds.split('/').map(Number);
             major = baseMajor + char.level;
             severe = baseSevere + char.level;
        } else if (char.domainCards.includes("Bare Bones")) {
             major = 9;
             severe = 19;
        }
        return { major, severe };
    }

    // --- VIEW 0: AUTH REQUIRED ---
    if (!auth?.currentUser) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 p-4">
                <div className="bg-slate-800 p-8 rounded-lg border border-slate-700 text-center max-w-lg shadow-2xl">
                    <h2 className="text-3xl font-bold text-teal-400 mb-4">GM Access Restricted</h2>
                    <p className="text-slate-400 mb-6">
                        The Game Master panel requires an active account to sync campaign data and player sheets. 
                        Please log in to access these features.
                    </p>
                    <button onClick={onExit} className="bg-slate-700 hover:bg-slate-600 text-white font-bold py-3 px-8 rounded-lg transition-colors">
                        Return to Menu
                    </button>
                </div>
            </div>
        );
    }

    // --- VIEW 1: INSPECTING CHARACTER (FULL SHEET) ---
    if (inspectingCharacter) {
        return (
            <div className="bg-slate-900 min-h-screen pb-12">
                <div className="bg-slate-800 border-b border-slate-700 p-4 sticky top-0 z-20 shadow-md flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <button 
                            onClick={() => setInspectingCharacter(null)}
                            className="text-slate-400 hover:text-white flex items-center gap-2 transition-colors font-semibold"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Back to Dashboard
                        </button>
                        <span className="text-slate-600 text-xl hidden sm:inline">|</span>
                        <span className="text-teal-400 font-bold text-lg">Editing: {inspectingCharacter.name}</span>
                    </div>
                    <div className="text-xs font-mono text-amber-400 bg-amber-900/30 px-3 py-1 rounded border border-amber-700/50">
                        GM OVERRIDE ENABLED
                    </div>
                </div>
                <div className="p-4 max-w-7xl mx-auto">
                    <CharacterSheet 
                        character={inspectingCharacter} 
                        onUpdateCharacter={handleGMUpdateCharacter} 
                        onReturnToSelection={() => setInspectingCharacter(null)}
                    />
                </div>
            </div>
        );
    }

    // --- VIEW 2: CAMPAIGN DASHBOARD (ACTIVE CAMPAIGN) ---
    if (selectedCampaign) {
        return (
            <div className="flex flex-col h-screen bg-slate-900 text-slate-200 overflow-hidden">
                {/* Dashboard Header */}
                <header className="bg-slate-800 border-b border-slate-700 p-4 shrink-0 z-10 shadow-md">
                    <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="flex items-center gap-4 w-full md:w-auto">
                            <button 
                                onClick={() => setSelectedCampaignId(null)}
                                className="bg-slate-700 hover:bg-slate-600 text-white p-2 rounded-lg transition-colors"
                                title="Back to Campaign List"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>
                            <div>
                                <h1 className="text-2xl font-bold text-white leading-none">{selectedCampaign.name}</h1>
                                <div className="flex items-center gap-2 mt-1">
                                    <span className="text-xs text-slate-400 uppercase font-bold">Invite Code:</span>
                                    <span className="text-teal-300 font-mono font-bold text-sm bg-slate-900/50 px-2 rounded select-all cursor-pointer" title="Click to copy" onClick={() => navigator.clipboard.writeText(selectedCampaign.inviteCode)}>
                                        {selectedCampaign.inviteCode}
                                    </span>
                                </div>
                            </div>
                        </div>
                        
                        <div className="flex items-center gap-6">
                            <div className="text-right hidden sm:block">
                                <span className="block text-2xl font-bold text-white leading-none">{players.length}</span>
                                <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Heroes Connected</span>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Dashboard Content */}
                <main className="flex-1 overflow-y-auto bg-slate-900 p-4 sm:p-6">
                    <div className="max-w-7xl mx-auto">
                        {isLoadingPlayers ? (
                            <div className="flex justify-center items-center h-64">
                                <div className="text-teal-500 animate-pulse text-xl font-bold flex flex-col items-center gap-2">
                                    <svg className="animate-spin h-8 w-8 text-teal-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Summoning Heroes...
                                </div>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                {players.map(char => {
                                        const activeWeapon = char.isWolfFormActive 
                                        ? { name: 'Wolf Form', damage: 'd12', type: 'Melee' } 
                                        : char.activeBeastFormName 
                                            ? { name: char.activeBeastFormName, damage: 'See Form', type: 'Beast' }
                                            : char.primaryWeapon 
                                                ? { name: char.primaryWeapon.name, damage: char.primaryWeapon.damage, type: char.primaryWeapon.range }
                                                : { name: 'Unarmed', damage: 'd6', type: 'Melee' };
                                    
                                    const thresholds = getDisplayThresholds(char);
                                    const isExpanded = expandedCards.has(char.id);

                                    return (
                                        <div 
                                            key={char.id} 
                                            onClick={() => setInspectingCharacter(char)}
                                            className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden hover:border-teal-500/50 transition-all cursor-pointer group shadow-lg hover:shadow-teal-900/20 flex flex-col h-fit"
                                        >
                                            {/* Card Header */}
                                            <div className="p-3 bg-slate-800 border-b border-slate-600 flex justify-between items-center">
                                                <div>
                                                    <h3 className="text-lg font-bold text-white group-hover:text-teal-300 transition-colors truncate">{char.name}</h3>
                                                    <p className="text-xs text-slate-400">{char.class} <span className="text-slate-600">|</span> {char.subclass}</p>
                                                </div>
                                                <div className="flex flex-col items-end">
                                                     <span className="bg-teal-900/30 text-teal-300 text-xs font-bold px-2 py-0.5 rounded border border-teal-800/50">Lvl {char.level}</span>
                                                </div>
                                            </div>

                                            {/* Card Body */}
                                            <div className="p-3 flex-1 flex flex-col gap-3">
                                                
                                                {/* Vitals Row */}
                                                <div className="grid grid-cols-2 gap-3">
                                                    {/* HP */}
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-[10px] font-bold text-red-400 w-6 text-right">HP</span>
                                                        <div className="flex-1 h-3 bg-slate-900 rounded-full overflow-hidden border border-slate-700 relative">
                                                            <div className="h-full bg-gradient-to-r from-red-900 to-red-600 transition-all duration-500" style={{ width: `${(char.hp.current / char.hp.max) * 100}%` }} />
                                                            <div className="absolute inset-0 flex items-center justify-center text-[9px] font-bold text-white">
                                                                {char.hp.current}/{char.hp.max}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {/* Stress */}
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-[10px] font-bold text-purple-400 w-6 text-right">STR</span>
                                                        <div className="flex-1 h-3 bg-slate-900 rounded-full overflow-hidden border border-slate-700 relative">
                                                            <div className="h-full bg-gradient-to-r from-purple-900 to-purple-600 transition-all duration-500" style={{ width: `${(char.stress.current / char.stress.max) * 100}%` }} />
                                                            <div className="absolute inset-0 flex items-center justify-center text-[9px] font-bold text-white">
                                                                {char.stress.current}/{char.stress.max}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Stats Grid */}
                                                <div className="grid grid-cols-3 gap-2 bg-slate-900/40 p-2 rounded-lg border border-slate-700/50 text-center">
                                                    <div>
                                                        <div className="text-[9px] text-slate-500 uppercase font-bold">Evasion</div>
                                                        <div className="text-lg font-bold text-white leading-none">{char.evasion}</div>
                                                    </div>
                                                    <div className="border-l border-slate-700">
                                                        <div className="text-[9px] text-slate-500 uppercase font-bold">Armor</div>
                                                        <div className="text-lg font-bold text-sky-300 leading-none">{char.armor.current}</div>
                                                    </div>
                                                    <div className="border-l border-slate-700">
                                                        <div className="text-[9px] text-slate-500 uppercase font-bold">Hope</div>
                                                        <div className="text-lg font-bold text-yellow-400 leading-none">{char.hope}</div>
                                                    </div>
                                                </div>

                                                {/* Traits Mini-Grid */}
                                                <div className="grid grid-cols-6 gap-1">
                                                    {TRAIT_ORDER.map(trait => (
                                                        <div key={trait} className="flex flex-col items-center">
                                                            <div className="text-[8px] text-slate-500 uppercase font-bold mb-0.5">{trait.substring(0, 3)}</div>
                                                            <div className={`text-xs font-bold w-6 h-6 flex items-center justify-center rounded ${char.traits[trait] > 0 ? 'bg-teal-900/30 text-teal-300 border border-teal-800/50' : 'bg-slate-900/50 text-slate-500 border border-slate-800'}`}>
                                                                {char.traits[trait] > 0 ? '+' : ''}{char.traits[trait]}
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                            
                                            {/* Expanded Abilities Section */}
                                            {isExpanded && (
                                                <div className="px-3 pb-3 bg-slate-900/80 border-t border-slate-700/50 animate-fade-in">
                                                    <div className="pt-2 space-y-3">
                                                        {/* Ancestry */}
                                                        <div>
                                                            <p className="text-[10px] text-slate-500 uppercase font-bold mb-1">Ancestry: {char.ancestry}</p>
                                                            <div className="flex flex-wrap gap-1">
                                                                {char.ancestryFeatures.map((f, i) => (
                                                                    <button 
                                                                        key={i} 
                                                                        onClick={(e) => { e.stopPropagation(); setViewingAbility({name: f.name, type: 'Ancestry Feature', description: f.description}); }}
                                                                        className="bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs px-2 py-1 rounded border border-slate-700 transition-colors text-left"
                                                                    >
                                                                        {f.name}
                                                                    </button>
                                                                ))}
                                                            </div>
                                                        </div>
                                                        
                                                        {/* Subclass */}
                                                        <div>
                                                            <p className="text-[10px] text-slate-500 uppercase font-bold mb-1">Subclass: {char.subclass}</p>
                                                            <div className="flex flex-wrap gap-1">
                                                                {char.subclassFeatures.map((f, i) => (
                                                                    <button 
                                                                        key={i} 
                                                                        onClick={(e) => { e.stopPropagation(); setViewingAbility({name: f.name, type: 'Subclass Feature', description: f.description}); }}
                                                                        className="bg-indigo-900/40 hover:bg-indigo-900/60 text-indigo-200 text-xs px-2 py-1 rounded border border-indigo-800/50 transition-colors text-left"
                                                                    >
                                                                        {f.name}
                                                                    </button>
                                                                ))}
                                                            </div>
                                                        </div>

                                                        {/* Domain Cards */}
                                                        <div>
                                                            <p className="text-[10px] text-slate-500 uppercase font-bold mb-1">Active Domain Cards</p>
                                                            <div className="flex flex-col gap-1">
                                                                {char.domainCards.map((cardName, i) => {
                                                                    const details = DOMAIN_CARDS.find(c => c.name === cardName);
                                                                    return (
                                                                        <div 
                                                                            key={i} 
                                                                            onClick={(e) => { 
                                                                                e.stopPropagation(); 
                                                                                if(details) setViewingAbility({name: details.name, type: `Domain Card (${details.domain})`, description: details.description, cost: details.recallCost}); 
                                                                            }}
                                                                            className="bg-slate-800/80 hover:bg-slate-700 text-slate-300 text-xs px-2 py-1 rounded border border-slate-700 flex justify-between items-center cursor-pointer transition-colors"
                                                                        >
                                                                            <span className="font-medium">{cardName}</span>
                                                                            {details?.recallCost !== undefined && (
                                                                                <span className="text-[9px] text-yellow-500 font-bold">Cost: {details.recallCost}</span>
                                                                            )}
                                                                        </div>
                                                                    );
                                                                })}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}

                                            {/* Card Footer: Weapon & Thresholds + Expand Button */}
                                            <div className="bg-slate-900/50 p-3 border-t border-slate-700 text-xs">
                                                <div className="flex justify-between items-center mb-2">
                                                    <span className="font-semibold text-slate-300 truncate w-2/3" title={activeWeapon.name}>{activeWeapon.name}</span>
                                                    <span className="font-mono text-teal-400 font-bold">{activeWeapon.damage}</span>
                                                </div>
                                                <div className="flex items-center justify-between bg-slate-900 rounded px-2 py-1 border border-slate-800 mb-2">
                                                    <span className="text-[9px] text-slate-500 uppercase font-bold">Thresholds</span>
                                                    <div className="flex gap-2 font-mono">
                                                        <span className="text-sky-300" title="Minor">{1}-{thresholds.major - 1}</span>
                                                        <span className="text-slate-600">|</span>
                                                        <span className="text-amber-400" title="Major">{thresholds.major}-{thresholds.severe - 1}</span>
                                                        <span className="text-slate-600">|</span>
                                                        <span className="text-red-500 font-bold" title="Severe">{thresholds.severe}+</span>
                                                    </div>
                                                </div>
                                                
                                                {/* Expand Toggle */}
                                                <button 
                                                    onClick={(e) => toggleCardExpansion(e, char.id)}
                                                    className="w-full flex items-center justify-center gap-1 py-1.5 text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-700 rounded transition-colors"
                                                >
                                                    {isExpanded ? (
                                                        <>
                                                            <span>Hide Abilities</span>
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                                                            </svg>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <span>See Abilities</span>
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                            </svg>
                                                        </>
                                                    )}
                                                </button>
                                            </div>
                                        </div>
                                    );
                                })}
                                
                                {players.length === 0 && (
                                    <div className="col-span-full flex flex-col items-center justify-center py-20 text-slate-500 border-2 border-dashed border-slate-700 rounded-xl bg-slate-800/20">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-4 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                        </svg>
                                        <p className="text-xl font-medium text-slate-400">The tavern is empty.</p>
                                        <div className="mt-4 text-center">
                                            <p className="text-sm text-slate-500 mb-2">Invite players using code</p>
                                            <span className="font-mono text-3xl font-bold text-teal-400 tracking-widest bg-slate-800 px-4 py-2 rounded-lg border border-teal-500/30 shadow-lg">{selectedCampaign.inviteCode}</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </main>
                
                {/* Ability Detail Modal */}
                {viewingAbility && (
                    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4 animate-fade-in" onClick={() => setViewingAbility(null)}>
                        <div className="bg-slate-800 p-6 rounded-xl max-w-md w-full border border-slate-700 shadow-2xl" onClick={e => e.stopPropagation()}>
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                     <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider bg-slate-900 px-2 py-1 rounded border border-slate-800">{viewingAbility.type}</span>
                                     <h3 className="text-xl font-bold text-teal-400 mt-2">{viewingAbility.name}</h3>
                                </div>
                                <button onClick={() => setViewingAbility(null)} className="text-slate-500 hover:text-white">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                            <div className="text-slate-300 text-sm leading-relaxed whitespace-pre-wrap max-h-[60vh] overflow-y-auto pr-2">
                                {viewingAbility.description}
                            </div>
                            {viewingAbility.cost !== undefined && (
                                 <div className="mt-4 pt-4 border-t border-slate-700 flex items-center gap-2">
                                    <span className="text-xs text-slate-500 font-bold uppercase">Recall Cost</span>
                                    <span className="text-yellow-400 font-bold text-sm">{viewingAbility.cost}</span>
                                 </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        );
    }

    // --- VIEW 3: CAMPAIGN SELECTOR (HOME) ---
    return (
        <div className="min-h-screen bg-slate-900 text-slate-200 flex flex-col">
            <div className="flex-1 max-w-4xl w-full mx-auto p-6 flex flex-col">
                
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-teal-400">Game Master Nexus</h1>
                    <button onClick={onExit} className="bg-slate-800 hover:bg-slate-700 border border-slate-600 text-white px-4 py-2 rounded-lg text-sm transition-colors">
                        Exit Panel
                    </button>
                </div>

                <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 shadow-2xl mb-8">
                    <h2 className="text-xl font-bold text-white mb-4">Create New Campaign</h2>
                    <form onSubmit={handleCreateCampaign} className="flex gap-4">
                        <input 
                            type="text" 
                            placeholder="Campaign Name (e.g. The Fall of Whitewall)" 
                            value={newCampaignName}
                            onChange={e => setNewCampaignName(e.target.value)}
                            className="flex-1 bg-slate-900 border border-slate-600 rounded-lg px-4 py-3 text-white focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none transition-all"
                        />
                        <button 
                            type="submit"
                            className="bg-teal-600 hover:bg-teal-500 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-all transform hover:scale-105"
                        >
                            Create & Launch
                        </button>
                    </form>
                </div>

                <div className="flex-1">
                    <h2 className="text-xl font-bold text-slate-400 uppercase tracking-wider mb-4 text-sm">Your Campaigns</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {campaigns.length > 0 ? campaigns.map(campaign => (
                            <div 
                                key={campaign.id} 
                                onClick={() => setSelectedCampaignId(campaign.id)}
                                className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 cursor-pointer hover:bg-slate-800 hover:border-teal-500/50 transition-all group relative hover:shadow-xl"
                            >
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="text-xl font-bold text-white group-hover:text-teal-300 transition-colors mb-1">{campaign.name}</h3>
                                        <p className="text-sm text-slate-500 font-mono">Code: {campaign.inviteCode}</p>
                                    </div>
                                    <div className="bg-slate-900 p-2 rounded-full text-slate-500 group-hover:text-teal-400 transition-colors">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg>
                                    </div>
                                </div>
                                <button 
                                    onClick={(e) => handleDeleteCampaign(e, campaign.id)}
                                    className="absolute bottom-4 right-4 text-slate-600 hover:text-red-400 p-2 rounded-md opacity-0 group-hover:opacity-100 transition-opacity text-xs uppercase font-bold tracking-wide"
                                >
                                    Delete
                                </button>
                            </div>
                        )) : (
                            <div className="col-span-full flex flex-col items-center justify-center py-12 text-slate-500 border-2 border-dashed border-slate-700 rounded-xl bg-slate-800/20">
                                <p>No active campaigns found.</p>
                                <p className="text-sm">Create one above to get started.</p>
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default GMPanel;
