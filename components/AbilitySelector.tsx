import React, { useState, useMemo } from 'react';
import { DomainCard, DOMAIN_CARDS } from '../data/domainCards';
import DomainCardSelectorModal from './DomainCardSelectorModal';

interface AbilitySelectorProps {
  selectedDomains: string[];
  selectedAbilities: string[];
  onAbilitySelect: (slotIndex: number, cardName: string) => void;
}

const AbilitySelector: React.FC<AbilitySelectorProps> = ({ selectedDomains, selectedAbilities, onAbilitySelect }) => {
    const [isSelectorOpen, setIsSelectorOpen] = useState(false);
    const [editingSlot, setEditingSlot] = useState<number | null>(null);

    const availableCards = useMemo(() => DOMAIN_CARDS.filter(card => 
        selectedDomains.includes(card.domain) && card.level <= 1
    ), [selectedDomains]);
    
    const cardsForModal = useMemo(() => {
        if (editingSlot === null) return [];
        const otherSlotCard = editingSlot === 0 ? selectedAbilities[1] : selectedAbilities[0];
        return availableCards.filter(c => c.name !== otherSlotCard);
    }, [editingSlot, selectedAbilities, availableCards]);

    const handleOpenSelector = (slot: number) => {
        setEditingSlot(slot);
        setIsSelectorOpen(true);
    };

    const handleCardSelectedFromModal = (cardName: string) => {
        if (editingSlot !== null) {
            onAbilitySelect(editingSlot, cardName);
        }
        setIsSelectorOpen(false);
        setEditingSlot(null);
    };

    const getCardDisplay = (cardName: string | undefined) => {
        if (!cardName) return null;
        return DOMAIN_CARDS.find(c => c.name === cardName);
    };

    if (selectedDomains.length < 2) return null;

    const numSelected = selectedAbilities.filter(Boolean).length;
    const selectionLimit = 2;
  
    return (
        <div className="flex flex-col gap-4 mt-4">
            {isSelectorOpen && editingSlot !== null && (
                <DomainCardSelectorModal
                    availableCards={cardsForModal}
                    onClose={() => setIsSelectorOpen(false)}
                    onCardSelect={handleCardSelectedFromModal}
                    title={`Seleccionar Carta de Dominio #${editingSlot + 1}`}
                />
            )}
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                 <h3 className="text-slate-300 font-semibold">Elige {selectionLimit} Cartas de Dominio de 1er nivel*</h3>
                 <span className={`font-mono px-3 py-1 rounded-md text-sm ${numSelected === selectionLimit ? 'bg-green-500 text-white' : 'bg-slate-700 text-slate-300'}`}>
                    {numSelected} / {selectionLimit}
                 </span>
            </div>
            <p className="text-sm text-slate-400">Puedes tomar una carta de cada dominio o dos de un solo dominio.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[0, 1].map(slotIndex => {
                    const selectedCard = getCardDisplay(selectedAbilities[slotIndex]);
                    return (
                        <div key={slotIndex} onClick={() => handleOpenSelector(slotIndex)} className="p-4 border-2 border-dashed border-slate-600 rounded-lg cursor-pointer min-h-[8rem] flex items-center justify-center hover:border-teal-500 hover:bg-slate-700/50 transition-colors">
                            {selectedCard ? (
                                <div className="text-center">
                                    <h4 className="font-bold text-lg text-teal-300">{selectedCard.name}</h4>
                                    <p className="text-xs text-slate-400 font-mono">{selectedCard.domain}</p>
                                </div>
                            ) : (
                                <span className="text-slate-400 text-lg">+ Seleccionar Carta #{slotIndex + 1}</span>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default AbilitySelector;
