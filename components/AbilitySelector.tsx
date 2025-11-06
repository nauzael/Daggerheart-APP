import React from 'react';
import { DomainCard, DOMAIN_CARDS } from '../data/domainCards';

interface AbilitySelectorProps {
  selectedDomains: string[];
  selectedAbilities: string[];
  onAbilityToggle: (abilityName: string) => void;
}

const AbilityCard: React.FC<{card: DomainCard, isSelected: boolean, isDisabled: boolean, onSelect: () => void}> = ({ card, isSelected, isDisabled, onSelect }) => {
    const baseClasses = "p-4 border rounded-lg cursor-pointer transition-all duration-200 flex flex-col h-full";
    const selectedClasses = "bg-teal-600 border-teal-500 text-white shadow-lg ring-2 ring-teal-400";
    const unselectedClasses = "bg-slate-700 border-slate-600 hover:bg-slate-600";
    const disabledClasses = "opacity-50 cursor-not-allowed bg-slate-800 border-slate-700";

    const getClasses = () => {
        if (isSelected) return `${baseClasses} ${selectedClasses}`;
        if (isDisabled) return `${baseClasses} ${disabledClasses}`;
        return `${baseClasses} ${unselectedClasses}`;
    };

    return (
        <div className={getClasses()} onClick={!isDisabled || isSelected ? onSelect : undefined}>
            <h4 className="font-bold text-lg">{card.name}</h4>
            <p className={`text-sm mt-1 flex-grow ${isSelected ? 'text-teal-100' : 'text-slate-400'}`}>{card.description}</p>
        </div>
    );
};


const AbilitySelector: React.FC<AbilitySelectorProps> = ({ selectedDomains, selectedAbilities, onAbilityToggle }) => {
  const availableCards = DOMAIN_CARDS.filter(card => 
    selectedDomains.includes(card.domain) && card.level <= 1
  );

  const selectionLimit = 2;
  const numSelected = selectedAbilities.length;

  if (selectedDomains.length < 2) {
      return null;
  }

  const cardsFromDomain1 = availableCards.filter(c => c.domain === selectedDomains[0]);
  const cardsFromDomain2 = availableCards.filter(c => c.domain === selectedDomains[1]);

  const selectedFromDomain1 = selectedAbilities.filter(name => cardsFromDomain1.some(c => c.name === name)).length;
  const selectedFromDomain2 = selectedAbilities.filter(name => cardsFromDomain2.some(c => c.name === name)).length;
  
  return (
    <div className="flex flex-col gap-4 mt-4">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
             <h3 className="text-slate-300 font-semibold">Choose {selectionLimit} 1st-level Domain Cards*</h3>
             <span className={`font-mono px-3 py-1 rounded-md text-sm ${numSelected === selectionLimit ? 'bg-green-500 text-white' : 'bg-slate-700 text-slate-300'}`}>
                {numSelected} / {selectionLimit}
             </span>
        </div>
        <p className="text-sm text-slate-400">You can take one card from each domain or two from a single domain.</p>
        
        {selectedDomains.map((domain, index) => {
            const cardsInThisDomain = index === 0 ? cardsFromDomain1 : cardsFromDomain2;
            const selectedInThisDomain = index === 0 ? selectedFromDomain1 : selectedFromDomain2;
            
            return (
                <div key={domain}>
                    <h4 className="text-xl font-bold text-slate-200 mb-2 border-b border-slate-700 pb-1">{domain}</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {cardsInThisDomain.map(card => {
                            const isSelected = selectedAbilities.includes(card.name);
                            // Disable if limit reached
                            let isDisabled = !isSelected && numSelected >= selectionLimit;
                            // Disable if trying to take a second from this domain when one is already taken from the other
                            if (!isDisabled && !isSelected) {
                                if (selectedInThisDomain > 0 && (index === 0 ? selectedFromDomain2 > 0 : selectedFromDomain1 > 0)) {
                                    isDisabled = true;
                                }
                            }
                            
                            return (
                               <AbilityCard
                                    key={card.name}
                                    card={card}
                                    isSelected={isSelected}
                                    isDisabled={isDisabled}
                                    onSelect={() => onAbilityToggle(card.name)}
                               />
                            );
                        })}
                    </div>
                </div>
            )
        })}
    </div>
  );
};

export default AbilitySelector;