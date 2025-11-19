
import React, { useRef } from 'react';
import { Character } from '../types';
import Card from './Card';
import { DaggerheartLogo } from './DaggerheartLogo';

interface CharacterSelectionProps {
    characters: Character[];
    onSelectCharacter: (id: string) => void;
    onDeleteCharacter: (id: string) => void;
    onCreateNew: () => void;
    onImport: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onExport: () => void;
    user?: any;
    onJoinCampaign: () => void;
    onSignOut: () => void;
    onGMPanel: () => void;
    onMigrateToCloud: () => void;
    onLeaveCampaign: (charId: string) => void;
}

const CharacterSelection: React.FC<CharacterSelectionProps> = ({ 
    characters, 
    onSelectCharacter, 
    onDeleteCharacter, 
    onCreateNew, 
    onImport, 
    onExport,
    user,
    onJoinCampaign,
    onSignOut,
    onGMPanel,
    onMigrateToCloud,
    onLeaveCampaign
}) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImportClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className="h-full flex flex-col max-w-5xl mx-auto w-full p-4 sm:p-0 overflow-hidden relative">
            
            {/* FIXED HEADER SECTION */}
            <div className="flex-shrink-0 pb-4">
                {/* Logo only small visible here if we want, or just header info */}
                 <div className="flex flex-col items-center mb-4">
                    <div className="scale-75">
                        <DaggerheartLogo />
                    </div>
                    <h1 className="text-2xl font-bold text-slate-100 tracking-tight">Character Roster</h1>
                </div>

                <div className="flex flex-col sm:flex-row justify-between items-center gap-3 bg-slate-800/50 p-3 rounded-lg border border-slate-700">
                    <div className="text-slate-400 text-sm text-center sm:text-left">
                        {user ? (
                            <span>Logged in as: <span className="text-teal-300 font-bold block sm:inline">{user.email}</span></span>
                        ) : (
                            <span className="text-amber-400 font-bold">Guest Mode (Offline)</span>
                        )}
                    </div>
                    <div className="flex gap-2">
                            <button onClick={onGMPanel} className="text-xs bg-indigo-800 hover:bg-indigo-700 text-indigo-200 py-1.5 px-3 rounded transition-colors border border-indigo-600 font-semibold">
                            GM Panel
                        </button>
                        <button onClick={onSignOut} className="text-xs bg-slate-700 hover:bg-slate-600 text-white py-1.5 px-3 rounded transition-colors font-semibold">
                            {user ? 'Sign Out' : 'Log In'}
                        </button>
                    </div>
                </div>
            </div>

            {/* SCROLLABLE LIST SECTION */}
            <div className="flex-1 overflow-y-auto min-h-0 pr-1 space-y-4 custom-scrollbar">
                {characters.length > 0 ? (
                    <div className="space-y-3 animate-fade-in pb-4">
                        {characters.map(char => (
                            <div key={char.id} className="bg-slate-800 border border-slate-700 p-4 rounded-lg flex flex-col sm:flex-row justify-between items-center gap-3 shadow-lg hover:border-teal-500/50 transition-colors">
                                <div className="text-center sm:text-left">
                                    <h3 className="text-xl font-bold text-slate-100">{char.name}</h3>
                                    <p className="text-slate-400 text-sm">{char.ancestry} {char.class} <span className="text-slate-600">|</span> Lvl {char.level}</p>
                                    {char.campaignId && (
                                         <div className="flex items-center justify-center sm:justify-start gap-2 mt-1">
                                            <span className="text-xs text-teal-400 bg-teal-900/30 px-2 py-0.5 rounded border border-teal-800">In Campaign</span>
                                            <button onClick={() => onLeaveCampaign(char.id)} className="text-[10px] text-red-400 hover:text-red-300 underline">Leave</button>
                                        </div>
                                    )}
                                </div>
                                <div className="flex gap-3 w-full sm:w-auto">
                                    <button
                                        onClick={() => onSelectCharacter(char.id)}
                                        className="flex-1 sm:flex-none bg-teal-600 hover:bg-teal-500 text-white font-bold py-2 px-6 rounded-md transition-colors shadow-md"
                                    >
                                        Play
                                    </button>
                                    <button
                                        onClick={() => {
                                            if (confirm(`Are you sure you want to delete ${char.name}?`)) {
                                                onDeleteCharacter(char.id);
                                            }
                                        }}
                                        className="flex-none bg-red-900/50 hover:bg-red-700 text-red-200 font-bold py-2 px-3 rounded-md border border-red-800 transition-colors"
                                        title="Delete Character"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        ))}
                        
                        {/* Cloud Migration Helper - Only show if logged in and in list */}
                        {user && (
                            <div className="text-center pt-4 pb-2">
                                <button onClick={onMigrateToCloud} className="text-xs text-slate-500 hover:text-teal-400 underline transition-colors">
                                    Find & Upload Local Storage Characters
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center h-full text-slate-500 border-2 border-dashed border-slate-700 rounded-xl p-8 bg-slate-800/20">
                        <p className="text-lg mb-2">No characters found.</p>
                        <p className="text-sm">Create a new character to begin your journey.</p>
                    </div>
                )}
            </div>

            {/* FIXED FOOTER ACTIONS */}
            <div className="flex-shrink-0 pt-4 pb-2 space-y-3 border-t border-slate-800 mt-2 bg-slate-900 z-20">
                <button
                    onClick={onCreateNew}
                    className="bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-500 hover:to-blue-500 text-white font-bold py-3 px-6 rounded-xl text-lg w-full shadow-lg transform transition active:scale-95 flex items-center justify-center gap-2"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Create New Character
                </button>
                
                <div className="grid grid-cols-2 gap-3">
                     <button 
                        onClick={onJoinCampaign}
                        className="bg-slate-700 hover:bg-slate-600 text-white font-bold py-3 px-4 rounded-lg shadow transition-colors flex items-center justify-center gap-2 text-sm sm:text-base"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        Join Campaign
                    </button>
                    
                     <div className="flex gap-2">
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={onImport}
                            className="hidden"
                            accept=".json"
                        />
                        <button
                            onClick={handleImportClick}
                            className="bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold py-2 px-4 rounded-lg border border-slate-600 flex-1 text-sm"
                            title="Import JSON"
                        >
                            Import
                        </button>
                        <button
                            onClick={onExport}
                            disabled={characters.length === 0}
                            className="bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold py-2 px-4 rounded-lg border border-slate-600 flex-1 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                            title="Export JSON"
                        >
                            Export
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CharacterSelection;
