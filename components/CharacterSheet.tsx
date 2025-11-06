import React, { useState, useMemo } from 'react';
import { Character, TraitName, Weapon, Armor, SubclassFeature, Experience } from '../types';
import Card from './Card';
import ThresholdTracker from './ThresholdTracker';
import StatDisplay from './StatDisplay';
import LevelUpModal from './LevelUpModal';
import { DOMAIN_CARDS } from '../data/domainCards';
import { ANCESTRIES } from '../data/ancestries';
import { COMMUNITIES } from '../data/communities';
import { ALL_ARMORS, ALL_PRIMARY_WEAPONS, ALL_SECONDARY_WEAPONS } from '../data/equipment';
import AddDomainCardModal from './AddDomainCardModal';

interface CharacterSheetProps {
  character: Character;
  onUpdateCharacter: (character: Character) => void;
  onReturnToSelection: () => void;
}

const FeatureDisplay: React.FC<{title: string, description: string}> = ({title, description}) => (
    <div>
        <h4 className="font-bold text-slate-200">{title}</h4>
        <p className="text-sm text-slate-400 italic">{description}</p>
    </div>
);

const SubclassFeatureDisplay: React.FC<{feature: SubclassFeature}> = ({feature}) => (
    <div>
        <h4 className="font-bold text-slate-200">{feature.name} <span className="text-xs text-slate-500">({feature.type})</span></h4>
        <p className="text-sm text-slate-400 italic">{feature.description}</p>
    </div>
);

const EquipmentDetailCard: React.FC<{ item: Weapon | Armor | undefined}> = ({ item }) => {
    if (!item) return <div className="p-2 text-sm text-slate-500 italic">Nada equipado.</div>;
    
    const isWeapon = 'trait' in item;

    return (
        <div className="text-xs text-slate-400 mt-2 bg-slate-700/50 p-3 rounded-md border border-slate-600 space-y-1">
            {isWeapon ? (
                <>
                    <div><span className="font-semibold text-slate-300">Daño:</span> {item.damage}</div>
                    <div><span className="font-semibold text-slate-300">Rango:</span> {item.range}</div>
                    <div><span className="font-semibold text-slate-300">Rasgo:</span> {item.trait}</div>
                    <div><span className="font-semibold text-slate-300">Carga:</span> {item.burden}</div>
                </>
            ) : (
                <>
                    <div><span className="font-semibold text-slate-300">Puntuación Base:</span> {item.baseScore}</div>
                    <div><span className="font-semibold text-slate-300">Umbrales Base:</span> {item.baseThresholds}</div>
                </>
            )}
            {item.feature && <div className="italic pt-1 border-t border-slate-600/50"><span className="font-semibold text-slate-300">Característica:</span> {item.feature}</div>}
        </div>
    );
}

const DomainCardDetail: React.FC<{ name: string }> = ({ name }) => {
    const card = DOMAIN_CARDS.find(c => c.name === name);
    if (!card) return <li>{name}</li>;

    return (
        <li>
            <details className="cursor-pointer">
                <summary className="font-semibold text-slate-200 hover:text-teal-300 list-item">{card.name} <span className="text-xs text-slate-500">(Nvl {card.level}, {card.type})</span></summary>
                <p className="text-slate-400 pl-4 pt-1 text-sm italic">{card.description}</p>
            </details>
        </li>
    );
};

const EditableExperienceDisplay: React.FC<{ experience: Experience, index: number, onUpdate: (index: number, updatedExp: Experience) => void }> = ({ experience, index, onUpdate }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedExperience, setEditedExperience] = useState(experience);

    const handleSave = () => {
        onUpdate(index, editedExperience);
        setIsEditing(false);
    };
    
    const handleCancel = () => {
        setEditedExperience(experience);
        setIsEditing(false);
    }

    if (isEditing) {
        return (
            <div className="space-y-2 p-3 bg-slate-700/50 rounded-md border border-slate-600">
                <div>
                    <label className="text-xs text-slate-400">Título</label>
                    <input 
                        type="text" 
                        value={editedExperience.name} 
                        onChange={(e) => setEditedExperience(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full bg-slate-800 border border-slate-600 rounded-md py-1 px-2 text-slate-200 focus:outline-none focus:ring-1 focus:ring-teal-500"
                    />
                </div>
                <div>
                    <label className="text-xs text-slate-400">Detalle</label>
                    <textarea 
                        value={editedExperience.description || ''}
                        onChange={(e) => setEditedExperience(prev => ({ ...prev, description: e.target.value }))}
                        placeholder="Detalle de la experiencia"
                        rows={3}
                        className="w-full bg-slate-800 border border-slate-600 rounded-md py-1 px-2 text-slate-200 focus:outline-none focus:ring-1 focus:ring-teal-500"
                    />
                </div>
                <div className="flex gap-2 justify-end">
                    <button onClick={handleSave} className="bg-teal-600 hover:bg-teal-500 text-white font-bold py-1 px-3 text-sm rounded-md">Guardar</button>
                    <button onClick={handleCancel} className="bg-slate-600 hover:bg-slate-500 text-white font-bold py-1 px-3 text-sm rounded-md">Cancelar</button>
                </div>
            </div>
        )
    }

    return (
        <div className="group relative pr-8 py-1">
            <h4 className="font-bold text-slate-200">{experience.name} <span className="text-xs font-mono text-slate-400">(+{experience.modifier})</span></h4>
            {experience.description && <p className="text-sm text-slate-400 italic mt-1 whitespace-pre-wrap">{experience.description}</p>}
            <button 
                onClick={() => setIsEditing(true)}
                aria-label={`Editar experiencia ${experience.name}`}
                className="absolute top-1 right-0 p-1 rounded-md text-slate-400 hover:text-teal-300 opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L14.732 3.732z" /></svg>
            </button>
        </div>
    )
};

const CharacterSheet: React.FC<CharacterSheetProps> = ({ character, onUpdateCharacter, onReturnToSelection }) => {
    const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false);
    const [isAddCardModalOpen, setIsAddCardModalOpen] = useState(false);
    const [newItem, setNewItem] = useState('');

    const characterTier = useMemo(() => {
        if (character.level >= 8) return 4;
        if (character.level >= 5) return 3;
        if (character.level >= 2) return 2;
        return 1;
    }, [character.level]);

    const handleSetStat = (stat: 'hp' | 'stress' | 'armor', value: number) => {
        onUpdateCharacter({
            ...character,
            [stat]: { ...character[stat], current: value }
        });
    };
    
    const handleResourceChange = (stat: 'hope' | 'gold', change: number) => {
        onUpdateCharacter({ ...character, [stat]: Math.max(0, character[stat] + change) });
    }
    
    const handleLevelUp = (updatedCharacter: Character) => {
        onUpdateCharacter(updatedCharacter);
        setIsLevelUpModalOpen(false);
    }
    
    const handleAddDomainCard = (newCardName: string) => {
        onUpdateCharacter({
            ...character,
            domainCards: [...character.domainCards, newCardName]
        });
        setIsAddCardModalOpen(false);
    };

    const handleAddItem = () => {
        if (newItem.trim()) {
            onUpdateCharacter({
                ...character,
                inventory: [...character.inventory, newItem.trim()]
            });
            setNewItem('');
        }
    };

    const handleRemoveItem = (indexToRemove: number) => {
        onUpdateCharacter({
            ...character,
            inventory: character.inventory.filter((_, index) => index !== indexToRemove)
        });
    };
    
    const handleUpdateExperience = (index: number, updatedExp: Experience) => {
        const newExperiences = [...character.experiences];
        newExperiences[index] = updatedExp;
        onUpdateCharacter({ ...character, experiences: newExperiences });
    };

    const handleEquipmentChange = (type: 'activeArmor' | 'primaryWeapon' | 'secondaryWeapon') => (e: React.ChangeEvent<HTMLSelectElement>) => {
        const itemName = e.target.value;
        let item: Weapon | Armor | undefined;

        if (type === 'activeArmor') item = ALL_ARMORS.find(a => a.name === itemName);
        if (type === 'primaryWeapon') item = ALL_PRIMARY_WEAPONS.find(w => w.name === itemName);
        if (type === 'secondaryWeapon') item = ALL_SECONDARY_WEAPONS.find(w => w.name === itemName);
        
        const updatedCharacter = { ...character };

        if (type === 'activeArmor') {
            updatedCharacter.activeArmor = item as Armor | undefined;
            updatedCharacter.armor.max = item ? (item as Armor).baseScore : 0;
            updatedCharacter.armor.current = Math.min(updatedCharacter.armor.current, updatedCharacter.armor.max);
        } else if (type === 'primaryWeapon') {
            updatedCharacter.primaryWeapon = item as Weapon | undefined;
            if (item && (item as Weapon).burden === 'Two-Handed') {
                updatedCharacter.secondaryWeapon = undefined;
            }
        } else if (type === 'secondaryWeapon') {
            updatedCharacter.secondaryWeapon = item as Weapon | undefined;
        }

        onUpdateCharacter(updatedCharacter);
    };

    const { majorThreshold, severeThreshold } = useMemo(() => {
        let baseMajor, baseSevere;
        if (character.activeArmor) {
            [baseMajor, baseSevere] = character.activeArmor.baseThresholds.split('/').map(Number);
        } else {
            baseMajor = character.level;
            baseSevere = character.level * 2;
        }
        return {
            majorThreshold: baseMajor + character.level,
            severeThreshold: baseSevere + character.level
        };
    }, [character.level, character.activeArmor]);

    const traitNames: TraitName[] = ['strength', 'agility', 'finesse', 'instinct', 'knowledge', 'presence'];
    const ancestry = ANCESTRIES.find(a => a.name === character.ancestry);
    const community = COMMUNITIES.find(c => c.name === character.community);
    
    const availableArmors = useMemo(() => ALL_ARMORS.filter(a => a.tier <= characterTier).sort((a,b) => a.name.localeCompare(b.name)), [characterTier]);
    const availablePrimary = useMemo(() => ALL_PRIMARY_WEAPONS.filter(w => w.tier <= characterTier).sort((a,b) => a.name.localeCompare(b.name)), [characterTier]);
    const availableSecondary = useMemo(() => ALL_SECONDARY_WEAPONS.filter(w => w.tier <= characterTier).sort((a,b) => a.name.localeCompare(b.name)), [characterTier]);

    return (
    <div className="space-y-6">
        <Card title={character.name}>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 text-center items-center">
                <div className="flex items-center justify-center gap-2">
                    <div>
                        <h3 className="text-sm text-slate-400 uppercase">Nivel</h3>
                        <p className="text-lg font-semibold">{character.level}</p>
                    </div>
                    {character.level < 10 && (
                        <button onClick={() => setIsLevelUpModalOpen(true)} className="bg-yellow-500 hover:bg-yellow-400 text-slate-900 font-bold py-1 px-3 rounded-md text-sm">
                            Subir Nivel
                        </button>
                    )}
                </div>
                <div><h3 className="text-sm text-slate-400 uppercase">Clase</h3><p className="text-lg font-semibold">{character.class}</p></div>
                <div><h3 className="text-sm text-slate-400 uppercase">Subclase</h3><p className="text-lg font-semibold">{character.subclass}</p></div>
                <div><h3 className="text-sm text-slate-400 uppercase">Ascendencia</h3><p className="text-lg font-semibold">{character.ancestry}</p></div>
                <div><h3 className="text-sm text-slate-400 uppercase">Comunidad</h3><p className="text-lg font-semibold">{character.community}</p></div>
                 <button onClick={onReturnToSelection} className="bg-slate-600 hover:bg-slate-500 text-white font-bold py-2 px-4 rounded-lg">
                    Cambiar Personaje
                </button>
            </div>
        </Card>
      
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="space-y-6">
                <Card title="Estadísticas de Combate">
                    <div className="space-y-4">
                        <ThresholdTracker label="PV" current={character.hp.current} max={character.hp.max} onSet={(val) => handleSetStat('hp', val)} color="bg-red-500" />
                        <ThresholdTracker label="Estrés" current={character.stress.current} max={character.stress.max} onSet={(val) => handleSetStat('stress', val)} color="bg-purple-500" />
                        <ThresholdTracker label="Armadura" current={character.armor.current} max={character.armor.max} onSet={(val) => handleSetStat('armor', val)} color="bg-sky-500" />
                         <div className="grid grid-cols-2 gap-4 text-center pt-2">
                            <div><h3 className="text-sm text-slate-400 uppercase">Umbral Mayor</h3><p className="text-lg font-semibold">{majorThreshold}</p></div>
                            <div><h3 className="text-sm text-slate-400 uppercase">Umbral Severo</h3><p className="text-lg font-semibold">{severeThreshold}</p></div>
                        </div>
                    </div>
                </Card>
                <Card title="Rasgos">
                     <div className="grid grid-cols-2 gap-4">
                        {traitNames.map(trait => <StatDisplay key={trait} label={trait === 'strength' ? 'Fuerza' : trait === 'agility' ? 'Agilidad' : trait === 'finesse' ? 'Finura' : trait === 'instinct' ? 'Instinto' : trait === 'presence' ? 'Presencia' : 'Conocimiento'} value={character.traits[trait]} />)}
                        <StatDisplay label="Evasión" value={character.evasion} />
                        <StatDisplay label="Soltura" value={character.proficiency} />
                     </div>
                </Card>
                <Card title="Recursos">
                    <div className="space-y-4">
                        <StatDisplay label="Esperanza" value={character.hope} onUpdate={(c) => handleResourceChange('hope', c)} isEditable={true} />
                        <StatDisplay label="Oro (Puñados)" value={character.gold} onUpdate={(c) => handleResourceChange('gold', c)} isEditable={true} />
                    </div>
                </Card>
            </div>
            <div className="space-y-6">
                <Card title="Características y Experiencias">
                    <div className="space-y-3">
                        <h3 className="text-lg font-bold text-slate-100">Características Principales</h3>
                        {ancestry?.features.map(f => <FeatureDisplay key={f.name} title={`Ascendencia: ${f.name}`} description={f.description} />)}
                        {community && <FeatureDisplay title={`Comunidad: ${community.feature.name}`} description={community.feature.description} />}
                        {character.subclassFeatures.map(f => <SubclassFeatureDisplay key={f.name} feature={f}/>)}
                        <h3 className="text-lg font-bold pt-2 border-t border-slate-700 text-slate-100">Experiencias</h3>
                        <div className="space-y-3">
                           {character.experiences.map((exp, index) => (
                                <EditableExperienceDisplay key={index} experience={exp} index={index} onUpdate={handleUpdateExperience} />
                           ))}
                        </div>
                    </div>
                </Card>
                <Card 
                    title="Cartas de Dominio"
                    headerContent={
                        <button 
                            onClick={() => setIsAddCardModalOpen(true)} 
                            className="bg-sky-600 hover:bg-sky-500 text-white font-bold py-1 px-3 text-sm rounded-lg transition-colors"
                            aria-label="Añadir nueva carta de dominio"
                        >
                            + Añadir Carta
                        </button>
                    }
                >
                    <ul className="space-y-2 text-slate-300">
                        {character.domainCards.map((card, index) => <DomainCardDetail key={index} name={card} />)}
                    </ul>
                </Card>
            </div>
            <div className="space-y-6">
                <Card title="Equipo">
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="armor-select" className="block text-sm font-bold mb-1 text-slate-400">Armadura</label>
                            <select id="armor-select" value={character.activeArmor?.name || ''} onChange={handleEquipmentChange('activeArmor')} className="w-full bg-slate-700 border border-slate-600 rounded-md py-2 px-3 text-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500">
                                <option value="">Sin Armadura</option>
                                {availableArmors.map(a => <option key={a.name} value={a.name}>{a.name} (Tier {a.tier})</option>)}
                            </select>
                            <EquipmentDetailCard item={character.activeArmor} />
                        </div>
                        <div>
                            <label htmlFor="primary-weapon-select" className="block text-sm font-bold mb-1 text-slate-400">Arma Principal</label>
                            <select id="primary-weapon-select" value={character.primaryWeapon?.name || ''} onChange={handleEquipmentChange('primaryWeapon')} className="w-full bg-slate-700 border border-slate-600 rounded-md py-2 px-3 text-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500">
                                <option value="">Sin Arma Principal</option>
                                {availablePrimary.map(w => <option key={w.name} value={w.name}>{w.name} (Tier {w.tier})</option>)}
                            </select>
                             <EquipmentDetailCard item={character.primaryWeapon} />
                        </div>
                        <div>
                            <label htmlFor="secondary-weapon-select" className="block text-sm font-bold mb-1 text-slate-400">Arma Secundaria</label>
                            <select id="secondary-weapon-select" value={character.secondaryWeapon?.name || ''} onChange={handleEquipmentChange('secondaryWeapon')} className="w-full bg-slate-700 border border-slate-600 rounded-md py-2 px-3 text-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500" disabled={character.primaryWeapon?.burden === 'Two-Handed'}>
                                <option value="">Sin Arma Secundaria</option>
                                {availableSecondary.map(w => <option key={w.name} value={w.name}>{w.name} (Tier {w.tier})</option>)}
                            </select>
                            <EquipmentDetailCard item={character.secondaryWeapon} />
                        </div>
                        <div>
                            <h4 className="font-bold text-slate-200 mt-4">Inventario</h4>
                            <ul className="space-y-2 text-slate-300 text-sm">
                                {character.inventory.map((item, index) => (
                                    <li key={index} className="flex justify-between items-center bg-slate-700/50 p-2 rounded-md">
                                        <span>{item}</span>
                                        <button 
                                            onClick={() => handleRemoveItem(index)} 
                                            className="text-slate-400 hover:text-red-400 font-bold text-lg"
                                            aria-label={`Eliminar ${item}`}
                                        >
                                            &times;
                                        </button>
                                    </li>
                                ))}
                            </ul>
                            <div className="flex gap-2 mt-3">
                                <input
                                    type="text"
                                    value={newItem}
                                    onChange={(e) => setNewItem(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleAddItem()}
                                    placeholder="Añadir nuevo objeto..."
                                    className="flex-grow bg-slate-700 border border-slate-600 rounded-md py-1 px-3 text-sm text-slate-200 focus:outline-none focus:ring-1 focus:ring-teal-500"
                                />
                                <button 
                                    onClick={handleAddItem}
                                    className="bg-teal-600 hover:bg-teal-500 text-white font-bold py-1 px-3 rounded-md text-sm transition-colors"
                                >
                                    Añadir
                                </button>
                            </div>
                        </div>
                    </div>
                </Card>
                <Card title="Notas y Trasfondo">
                     <p className="text-slate-300 whitespace-pre-wrap">{character.notes}</p>
                </Card>
            </div>
        </div>

        {isLevelUpModalOpen && (
            <LevelUpModal
                character={character}
                onClose={() => setIsLevelUpModalOpen(false)}
                onLevelUp={handleLevelUp}
            />
        )}
        {isAddCardModalOpen && (
            <AddDomainCardModal
                character={character}
                onClose={() => setIsAddCardModalOpen(false)}
                onCardAdd={handleAddDomainCard}
            />
        )}
    </div>
  );
};

export default CharacterSheet;