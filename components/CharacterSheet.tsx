import React, { useState } from 'react';
import { Character, TraitName, Weapon, Armor, SubclassFeature } from '../types';
import Card from './Card';
import StatDisplay from './StatDisplay';
import ThresholdTracker from './ThresholdTracker';
import LevelUpModal from './LevelUpModal';
import { DOMAIN_CARDS } from '../data/domainCards';
import { ANCESTRIES } from '../data/ancestries';
import { COMMUNITIES } from '../data/communities';

interface CharacterSheetProps {
  character: Character;
  onCharacterUpdate: (character: Character) => void;
  onBack: () => void;
}

const TRAIT_NAMES: TraitName[] = ['strength', 'agility', 'finesse', 'instinct', 'knowledge', 'presence'];

const CharacterSheet: React.FC<CharacterSheetProps> = ({ character, onCharacterUpdate, onBack }) => {
    const [isLevelingUp, setIsLevelingUp] = useState(false);

    const handleStatChange = (stat: 'hope' | 'gold', change: number) => {
        const newValue = Math.max(0, character[stat] + change);
        onCharacterUpdate({ ...character, [stat]: newValue });
    };

    const handleThresholdChange = (stat: 'hp' | 'stress' | 'armor', value: number) => {
        onCharacterUpdate({ ...character, [stat]: { ...character[stat], current: value } });
    };

    const handleLevelUp = (updatedCharacter: Character) => {
        onCharacterUpdate(updatedCharacter);
        setIsLevelingUp(false);
    };

    const ancestry = ANCESTRIES.find(a => a.name === character.ancestry);
    const community = COMMUNITIES.find(c => c.name === character.community);
    const domainCards = DOMAIN_CARDS.filter(dc => character.domainCards.includes(dc.name));

    const renderWeapon = (weapon: Weapon, type: 'Primary' | 'Secondary') => (
        <div className="bg-slate-700 p-3 rounded-lg">
            <h4 className="font-bold text-slate-200">{type}: {weapon.name}</h4>
            <div className="text-sm text-slate-400 grid grid-cols-2 gap-x-2">
                <span><span className="font-semibold">Trait:</span> {weapon.trait}</span>
                <span><span className="font-semibold">Damage:</span> {weapon.damage}</span>
                <span><span className="font-semibold">Range:</span> {weapon.range}</span>
                <span><span className="font-semibold">Burden:</span> {weapon.burden}</span>
            </div>
            {weapon.feature && <p className="text-xs text-teal-300 mt-1 italic">{weapon.feature}</p>}
        </div>
    );
    
    const renderArmor = (armor: Armor) => (
        <div className="bg-slate-700 p-3 rounded-lg">
            <h4 className="font-bold text-slate-200">Armor: {armor.name}</h4>
             <div className="text-sm text-slate-400 grid grid-cols-2 gap-x-2">
                <span><span className="font-semibold">Thresholds:</span> {armor.baseThresholds}</span>
                <span><span className="font-semibold">Score:</span> {armor.baseScore}</span>
            </div>
            {armor.feature && <p className="text-xs text-teal-300 mt-1 italic">{armor.feature}</p>}
        </div>
    );
    
    const renderSubclassFeature = (feature: SubclassFeature) => (
         <div key={feature.name} className="bg-slate-700 p-3 rounded-lg">
            <h4 className="font-bold text-slate-200">{feature.name} <span className="text-xs font-normal text-slate-400">({feature.type})</span></h4>
            <p className="text-sm text-slate-300">{feature.description}</p>
        </div>
    );

    return (
        <div className="space-y-6">
            {isLevelingUp && <LevelUpModal character={character} onClose={() => setIsLevelingUp(false)} onLevelUp={handleLevelUp} />}
            
            <div className="flex justify-between items-center">
                <button onClick={onBack} className="bg-slate-600 hover:bg-slate-500 text-white font-bold py-2 px-4 rounded-lg">&larr; Back to Selection</button>
                <button onClick={() => setIsLevelingUp(true)} className="bg-green-600 hover:bg-green-500 text-white font-bold py-2 px-4 rounded-lg">Level Up!</button>
            </div>

            <Card title={`${character.name} - Level ${character.level} ${character.ancestry} ${character.class} (${character.subclass})`}>
                 <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <StatDisplay label="Proficiency" value={character.proficiency} />
                    <StatDisplay label="Evasion" value={character.evasion} />
                    <StatDisplay label="Hope" value={character.hope} isEditable onUpdate={(c) => handleStatChange('hope', c)} />
                    <StatDisplay label="Gold" value={character.gold} isEditable onUpdate={(c) => handleStatChange('gold', c)} />
                 </div>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1 space-y-6">
                     <Card title="Traits">
                         <div className="grid grid-cols-2 gap-3">
                            {TRAIT_NAMES.map(trait => (
                                <div key={trait} className="bg-slate-700 p-2 rounded-md text-center">
                                    <div className="text-sm capitalize text-slate-400">{trait === 'strength' ? 'Fuerza' : trait === 'agility' ? 'Agilidad' : trait === 'finesse' ? 'Finura' : trait === 'instinct' ? 'Instinto' : trait === 'presence' ? 'Presencia' : 'Conocimiento'}</div>
                                    <div className="text-lg font-bold text-slate-100">{character.traits[trait] >= 0 ? '+' : ''}{character.traits[trait]}</div>
                                </div>
                            ))}
                         </div>
                     </Card>
                     <Card title="Combat Stats">
                        <div className="space-y-4">
                            <ThresholdTracker label="HP" current={character.hp.current} max={character.hp.max} onSet={(v) => handleThresholdChange('hp', v)} color="bg-red-500" />
                            <ThresholdTracker label="Stress" current={character.stress.current} max={character.stress.max} onSet={(v) => handleThresholdChange('stress', v)} color="bg-purple-500" />
                            <ThresholdTracker label="Armor" current={character.armor.current} max={character.armor.max} onSet={(v) => handleThresholdChange('armor', v)} color="bg-sky-500" />
                        </div>
                     </Card>
                     <Card title="Experiences">
                        <div className="space-y-3">
                        {character.experiences.map((exp, i) => (
                             <div key={i} className="bg-slate-700 p-3 rounded-lg">
                                <h4 className="font-bold text-slate-200">{exp.name} (+{exp.modifier})</h4>
                                {exp.description && <p className="text-sm text-slate-300">{exp.description}</p>}
                            </div>
                        ))}
                        </div>
                     </Card>
                </div>

                <div className="lg:col-span-2 space-y-6">
                    <Card title="Equipment">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {character.primaryWeapon && renderWeapon(character.primaryWeapon, 'Primary')}
                            {character.secondaryWeapon && renderWeapon(character.secondaryWeapon, 'Secondary')}
                            {character.activeArmor && renderArmor(character.activeArmor)}
                        </div>
                        <h4 className="font-bold text-slate-200 mt-6 mb-2">Inventory</h4>
                        <ul className="list-disc list-inside text-slate-300 bg-slate-700 p-3 rounded-lg">
                           {character.inventory.map((item, i) => <li key={i}>{item}</li>)}
                        </ul>
                    </Card>

                    <Card title="Abilities & Features">
                        <h4 className="font-bold text-slate-200 mb-2">Ancestry Features ({character.ancestry})</h4>
                        <div className="space-y-2 mb-4">
                            {ancestry?.features.map(f => (
                                <div key={f.name} className="bg-slate-700 p-2 rounded-lg text-sm"><span className="font-semibold text-slate-300">{f.name}:</span> <span className="text-slate-400">{f.description}</span></div>
                            ))}
                        </div>
                         <h4 className="font-bold text-slate-200 mb-2">Community Feature ({character.community})</h4>
                        <div className="space-y-2 mb-4">
                            {community && (
                                <div className="bg-slate-700 p-2 rounded-lg text-sm"><span className="font-semibold text-slate-300">{community.feature.name}:</span> <span className="text-slate-400">{community.feature.description}</span></div>
                            )}
                        </div>
                         <h4 className="font-bold text-slate-200 mb-2">Subclass Features</h4>
                        <div className="space-y-3 mb-4">
                           {character.subclassFeatures.map(renderSubclassFeature)}
                        </div>
                        <h4 className="font-bold text-slate-200 mb-2">Domain Cards</h4>
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                           {domainCards.map(card => (
                               <div key={card.name} className="bg-slate-700 p-3 rounded-lg">
                                    <h5 className="font-bold text-slate-200">{card.name} <span className="text-xs font-normal text-slate-400">({card.domain} Lvl {card.level})</span></h5>
                                    <p className="text-sm text-slate-300">{card.description}</p>
                               </div>
                           ))}
                        </div>
                    </Card>
                     <Card title="Notes">
                        <p className="text-slate-300 whitespace-pre-wrap">{character.notes || 'No notes yet.'}</p>
                     </Card>
                </div>
            </div>
        </div>
    );
};

export default CharacterSheet;
