import React, { useState, useMemo, useEffect } from 'react';
import { Character } from '../types';
import { ADVANCEMENTS } from '../data/advancements';
import { DOMAIN_CARDS } from '../data/domainCards';
import { SUBCLASS_FEATURES } from '../data/subclassFeatures';

interface LevelUpModalProps {
    character: Character;
    onClose: () => void;
    onLevelUp: (character: Character) => void;
}

const LevelUpModal: React.FC<LevelUpModalProps> = ({ character, onClose, onLevelUp }) => {
    const newLevel = character.level + 1;
    const newTier = newLevel >= 8 ? 4 : newLevel >= 5 ? 3 : newLevel >= 2 ? 2 : 1;

    const [selectedAdvancements, setSelectedAdvancements] = useState<string[]>([]);
    const [mandatoryDomainCard, setMandatoryDomainCard] = useState<string>('');
    const [advancementDomainCards, setAdvancementDomainCards] = useState<string[]>([]);

    const tierAchievements = useMemo(() => {
        const achievements: string[] = [];
        if (newLevel === 2 || newLevel === 5 || newLevel === 8) {
            achievements.push('Gana una nueva ranura de Experiencia a +2.');
            achievements.push('Aumenta permanentemente tu Soltura en 1.');
        }
        if (newLevel === 5 || newLevel === 8) {
             achievements.push('Limpia cualquier rasgo marcado.');
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

    useEffect(() => {
        setAdvancementDomainCards(current => {
            const newSelections = Array(advancementCardCount).fill('');
            for (let i = 0; i < Math.min(current.length, advancementCardCount); i++) {
                newSelections[i] = current[i];
            }
            return newSelections;
        });
    }, [advancementCardCount]);

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
    
            // Try to add a new instance if possible
            if (currentSlotsUsed + adv.slots <= 2 && (adv.isRepeatable || count === 0)) {
                return [...prev, `${id}_${count}`];
            }
    
            // If we can't add, but it is selected, assume this click is to remove the last instance
            if (count > 0) {
                const newSelections = [...prev];
                const lastIndex = newSelections.map(p => p.startsWith(id)).lastIndexOf(true);
                if(lastIndex > -1) {
                    newSelections.splice(lastIndex, 1);
                }
                return newSelections;
            }
    
            return prev; // Otherwise no change
        });
    };
    
    const handleAdvancementCardSelection = (index: number, cardName: string) => {
        setAdvancementDomainCards(prev => {
            const newSelections = [...prev];
            newSelections[index] = cardName;
            return newSelections;
        });
    };

    const canConfirm = totalSlotsUsed === 2 && mandatoryDomainCard !== '' && advancementDomainCards.every(c => c !== '');
    
    const handleConfirm = () => {
        if (!canConfirm) return;
        
        let updatedChar: Character = { 
            ...character, 
            level: newLevel,
            hp: { ...character.hp },
            stress: { ...character.stress },
            experiences: [...character.experiences],
            subclassFeatures: [...character.subclassFeatures],
        };
        
        // Apply tier achievements
        if (newLevel === 2 || newLevel === 5 || newLevel === 8) {
             updatedChar.proficiency += 1;
             updatedChar.experiences = [...updatedChar.experiences, {name: `Experiencia de Nivel ${newLevel}`, modifier: 2}];
        }
        
        // Apply advancements
        selectedAdvancements.forEach(id => {
            const baseId = id.substring(0, id.lastIndexOf('_'));
            if (baseId.startsWith('add_hp')) {
                updatedChar.hp.max += 1;
            }
            if (baseId.startsWith('add_stress')) {
                updatedChar.stress.max += 1;
            }
            if (baseId.startsWith('increase_evasion')) {
                updatedChar.evasion += 1;
            }
            if (baseId.startsWith('upgrade_subclass')) {
                const nextFeatureType = updatedChar.subclassFeatures.some(f => f.type === 'Specialization') ? 'Mastery' : 'Specialization';
                const nextFeature = SUBCLASS_FEATURES.find(f => f.subclass === updatedChar.subclass && f.type === nextFeatureType);
                if (nextFeature && !updatedChar.subclassFeatures.some(f => f.name === nextFeature.name)) {
                    updatedChar.subclassFeatures = [...updatedChar.subclassFeatures, nextFeature];
                }
            }
        });

        // Add domain cards
        const newCards = [mandatoryDomainCard, ...advancementDomainCards].filter(Boolean);
        updatedChar.domainCards = [...updatedChar.domainCards, ...newCards];
        
        onLevelUp(updatedChar);
    };

    const availableDomainCards = useMemo(() => DOMAIN_CARDS
        .filter(c => character.domains.includes(c.domain) && c.level <= newLevel && !character.domainCards.includes(c.name))
        .sort((a,b) => a.level - b.level || a.name.localeCompare(b.name)), [character, newLevel]);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className="bg-slate-800 rounded-lg shadow-xl p-6 border border-slate-700 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-3xl font-bold text-slate-100">¡Sube a Nivel {newLevel}!</h2>
                    <button onClick={onClose} className="text-slate-400 hover:text-white text-3xl leading-none">&times;</button>
                </div>
                
                <div className="space-y-6">
                    <div>
                        <h3 className="text-xl font-semibold text-teal-300 mb-2">Logros de Tier {newTier}</h3>
                        <ul className="list-disc list-inside text-slate-300 space-y-1">
                            {tierAchievements.length > 0 ? tierAchievements.map((ach, i) => <li key={i}>{ach}</li>) : <li>No hay logros especiales en este nivel.</li>}
                            <li>Aumenta todos los umbrales de daño en 1 (automático).</li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-xl font-semibold text-teal-300 mb-2">Mejoras (Elige 2 ranuras)</h3>
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
                                            {isSelected && <span className="text-xs bg-teal-800 rounded-full px-2 py-0.5 whitespace-nowrap">Seleccionado{count > 1 ? ` (x${count})`: ''}</span>}
                                        </div>
                                        <p className="text-sm text-slate-400">Ranuras: {adv.slots}{adv.isRepeatable && " (Repetible)"}</p>
                                    </div>
                                )
                            })}
                        </div>
                         <p className="text-right mt-2 font-mono text-sm">Ranuras Usadas: {totalSlotsUsed} / 2</p>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <h3 className="text-xl font-semibold text-teal-300 mb-2">Carta de Dominio de Subida de Nivel (Paso 4)</h3>
                             <select value={mandatoryDomainCard} onChange={e => setMandatoryDomainCard(e.target.value)} className="w-full bg-slate-700 border border-slate-600 rounded-md py-2 px-3 text-slate-200">
                                 <option value="">Selecciona una Carta de Dominio</option>
                                 {availableDomainCards
                                    .filter(c => !advancementDomainCards.includes(c.name))
                                    .map(c => <option key={c.name} value={c.name}>{c.name} (Nvl {c.level}, {c.domain})</option>
                                 )}
                             </select>
                        </div>
                        
                        {advancementCardCount > 0 && (
                             <div>
                                <h3 className="text-xl font-semibold text-teal-300 mb-2">Cartas de Dominio por Mejora (Paso 2)</h3>
                                <div className="space-y-3">
                                    {Array.from({ length: advancementCardCount }).map((_, index) => (
                                        <select key={index} value={advancementDomainCards[index] || ''} onChange={e => handleAdvancementCardSelection(index, e.target.value)} className="w-full bg-slate-700 border border-slate-600 rounded-md py-2 px-3 text-slate-200">
                                            <option value="">Selecciona Carta de Mejora #{index+1}</option>
                                            {availableDomainCards
                                                .filter(c => c.name !== mandatoryDomainCard && !advancementDomainCards.filter((ac, i) => i !== index).includes(c.name))
                                                .map(c => <option key={c.name} value={c.name}>{c.name} (Nvl {c.level}, {c.domain})</option>)}
                                        </select>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                    
                    <div className="text-center pt-4">
                         <button onClick={handleConfirm} disabled={!canConfirm} className="bg-green-600 hover:bg-green-500 text-white font-bold py-3 px-8 rounded-lg disabled:bg-slate-600 disabled:cursor-not-allowed">
                            Confirmar Subida de Nivel
                         </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LevelUpModal;