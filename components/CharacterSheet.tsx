
import React, { useState, useMemo } from 'react';
// Fix: The DomainCard type is not exported from '../types'. It's defined in '../data/domainCards'.
import { Character, TraitName, Weapon, Armor, SubclassFeature, Experience, AncestryFeature } from '../types';
import Card from './Card';
import ThresholdTracker from './ThresholdTracker';
import StatDisplay from './StatDisplay';
import LevelUpModal from './LevelUpModal';
import AddEquipmentModal from './AddEquipmentModal';
import AddDomainCardModal from './AddDomainCardModal';
import { DOMAIN_CARDS, DomainCard } from '../data/domainCards';
import { COMMUNITIES } from '../data/communities';
import { CLASS_FEATURES } from '../data/classFeatures';

interface CharacterSheetProps {
    character: Character;
    onUpdateCharacter: (character: Character) => void;
    onReturnToSelection: () => void;
}

const TRAIT_NAMES_ORDER: TraitName[] = ['strength', 'agility', 'finesse', 'instinct', 'knowledge', 'presence'];

const CharacterSheet: React.FC<CharacterSheetProps> = ({ character, onUpdateCharacter, onReturnToSelection }) => {
    const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false);
    const [isEquipmentModalOpen, setIsEquipmentModalOpen] = useState(false);
    const [isAddDomainCardModalOpen, setIsAddDomainCardModalOpen] = useState(false);
    const [inventory, setInventory] = useState(character.inventory);
    const [newItem, setNewItem] = useState('');
    const [newNote, setNewNote] = useState('');

    const handleStatChange = (stat: 'hp' | 'stress' | 'armor', value: number) => {
        const updatedCharacter = {
            ...character,
            [stat]: { ...character[stat], current: value },
        };
        onUpdateCharacter(updatedCharacter);
    };

    const handleHopeChange = (value: number) => {
        onUpdateCharacter({ ...character, hope: value });
    };

    const handleSimpleValueChange = (field: 'gold' | 'bolsa', change: number) => {
        const currentValue = character[field] || 0;
        const updatedValue = Math.max(0, currentValue + change);
        const updatedCharacter = { ...character, [field]: updatedValue };
        onUpdateCharacter(updatedCharacter);
    };

    const handleAddNote = () => {
        if (newNote.trim()) {
            const newNotes = [...character.notes, newNote.trim()];
            onUpdateCharacter({ ...character, notes: newNotes });
            setNewNote('');
        }
    };

    const handleRemoveNote = (index: number) => {
        const newNotes = character.notes.filter((_, i) => i !== index);
        onUpdateCharacter({ ...character, notes: newNotes });
    };
    
    const handleAddItem = () => {
        if (newItem.trim()) {
            const newInventory = [...inventory, newItem.trim()];
            setInventory(newInventory);
            onUpdateCharacter({ ...character, inventory: newInventory });
            setNewItem('');
        }
    };

    const handleRemoveItem = (index: number) => {
        const newInventory = inventory.filter((_, i) => i !== index);
        setInventory(newInventory);
        onUpdateCharacter({ ...character, inventory: newInventory });
    };
    
    const handleAddDomainCard = (cardName: string) => {
        onUpdateCharacter({ ...character, domainCards: [...character.domainCards, cardName] });
        setIsAddDomainCardModalOpen(false);
    };

    const handleLevelUp = (updatedChar: Character) => {
        onUpdateCharacter(updatedChar);
        setIsLevelUpModalOpen(false);
    };

    const handleEquipmentUpdate = (updatedChar: Character) => {
        onUpdateCharacter(updatedChar);
        setIsEquipmentModalOpen(false);
    };

    const handleExperienceUpdate = (index: number, updatedExperience: Experience) => {
        const newExperiences = [...character.experiences];
        newExperiences[index] = updatedExperience;
        onUpdateCharacter({ ...character, experiences: newExperiences });
    };
    
    const communityFeature = COMMUNITIES.find(c => c.name === character.community)?.feature;

    const classFeatures = useMemo(() => {
        return CLASS_FEATURES.filter(feature => feature.className === character.class);
    }, [character.class]);

    const characterDomainCards = useMemo(() => {
        return DOMAIN_CARDS.filter(card => character.domainCards.includes(card.name))
                           .sort((a,b) => a.level - b.level || a.name.localeCompare(b.name));
    }, [character.domainCards]);

    return (
        <div className="space-y-6">
            <header className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-5xl font-bold text-teal-400">{character.name}</h1>
                    <p className="text-slate-400 text-lg mt-1">{character.ancestry} {character.class} ({character.subclass}) - Level {character.level}</p>
                </div>
                 <div>
                    <button onClick={() => setIsLevelUpModalOpen(true)} disabled={character.level >= 10} className="bg-yellow-600 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded-lg disabled:bg-slate-600 disabled:cursor-not-allowed">
                        Level Up!
                    </button>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Column 1 */}
                <div className="flex flex-col gap-6">
                    <Card title="Combat Stats">
                        <div className="space-y-4">
                            <ThresholdTracker label="HP" current={character.hp.current} max={character.hp.max} onSet={(v) => handleStatChange('hp', v)} onReset={() => handleStatChange('hp', 0)} color="bg-red-500" />
                            <ThresholdTracker label="Stress" current={character.stress.current} max={character.stress.max} onSet={(v) => handleStatChange('stress', v)} onReset={() => handleStatChange('stress', 0)} color="bg-purple-500" />
                            <ThresholdTracker label="Armor" current={character.armor.current} max={character.armor.max} onSet={(v) => handleStatChange('armor', v)} onReset={() => handleStatChange('armor', 0)} color="bg-sky-500" />
                            <ThresholdTracker label="Hope" current={character.hope} max={6} onSet={handleHopeChange} onReset={() => handleHopeChange(0)} color="bg-yellow-400" />
                        </div>
                        <div className="grid grid-cols-2 gap-3 mt-4">
                            <StatDisplay label="Proficiency" value={character.proficiency} />
                            <StatDisplay label="Evasion" value={character.evasion} />
                        </div>
                    </Card>
                    <Card title="Characteristics & Experiences">
                        {character.ancestryFeatures && (
                            <div className="mb-4">
                                <h4 className="font-bold text-lg text-slate-200">{character.ancestry} Features</h4>
                                {character.ancestryFeatures.map(f => <div key={f.name} className="mt-1"><span className="font-semibold text-slate-300">{f.name}:</span> <span className="text-slate-400">{f.description}</span></div>)}
                            </div>
                        )}
                        {communityFeature && (
                             <div className="mb-4">
                                <h4 className="font-bold text-lg text-slate-200">{character.community} Feature</h4>
                                <div className="mt-1"><span className="font-semibold text-slate-300">{communityFeature.name}:</span> <span className="text-slate-400">{communityFeature.description}</span></div>
                            </div>
                        )}
                         {character.experiences.map((exp, i) => (
                            <EditableExperienceDisplay
                                key={i}
                                experience={exp}
                                onSave={(updatedExp) => handleExperienceUpdate(i, updatedExp)}
                            />
                         ))}
                    </Card>
                </div>

                {/* Column 2 */}
                <div className="flex flex-col gap-6">
                     <Card title="Traits">
                        <div className="grid grid-cols-2 gap-3">
                            {TRAIT_NAMES_ORDER.map(trait => <StatDisplay key={trait} label={trait} value={character.traits[trait]} />)}
                        </div>
                    </Card>
                     <Card title="Class & Subclass Features">
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-xl font-semibold text-teal-400 border-b border-slate-700 pb-1 mb-2">Class Features</h3>
                                <div className="space-y-2">
                                    {classFeatures.map(feature => (
                                        <div key={feature.name} className="p-3 bg-slate-700/50 rounded-lg border border-slate-700">
                                            <h4 className="font-bold text-slate-100">{feature.name} <span className="text-xs font-light text-slate-400">({feature.type}{feature.type === 'Hope' ? ' - 3 Hope' : ''})</span></h4>
                                            <p className="text-sm text-slate-300">{feature.description}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-teal-400 border-b border-slate-700 pb-1 mb-2">Subclass Features</h3>
                                <div className="space-y-2">
                                    {character.subclassFeatures.map(feature => <SubclassFeatureItem key={feature.name} feature={feature} />)}
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Column 3 */}
                <div className="flex flex-col gap-6">
                    <Card title="Combat & Equipment" headerContent={<button onClick={() => setIsEquipmentModalOpen(true)} className="text-sm bg-slate-600 hover:bg-slate-500 py-1 px-3 rounded-md">Change</button>}>
                         <div className="grid grid-cols-1 gap-4">
                            {character.activeArmor && <EquipmentItem item={character.activeArmor} />}
                            {character.primaryWeapon && <EquipmentItem item={character.primaryWeapon} />}
                            {character.secondaryWeapon && <EquipmentItem item={character.secondaryWeapon} />}
                         </div>
                     </Card>
                     <Card 
                        title="Domain Cards"
                        headerContent={
                            <button onClick={() => setIsAddDomainCardModalOpen(true)} className="text-sm bg-slate-600 hover:bg-slate-500 py-1 px-3 rounded-md">
                                + Add Card
                            </button>
                        }
                    >
                        <div className="space-y-3">
                            {characterDomainCards.map(card => (
                                <DomainCardDisplay key={card.name} card={card} />
                            ))}
                        </div>
                    </Card>
                     <Card title="Inventory">
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <StatDisplay label="Gold" value={character.gold} isEditable onUpdate={(c) => handleSimpleValueChange('gold', c)} />
                            <StatDisplay label="Bolsa" value={character.bolsa || 0} isEditable onUpdate={(c) => handleSimpleValueChange('bolsa', c)} />
                        </div>
                        <ul className="space-y-2 max-h-48 overflow-y-auto pr-2">
                            {inventory.map((item, i) => (
                                <li key={i} className="flex justify-between items-center bg-slate-700 p-2 rounded">
                                    <span>{item}</span>
                                    <button onClick={() => handleRemoveItem(i)} className="text-red-400 hover:text-red-300">&times;</button>
                                </li>
                            ))}
                        </ul>
                        <div className="flex gap-2 mt-4">
                            <input type="text" value={newItem} onChange={e => setNewItem(e.target.value)} placeholder="Add new item" className="flex-grow bg-slate-700 border border-slate-600 rounded-md py-2 px-3 text-slate-200" />
                            <button onClick={handleAddItem} className="bg-sky-600 hover:bg-sky-500 text-white font-bold py-2 px-4 rounded-md">Add</button>
                        </div>
                    </Card>
                    <Card title="Notes & Background">
                        {character.notes && character.notes.length > 0 ? (
                            <ul className="space-y-2 max-h-48 overflow-y-auto pr-2 mb-4">
                                {character.notes.map((note, i) => (
                                    <li key={i} className="flex justify-between items-start bg-slate-700 p-2 rounded">
                                        <p className="text-slate-300 whitespace-pre-wrap flex-grow">{note}</p>
                                        <button onClick={() => handleRemoveNote(i)} className="text-red-400 hover:text-red-300 font-bold text-xl ml-2 flex-shrink-0">&times;</button>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-slate-400 text-center mb-4">No notes yet.</p>
                        )}
                        <div className="flex flex-col gap-2 mt-2">
                            <textarea 
                                value={newNote} 
                                onChange={e => setNewNote(e.target.value)} 
                                placeholder="Add a new note..." 
                                rows={3} 
                                className="w-full bg-slate-700 border border-slate-600 rounded-md p-3 text-slate-200"
                            />
                            <button onClick={handleAddNote} className="bg-sky-600 hover:bg-sky-500 text-white font-bold py-2 px-4 rounded-md self-end">
                                Add Note
                            </button>
                        </div>
                    </Card>
                </div>
            </div>
            
            <div className="mt-8 text-center">
                <button onClick={onReturnToSelection} className="bg-slate-600 hover:bg-slate-500 text-white font-bold py-2 px-6 rounded-lg">
                    Back to Selection
                </button>
            </div>

            {isLevelUpModalOpen && <LevelUpModal character={character} onLevelUp={handleLevelUp} onClose={() => setIsLevelUpModalOpen(false)} />}
            {isEquipmentModalOpen && <AddEquipmentModal character={character} onUpdateCharacter={handleEquipmentUpdate} onClose={() => setIsEquipmentModalOpen(false)} />}
            {isAddDomainCardModalOpen && <AddDomainCardModal character={character} onCardAdd={handleAddDomainCard} onClose={() => setIsAddDomainCardModalOpen(false)} />}
        </div>
    );
};

// Helper components for display
const EquipmentItem: React.FC<{item: Weapon | Armor}> = ({ item }) => {
    const isWeapon = 'damage' in item;
    return (
        <div className="p-3 bg-slate-700/50 rounded-lg border border-slate-700">
            <h4 className="font-bold text-slate-100">{item.name} {isWeapon && <span className="text-xs font-light text-slate-400">({(item as Weapon).type})</span>}</h4>
            <div className="text-sm text-slate-300">
                {isWeapon ? (
                    <>
                        <span>Dmg: <span className="font-mono">{(item as Weapon).damage}</span></span> | <span>Trait: <span className="font-mono">{(item as Weapon).trait}</span></span> | <span>Range: <span className="font-mono">{(item as Weapon).range}</span></span>
                    </>
                ) : (
                    <>
                         <span>Score: <span className="font-mono">{(item as Armor).baseScore}</span></span> | <span>Thresholds: <span className="font-mono">{(item as Armor).baseThresholds}</span></span>
                    </>
                )}
            </div>
            {item.feature && <p className="text-xs text-slate-400 mt-1 italic">{item.feature}</p>}
        </div>
    );
};

const EditableExperienceDisplay: React.FC<{ experience: Experience; onSave: (updated: Experience) => void; }> = ({ experience, onSave }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedExp, setEditedExp] = useState(experience);

    const handleSave = () => {
        onSave(editedExp);
        setIsEditing(false);
    };
    const handleCancel = () => {
        setEditedExp(experience);
        setIsEditing(false);
    };

    if (isEditing) {
        return (
            <div className="p-3 bg-slate-900 rounded-lg border border-slate-600 mb-2 space-y-2">
                <input 
                    type="text" 
                    value={editedExp.name} 
                    onChange={(e) => setEditedExp(prev => ({...prev, name: e.target.value}))} 
                    className="w-full bg-slate-700 p-2 rounded border border-slate-600 focus:ring-teal-500 focus:border-teal-500"
                    placeholder="Experience Title"
                />
                <textarea 
                    value={editedExp.description || ''}
                    onChange={(e) => setEditedExp(prev => ({...prev, description: e.target.value}))}
                    className="w-full bg-slate-700 p-2 rounded border border-slate-600 focus:ring-teal-500 focus:border-teal-500"
                    rows={2}
                    placeholder="Description (optional)"
                />
                <div className="flex gap-2">
                    <button onClick={handleSave} className="bg-green-600 hover:bg-green-500 px-3 py-1 text-sm rounded-md font-semibold">Save</button>
                    <button onClick={handleCancel} className="bg-slate-600 hover:bg-slate-500 px-3 py-1 text-sm rounded-md font-semibold">Cancel</button>
                </div>
            </div>
        );
    }

    return (
        <div className="p-3 bg-slate-700/50 rounded-lg border border-slate-700 mb-2 group relative min-h-[68px]">
            <h4 className="font-bold text-slate-100">{experience.name} <span className="font-mono text-teal-300 text-sm">+{experience.modifier}</span></h4>
            {experience.description && <p className="text-sm text-slate-400 italic mt-1">{experience.description}</p>}
            <button 
                onClick={() => setIsEditing(true)} 
                className="absolute top-2 right-2 bg-slate-600 hover:bg-slate-500 px-2 py-1 text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity"
            >
                Edit
            </button>
        </div>
    );
};


const SubclassFeatureItem: React.FC<{feature: SubclassFeature}> = ({ feature }) => (
    <div className="p-3 bg-slate-700/50 rounded-lg border border-slate-700">
        <h4 className="font-bold text-slate-100">{feature.name} <span className="text-xs font-light text-slate-400">({feature.type})</span></h4>
        <p className="text-sm text-slate-300">{feature.description}</p>
    </div>
);

const DomainCardDisplay: React.FC<{card: DomainCard}> = ({ card }) => (
    <div className="p-3 bg-slate-700/50 rounded-lg border border-slate-700">
        <div className="flex justify-between items-start">
            <div>
                <h4 className="font-bold text-lg text-slate-100">{card.name}</h4>
                <p className="text-xs text-slate-400 font-mono">{card.domain} / {card.type} / Lvl {card.level}</p>
            </div>
            {card.recallCost !== undefined && (
                <div className="flex items-center gap-1 text-yellow-300 flex-shrink-0 ml-2">
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                    </svg>
                    <span className="font-bold text-sm">{card.recallCost}</span>
                </div>
            )}
        </div>
        <p className="text-sm text-slate-300 mt-2">{card.description}</p>
    </div>
);


export default CharacterSheet;