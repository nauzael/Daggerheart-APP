import React, { useState, useMemo } from 'react';
import { Character } from '../types';
import { DOWNTIME_MOVES } from '../data/downtimeMoves';
import { LONG_REST_DOWNTIME_MOVES } from '../data/longRestDowntimeMoves';

interface RestModalProps {
    character: Character;
    armorScore: number;
    onClose: () => void;
    onConfirm: (data: { type: 'short' | 'long'; moves: string[] }) => void;
}

const RestModal: React.FC<RestModalProps> = ({ character, armorScore, onClose, onConfirm }) => {
    const [restType, setRestType] = useState<'short' | 'long'>('short');
    
    // For short rest
    const [selectedShortMoves, setSelectedShortMoves] = useState<string[]>([]);
    
    // For long rest
    const [firstMove, setFirstMove] = useState('');
    const [secondMove, setSecondMove] = useState('');

    const handleShortMoveToggle = (moveId: string) => {
        setSelectedShortMoves(prev => {
            if (prev.includes(moveId)) {
                return prev.filter(id => id !== moveId);
            }
            if (prev.length < 1) {
                return [...prev, moveId];
            }
            return prev;
        });
    };

    const handleRestTypeChange = (type: 'short' | 'long') => {
        setRestType(type);
        setSelectedShortMoves([]);
        setFirstMove('');
        setSecondMove('');
    };
    
    const isConfirmDisabled = restType === 'short' 
        ? selectedShortMoves.length !== 1
        : !firstMove || !secondMove;

    const handleSubmit = () => {
        if (isConfirmDisabled) return;

        if (restType === 'short') {
            onConfirm({ type: 'short', moves: selectedShortMoves });
        } else {
            onConfirm({ type: 'long', moves: [firstMove, secondMove] });
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4" aria-modal="true" role="dialog">
            <div className="bg-slate-800 rounded-lg shadow-xl p-4 sm:p-6 border border-slate-700 w-full max-w-2xl max-h-[90vh] flex flex-col">
                <div className="flex justify-between items-center mb-4 flex-shrink-0">
                    <h2 className="text-3xl font-bold text-teal-400">Take a Rest</h2>
                    <button onClick={onClose} className="text-slate-400 hover:text-white text-3xl leading-none" aria-label="Close">&times;</button>
                </div>

                <div className="overflow-y-auto pr-2 space-y-6">
                    <div className="flex justify-center bg-slate-900 p-1 rounded-lg">
                        <button 
                            onClick={() => handleRestTypeChange('short')}
                            className={`px-6 py-2 rounded-md font-bold w-1/2 transition-colors ${restType === 'short' ? 'bg-teal-600 text-white' : 'bg-transparent text-slate-300 hover:bg-slate-700'}`}
                        >
                            Short Rest
                        </button>
                        <button 
                            onClick={() => handleRestTypeChange('long')}
                            className={`px-6 py-2 rounded-md font-bold w-1/2 transition-colors ${restType === 'long' ? 'bg-teal-600 text-white' : 'bg-transparent text-slate-300 hover:bg-slate-700'}`}
                        >
                            Long Rest
                        </button>
                    </div>

                    {restType === 'short' ? (
                        <div>
                            <div className="bg-slate-700/50 p-4 rounded-lg">
                                <h3 className="text-xl font-semibold text-slate-100">Short Rest Effects</h3>
                                <p className="text-slate-400 mt-1">Choose one downtime move below.</p>
                            </div>
                            <div className="mt-6">
                                <h3 className="text-xl font-semibold text-slate-200 mb-2">Downtime Moves (Choose 1)</h3>
                                <div className="space-y-3">
                                    {DOWNTIME_MOVES.map(move => {
                                        const isSelected = selectedShortMoves.includes(move.id);
                                        const isDisabled = !isSelected && selectedShortMoves.length >= 1;
                                        const requiresHope = move.id === 'rummage_pack' && character.hope < 1;

                                        return (
                                            <div 
                                                key={move.id}
                                                onClick={() => !isDisabled && !requiresHope && handleShortMoveToggle(move.id)}
                                                className={`p-4 border rounded-lg transition-all flex items-center gap-4 ${
                                                    isSelected ? 'bg-sky-800/60 border-sky-600' : 'bg-slate-700 border-slate-600'
                                                } ${
                                                    isDisabled || requiresHope ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:bg-slate-600'
                                                }`}
                                            >
                                                <input 
                                                    type="checkbox"
                                                    checked={isSelected}
                                                    disabled={isDisabled || requiresHope}
                                                    readOnly
                                                    className="h-5 w-5 rounded bg-slate-800 border-slate-500 text-sky-500 focus:ring-sky-500 cursor-pointer"
                                                />
                                                <div>
                                                    <h4 className="font-bold text-slate-100">{move.name}</h4>
                                                    <p className="text-sm text-slate-400">{move.description} 
                                                        {move.cost && <span className="font-semibold text-yellow-400 ml-2">({move.cost})</span>}
                                                        {requiresHope && <span className="text-red-400 ml-2">(Not enough Hope)</span>}
                                                    </p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            <div className="bg-slate-700/50 p-4 rounded-lg">
                                <h3 className="text-xl font-semibold text-slate-100">Long Rest Effects</h3>
                                <p className="text-slate-400 mt-1">Choose two downtime moves below. You may choose the same move twice.</p>
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-slate-200 mb-2">First Downtime Move</h3>
                                <div className="space-y-2">
                                    {LONG_REST_DOWNTIME_MOVES.map(move => (
                                        <label key={move.id} className="p-3 border rounded-lg transition-all flex items-center gap-4 bg-slate-700 border-slate-600 cursor-pointer has-[:checked]:bg-sky-800/60 has-[:checked]:border-sky-600">
                                            <input type="radio" name="first-move" value={move.id} checked={firstMove === move.id} onChange={e => setFirstMove(e.target.value)} className="form-radio h-5 w-5 bg-slate-800 border-slate-500 text-sky-500 focus:ring-sky-500 cursor-pointer"/>
                                            <div>
                                                <h4 className="font-bold text-slate-100">{move.name}</h4>
                                                <p className="text-sm text-slate-400">{move.description}</p>
                                            </div>
                                        </label>
                                    ))}
                                </div>
                            </div>
                             <div>
                                <h3 className="text-xl font-semibold text-slate-200 mb-2">Second Downtime Move</h3>
                                <div className="space-y-2">
                                     {LONG_REST_DOWNTIME_MOVES.map(move => (
                                        <label key={move.id} className="p-3 border rounded-lg transition-all flex items-center gap-4 bg-slate-700 border-slate-600 cursor-pointer has-[:checked]:bg-sky-800/60 has-[:checked]:border-sky-600">
                                            <input type="radio" name="second-move" value={move.id} checked={secondMove === move.id} onChange={e => setSecondMove(e.target.value)} className="form-radio h-5 w-5 bg-slate-800 border-slate-500 text-sky-500 focus:ring-sky-500 cursor-pointer"/>
                                            <div>
                                                <h4 className="font-bold text-slate-100">{move.name}</h4>
                                                <p className="text-sm text-slate-400">{move.description}</p>
                                            </div>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <div className="flex justify-center gap-4 pt-6 mt-auto flex-shrink-0">
                    <button onClick={onClose} className="bg-slate-600 hover:bg-slate-500 text-white font-bold py-3 px-8 rounded-lg">
                       Cancel
                    </button>
                    <button 
                        onClick={handleSubmit} 
                        disabled={isConfirmDisabled}
                        className="bg-green-600 hover:bg-green-500 text-white font-bold py-3 px-8 rounded-lg disabled:bg-slate-600 disabled:cursor-not-allowed"
                    >
                       Confirm Rest
                    </button>
               </div>
            </div>
        </div>
    );
};

export default RestModal;