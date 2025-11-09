import React, { useState } from 'react';
import { BeastForm } from '../types';
import BeastformCard from './BeastformCard';

interface BeastformSelectorModalProps {
    forms: BeastForm[];
    onClose: () => void;
    onSelect: (formName: string) => void;
}

const BeastformSelectorModal: React.FC<BeastformSelectorModalProps> = ({ forms, onClose, onSelect }) => {
    const [selectedForm, setSelectedForm] = useState<string>('');
    
    const handleConfirm = () => {
        if (selectedForm) {
            onSelect(selectedForm);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4" aria-modal="true" role="dialog">
            <div className="bg-slate-800 rounded-lg shadow-xl p-6 border border-slate-700 w-full max-w-4xl flex flex-col max-h-[90vh]">
                <div className="flex justify-between items-center mb-4 flex-shrink-0">
                    <h2 className="text-2xl font-bold text-teal-400">Select Beastform</h2>
                    <button onClick={onClose} className="text-slate-400 hover:text-white text-3xl leading-none" aria-label="Close">&times;</button>
                </div>
                <div className="space-y-4 overflow-y-auto pr-2 flex-grow">
                    {forms.length > 0 ? (
                        forms.map(form => (
                            <BeastformCard
                                key={form.name}
                                form={form}
                                isSelected={selectedForm === form.name}
                                onSelect={() => setSelectedForm(form.name)}
                            />
                        ))
                    ) : (
                        <p className="text-slate-400 text-center py-8">You have not learned any beast forms yet.</p>
                    )}
                </div>
                 <div className="flex justify-center gap-4 pt-6 flex-shrink-0">
                     <button onClick={onClose} className="bg-slate-600 hover:bg-slate-500 text-white font-bold py-2 px-6 rounded-lg">
                        Cancel
                     </button>
                     <button onClick={handleConfirm} disabled={!selectedForm} className="bg-green-600 hover:bg-green-500 text-white font-bold py-2 px-6 rounded-lg disabled:bg-slate-600 disabled:cursor-not-allowed">
                        Confirm Selection
                     </button>
                </div>
            </div>
        </div>
    );
};

export default BeastformSelectorModal;