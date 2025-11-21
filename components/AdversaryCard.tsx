
import React, { useState } from 'react';
import { Adversary } from '../types';
import ThresholdTracker from './ThresholdTracker';

interface AdversaryCardProps {
    adversary: Adversary;
    onUpdate: (updated: Adversary) => void;
    onRemove: (id: string) => void;
}

const AdversaryCard: React.FC<AdversaryCardProps> = ({ adversary, onUpdate, onRemove }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const handleStatChange = (stat: 'hp' | 'stress', value: number) => {
        onUpdate({
            ...adversary,
            [stat]: { ...adversary[stat], current: value }
        });
    };

    const getFeatureStyle = (type: string) => {
        switch (type) {
            case 'Action': return 'bg-red-900/30 text-red-200 border-red-800/50';
            case 'Reaction': return 'bg-amber-900/30 text-amber-200 border-amber-800/50';
            case 'Passive': return 'bg-slate-700/50 text-slate-300 border-slate-600';
            case 'Fear': return 'bg-purple-900/30 text-purple-200 border-purple-800/50';
            default: return 'bg-slate-700 text-slate-400 border-slate-600';
        }
    };

    const getFeatureIcon = (type: string) => {
        switch (type) {
            case 'Action': return (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
            );
            case 'Reaction': return (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
            );
            case 'Passive': return (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            );
            case 'Fear': return (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
            );
            default: return null;
        }
    };

    return (
        <div className="bg-slate-800 border border-slate-600 rounded-xl shadow-lg overflow-hidden flex flex-col hover:border-teal-500/30 transition-colors">
            {/* Header */}
            <div className="bg-slate-700/50 p-3 border-b border-slate-600 flex justify-between items-start relative">
                <div className="pr-8">
                    <h4 className="font-bold text-white text-lg leading-tight">{adversary.name}</h4>
                    <div className="flex items-center gap-2 mt-1 text-xs font-mono">
                        <span className="bg-slate-900 text-slate-300 px-1.5 py-0.5 rounded border border-slate-600">T{adversary.tier}</span>
                        <span className="text-teal-400 uppercase font-bold tracking-wider">{adversary.type}</span>
                    </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                     <div className="flex items-center bg-red-950/50 border border-red-900 px-2 py-1 rounded text-xs font-bold text-red-200" title="Difficulty">
                        <span className="text-red-500 mr-1 text-[10px] uppercase">Diff</span> {adversary.difficulty}
                    </div>
                </div>
                 <button 
                    onClick={() => onRemove(adversary.id)} 
                    className="absolute top-2 right-2 text-slate-500 hover:text-red-400 transition-colors p-1 opacity-50 hover:opacity-100"
                    title="Remove Adversary"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                </button>
            </div>

            {/* Body */}
            <div className="p-4 space-y-4 flex-grow">
                
                {/* Stats Row */}
                <div className="grid grid-cols-3 gap-3 items-start">
                    <div className="col-span-2 space-y-3">
                        <ThresholdTracker 
                            label="HP" 
                            current={adversary.hp.current} 
                            max={adversary.hp.max} 
                            onSet={(v) => handleStatChange('hp', v)} 
                            color="bg-red-600" 
                            size="small"
                            showAsMarked
                        />
                        <ThresholdTracker 
                            label="Stress" 
                            current={adversary.stress.current} 
                            max={adversary.stress.max} 
                            onSet={(v) => handleStatChange('stress', v)} 
                            color="bg-purple-600" 
                            size="small"
                            showAsMarked
                        />
                    </div>
                    <div className="col-span-1 bg-slate-900/30 rounded p-2 border border-slate-700 flex flex-col justify-center gap-1 text-center">
                        <div className="text-[9px] text-slate-500 uppercase font-bold tracking-wider">Thresholds</div>
                         <div className="text-xs font-mono font-bold">
                            <div className="flex justify-between items-center">
                                <span className="text-amber-500">Maj</span>
                                <span className="text-slate-200">{adversary.thresholds.major}</span>
                            </div>
                            <div className="flex justify-between items-center border-t border-slate-700/50 pt-1 mt-1">
                                <span className="text-red-500">Sev</span>
                                <span className="text-slate-200">{adversary.thresholds.severe}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Attack Info */}
                <div className="bg-slate-900/60 rounded-lg border border-slate-700 overflow-hidden">
                    <div className="bg-slate-800/80 px-3 py-1.5 flex justify-between items-center border-b border-slate-700">
                         <span className="font-bold text-teal-200 text-sm">{adversary.attack.name}</span>
                         <span className="text-[9px] font-bold text-slate-400 uppercase bg-slate-900 px-1.5 py-0.5 rounded">{adversary.attack.range}</span>
                    </div>
                    <div className="px-3 py-2 flex justify-around items-center">
                        <div className="flex flex-col items-center">
                            <span className="text-[9px] text-slate-500 uppercase font-bold">Hit Mod</span>
                            <span className="text-lg font-mono font-bold text-white">{adversary.attack.modifier >= 0 ? `+${adversary.attack.modifier}` : adversary.attack.modifier}</span>
                        </div>
                        <div className="w-px h-8 bg-slate-700"></div>
                        <div className="flex flex-col items-center">
                            <span className="text-[9px] text-slate-500 uppercase font-bold">Damage</span>
                            <span className="text-lg font-mono font-bold text-white">{adversary.attack.damage}</span>
                        </div>
                    </div>
                </div>
                
                {/* Motives (Collapsed view preview) */}
                {!isExpanded && adversary.motives && (
                    <div className="text-xs text-slate-400 truncate px-1">
                        <span className="font-bold text-slate-500 mr-1">Motives:</span>
                        {adversary.motives}
                    </div>
                )}

                {/* Expanded Content */}
                {isExpanded && (
                    <div className="space-y-3 pt-2 border-t border-slate-700 animate-fade-in">
                        {adversary.motives && (
                            <div className="text-xs text-slate-300 bg-slate-900/30 p-2 rounded border border-slate-700/50">
                                <span className="font-bold text-slate-500 block mb-1 text-[10px] uppercase">Motives</span>
                                <p className="italic">{adversary.motives}</p>
                            </div>
                        )}
                        <div className="space-y-2">
                            {adversary.features.map((feature, idx) => (
                                <div key={idx} className={`text-sm border rounded p-2.5 ${getFeatureStyle(feature.type)}`}>
                                    <div className="flex items-center gap-2 mb-1.5">
                                         <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider opacity-90">
                                            {getFeatureIcon(feature.type)}
                                            {feature.type}
                                        </span>
                                        <span className="font-bold text-sm">{feature.name}</span>
                                    </div>
                                    <p className="text-xs leading-relaxed opacity-90">{feature.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                
                {/* Features Toggle */}
                <button 
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="w-full flex items-center justify-center gap-2 py-2 text-xs font-bold text-slate-400 hover:text-white hover:bg-slate-700 rounded transition-colors border border-slate-700 bg-slate-800"
                >
                    <span>{isExpanded ? 'Hide Details' : `Show Features (${adversary.features.length})`}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className={`h-3 w-3 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default AdversaryCard;
