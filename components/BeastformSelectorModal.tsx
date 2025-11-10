import React, { useState } from 'react';
import { BeastForm, Character, TraitName } from '../types';
import BeastformCard from './BeastformCard';

const TRAIT_NAMES_ORDER: TraitName[] = ['strength', 'agility', 'finesse', 'instinct', 'knowledge', 'presence'];

interface BeastformSelectorModalProps {
    forms: BeastForm[];
    character: Character;
    onClose: () => void;
    onSelect: (selection: { formName: string, useEvolution: boolean, traitBonus?: TraitName }) => void;
}

const BeastformSelectorModal: React.FC<BeastformSelectorModalProps> = ({ forms, character, onClose, onSelect }) => {
    const [selectedForm, setSelectedForm] = useState<string>('');
    const [transformType, setTransformType] = useState<'standard' | 'evolution'>('standard');
    const [selectedTrait, setSelectedTrait] = useState<TraitName | ''>('');

    const canUseEvolution = character.hope >= 3;
    const isConfirmDisabled = !selectedForm || (transformType === 'evolution' && !selectedTrait);

    const handleConfirm = () => {
        if (isConfirmDisabled) return;
        onSelect({
            formName: selectedForm,
            useEvolution: transformType === 'evolution',
            traitBonus: transformType === 'evolution' ? (selectedTrait as TraitName) : undefined,
        });
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4" aria-modal="true" role="dialog">
            <div className="bg-slate-800 rounded-lg shadow-xl p-6 border border-slate-700 w-full max-w-4xl flex flex-col max-h-[90vh]">
                <div className="flex justify-between items-center mb-4 flex-shrink-0">
                    <h2 className="text-2xl font-bold text-teal-400">Choose Transformation</h2>
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
                 <div className="mt-4 pt-4 border-t border-slate-600">
                    <h3 className="text-lg font-semibold text-slate-200 mb-2">Transformation Method</h3>
                    <div className="space-y-3">
                        <label className="p-3 border rounded-lg flex items-center gap-4 bg-slate-700 border-slate-600 cursor-pointer has-[:checked]:bg-sky-800/60 has-[:checked]:border-sky-600">
                            <input type="radio" name="transform-type" value="standard" checked={transformType === 'standard'} onChange={() => setTransformType('standard')} className="form-radio h-5 w-5 bg-slate-800 border-slate-500 text-sky-500 focus:ring-sky-500 cursor-pointer"/>
                            <div>
                                <strong className="text-slate-100">Standard Transform:</strong>
                                <span className="text-slate-300 ml-2">Mark 1 Stress.</span>
                            </div>
                        </label>
                         <label className={`p-3 border rounded-lg flex items-center gap-4 bg-slate-700 border-slate-600 ${!canUseEvolution ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer has-[:checked]:bg-sky-800/60 has-[:checked]:border-sky-600'}`}>
                            <input type="radio" name="transform-type" value="evolution" checked={transformType === 'evolution'} onChange={() => setTransformType('evolution')} disabled={!canUseEvolution} className="form-radio h-5 w-5 bg-slate-800 border-slate-500 text-sky-500 focus:ring-sky-500 cursor-pointer"/>
                            <div>
                                <strong className="text-slate-100">Evolution:</strong>
                                <span className="text-slate-300 ml-2">Spend 3 Hope to transform without marking Stress and raise one trait by +1.</span>
                                {!canUseEvolution && <span className="text-yellow-400 font-semibold ml-2">(Not enough Hope)</span>}
                            </div>
                        </label>
                         {transformType === 'evolution' && canUseEvolution && (
                            <div className="pl-8">
                                <select 
                                    value={selectedTrait} 
                                    onChange={(e) => setSelectedTrait(e.target.value as TraitName | '')}
                                    className="w-full bg-slate-700 border border-slate-600 rounded-md py-2 px-3 text-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
                                >
                                    <option value="">Seleccionar rasgo a potenciar en +1</option>
                                    {TRAIT_NAMES_ORDER.map(t => <option key={t} value={t} className="capitalize">{t}</option>)}
                                </select>
                            </div>
                        )}
                    </div>
                </div>
                 <div className="flex justify-center gap-4 pt-6 flex-shrink-0">
                     <button onClick={onClose} className="bg-slate-600 hover:bg-slate-500 text-white font-bold py-2 px-6 rounded-lg">
                        Cancel
                     </button>
                     <button onClick={handleConfirm} disabled={isConfirmDisabled} className="bg-green-600 hover:bg-green-500 text-white font-bold py-2 px-6 rounded-lg disabled:bg-slate-600 disabled:cursor-not-allowed">
                        Confirmar Transformación
                     </button>
                </div>
            </div>
        </div>
    );
};

export default BeastformSelectorModal;