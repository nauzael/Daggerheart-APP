import React, { useState, useMemo } from 'react';
import { Character, BeastForm } from '../types';
import BeastformCard from './BeastformCard';
import { ALL_BEASTFORMS } from '../data/beastforms';

interface BeastformListModalProps {
    onClose: () => void;
    character: Character;
    onLearn: (formName: string) => void;
}

const BeastformListModal: React.FC<BeastformListModalProps> = ({ onClose, character, onLearn }) => {
    const [selectedForm, setSelectedForm] = useState('');

    const characterTier = useMemo(() => {
        const level = character.level;
        if (level >= 8) return 4;
        if (level >= 5) return 3;
        if (level >= 2) return 2;
        return 1;
    }, [character.level]);

    const availableFormsByTier = useMemo(() => {
        const knownFormNames = new Set((character.beastForms || []).map(f => f.name));
        
        return ALL_BEASTFORMS.reduce((acc, form) => {
            if (form.tier <= characterTier && !knownFormNames.has(form.name)) {
                if(form.name !== "Legendary Beast" && form.name !== "Legendary Hybrid" && form.name !== "Mythic Beast" && form.name !== "Mythic Hybrid"){
                    if (!acc[form.tier]) {
                        acc[form.tier] = [];
                    }
                    acc[form.tier].push(form);
                }
            }
            return acc;
        }, {} as Record<number, BeastForm[]>);

    }, [character.beastForms, characterTier]);
    
    const handleConfirm = () => {
        if (selectedForm) {
            onLearn(selectedForm);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4" aria-modal="true" role="dialog">
            <div className="bg-slate-800 rounded-lg shadow-xl p-4 sm:p-6 border border-slate-700 w-full max-w-4xl flex flex-col max-h-[90vh]">
                <div className="flex justify-between items-center mb-4 flex-shrink-0">
                    <h2 className="text-2xl font-bold text-teal-400">Learn a Beastform</h2>
                    <button onClick={onClose} className="text-slate-400 hover:text-white text-3xl leading-none" aria-label="Close">&times;</button>
                </div>
                <div className="space-y-6 overflow-y-auto pr-2 flex-grow">
                    {Object.keys(availableFormsByTier).length > 0 ? (
                        Object.keys(availableFormsByTier).sort((a,b) => Number(a) - Number(b)).map(tier => (
                            <div key={tier}>
                                <h3 className="text-xl font-semibold text-teal-300 mb-3 border-b border-slate-700 pb-2">Tier {tier}</h3>
                                <div className="space-y-4">
                                    {availableFormsByTier[Number(tier)].map(form => (
                                        <BeastformCard 
                                            key={form.name} 
                                            form={form}
                                            isSelected={selectedForm === form.name}
                                            onSelect={() => setSelectedForm(form.name)}
                                        />
                                    ))}
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-slate-400 py-8">You have already learned all available forms for your tier.</p>
                    )}
                </div>
                 <div className="flex justify-center gap-4 pt-6 flex-shrink-0">
                     <button onClick={onClose} className="bg-slate-600 hover:bg-slate-500 text-white font-bold py-2 px-6 rounded-lg">
                        Cancel
                     </button>
                     <button 
                        onClick={handleConfirm} 
                        disabled={!selectedForm} 
                        className="bg-green-600 hover:bg-green-500 text-white font-bold py-2 px-6 rounded-lg disabled:bg-slate-600 disabled:cursor-not-allowed"
                     >
                        Learn Form
                     </button>
                </div>
            </div>
        </div>
    );
};

export default BeastformListModal;