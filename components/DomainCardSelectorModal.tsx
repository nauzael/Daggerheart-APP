import React, { useState } from 'react';
import { DomainCard } from '../data/domainCards';

interface DomainCardSelectorModalProps {
    availableCards: DomainCard[];
    onClose: () => void;
    onCardSelect: (cardName: string) => void;
    title: string;
}

const SelectableDomainCard: React.FC<{ card: DomainCard; isSelected: boolean; onSelect: () => void; }> = ({ card, isSelected, onSelect }) => {
    const baseClasses = "p-4 border rounded-lg cursor-pointer transition-all duration-200 flex flex-col h-full";
    const selectedClasses = "bg-teal-800/50 border-teal-500 shadow-lg ring-2 ring-teal-500";
    const unselectedClasses = "bg-slate-700/80 border-slate-600 hover:bg-slate-600/80";

    return (
        <div className={`${baseClasses} ${isSelected ? selectedClasses : unselectedClasses}`} onClick={onSelect}>
            <div className="flex justify-between items-start gap-2">
                <div className="flex-grow">
                    <h4 className="font-bold text-lg text-slate-100">{card.name}</h4>
                    <p className="text-xs text-slate-400 font-mono">
                        {card.domain} / {card.type} / Nvl {card.level}
                        {card.recallCost !== undefined && ` / Recuperar: ${card.recallCost}`}
                    </p>
                </div>
            </div>
            <p className="text-sm text-slate-300 mt-2">{card.description}</p>
        </div>
    );
};


const DomainCardSelectorModal: React.FC<DomainCardSelectorModalProps> = ({ availableCards, onClose, onCardSelect, title }) => {
    const [selectedCard, setSelectedCard] = useState<string>('');
    
    const handleConfirm = () => {
        if (selectedCard) {
            onCardSelect(selectedCard);
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
                <div className="space-y-4 overflow-y-auto pr-2 flex-grow">
                    {availableCards.length > 0 ? (
                        availableCards.map(card => (
                            <SelectableDomainCard
                                key={card.name}
                                card={card}
                                isSelected={selectedCard === card.name}
                                onSelect={() => setSelectedCard(card.name)}
                            />
                        ))
                    ) : (
                        <p className="text-slate-400 text-center py-8">No hay cartas disponibles que cumplan los criterios.</p>
                    )}
                </div>
                 <div className="flex justify-center gap-4 pt-6 flex-shrink-0">
                     <button onClick={onClose} className="bg-slate-600 hover:bg-slate-500 text-white font-bold py-2 px-6 rounded-lg">
                        Cancelar
                     </button>
                     <button onClick={handleConfirm} disabled={!selectedCard} className="bg-green-600 hover:bg-green-500 text-white font-bold py-2 px-6 rounded-lg disabled:bg-slate-600 disabled:cursor-not-allowed">
                        Confirmar Selección
                     </button>
                </div>
            </div>
        </div>
    );
};

export default DomainCardSelectorModal;