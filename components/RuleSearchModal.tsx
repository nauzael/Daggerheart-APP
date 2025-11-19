
import React, { useState, useMemo } from 'react';
import { GAME_RULES } from '../data/gameRules';

interface RuleSearchModalProps {
    onClose: () => void;
}

const RuleSearchModal: React.FC<RuleSearchModalProps> = ({ onClose }) => {
    const [query, setQuery] = useState('');

    const filteredRules = useMemo(() => {
        if (!query) return GAME_RULES;
        const lowerQuery = query.toLowerCase();
        return GAME_RULES.filter(rule => 
            rule.name.toLowerCase().includes(lowerQuery) || 
            rule.description.toLowerCase().includes(lowerQuery) ||
            rule.category.toLowerCase().includes(lowerQuery)
        );
    }, [query]);

    const getCategoryColor = (category: string) => {
        switch(category) {
            case 'Condition': return 'text-red-400 border-red-900/50 bg-red-900/20';
            case 'Mechanic': return 'text-yellow-400 border-yellow-900/50 bg-yellow-900/20';
            case 'Combat': return 'text-orange-400 border-orange-900/50 bg-orange-900/20';
            case 'Downtime': return 'text-blue-400 border-blue-900/50 bg-blue-900/20';
            case 'Character': return 'text-teal-400 border-teal-900/50 bg-teal-900/20';
            default: return 'text-slate-400 border-slate-700 bg-slate-800';
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4 animate-fade-in" onClick={onClose}>
            <div className="bg-slate-900 rounded-xl shadow-2xl border border-slate-700 w-full max-w-2xl max-h-[85vh] flex flex-col" onClick={e => e.stopPropagation()}>
                
                {/* Header */}
                <div className="p-4 border-b border-slate-700 flex justify-between items-center bg-slate-800 rounded-t-xl">
                    <div className="flex items-center gap-3">
                        <div className="bg-teal-900/50 p-2 rounded-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                        </div>
                        <h2 className="text-xl font-bold text-slate-100">Rulebook Reference</h2>
                    </div>
                    <button onClick={onClose} className="text-slate-400 hover:text-white p-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Search Bar */}
                <div className="p-4 border-b border-slate-800 bg-slate-800/50">
                    <div className="relative">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-3 top-3 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <input 
                            type="text" 
                            placeholder="Search rules (e.g., 'Rest', 'Fear', 'Vulnerable')..." 
                            value={query}
                            onChange={e => setQuery(e.target.value)}
                            className="w-full bg-slate-900 border border-slate-600 rounded-lg py-2.5 pl-10 pr-4 text-slate-200 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none transition-all"
                        />
                    </div>
                </div>

                {/* Results */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
                    {filteredRules.length > 0 ? (
                        filteredRules.map((rule, index) => (
                            <div key={index} className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 hover:bg-slate-800 transition-colors">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="text-lg font-bold text-teal-300">{rule.name}</h3>
                                    <span className={`text-xs font-bold px-2 py-1 rounded border ${getCategoryColor(rule.category)}`}>
                                        {rule.category}
                                    </span>
                                </div>
                                <p className="text-sm text-slate-300 leading-relaxed">{rule.description}</p>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-12 text-slate-500">
                            <p>No rules found for "{query}"</p>
                        </div>
                    )}
                </div>
                
                <div className="p-3 bg-slate-800 text-center text-xs text-slate-500 border-t border-slate-700 rounded-b-xl">
                    Daggerheart System Reference v1.0 - Quick Lookup
                </div>
            </div>
        </div>
    );
};

export default RuleSearchModal;
