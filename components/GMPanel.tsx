
import React, { useState, useEffect } from 'react';
import { campaignService } from '../services/campaignService';
import { characterService } from '../services/characterService';
import { auth } from '../firebaseConfig';
import { Campaign, Character } from '../types';
import Card from './Card';

interface GMPanelProps {
    onExit: () => void;
}

const GMPanel: React.FC<GMPanelProps> = ({ onExit }) => {
    const [campaigns, setCampaigns] = useState<Campaign[]>([]);
    const [selectedCampaignId, setSelectedCampaignId] = useState<string | null>(null);
    const [newCampaignName, setNewCampaignName] = useState('');
    const [players, setPlayers] = useState<Character[]>([]);
    const [isLoadingPlayers, setIsLoadingPlayers] = useState(false);

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
    
    const selectedCampaign = campaigns.find(c => c.id === selectedCampaignId);

    if (!auth?.currentUser) {
        return (
            <div className="container mx-auto max-w-7xl p-4 flex flex-col items-center justify-center min-h-[50vh]">
                <h2 className="text-3xl font-bold text-teal-400 mb-6">Game Master Panel</h2>
                <div className="bg-slate-800 p-8 rounded-lg border border-slate-700 text-center max-w-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-slate-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    <h3 className="text-xl font-bold text-white mb-2">Authentication Required</h3>
                    <p className="text-slate-400 mb-6">
                        You are currently using the app in Guest Mode. To create and manage campaigns, sync data between devices, and invite players, you must log in.
                    </p>
                    <button onClick={onExit} className="bg-teal-600 hover:bg-teal-500 text-white font-bold py-2 px-6 rounded-lg transition-colors">
                        Return to Menu
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto max-w-7xl p-4">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-teal-400">Game Master Panel</h2>
                <button onClick={onExit} className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded">
                    Back to Menu
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Sidebar: Campaign List */}
                <div className="lg:col-span-1 space-y-6">
                    <Card title="My Campaigns">
                        <div className="space-y-3 mb-4">
                            {campaigns.length === 0 ? (
                                <p className="text-slate-500 text-sm text-center">No campaigns created.</p>
                            ) : (
                                campaigns.map(campaign => (
                                    <div 
                                        key={campaign.id} 
                                        onClick={() => setSelectedCampaignId(campaign.id)}
                                        className={`p-3 rounded cursor-pointer border transition-colors flex justify-between items-center ${
                                            selectedCampaignId === campaign.id 
                                                ? 'bg-teal-900/50 border-teal-500' 
                                                : 'bg-slate-700 border-slate-600 hover:bg-slate-600'
                                        }`}
                                    >
                                        <div>
                                            <h4 className="font-bold text-slate-200">{campaign.name}</h4>
                                            <p className="text-xs text-slate-400">Code: <span className="font-mono font-bold text-teal-300">{campaign.inviteCode}</span></p>
                                        </div>
                                        <button 
                                            onClick={(e) => { e.stopPropagation(); handleDeleteCampaign(campaign.id); }}
                                            className="text-red-400 hover:text-red-300 px-2"
                                            title="Delete Campaign"
                                        >
                                            &times;
                                        </button>
                                    </div>
                                ))
                            )}
                        </div>
                        <form onSubmit={handleCreateCampaign} className="flex gap-2">
                            <input 
                                type="text" 
                                placeholder="New Campaign Name" 
                                value={newCampaignName}
                                onChange={e => setNewCampaignName(e.target.value)}
                                className="flex-grow bg-slate-900 border border-slate-600 rounded px-3 py-2 text-sm text-white focus:border-teal-500 outline-none"
                            />
                            <button type="submit" className="bg-teal-600 hover:bg-teal-500 text-white px-3 py-2 rounded text-sm font-bold">
                                Create
                            </button>
                        </form>
                    </Card>
                </div>

                {/* Main Content: Player View */}
                <div className="lg:col-span-2">
                    {selectedCampaign ? (
                        <div className="space-y-4">
                             <div className="bg-slate-800 p-4 rounded-lg border border-slate-700 flex justify-between items-center">
                                <div>
                                    <h3 className="text-2xl font-bold text-white">{selectedCampaign.name}</h3>
                                    <p className="text-slate-400">Invite Code: <span className="text-teal-300 font-mono text-xl font-bold select-all bg-slate-900 px-2 py-0.5 rounded">{selectedCampaign.inviteCode}</span></p>
                                    <p className="text-xs text-slate-500 mt-1">Share this code with your players to let them join.</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-bold text-slate-300">{players.length} Players</p>
                                </div>
                            </div>

                            {isLoadingPlayers ? (
                                <p className="text-center text-teal-400 animate-pulse">Connecting to players...</p>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {players.map(char => (
                                        <div key={char.id} className="bg-slate-800 border border-slate-600 rounded-lg p-4 relative overflow-hidden">
                                            <div className="absolute top-0 left-0 w-1 h-full bg-teal-600"></div>
                                            <div className="flex justify-between items-start mb-2 pl-2">
                                                <div>
                                                    <h4 className="font-bold text-lg text-white leading-none">{char.name}</h4>
                                                    <p className="text-xs text-slate-400">{char.class} ({char.subclass})</p>
                                                </div>
                                                <span className="bg-slate-700 text-xs px-2 py-1 rounded text-slate-300">Lvl {char.level}</span>
                                            </div>
                                            
                                            <div className="grid grid-cols-4 gap-2 text-center pl-2">
                                                <div className="bg-slate-900 rounded p-1">
                                                    <div className="text-xs text-slate-500">HP</div>
                                                    <div className={`font-bold ${char.hp.current <= char.hp.max / 3 ? 'text-red-500 animate-pulse' : 'text-red-300'}`}>
                                                        {char.hp.current}/{char.hp.max}
                                                    </div>
                                                </div>
                                                <div className="bg-slate-900 rounded p-1">
                                                    <div className="text-xs text-slate-500">Stress</div>
                                                    <div className="font-bold text-purple-300">
                                                        {char.stress.current}/{char.stress.max}
                                                    </div>
                                                </div>
                                                <div className="bg-slate-900 rounded p-1">
                                                    <div className="text-xs text-slate-500">Armor</div>
                                                    <div className="font-bold text-sky-300">
                                                        {char.armor.current}/{char.armor.max}
                                                    </div>
                                                </div>
                                                <div className="bg-slate-900 rounded p-1">
                                                    <div className="text-xs text-slate-500">Hope</div>
                                                    <div className="font-bold text-yellow-300">
                                                        {char.hope}
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <div className="mt-3 pl-2 pt-2 border-t border-slate-700">
                                                <p className="text-xs text-slate-500 truncate">Evasion: <span className="text-slate-300">{char.evasion}</span> | Prof: <span className="text-slate-300">{char.proficiency}</span></p>
                                            </div>
                                        </div>
                                    ))}
                                    {players.length === 0 && (
                                        <div className="col-span-full text-center py-12 bg-slate-800/50 rounded-lg border border-dashed border-slate-700">
                                            <p className="text-slate-500">Waiting for players to join using code <strong>{selectedCampaign.inviteCode}</strong>...</p>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="h-full flex items-center justify-center bg-slate-800/30 rounded-lg border border-dashed border-slate-700 p-12">
                            <p className="text-slate-500">Select or create a campaign to view player stats.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default GMPanel;
