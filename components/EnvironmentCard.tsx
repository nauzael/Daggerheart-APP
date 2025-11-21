
import React, { useState } from 'react';
import { Environment } from '../types';

interface EnvironmentCardProps {
    environment: Environment;
    onRemove: () => void;
}

const EnvironmentCard: React.FC<EnvironmentCardProps> = ({ environment, onRemove }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const getTypeColor = (type: string) => {
        switch (type) {
            case 'Traversal': return 'text-amber-400 border-amber-800 bg-amber-900/20';
            case 'Social': return 'text-purple-400 border-purple-800 bg-purple-900/20';
            case 'Exploration': return 'text-emerald-400 border-emerald-800 bg-emerald-900/20';
            case 'Event': return 'text-red-400 border-red-800 bg-red-900/20';
            default: return 'text-slate-400 border-slate-700 bg-slate-800';
        }
    };

    return (
        <div className="bg-slate-800 border border-slate-600 rounded-xl shadow-lg overflow-hidden flex flex-col hover:border-emerald-500/30 transition-colors h-full">
            {/* Header */}
            <div className="bg-slate-700/50 p-3 border-b border-slate-600 flex justify-between items-start relative">
                <div className="pr-8">
                    <h4 className="font-bold text-white text-lg leading-tight">{environment.name}</h4>
                    <div className="flex items-center gap-2 mt-1 text-xs font-mono">
                        <span className="bg-slate-900 text-slate-300 px-1.5 py-0.5 rounded border border-slate-600">T{environment.tier}</span>
                        <span className={`uppercase font-bold tracking-wider px-1.5 py-0.5 rounded border text-[10px] ${getTypeColor(environment.type)}`}>{environment.type}</span>
                    </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                     <div className="flex items-center bg-emerald-950/50 border border-emerald-900 px-2 py-1 rounded text-xs font-bold text-emerald-200" title="Difficulty">
                        <span className="text-emerald-500 mr-1 text-[10px] uppercase">Diff</span> {environment.difficulty}
                    </div>
                </div>
                 <button 
                    onClick={onRemove} 
                    className="absolute top-2 right-2 text-slate-500 hover:text-red-400 transition-colors p-1 opacity-50 hover:opacity-100"
                    title="Remove Environment"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                </button>
            </div>

            {/* Body */}
            <div className="p-4 space-y-4 flex-grow">
                {/* Impulses */}
                <div className="text-sm text-slate-300">
                    <span className="font-bold text-slate-500 uppercase text-xs block mb-1">Impulses</span>
                    <ul className="list-disc list-inside italic text-slate-400">
                        {environment.impulses.map((imp, i) => <li key={i}>{imp}</li>)}
                    </ul>
                </div>

                {/* Expanded Content */}
                {isExpanded && (
                    <div className="space-y-3 pt-2 border-t border-slate-700 animate-fade-in">
                         <span className="font-bold text-slate-500 uppercase text-xs block">Features</span>
                        <div className="space-y-2">
                            {environment.features.map((feature, idx) => (
                                <div key={idx} className="bg-slate-900/30 border border-slate-700/50 rounded p-2.5">
                                    <div className="flex items-center gap-2 mb-1">
                                         <span className={`text-[10px] font-bold uppercase tracking-wider px-1.5 rounded border ${
                                            feature.type === 'Action' ? 'text-red-300 border-red-800 bg-red-900/20' :
                                            feature.type === 'Reaction' ? 'text-amber-300 border-amber-800 bg-amber-900/20' :
                                            'text-slate-300 border-slate-600 bg-slate-700'
                                         }`}>
                                            {feature.type}
                                        </span>
                                        <span className="font-bold text-sm text-slate-200">{feature.name}</span>
                                    </div>
                                    <p className="text-xs leading-relaxed text-slate-300">{feature.description}</p>
                                    {feature.questions && (
                                        <p className="text-xs text-emerald-400/70 mt-1.5 italic border-l-2 border-emerald-900/50 pl-2">
                                            Prompt: {feature.questions}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                
                {/* Toggle */}
                <button 
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="w-full flex items-center justify-center gap-2 py-2 text-xs font-bold text-slate-400 hover:text-white hover:bg-slate-700 rounded transition-colors border border-slate-700 bg-slate-800"
                >
                    <span>{isExpanded ? 'Hide Details' : `Show Features (${environment.features.length})`}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className={`h-3 w-3 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default EnvironmentCard;
