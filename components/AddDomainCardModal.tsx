import React, { useState, useMemo } from 'react';
import { Character } from '../types';
import { DOMAIN_CARDS } from '../data/domainCards';
import DomainCardSelectorModal from './DomainCardSelectorModal';

interface AddDomainCardModalProps {
    character: Character;
    onClose: () => void;
    onCardAdd: (cardName: string) => void;
}

const AddDomainCardModal: React.FC<AddDomainCardModalProps> = ({ character, onClose, onCardAdd }) => {
    const [isSelectorOpen, setIsSelectorOpen] = useState(true);

    const availableCards = useMemo(() => DOMAIN_CARDS
        .filter(c => 
            character.domains.includes(c.domain) && 
            c.level <= character.level &&
            !character.domainCards.includes(c.name) &&
            !character.vault.includes(c.name)
        )
        .sort((a,b) => a.level - b.level || a.name.localeCompare(b.name)),
        [character]
    );

    const handleCardSelected = (cardName: string) => {
        onCardAdd(cardName);
        setIsSelectorOpen(false);
    };

    const handleClose = () => {
        setIsSelectorOpen(false);
        onClose();
    }

    if (!isSelectorOpen) {
        return null;
    }

    return (
        <DomainCardSelectorModal
            availableCards={availableCards}
            onClose={handleClose}
            onCardSelect={handleCardSelected}
            title="Añadir Nueva Carta a la Bóveda"
        />
    );
};

export default AddDomainCardModal;
