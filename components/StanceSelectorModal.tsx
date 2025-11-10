import React, { useState } from 'react';
import { MartialStance } from '../types';

interface StanceSelectorModalProps {
    availableStances: MartialStance[];
    onClose: () => void;
    onConfirm: (selectedNames: string[]) => void;
    title: string;
    selectionLimit: number;
}

const SelectableStanceCard: React.FC<{ stance: MartialStance; isSelected: boolean; onSelect: () => void; }> = ({ stance, isSelected, onSelect }) => {
    const baseClasses = "p-3 border rounded-lg cursor-pointer transition-all duration-200 flex flex-col h-full";
    const selectedClasses = "bg-teal-800/50 border-teal-500 shadow-lg ring-2 ring-teal-500";
    const unselectedClasses = "bg-slate-700/80 border-slate-600 hover:bg-slate-600/80";

    return (
        <div className={`${baseClasses} ${isSelected ? selectedClasses : unselectedClasses}`} onClick={onSelect}>
            <div className="flex justify-between items-start gap-2">
                <div className="flex-grow">
                    <h4 className="font-bold text-lg text-slate-100">{stance.name}</h4>
                    <p className="text-xs text-slate-400 font-mono">Tier {stance.tier}</p>
                </div>
            </div>
            <p className="text-sm text-slate-300 mt-2 flex-grow">{stance.description}</p>
        </div>
    );
};

const StanceSelectorModal: React.FC<StanceSelectorModalProps> = ({ availableStances, onClose, onConfirm, title, selectionLimit }) => {
    const [selectedStances, setSelectedStances] = useState<string[]>([]);

    const handleToggleSelection = (stanceName: string) => {
        setSelectedStances(prev => {
            const isSelected = prev.includes(stanceName);
            if (isSelected) {
                return prev.filter(name => name !== stanceName);
            } else if (prev.length < selectionLimit) {
                return [...prev, stanceName];
            }
            return prev;
        });
    };
    
    const handleConfirmClick = () => {
        if (selectedStances.length === selectionLimit) {
            onConfirm(selectedStances);
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4" aria-modal="true" role="dialog">
            <div className="bg-slate-800 rounded-lg shadow-xl p-4 sm:p-6 border border-slate-700 w-full max-w-4xl flex flex-col max-h-[90vh]">
                <div className="flex justify-between items-center mb-4 flex-shrink-0">
                    <h2 className="text-2xl font-bold text-teal-400">{title}</h2>
                    <button onClick={onClose} className="text-slate-400 hover:text-white text-3xl leading-none" aria-label="Cerrar">&times;</button>
                </div>
                <div className="flex justify-between items-center mb-4">
                    <p className="text-slate-300">Choose {selectionLimit} stance(s).</p>
                    <span className={`font-mono px-3 py-1 rounded-md text-sm ${selectedStances.length === selectionLimit ? 'bg-green-500 text-white' : 'bg-slate-700 text-slate-300'}`}>
                        {selectedStances.length} / {selectionLimit}
                    </span>
                </div>
                <div className="space-y-4 overflow-y-auto pr-2 flex-grow">
                    {availableStances.length > 0 ? (
                        availableStances.map(stance => (
                            <SelectableStanceCard
                                key={stance.name}
                                stance={stance}
                                isSelected={selectedStances.includes(stance.name)}
                                onSelect={() => handleToggleSelection(stance.name)}
                            />
                        ))
                    ) : (
                        <p className="text-slate-400 text-center py-8">No available stances to learn.</p>
                    )}
                </div>
                 <div className="flex justify-center gap-4 pt-6 flex-shrink-0">
                     <button onClick={onClose} className="bg-slate-600 hover:bg-slate-500 text-white font-bold py-2 px-6 rounded-lg">
                        Cancel
                     </button>
                     <button onClick={handleConfirmClick} disabled={selectedStances.length !== selectionLimit} className="bg-green-600 hover:bg-green-500 text-white font-bold py-2 px-6 rounded-lg disabled:bg-slate-600 disabled:cursor-not-allowed">
                        Confirm Selection
                     </button>
                </div>
            </div>
        </div>
    );
};

export default StanceSelectorModal;
