import React, { useState, useMemo } from 'react';
import { Character } from '../types';
import { DOMAIN_CARDS } from '../data/domainCards';

interface AddDomainCardModalProps {
    character: Character;
    onClose: () => void;
    onCardAdd: (cardName: string) => void;
}

const AddDomainCardModal: React.FC<AddDomainCardModalProps> = ({ character, onClose, onCardAdd }) => {
    const [selectedCard, setSelectedCard] = useState<string>('');

    const availableCards = useMemo(() => DOMAIN_CARDS
        .filter(c => 
            character.domains.includes(c.domain) && 
            c.level <= character.level &&
            !character.domainCards.includes(c.name)
        )
        .sort((a,b) => a.level - b.level || a.name.localeCompare(b.name)),
        [character]
    );

    const handleConfirm = () => {
        if (selectedCard) {
            onCardAdd(selectedCard);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className="bg-slate-800 rounded-lg shadow-xl p-6 border border-slate-700 w-full max-w-lg">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold text-slate-100">Añadir Nueva Carta de Dominio</h2>
                    <button onClick={onClose} className="text-slate-400 hover:text-white text-3xl leading-none">&times;</button>
                </div>
                <div className="space-y-4">
                    <p className="text-slate-400">Elige una nueva carta de dominio de tu nivel o inferior de tus dominios disponibles.</p>
                    <select value={selectedCard} onChange={e => setSelectedCard(e.target.value)} className="w-full bg-slate-700 border border-slate-600 rounded-md py-2 px-3 text-slate-200">
                         <option value="">Selecciona una Carta de Dominio</option>
                         {availableCards.map(c => <option key={c.name} value={c.name}>{c.name} (Nvl {c.level}, {c.domain})</option>)}
                     </select>
                </div>
                 <div className="text-center pt-6">
                     <button onClick={handleConfirm} disabled={!selectedCard} className="bg-green-600 hover:bg-green-500 text-white font-bold py-2 px-6 rounded-lg disabled:bg-slate-600 disabled:cursor-not-allowed">
                        Añadir Carta
                     </button>
                </div>
            </div>
        </div>
    );
};

export default AddDomainCardModal;