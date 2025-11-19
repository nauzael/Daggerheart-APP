
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

    return (
        <div className="bg-slate-800 border border-slate-600 rounded-xl shadow-lg overflow-hidden flex flex-col">
            {/* Header */}
            <div className="bg-slate-700/50 p-3 border-b border-slate-600 flex justify-between items-start relative">
                <div className="pr-8">
                    <h4 className="font-bold text-white text-lg leading-tight">{adversary.name}</h4>
                    <div className="flex items-center gap-2 mt-1 text-xs">
                        <span className="bg-slate-600 text-slate-200 px-2 py-0.5 rounded border border-slate-500">Tier {adversary.tier}</span>
                        <span className="text-slate-400 italic capitalize">{adversary.type}</span>
                    </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                     <div className="flex items-center bg-red-900/30 border border-red-800 px-2 py-1 rounded text-xs font-bold text-red-300" title="Difficulty">
                        <span className="text-red-500 mr-1">DC</span> {adversary.difficulty}
                    </div>
                </div>
                 <button 
                    onClick={() => onRemove(adversary.id)} 
                    className="absolute top-2 right-2 text-slate-500 hover:text-red-400 transition-colors p-1"
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
                <div className="grid grid-cols-3 gap-4 items-start">
                    <div className="col-span-2 space-y-3">
                        <ThresholdTracker 
                            label="HP" 
                            current={adversary.hp.current} 
                            max={adversary.hp.max} 
                            onSet={(v) => handleStatChange('hp', v)} 
                            color="bg-red-500" 
                            size="small"
                            showAsMarked
                        />
                        <ThresholdTracker 
                            label="Stress" 
                            current={adversary.stress.current} 
                            max={adversary.stress.max} 
                            onSet={(v) => handleStatChange('stress', v)} 
                            color="bg-purple-500" 
                            size="small"
                            showAsMarked
                        />
                    </div>
                    <div className="col-span-1 bg-slate-900/50 rounded p-2 border border-slate-700 flex flex-col justify-center gap-1 text-center">
                        <div className="text-[10px] text-slate-500 uppercase font-bold">Thresholds</div>
                         <div className="text-xs font-mono">
                            <div className="flex justify-between items-center">
                                <span className="text-amber-500 font-bold">Maj</span>
                                <span className="text-slate-300">{adversary.thresholds.major}</span>
                            </div>
                            <div className="flex justify-between items-center border-t border-slate-700 pt-1 mt-1">
                                <span className="text-red-500 font-bold">Sev</span>
                                <span className="text-slate-300">{adversary.thresholds.severe}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Attack Info */}
                <div className="bg-slate-900 rounded-lg border border-slate-700 overflow-hidden">
                    <div className="bg-slate-800 px-3 py-2 flex justify-between items-center border-b border-slate-700">
                         <span className="font-bold text-teal-300 text-sm">{adversary.attack.name}</span>
                         <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wide">{adversary.attack.range}</span>
                    </div>
                    <div className="px-3 py-2 flex justify-around items-center">
                        <div className="flex flex-col items-center">
                            <span className="text-[10px] text-slate-500 uppercase font-bold">Hit Mod</span>
                            <span className="text-lg font-mono font-bold text-white">{adversary.attack.modifier >= 0 ? `+${adversary.attack.modifier}` : adversary.attack.modifier}</span>
                        </div>
                        <div className="w-px h-8 bg-slate-700"></div>
                        <div className="flex flex-col items-center">
                            <span className="text-[10px] text-slate-500 uppercase font-bold">Damage</span>
                            <span className="text-lg font-mono font-bold text-white">{adversary.attack.damage}</span>
                        </div>
                    </div>
                </div>
                
                {/* Features Toggle */}
                <button 
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="w-full flex items-center justify-center gap-2 py-1.5 text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-700 rounded transition-colors border border-slate-700 bg-slate-800"
                >
                    <span>{isExpanded ? 'Hide' : 'Show'} Details ({adversary.features.length})</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className={`h-3 w-3 transition-transform ${isExpanded ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                </button>

                {/* Expanded Content */}
                {isExpanded && (
                    <div className="space-y-3 pt-2 border-t border-slate-700 animate-fade-in">
                        {adversary.motives && (
                            <div className="text-xs text-slate-400 italic bg-slate-900/30 p-2 rounded border border-slate-700/50">
                                <span className="font-bold not-italic text-slate-500 mr-1">Motives:</span>
                                {adversary.motives}
                            </div>
                        )}
                        <div className="space-y-2">
                            {adversary.features.map((feature, idx) => (
                                <div key={idx} className="text-sm bg-slate-800 border border-slate-700 rounded p-2">
                                    <div className="flex items-center gap-2 mb-1">
                                         <span className={`text-[9px] font-bold uppercase px-1.5 py-0.5 rounded border tracking-wider ${
                                            feature.type === 'Action' ? 'bg-red-900/20 text-red-300 border-red-800/50' :
                                            feature.type === 'Reaction' ? 'bg-yellow-900/20 text-yellow-300 border-yellow-800/50' :
                                            feature.type === 'Fear' ? 'bg-purple-900/20 text-purple-300 border-purple-800/50' :
                                            'bg-slate-700 text-slate-400 border-slate-600'
                                        }`}>
                                            {feature.type}
                                        </span>
                                        <span className="font-bold text-slate-200 text-xs">{feature.name}</span>
                                    </div>
                                    <p className="text-xs text-slate-400 leading-relaxed">{feature.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdversaryCard;
