
import React, { useState, useEffect } from 'react';
import { campaignService } from '../services/campaignService';
import { characterService } from '../services/characterService';
import { auth } from '../firebaseConfig';
import { Campaign, Character, TraitName } from '../types';
import CharacterSheet from './CharacterSheet';

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

    const handleDeleteCampaign = async (id: string) => {
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
    
    const selectedCampaign = campaigns.find(c => c.id === selectedCampaignId);

    // Helper to estimate thresholds for display (simplified logic compared to Sheet)
    const getDisplayThresholds = (char: Character) => {
        let major = char.level;
        let severe = char.level * 2;
        
        if (char.activeArmor && !char.isWolfFormActive) {
             const [baseMajor, baseSevere] = char.activeArmor.baseThresholds.split('/').map(Number);
             major = baseMajor + char.level;
             severe = baseSevere + char.level;
        } else if (char.domainCards.includes("Bare Bones")) {
             // Simplified estimation for Bare Bones (Tier 1 logic)
             major = 9;
             severe = 19;
        }
        return { major, severe };
    }

    // --- VIEW: AUTH REQUIRED ---
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

    // --- VIEW: INSPECTING CHARACTER (FULL SHEET) ---
    if (inspectingCharacter) {
        return (
            <div className="bg-slate-900 min-h-screen pb-12">
                <div className="bg-slate-800 border-b border-slate-700 p-4 sticky top-0 z-20 shadow-md flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <button 
                            onClick={() => setInspectingCharacter(null)}
                            className="text-slate-400 hover:text-white flex items-center gap-2 transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Back to Dashboard
                        </button>
                        <span className="text-slate-500 text-sm hidden sm:inline">|</span>
                        <span className="text-teal-400 font-bold">Editing: {inspectingCharacter.name}</span>
                    </div>
                    <div className="text-xs text-slate-500 bg-slate-900 px-2 py-1 rounded border border-slate-700">
                        GM Override Mode
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

    // --- VIEW: DASHBOARD ---
    return (
        <div className="flex flex-col h-screen bg-slate-900 text-slate-200 overflow-hidden">
            {/* Header */}
            <header className="bg-slate-800 border-b border-slate-700 p-4 flex justify-between items-center shrink-0 z-10">
                <div className="flex items-center gap-3">
                    <h1 className="text-2xl font-bold text-teal-400 tracking-tight">GM Dashboard</h1>
                    <span className="bg-indigo-900 text-indigo-200 text-xs px-2 py-0.5 rounded border border-indigo-700">Beta</span>
                </div>
                <button onClick={onExit} className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded text-sm transition-colors">
                    Exit Panel
                </button>
            </header>

            <div className="flex flex-1 overflow-hidden">
                {/* Sidebar: Campaigns */}
                <aside className="w-64 bg-slate-800/50 border-r border-slate-700 flex flex-col shrink-0">
                    <div className="p-4 border-b border-slate-700">
                        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">Campaigns</h3>
                        <form onSubmit={handleCreateCampaign} className="flex flex-col gap-2">
                            <input 
                                type="text" 
                                placeholder="+ New Campaign" 
                                value={newCampaignName}
                                onChange={e => setNewCampaignName(e.target.value)}
                                className="bg-slate-900 border border-slate-600 rounded px-3 py-2 text-sm text-white focus:border-teal-500 outline-none transition-colors"
                            />
                        </form>
                    </div>
                    <div className="flex-1 overflow-y-auto p-2 space-y-1">
                        {campaigns.map(campaign => (
                            <div 
                                key={campaign.id} 
                                onClick={() => setSelectedCampaignId(campaign.id)}
                                className={`p-3 rounded-md cursor-pointer transition-all group relative ${
                                    selectedCampaignId === campaign.id 
                                        ? 'bg-teal-900/40 border border-teal-600/50 text-white' 
                                        : 'hover:bg-slate-700/50 text-slate-400 hover:text-slate-200 border border-transparent'
                                }`}
                            >
                                <div className="font-bold truncate pr-6">{campaign.name}</div>
                                {selectedCampaignId === campaign.id && (
                                    <div className="text-xs text-teal-400 font-mono mt-1">Code: {campaign.inviteCode}</div>
                                )}
                                <button 
                                    onClick={(e) => { e.stopPropagation(); handleDeleteCampaign(campaign.id); }}
                                    className="absolute right-2 top-3 text-slate-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                                    title="Delete Campaign"
                                >
                                    &times;
                                </button>
                            </div>
                        ))}
                        {campaigns.length === 0 && (
                            <div className="text-center text-slate-500 text-xs py-4">No active campaigns.</div>
                        )}
                    </div>
                </aside>

                {/* Main Content: Players */}
                <main className="flex-1 overflow-y-auto bg-slate-900 relative">
                    {selectedCampaign ? (
                        <div className="p-6">
                            {/* Campaign Header Info */}
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
                                <div>
                                    <h2 className="text-3xl font-bold text-white">{selectedCampaign.name}</h2>
                                    <p className="text-slate-400 text-sm mt-1">
                                        Invite Code: <span className="text-teal-300 font-mono font-bold text-lg select-all">{selectedCampaign.inviteCode}</span>
                                    </p>
                                </div>
                                <div className="mt-4 sm:mt-0 flex items-center gap-4">
                                    <div className="text-right">
                                        <span className="block text-2xl font-bold text-white leading-none">{players.length}</span>
                                        <span className="text-xs text-slate-500 uppercase font-bold">Heroes</span>
                                    </div>
                                </div>
                            </div>

                            {isLoadingPlayers ? (
                                <div className="flex justify-center items-center h-64">
                                    <div className="text-teal-500 animate-pulse text-xl font-bold">Summoning Heroes...</div>
                                </div>
                            ) : (
                                <div className="flex flex-col gap-4 max-w-5xl mx-auto">
                                    {players.map(char => {
                                         const activeWeapon = char.isWolfFormActive 
                                            ? { name: 'Wolf Form', damage: 'd12', type: 'Melee' } 
                                            : char.activeBeastFormName 
                                                ? { name: char.activeBeastFormName, damage: 'See Form', type: 'Beast' }
                                                : char.primaryWeapon 
                                                    ? { name: char.primaryWeapon.name, damage: char.primaryWeapon.damage, type: char.primaryWeapon.range }
                                                    : { name: 'Unarmed', damage: 'd6', type: 'Melee' };
                                        
                                        const thresholds = getDisplayThresholds(char);

                                        return (
                                            <div 
                                                key={char.id} 
                                                onClick={() => setInspectingCharacter(char)}
                                                className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden hover:border-teal-500/50 transition-all cursor-pointer group shadow-lg hover:shadow-teal-900/20 flex flex-col md:flex-row"
                                            >
                                                {/* Header Section (Left on desktop) */}
                                                <div className="p-4 bg-slate-800/80 border-b md:border-b-0 md:border-r border-slate-700 w-full md:w-48 flex flex-col justify-center shrink-0">
                                                    <h3 className="text-xl font-bold text-white group-hover:text-teal-300 transition-colors truncate">{char.name}</h3>
                                                    <p className="text-xs text-slate-400">{char.ancestry} {char.class}</p>
                                                    <p className="text-xs text-slate-500">{char.subclass}</p>
                                                    <div className="mt-2 inline-flex">
                                                        <span className="bg-slate-900 text-slate-300 text-xs font-bold px-2 py-0.5 rounded border border-slate-700">Lvl {char.level}</span>
                                                    </div>
                                                </div>

                                                {/* Body Section */}
                                                <div className="flex-1 p-4 flex flex-col gap-4 justify-center">
                                                    
                                                    {/* Top Row: Vitals & Combat Stats */}
                                                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 items-center">
                                                        
                                                        {/* Vitals */}
                                                        <div className="flex-1 w-full space-y-2">
                                                            {/* HP */}
                                                            <div className="flex items-center gap-2">
                                                                <span className="text-xs font-bold text-red-400 w-10 text-right">HP</span>
                                                                <div className="flex-1 h-3 bg-slate-900 rounded-full overflow-hidden border border-slate-700">
                                                                    <div className="h-full bg-red-600 transition-all duration-500" style={{ width: `${(char.hp.current / char.hp.max) * 100}%` }} />
                                                                </div>
                                                                <span className="text-xs font-mono text-slate-300 w-12 text-right">{char.hp.current}/{char.hp.max}</span>
                                                            </div>
                                                            {/* Stress */}
                                                            <div className="flex items-center gap-2">
                                                                <span className="text-xs font-bold text-purple-400 w-10 text-right">STR</span>
                                                                <div className="flex-1 h-3 bg-slate-900 rounded-full overflow-hidden border border-slate-700">
                                                                    <div className="h-full bg-purple-600 transition-all duration-500" style={{ width: `${(char.stress.current / char.stress.max) * 100}%` }} />
                                                                </div>
                                                                <span className="text-xs font-mono text-slate-300 w-12 text-right">{char.stress.current}/{char.stress.max}</span>
                                                            </div>
                                                        </div>

                                                        {/* Combat Stats */}
                                                        <div className="flex gap-3 text-center shrink-0">
                                                            <div>
                                                                <div className="text-xs text-slate-500 uppercase font-bold">Eva</div>
                                                                <div className="text-xl font-bold text-white">{char.evasion}</div>
                                                            </div>
                                                            <div className="w-px bg-slate-700"></div>
                                                            <div>
                                                                <div className="text-xs text-slate-500 uppercase font-bold">Arm</div>
                                                                <div className="text-xl font-bold text-sky-300">{char.armor.current}<span className="text-xs text-slate-600">/{char.armor.max}</span></div>
                                                            </div>
                                                            <div className="w-px bg-slate-700"></div>
                                                            <div>
                                                                <div className="text-xs text-slate-500 uppercase font-bold">Hope</div>
                                                                <div className="text-xl font-bold text-yellow-400">{char.hope}</div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Middle Row: Traits */}
                                                    <div className="grid grid-cols-6 gap-2 border-t border-b border-slate-700/50 py-2">
                                                        {TRAIT_ORDER.map(trait => (
                                                            <div key={trait} className="text-center">
                                                                <div className="text-[10px] text-slate-500 uppercase">{trait.substring(0, 3)}</div>
                                                                <div className={`font-bold text-sm ${char.traits[trait] > 0 ? 'text-teal-300' : 'text-slate-300'}`}>
                                                                    {char.traits[trait] > 0 ? '+' : ''}{char.traits[trait]}
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>

                                                    {/* Bottom Row: Equipment & Thresholds */}
                                                    <div className="flex flex-col sm:flex-row justify-between items-end sm:items-center gap-2 text-sm">
                                                        <div className="flex items-center gap-2 text-slate-400">
                                                            <span className="text-slate-500 text-xs uppercase font-bold">Weapon:</span>
                                                            <span className="text-slate-200">{activeWeapon.name}</span>
                                                            <span className="text-xs font-mono text-teal-400 bg-teal-900/30 px-1.5 rounded">{activeWeapon.damage}</span>
                                                        </div>
                                                        
                                                        <div className="flex items-center gap-2 bg-slate-900/30 px-2 py-1 rounded border border-slate-700/30">
                                                             <span className="text-[10px] text-slate-500 uppercase font-bold mr-1">Thresholds</span>
                                                             <span className="text-sky-300 font-bold">{1}-{thresholds.major - 1}</span>
                                                             <span className="text-slate-600">|</span>
                                                             <span className="text-amber-400 font-bold">{thresholds.major}-{thresholds.severe - 1}</span>
                                                             <span className="text-slate-600">|</span>
                                                             <span className="text-red-500 font-bold">{thresholds.severe}+</span>
                                                        </div>
                                                    </div>

                                                </div>
                                                
                                                {/* Action Section */}
                                                <div className="bg-slate-750 p-2 flex flex-col justify-center items-center border-t md:border-t-0 md:border-l border-slate-700 w-full md:w-12 group-hover:bg-slate-700 transition-colors">
                                                    <span className="text-slate-500 md:-rotate-90 md:whitespace-nowrap text-xs font-bold tracking-widest group-hover:text-white">INSPECT</span>
                                                </div>
                                            </div>
                                        );
                                    })}
                                    
                                    {players.length === 0 && (
                                        <div className="col-span-full flex flex-col items-center justify-center py-20 text-slate-500 border-2 border-dashed border-slate-700 rounded-xl bg-slate-800/20">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                            </svg>
                                            <p className="text-lg font-medium">The tavern is empty.</p>
                                            <p className="text-sm mt-1">Invite players using code <span className="font-mono text-teal-400 font-bold">{selectedCampaign.inviteCode}</span></p>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center text-slate-500 p-8">
                            <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mb-4 shadow-lg">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                </svg>
                            </div>
                            <p className="text-lg">Select a campaign from the sidebar</p>
                            <p className="text-sm opacity-70">or create a new one to begin.</p>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default GMPanel;
