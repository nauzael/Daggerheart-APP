import React, { useState } from 'react';
import { Character, BeastForm } from '../types';
import Card from './Card';
import BeastformSelectorModal from './BeastformSelectorModal';
import BeastformListModal from './BeastformListModal';
import { ALL_BEASTFORMS } from '../data/beastforms';

interface BeastformDisplayProps {
    character: Character;
    onUpdateCharacter: (character: Character) => void;
}

const BeastformDisplay: React.FC<BeastformDisplayProps> = ({ character, onUpdateCharacter }) => {
    const [isSelectorModalOpen, setIsSelectorModalOpen] = useState(false);
    const [isListModalOpen, setIsListModalOpen] = useState(false);

    const handleTransform = (formName: string) => {
        const updatedCharacter: Character = {
            ...character,
            activeBeastFormName: formName,
        };
        onUpdateCharacter(updatedCharacter);
        setIsSelectorModalOpen(false);
    };

    const handleRevert = () => {
        onUpdateCharacter({ ...character, activeBeastFormName: undefined });
    };

    const handleLearnForm = (formName: string) => {
        const formToLearn = ALL_BEASTFORMS.find(f => f.name === formName);
        if (formToLearn && !character.beastForms?.some(f => f.name === formName)) {
            const updatedCharacter: Character = {
                ...character,
                beastForms: [...(character.beastForms || []), formToLearn],
            };
            onUpdateCharacter(updatedCharacter);
        }
        setIsListModalOpen(false); // Close modal after learning
    };

    const activeForm = ALL_BEASTFORMS.find(b => b.name === character.activeBeastFormName);
    const learnedForms = character.beastForms || [];

    const headerContent = (
        <button 
            onClick={() => setIsListModalOpen(true)}
            className="text-sm bg-slate-600 hover:bg-slate-500 py-1 px-3 rounded-md"
            aria-label="Learn a new beast form"
        >
            Learn Form
        </button>
    );

    return (
        <Card title="Beastform" headerContent={headerContent}>
            {activeForm ? (
                <div className="space-y-4">
                    {(() => {
                        const traitBonusString = activeForm.traitBonus ? `${activeForm.traitBonus.trait.charAt(0).toUpperCase() + activeForm.traitBonus.trait.slice(1)} +${activeForm.traitBonus.value}` : 'None';
                        return (
                            <div className="space-y-3">
                                <div>
                                    <h4 className="font-bold text-lg text-slate-100">{activeForm.name} <span className="text-xs text-slate-400 font-mono">(Tier {activeForm.tier})</span></h4>
                                    <p className="text-sm text-slate-300 italic">{activeForm.examples}</p>
                                </div>
                                
                                <div className="grid grid-cols-2 gap-2 text-sm">
                                    <div className="bg-slate-700 p-2 rounded">
                                        <div className="font-bold text-slate-400">Bonuses</div>
                                        <p className="font-mono text-slate-100">{traitBonusString} | Evasion +{activeForm.evasionBonus}</p>
                                    </div>
                                    <div className="bg-slate-700 p-2 rounded">
                                        <div className="font-bold text-slate-400">Attack</div>
                                        <p className="text-sm text-slate-400 font-mono truncate">
                                            {activeForm.attack.trait} | {activeForm.attack.range} | {activeForm.attack.damage}
                                        </p>
                                    </div>
                                </div>

                                <div>
                                    <h5 className="font-semibold text-slate-200">Advantages</h5>
                                    <p className="text-sm text-slate-300">Gain advantage on: {activeForm.advantages.join(', ')}.</p>
                                </div>

                                <div>
                                    <h5 className="font-semibold text-slate-200">Features</h5>
                                    <ul className="list-disc list-inside space-y-1 text-sm text-slate-300">
                                        {activeForm.features.map(feature => (
                                            <li key={feature.name}>
                                                <span className="font-semibold">{feature.name}:</span> {feature.description}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        );
                    })()}
                    <button onClick={handleRevert} className="w-full bg-red-600 hover:bg-red-500 text-white font-bold py-2 px-4 rounded-lg">
                        Revert Form
                    </button>
                </div>
            ) : (
                <div className="space-y-3">
                    {learnedForms.length > 0 ? (
                        <>
                            <p className="text-slate-400 text-sm text-center">You are in your normal form.</p>
                            <button 
                                onClick={() => setIsSelectorModalOpen(true)} 
                                className="w-full bg-green-600 hover:bg-green-500 text-white font-bold py-2 px-4 rounded-lg"
                            >
                                Transform
                            </button>
                        </>
                    ) : (
                         <p className="text-slate-400 text-center">You have not learned any beast forms yet.</p>
                    )}
                </div>
            )}

            {isSelectorModalOpen && (
                <BeastformSelectorModal 
                    forms={learnedForms}
                    onClose={() => setIsSelectorModalOpen(false)}
                    onSelect={handleTransform}
                />
            )}

            {isListModalOpen && (
                <BeastformListModal 
                    character={character}
                    onClose={() => setIsListModalOpen(false)}
                    onLearn={handleLearnForm}
                />
            )}
        </Card>
    );
};

export default BeastformDisplay;