import React, { useState, useMemo, useEffect } from 'react';
import { Character, TraitName, BeastForm } from '../types';
import { ADVANCEMENTS } from '../data/advancements';
import { DOMAIN_CARDS, DomainCard } from '../data/domainCards';
import { SUBCLASS_FEATURES } from '../data/subclassFeatures';
import DomainCardSelectorModal from './DomainCardSelectorModal';
import { ALL_BEASTFORMS } from '../data/beastforms';
import BeastformCard from './BeastformCard';


interface LevelUpModalProps {
    character: Character;
    onClose: () => void;
    onLevelUp: (character: Character) => void;
}

const TRAIT_NAMES_EN: Record<TraitName, string> = {
    strength: 'Strength',
    agility: 'Agility',
    finesse: 'Finesse',
    instinct: 'Instinct',
    presence: 'Presence',
    knowledge: 'Knowledge'
};

const LevelUpModal: React.FC<LevelUpModalProps> = ({ character, onClose, onLevelUp }) => {
    const newLevel = character.level + 1;
    const newTier = newLevel >= 8 ? 4 : newLevel >= 5 ? 3 : newLevel >= 2 ? 2 : 1;

    const [selectedAdvancements, setSelectedAdvancements] = useState<string[]>([]);
    const [mandatoryDomainCard, setMandatoryDomainCard] = useState<string>('');
    const [advancementDomainCards, setAdvancementDomainCards] = useState<string[]>([]);
    const [traitSelections, setTraitSelections] = useState<string[]>([]);
    const [isSelectorOpen, setIsSelectorOpen] = useState(false);
    const [selectorContext, setSelectorContext] = useState<{ type: 'mandatory' | 'advancement'; index: number; } | null>(null);
    const [newBeastform, setNewBeastform] = useState('');
    const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);


    const isBeastformTierUp = useMemo(() => {
        if (character.class !== 'Druid') return false;
        return newLevel === 5 || newLevel === 8 || newLevel === 10;
    }, [newLevel, character.class]);

    const beastformTierToSelect = useMemo(() => {
        if (!isBeastformTierUp) return 0;
        if (newLevel === 5) return 2;
        if (newLevel === 8) return 3;
        if (newLevel === 10) return 4;
        return 0;
    }, [isBeastformTierUp, newLevel]);
    
    const availableBeastforms = useMemo(() => {
        if (!beastformTierToSelect) return [];
        const knownFormNames = (character.beastForms || []).map(f => f.name);
        return ALL_BEASTFORMS.filter(b => b.tier === beastformTierToSelect && !knownFormNames.includes(b.name));
    }, [beastformTierToSelect, character.beastForms]);

    const tierAchievements = useMemo(() => {
        const achievements: string[] = [];
        if (newLevel === 2 || newLevel === 5 || newLevel === 8) {
            achievements.push('Gain a new Experience slot at +2.');
            achievements.push('Permanently increase your Proficiency by 1.');
        }
        if (newLevel === 5 || newLevel === 8) {
             achievements.push('Clear any marked traits.');
        }
        return achievements;
    }, [newLevel]);
    
    const availableAdvancements = useMemo(() => ADVANCEMENTS.filter(adv => newTier >= adv.tier), [newTier]);

    const totalSlotsUsed = useMemo(() => {
        return selectedAdvancements.reduce((total, uniqueId) => {
            const baseId = uniqueId.substring(0, uniqueId.lastIndexOf('_'));
            const adv = availableAdvancements.find(a => a.id === baseId);
            return total + (adv ? adv.slots : 0);
        }, 0);
    }, [selectedAdvancements, availableAdvancements]);
    
    const advancementCardCount = useMemo(() => selectedAdvancements.filter(id => id.startsWith('add_domain_card')).length, [selectedAdvancements]);
    const increaseTraitsCount = useMemo(() => selectedAdvancements.filter(id => id.startsWith('increase_traits')).length, [selectedAdvancements]);

    useEffect(() => {
        setAdvancementDomainCards(current => {
            const newSelections = Array(advancementCardCount).fill('');
            for (let i = 0; i < Math.min(current.length, advancementCardCount); i++) {
                newSelections[i] = current[i];
            }
            return newSelections;
        });
    }, [advancementCardCount]);

    useEffect(() => {
        setTraitSelections(current => {
            const newSelections = Array(increaseTraitsCount * 2).fill('');
            for (let i = 0; i < Math.min(current.length, increaseTraitsCount * 2); i++) {
                newSelections[i] = current[i];
            }
            return newSelections;
        });
    }, [increaseTraitsCount]);

    const handleAdvancementToggle = (id: string) => {
        const adv = availableAdvancements.find(a => a.id === id)!;
        setSelectedAdvancements(prev => {
            const instances = prev.filter(p => p.startsWith(id));
            const count = instances.length;
    
            const currentSlotsUsed = prev.reduce((total, uniqueId) => {
                const baseId = uniqueId.substring(0, uniqueId.lastIndexOf('_'));
                const a = availableAdvancements.find(a => a.id === baseId);
                return total + (a ? a.slots : 0);
            }, 0);
    
            if (currentSlotsUsed + adv.slots <= 2 && (adv.isRepeatable || count === 0)) {
                return [...prev, `${id}_${count}`];
            }
    
            if (count > 0) {
                const newSelections = [...prev];
                const lastIndex = newSelections.map(p => p.startsWith(id)).lastIndexOf(true);
                if(lastIndex > -1) {
                    newSelections.splice(lastIndex, 1);
                }
                return newSelections;
            }
    
            return prev;
        });
    };
    
    const handleTraitSelectionChange = (index: number, trait: string) => {
        setTraitSelections(prev => {
            const newSelections = [...prev];
            newSelections[index] = trait;
            return newSelections;
        });
    };

    const traitSelectionsValid = useMemo(() => {
        if (increaseTraitsCount === 0) return true;
        const selections = traitSelections.slice(0, increaseTraitsCount * 2);
        const filled = selections.every(sel => sel && sel !== '');
        const unique = new Set(selections).size === selections.length;
        return filled && unique;
    }, [traitSelections, increaseTraitsCount]);

    const canConfirm = totalSlotsUsed === 2 && mandatoryDomainCard !== '' && advancementDomainCards.every(c => c !== '') && traitSelectionsValid && (!isBeastformTierUp || newBeastform !== '');
    
    const handleSubmit = () => {
        if (canConfirm) {
            setIsConfirmationModalOpen(true);
        }
    }

    const handleFinalizeLevelUp = () => {
        if (!canConfirm) return;
        
        let updatedChar: Character = { 
            ...character, 
            level: newLevel,
            hp: { ...character.hp },
            stress: { ...character.stress },
            traits: { ...character.traits },
            experiences: [...character.experiences],
            subclassFeatures: [...character.subclassFeatures],
            beastForms: [...(character.beastForms || [])],
        };
        
        if (newLevel === 2 || newLevel === 5 || newLevel === 8) {
             updatedChar.proficiency += 1;
             updatedChar.experiences = [...updatedChar.experiences, {name: `Level ${newLevel} Experience`, modifier: 2, description: ''}];
        }
        
        selectedAdvancements.forEach(id => {
            const baseId = id.substring(0, id.lastIndexOf('_'));
            if (baseId.startsWith('add_hp')) updatedChar.hp.max += 1;
            if (baseId.startsWith('add_stress')) updatedChar.stress.max += 1;
            if (baseId.startsWith('increase_evasion')) updatedChar.evasion += 1;
            if (baseId.startsWith('upgrade_subclass')) {
                const nextFeatureType = updatedChar.subclassFeatures.some(f => f.type === 'Specialization') ? 'Mastery' : 'Specialization';
                const nextFeature = SUBCLASS_FEATURES.find(f => f.subclass === updatedChar.subclass && f.type === nextFeatureType);
                if (nextFeature && !updatedChar.subclassFeatures.some(f => f.name === nextFeature.name)) {
                    updatedChar.subclassFeatures = [...updatedChar.subclassFeatures, nextFeature];
                }
            }
        });

        traitSelections.forEach(trait => {
            if (trait) updatedChar.traits[trait as TraitName] += 1;
        });

        if (isBeastformTierUp && newBeastform) {
            const form = ALL_BEASTFORMS.find(b => b.name === newBeastform);
            if (form) {
                updatedChar.beastForms = [...(updatedChar.beastForms || []), form];
            }
        }

        const newCards = [mandatoryDomainCard, ...advancementDomainCards].filter(Boolean);
        updatedChar.vault = [...updatedChar.vault, ...newCards];
        
        onLevelUp(updatedChar);
    };

    const handleReset = () => {
        setSelectedAdvancements([]);
        setMandatoryDomainCard('');
    };

    const baseAvailableCards = useMemo(() => DOMAIN_CARDS
        .filter(c => 
            character.domains.includes(c.domain) && 
            c.level <= newLevel &&
            !character.domainCards.includes(c.name) &&
            !character.vault.includes(c.name)
        )
        .sort((a,b) => a.level - b.level || a.name.localeCompare(b.name)), [character, newLevel]);
    
    const cardsForModal = useMemo(() => {
        if (!isSelectorOpen) return [];
        const currentlySelected = [mandatoryDomainCard, ...advancementDomainCards].filter(Boolean);
        
        let cardToExclude = '';
        if(selectorContext) {
            if (selectorContext.type === 'mandatory') {
                cardToExclude = mandatoryDomainCard;
            } else {
                cardToExclude = advancementDomainCards[selectorContext.index];
            }
        }
        const otherSelectedCards = currentlySelected.filter(c => c !== cardToExclude);
        return baseAvailableCards.filter(c => !otherSelectedCards.includes(c.name));

    }, [isSelectorOpen, selectorContext, mandatoryDomainCard, advancementDomainCards, baseAvailableCards]);

    const handleOpenSelector = (type: 'mandatory' | 'advancement', index = 0) => {
        setSelectorContext({ type, index });
        setIsSelectorOpen(true);
    };

    const handleCardSelectedFromModal = (cardName: string) => {
        if (!selectorContext) return;

        if (selectorContext.type === 'mandatory') {
            setMandatoryDomainCard(cardName);
        } else {
            setAdvancementDomainCards(prev => {
                const newSelections = [...prev];
                newSelections[selectorContext.index] = cardName;
                return newSelections;
            });
        }
        setIsSelectorOpen(false);
        setSelectorContext(null);
    };

    const renderConfirmationModal = () => {
        if (!isConfirmationModalOpen) return null;

        // Helper components for detailed display
        const StatChangeDisplay: React.FC<{ label: string, oldValue: number, newValue: number }> = ({ label, oldValue, newValue }) => (
            <div className="flex justify-between items-center bg-slate-700 p-2 rounded-lg">
                <span className="text-sm font-semibold capitalize text-slate-300">{label}</span>
                <div className="flex items-center gap-2">
                    <span className="text-md font-bold text-slate-400">{oldValue}</span>
                    <span className="text-teal-400 font-bold">→</span>
                    <span className="text-md font-bold text-teal-300">{newValue}</span>
                </div>
            </div>
        );

        const NewFeatureDisplay: React.FC<{ title: string, name: string, description: string }> = ({ title, name, description }) => (
            <div className="bg-slate-700/50 p-3 rounded-lg">
                <p className="text-xs text-slate-400 font-semibold">{title}</p>
                <p className="font-bold text-slate-100">{name}</p>
                <p className="text-sm text-slate-400 mt-1">{description}</p>
            </div>
        );

        const NewCardDisplay: React.FC<{ cardName: string }> = ({ cardName }) => {
            const card = DOMAIN_CARDS.find(c => c.name === cardName);
            if (!card) return null;
            return (
                <div className="bg-slate-700/50 p-3 rounded-lg">
                    <p className="font-bold text-slate-100">{card.name}</p>
                    <p className="text-xs text-slate-400 font-mono">{card.domain} / {card.type} / Lvl {card.level}</p>
                </div>
            );
        };

        // Pre-calculate all changes for display
        const changes = {
            level: { old: character.level, new: newLevel },
            proficiency: { old: character.proficiency, new: character.proficiency },
            hp: { old: character.hp.max, new: character.hp.max },
            stress: { old: character.stress.max, new: character.stress.max },
            evasion: { old: character.evasion, new: character.evasion },
            traits: {} as Record<string, { old: number, new: number }>,
            newSubclassFeature: null as (typeof SUBCLASS_FEATURES[0]) | null,
            newCards: [mandatoryDomainCard, ...advancementDomainCards].filter(Boolean),
            newBeastform: ALL_BEASTFORMS.find(b => b.name === newBeastform),
            tierAchievements: tierAchievements,
        };

        // Tier Achievements
        if (newLevel === 2 || newLevel === 5 || newLevel === 8) {
            changes.proficiency.new += 1;
        }

        // Advancements
        selectedAdvancements.forEach(id => {
            const baseId = id.substring(0, id.lastIndexOf('_'));
            if (baseId.startsWith('add_hp')) changes.hp.new += 1;
            if (baseId.startsWith('add_stress')) changes.stress.new += 1;
            if (baseId.startsWith('increase_evasion')) changes.evasion.new += 1;
            if (baseId.startsWith('upgrade_subclass')) {
                const nextFeatureType = character.subclassFeatures.some(f => f.type === 'Specialization') ? 'Mastery' : 'Specialization';
                changes.newSubclassFeature = SUBCLASS_FEATURES.find(f => f.subclass === character.subclass && f.type === nextFeatureType) || null;
            }
        });

        // Trait increases
        traitSelections.forEach(traitStr => {
            if (traitStr) {
                const trait = traitStr as TraitName;
                if (!changes.traits[trait]) {
                    changes.traits[trait] = { old: character.traits[trait], new: character.traits[trait] };
                }
                changes.traits[trait].new += 1;
            }
        });

        return (
            <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4 animate-fade-in">
                <div className="bg-slate-800 rounded-lg shadow-xl p-4 sm:p-6 border border-slate-700 w-full max-w-3xl max-h-[90vh] flex flex-col">
                    <div className="flex justify-between items-center mb-4 flex-shrink-0">
                        <h2 className="text-3xl font-bold text-teal-400">Confirm Level Up to {newLevel}</h2>
                        <button onClick={() => setIsConfirmationModalOpen(false)} className="text-slate-400 hover:text-white text-3xl leading-none">&times;</button>
                    </div>
                    <div className="overflow-y-auto pr-2 space-y-6 text-slate-300">
                        {/* Stat Changes */}
                        <div>
                            <h3 className="text-xl font-semibold text-slate-200 mb-2">Stat Changes</h3>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                <StatChangeDisplay label="Level" oldValue={changes.level.old} newValue={changes.level.new} />
                                {changes.proficiency.old !== changes.proficiency.new && <StatChangeDisplay label="Proficiency" oldValue={changes.proficiency.old} newValue={changes.proficiency.new} />}
                                {changes.hp.old !== changes.hp.new && <StatChangeDisplay label="Max HP" oldValue={changes.hp.old} newValue={changes.hp.new} />}
                                {changes.stress.old !== changes.stress.new && <StatChangeDisplay label="Max Stress" oldValue={changes.stress.old} newValue={changes.stress.new} />}
                                {changes.evasion.old !== changes.evasion.new && <StatChangeDisplay label="Evasion" oldValue={changes.evasion.old} newValue={changes.evasion.new} />}
                                {Object.entries(changes.traits).map(([trait, values]) => (
                                    <StatChangeDisplay key={trait} label={trait} oldValue={values.old} newValue={values.new} />
                                ))}
                            </div>
                        </div>

                        {/* Tier Achievements */}
                        {changes.tierAchievements.length > 0 && (
                            <div>
                                <h3 className="text-xl font-semibold text-slate-200 mb-2">Tier Achievements</h3>
                                <ul className="list-disc list-inside text-sm text-slate-400 bg-slate-700/50 p-3 rounded-lg space-y-1">
                                    {changes.tierAchievements.map((ach, i) => <li key={i}>{ach}</li>)}
                                    <li>All damage thresholds increase by 1.</li>
                                </ul>
                            </div>
                        )}
                        
                        {/* New Abilities */}
                        {(changes.newSubclassFeature || changes.newBeastform) && (
                            <div>
                                <h3 className="text-xl font-semibold text-slate-200 mb-2">New Abilities</h3>
                                <div className="space-y-3">
                                    {changes.newSubclassFeature && (
                                        <NewFeatureDisplay
                                            title={`New ${changes.newSubclassFeature.type} Feature`}
                                            name={changes.newSubclassFeature.name}
                                            description={changes.newSubclassFeature.description}
                                        />
                                    )}
                                    {changes.newBeastform && (
                                        <div>
                                            <p className="text-xs text-slate-400 font-semibold mb-1">New Beastform Learned</p>
                                            <BeastformCard form={changes.newBeastform} />
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* New Cards */}
                        {changes.newCards.length > 0 && (
                            <div>
                                <h3 className="text-xl font-semibold text-slate-200 mb-2">New Domain Cards (Added to Vault)</h3>
                                <div className="space-y-2">
                                    {changes.newCards.map(cardName => <NewCardDisplay key={cardName} cardName={cardName} />)}
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="flex justify-center gap-4 pt-6 mt-auto flex-shrink-0">
                        <button onClick={() => setIsConfirmationModalOpen(false)} className="bg-slate-600 hover:bg-slate-500 text-white font-bold py-3 px-8 rounded-lg">
                            Edit Selections
                        </button>
                        <button onClick={handleFinalizeLevelUp} className="bg-green-600 hover:bg-green-500 text-white font-bold py-3 px-8 rounded-lg">
                            Finalize Level Up
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
            {isSelectorOpen && (
                 <DomainCardSelectorModal
                    availableCards={cardsForModal}
                    onClose={() => setIsSelectorOpen(false)}
                    onCardSelect={handleCardSelectedFromModal}
                    title="Seleccionar Carta de Dominio"
                />
            )}
            {renderConfirmationModal()}
            <div className="bg-slate-800 rounded-lg shadow-xl p-4 sm:p-6 border border-slate-700 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-3xl font-bold text-teal-400">Level Up to {newLevel}!</h2>
                    <button onClick={onClose} className="text-slate-400 hover:text-white text-3xl leading-none">&times;</button>
                </div>
                
                <div className="space-y-6">
                    <div>
                        <h3 className="text-xl font-semibold text-teal-400 mb-2">Tier {newTier} Achievements</h3>
                        <ul className="list-disc list-inside text-slate-300 space-y-1">
                            {tierAchievements.length > 0 ? tierAchievements.map((ach, i) => <li key={i}>{ach}</li>) : <li>No special achievements at this level.</li>}
                            <li>Increase all damage thresholds by 1 (automatic).</li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-xl font-semibold text-teal-400 mb-2">Advancements (Choose 2 slots)</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {availableAdvancements.map(adv => {
                                const count = selectedAdvancements.filter(sel => sel.startsWith(adv.id)).length;
                                const isSelected = count > 0;
                                return (
                                    <div key={adv.id}
                                        onClick={() => handleAdvancementToggle(adv.id)}
                                        className={`p-3 border rounded-lg cursor-pointer transition-all ${isSelected ? 'bg-teal-600 border-teal-500' : 'bg-slate-700 border-slate-600 hover:bg-slate-600'}`}>
                                        <div className="flex justify-between items-start">
                                            <h4 className="font-bold pr-2">{adv.description}</h4>
                                            {isSelected && <span className="text-xs bg-teal-800 rounded-full px-2 py-0.5 whitespace-nowrap">Selected{count > 1 ? ` (x${count})`: ''}</span>}
                                        </div>
                                        <p className="text-sm text-slate-400">Slots: {adv.slots}{adv.isRepeatable && " (Repeatable)"}</p>
                                    </div>
                                )
                            })}
                        </div>
                         <p className="text-right mt-2 font-mono text-sm">Slots Used: {totalSlotsUsed} / 2</p>
                    </div>

                    {increaseTraitsCount > 0 && (
                        <div>
                            <h3 className="text-xl font-semibold text-teal-400 mb-2">Select Traits to Increase</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {Array.from({ length: increaseTraitsCount * 2 }).map((_, index) => (
                                    <select 
                                        key={index} 
                                        value={traitSelections[index] || ''} 
                                        onChange={e => handleTraitSelectionChange(index, e.target.value)}
                                        className="w-full bg-slate-700 border border-slate-600 rounded-md py-2 px-3 text-slate-200"
                                    >
                                        <option value="">Seleccionar Atributo #{index + 1}</option>
                                        {(Object.keys(character.traits) as TraitName[]).map(trait => (
                                            <option 
                                                key={trait} 
                                                value={trait}
                                                disabled={traitSelections.filter((t, i) => i !== index).includes(trait)}
                                            >
                                                {TRAIT_NAMES_EN[trait]}
                                            </option>
                                        ))}
                                    </select>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="space-y-4">
                        <div>
                            <h3 className="text-xl font-semibold text-teal-400 mb-2">Level Up Domain Card (Step 4)</h3>
                             <button type="button" onClick={() => handleOpenSelector('mandatory')} className="w-full bg-slate-700 border border-slate-600 rounded-md py-2 px-3 text-slate-200 text-left hover:bg-slate-600">
                                {mandatoryDomainCard || 'Seleccionar una Carta de Dominio'}
                            </button>
                        </div>
                        
                        {advancementCardCount > 0 && (
                             <div>
                                <h3 className="text-xl font-semibold text-teal-400 mb-2">Advancement Domain Cards</h3>
                                <div className="space-y-3">
                                    {Array.from({ length: advancementCardCount }).map((_, index) => (
                                        <button key={index} type="button" onClick={() => handleOpenSelector('advancement', index)} className="w-full bg-slate-700 border border-slate-600 rounded-md py-2 px-3 text-slate-200 text-left hover:bg-slate-600">
                                            {advancementDomainCards[index] || `Seleccionar Carta de Avance #${index + 1}`}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {isBeastformTierUp && (
                        <div>
                            <h3 className="text-xl font-semibold text-teal-400 mb-2">Druid Progression: New Beastform</h3>
                            <p className="text-slate-400 mb-2 text-sm">You have reached Tier {beastformTierToSelect}. Choose a new beastform to master.</p>
                            <select
                                value={newBeastform}
                                onChange={e => setNewBeastform(e.target.value)}
                                className="w-full bg-slate-700 border border-slate-600 rounded-md py-2 px-3 text-slate-200"
                            >
                                <option value="">Select a Tier {beastformTierToSelect} Form*</option>
                                {availableBeastforms.map(form => (
                                    <option key={form.name} value={form.name}>{form.name}</option>
                                ))}
                            </select>
                            {newBeastform && (() => {
                                const form = ALL_BEASTFORMS.find(b=>b.name === newBeastform);
                                if (!form) return null;
                                return ( <div className="mt-4"><BeastformCard form={form} /></div> );
                            })()}
                        </div>
                    )}
                    
                    <div className="text-center pt-4">
                        <div className="flex justify-center items-center gap-4">
                            <button 
                                type="button"
                                onClick={handleReset} 
                                className="bg-slate-600 hover:bg-slate-500 text-white font-bold py-3 px-8 rounded-lg"
                            >
                                Restaurar
                            </button>
                            <button 
                                onClick={handleSubmit} 
                                disabled={!canConfirm} 
                                className="bg-green-600 hover:bg-green-500 text-white font-bold py-3 px-8 rounded-lg disabled:bg-slate-600 disabled:cursor-not-allowed"
                            >
                                Confirmar Subida de Nivel
                            </button>
                        </div>
                        {!canConfirm && <p className="text-red-400 text-sm mt-2">Debes usar exactamente 2 espacios de avance y seleccionar todas las cartas de dominio requeridas.</p>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LevelUpModal;