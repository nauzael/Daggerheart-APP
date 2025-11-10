import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Character, TraitName, Weapon, Armor, SubclassFeature, Experience, AncestryFeature, BeastForm, MartialStance } from '../types';
import Card from './Card';
import ThresholdTracker from './ThresholdTracker';
import StatDisplay from './StatDisplay';
import LevelUpModal from './LevelUpModal';
import AddEquipmentModal from './AddEquipmentModal';
import AddDomainCardModal from './AddDomainCardModal';
import RestModal from './RestModal';
import BeastformDisplay from './BeastformDisplay';
import WolfFormDisplay from './WolfFormDisplay';
import ProfileImageEditorModal from './ProfileImageEditorModal';
import { DOMAIN_CARDS, DomainCard } from '../data/domainCards';
import { COMMUNITIES } from '../data/communities';
import { CLASS_FEATURES } from '../data/classFeatures';
import { ALL_BEASTFORMS } from '../data/beastforms';
import { WOLF_FORM_DATA } from '../data/wolfForm';
import StanceSelectorModal from './StanceSelectorModal';
import { MARTIAL_STANCES } from '../data/martialStances';
import { DEFAULT_PROFILE_IMAGE } from '../data/defaultProfileImage';

interface CharacterSheetProps {
    character: Character;
    onUpdateCharacter: (character: Character) => void;
    onReturnToSelection: () => void;
}

const TRAIT_NAMES_ORDER: TraitName[] = ['strength', 'agility', 'finesse', 'instinct', 'knowledge', 'presence'];
const MAX_LOADOUT = 5;

const getSpellcastTrait = (char: Character): TraitName => {
    switch(char.class) {
        case 'Bard':
        case 'Seraph':
        case 'Warlock':
            return 'presence';
        case 'Druid':
        case 'Brawler': // Martial Artist uses Instinct
            return 'instinct';
        case 'Sorcerer':
        case 'Wizard':
            return 'knowledge';
        default:
            return 'knowledge'; // A sensible default
    }
}


const EditableField: React.FC<{
    label: string;
    value: string;
    onSave: (newValue: string) => void;
    inputClass?: string;
}> = ({ label, value, onSave, inputClass }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [text, setText] = useState(value);

    const handleSave = () => {
        onSave(text);
        setIsEditing(false);
    };

    if (isEditing) {
        return (
            <div className="flex items-center gap-2">
                <input
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    onBlur={handleSave}
                    onKeyDown={(e) => e.key === 'Enter' && handleSave()}
                    className={`bg-slate-900 p-1 rounded border border-slate-600 text-slate-100 focus:ring-teal-500 focus:border-teal-500 ${inputClass}`}
                    autoFocus
                />
            </div>
        );
    }

    return (
        <div onClick={() => setIsEditing(true)} className="group cursor-pointer flex items-center gap-2">
            <span className={inputClass}>{value || `(${label})`}</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity" viewBox="0 0 20 20" fill="currentColor">
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>
        </div>
    );
};

const FeatureDisplayItem: React.FC<{ 
    name: string; 
    type: string; 
    description: string;
    character: Character;
    onUsageChange: (name: string, value: boolean | number) => void;
}> = ({ name, type, description, character, onUsageChange }) => {
    const getTagClasses = (featureType: string) => {
        switch (featureType.toLowerCase()) {
            case 'standard': return 'bg-sky-800 text-sky-200 border-sky-600';
            case 'hope': return 'bg-yellow-800 text-yellow-200 border-yellow-600';
            case 'foundation': return 'bg-green-800 text-green-200 border-green-600';
            case 'specialization': return 'bg-indigo-800 text-indigo-200 border-indigo-600';
            case 'mastery': return 'bg-purple-800 text-purple-200 border-purple-600';
            case 'beastform': return 'bg-orange-800 text-orange-200 border-orange-600';
            default: return 'bg-slate-700 text-slate-300 border-slate-600';
        }
    };
    
    const usageType = useMemo(() => {
        const descLower = description.toLowerCase();
        if (descLower.includes('once per long rest')) return 'once-per-long-rest';
        if (descLower.includes('once per rest')) return 'once-per-rest';
        return null;
    }, [description]);
    
    const isUsed = !!character.abilityUsage?.[name];

    // Special handling for multi-use abilities
    if (name === 'Gifted Performer') {
        const songs = ['Relaxing Song', 'Epic Song', 'Heartbreaking Song'];
        return (
             <div className="p-3 bg-slate-700/50 rounded-lg border border-slate-700 space-y-1.5">
                <div className="flex justify-between items-start gap-2">
                    <h4 className="font-bold text-slate-100 text-md leading-tight">{name}</h4>
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border whitespace-nowrap ${getTagClasses(type)}`}>{type}</span>
                </div>
                <p className="text-sm text-slate-300">{description}</p>
                <div className="mt-2 pt-2 border-t border-slate-600/50 space-y-1">
                    <h5 className="text-sm font-semibold text-slate-300">Song Uses (Once each per long rest)</h5>
                    {songs.map(song => {
                        const songKey = `${name}: ${song}`;
                        const isSongUsed = !!character.abilityUsage?.[songKey];
                        return (
                            <label key={songKey} className="flex items-center gap-2 cursor-pointer text-sm text-slate-400">
                                <input
                                    type="checkbox"
                                    checked={isSongUsed}
                                    onChange={(e) => onUsageChange(songKey, e.target.checked)}
                                    className="h-4 w-4 rounded bg-slate-800 border-slate-600 text-teal-500 focus:ring-teal-500"
                                />
                                {song}
                            </label>
                        )
                    })}
                </div>
            </div>
        )
    }

    return (
        <div className="p-3 bg-slate-700/50 rounded-lg border border-slate-700 space-y-1.5">
            <div className="flex justify-between items-start gap-2">
                <h4 className="font-bold text-slate-100 text-md leading-tight">{name}</h4>
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border whitespace-nowrap ${getTagClasses(type)}`}>
                    {type}
                </span>
            </div>
            <p className="text-sm text-slate-300">{description}</p>
            {type === 'Hope' && <p className="text-xs text-yellow-400 font-semibold">Cost: 3 Hope</p>}
            {usageType && (
                 <div className="mt-2 pt-2 border-t border-slate-600/50">
                    <label className="flex items-center gap-2 cursor-pointer text-sm text-slate-400">
                        <input
                            type="checkbox"
                            checked={isUsed}
                            onChange={(e) => onUsageChange(name, e.target.checked)}
                            className="h-4 w-4 rounded bg-slate-800 border-slate-600 text-teal-500 focus:ring-teal-500"
                        />
                        {usageType === 'once-per-rest' ? 'Used this Rest' : 'Used this Long Rest'}
                    </label>
                </div>
            )}
        </div>
    );
};

const DomainCardDisplay: React.FC<{
    card: DomainCard; 
    button?: React.ReactNode;
    character: Character;
    onUsageChange: (name: string, value: boolean | number) => void;
}> = ({ card, button, character, onUsageChange }) => {
    
    const usageInfo = useMemo(() => {
        const descLower = card.description.toLowerCase();
        if (descLower.includes('once per long rest')) return { type: 'once-per-long-rest' };
        if (descLower.includes('once per rest')) return { type: 'once-per-rest' };

        const tokenMatch = descLower.match(/place a number of tokens equal to your (\w+)/);
        const spellcastTraitName = getSpellcastTrait(character);

        if (tokenMatch && tokenMatch[1]) {
            const attribute = tokenMatch[1] as TraitName | 'proficiency';
            return { type: 'tokens', attribute, maxValue: character.traits[attribute] || character.proficiency };
        }
        
        // Special cases for tokens
        const specialTokenCases: { [key: string]: { attribute: TraitName | 'proficiency', maxValue: number } } = {
            'Unleash Chaos': { attribute: spellcastTraitName, maxValue: character.traits[spellcastTraitName] },
            'Inspirational Words': { attribute: 'presence', maxValue: character.traits.presence },
            'Thorn Skin': { attribute: spellcastTraitName, maxValue: character.traits[spellcastTraitName] },
            'Restoration': { attribute: spellcastTraitName, maxValue: character.traits[spellcastTraitName] },
        };
        if (specialTokenCases[card.name]) return { type: 'tokens', ...specialTokenCases[card.name] };

        return null;
    }, [card.description, card.name, character]);

    const usageValue = character.abilityUsage?.[card.name];

    const renderUsageTracker = () => {
        if (!usageInfo) return null;
        
        if (usageInfo.type === 'once-per-rest' || usageInfo.type === 'once-per-long-rest') {
            const isUsed = !!usageValue;
            return (
                <label className="flex items-center gap-2 cursor-pointer text-sm text-slate-400">
                    <input
                        type="checkbox"
                        checked={isUsed}
                        onChange={(e) => onUsageChange(card.name, e.target.checked)}
                        className="h-4 w-4 rounded bg-slate-800 border-slate-600 text-teal-500 focus:ring-teal-500"
                    />
                    {usageInfo.type === 'once-per-rest' ? 'Used this Rest' : 'Used this Long Rest'}
                </label>
            );
        }

        if (usageInfo.type === 'tokens') {
            const maxTokens = usageInfo.maxValue;

            // Per user request, all token trackers start at 0 and reset to 0.
            const defaultValue = 0;
            const currentTokens = typeof usageValue === 'number' ? usageValue : defaultValue;
            const resetValue = defaultValue;

            return (
                <ThresholdTracker
                    label="Tokens"
                    current={currentTokens}
                    max={maxTokens}
                    onSet={(value) => onUsageChange(card.name, value)}
                    onReset={() => onUsageChange(card.name, resetValue)}
                    color="bg-cyan-500"
                    size="small"
                />
            )
        }
        return null;
    }
    
    const isGrimoire = card.type === 'Grimoire';

    const renderGrimoireDescription = () => {
        const spells = card.description.split('\n').filter(s => s.trim() !== '');
        return (
            <div className="mt-2 space-y-3">
                {spells.map((spell, index) => {
                    const parts = spell.split(':');
                    const spellName = parts[0];
                    const spellDescription = parts.slice(1).join(':').trim();
                    return (
                        <div key={index} className="p-2 bg-slate-800/50 rounded-md border border-slate-600/50">
                            <h5 className="font-semibold text-slate-200">{spellName}</h5>
                            <p className="text-sm text-slate-400">{spellDescription}</p>
                        </div>
                    );
                })}
            </div>
        );
    };

    return (
        <div className="p-3 bg-slate-700/50 rounded-lg border border-slate-700">
            <div className="flex justify-between items-start gap-2">
                <div className="flex-grow">
                    <h4 className="font-bold text-lg text-slate-100">{card.name}</h4>
                    <p className="text-xs text-slate-400 font-mono">{card.domain} / {card.type} / Lvl {card.level}</p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                    {card.recallCost !== undefined && (
                        <div className="flex items-center gap-1 text-yellow-300" title="Recall Cost">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                            </svg>
                            <span className="font-bold text-sm">{card.recallCost}</span>
                        </div>
                    )}
                    {button}
                </div>
            </div>
            {isGrimoire ? renderGrimoireDescription() : <p className="text-sm text-slate-300 mt-2">{card.description}</p>}
            {usageInfo && (
                <div className="mt-2 pt-2 border-t border-slate-600/50">
                    {renderUsageTracker()}
                </div>
            )}
        </div>
    );
};


const CharacterSheet: React.FC<CharacterSheetProps> = ({ character, onUpdateCharacter, onReturnToSelection }) => {
    const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false);
    const [isEquipmentModalOpen, setIsEquipmentModalOpen] = useState(false);
    const [isAddDomainCardModalOpen, setIsAddDomainCardModalOpen] = useState(false);
    const [isRestModalOpen, setIsRestModalOpen] = useState(false);
    const [isImageEditorOpen, setIsImageEditorOpen] = useState(false);
    const [isStanceModalOpen, setIsStanceModalOpen] = useState(false);
    const [inventory, setInventory] = useState(character.inventory);
    const [newItem, setNewItem] = useState('');
    const [newNote, setNewNote] = useState('');
    
    const derivedStats = useMemo(() => {
        const activeBeastForm = character.activeBeastFormName ? ALL_BEASTFORMS.find(b => b.name === character.activeBeastFormName) : undefined;

        // Start with base values
        let evasion = character.evasion + (activeBeastForm?.evasionBonus || 0);
        const traits: Character['traits'] = { ...character.traits };
        
        if (activeBeastForm?.traitBonus) {
            traits[activeBeastForm.traitBonus.trait] = (traits[activeBeastForm.traitBonus.trait] || 0) + activeBeastForm.traitBonus.value;
        }

        if (character.activeBeastformTraitBonus) {
            traits[character.activeBeastformTraitBonus.trait] = (traits[character.activeBeastformTraitBonus.trait] || 0) + character.activeBeastformTraitBonus.value;
        }
        
        // Brawler Martial Artist Stance Bonus
        if (character.class === 'Brawler' && character.subclass === 'Martial Artist' && character.activeMartialStance) {
            const stance = character.activeMartialStance;
            if (stance.name === 'Flowing River Stance') evasion += 1;
        }


        let armorScore: number;
        let majorThreshold: number;
        let severeThreshold: number;

        const parseModifier = (part: string) => {
            // Tries to match "Label: +N to Stat Name"
            const matchWithLabel = part.match(/^([^:]+):\s*([+-]\d+)\s+to\s+(.+)/i);
            if (matchWithLabel) {
                return { value: parseInt(matchWithLabel[2], 10), stat: matchWithLabel[3].toLowerCase().replace(/\./g, '').trim() };
            }

            // Tries to match "+N to Stat Name" (no label), fixing a bug with the previous '\b' anchor
            const matchWithoutLabel = part.match(/^\s*([+-]\d+)\s+to\s+(.+)/i);
            if (matchWithoutLabel) {
                return { value: parseInt(matchWithoutLabel[1], 10), stat: matchWithoutLabel[2].toLowerCase().replace(/\./g, '').trim() };
            }
            return null;
        };

        // Apply trait modifiers first as they might be used in other calcs (e.g. Bare Bones)
        const allItemsAndFeaturesForTraits = [
            ...(character.primaryWeapon ? [character.primaryWeapon] : []),
            ...(character.secondaryWeapon ? [character.secondaryWeapon] : []),
            ...(character.activeArmor ? [character.activeArmor] : []),
        ];

        for (const item of allItemsAndFeaturesForTraits) {
            const featureString = (item as any).feature || '';
            const featureParts = featureString.split(';').map((s: string) => s.trim());
            for (const part of featureParts) {
                const parsed = parseModifier(part);
                if (parsed) {
                    TRAIT_NAMES_ORDER.forEach(trait => {
                        if (parsed.stat.includes(trait) || parsed.stat.includes('all character traits')) {
                            traits[trait] = (traits[trait] || 0) + parsed.value;
                        }
                    });
                }
            }
        }
        
        // Determine base armor and thresholds
        const isEffectivelyUnarmored = character.isWolfFormActive || !character.activeArmor;
        const hasBareBones = character.domainCards.includes("Bare Bones");

        if (hasBareBones && isEffectivelyUnarmored) {
            armorScore = 3 + traits.strength;
            const tier = character.level >= 8 ? 4 : character.level >= 5 ? 3 : character.level >= 2 ? 2 : 1;
            const thresholds = { 1: [9, 19], 2: [11, 24], 3: [13, 31], 4: [15, 38] }[tier];
            [majorThreshold, severeThreshold] = thresholds!;
        } else if (character.activeArmor && !character.isWolfFormActive) {
            armorScore = character.activeArmor.baseScore;
            const [baseMajor, baseSevere] = character.activeArmor.baseThresholds.split('/').map(Number);
            majorThreshold = baseMajor + character.level;
            severeThreshold = baseSevere + character.level;
        } else { // Unarmored (or Wolf Form without Bare Bones)
            armorScore = 0;
            majorThreshold = character.level;
            severeThreshold = character.level * 2;
        }
        
        // Brawler Martial Artist Stance Bonus for Armor
        if (character.class === 'Brawler' && character.subclass === 'Martial Artist' && character.activeMartialStance?.name === 'Stone Mountain Stance') {
            armorScore += 1;
        }

        const allItemsAndFeatures = [
            ...character.ancestryFeatures,
            ...character.subclassFeatures.map(f => ({ ...f, type: f.type as string })),
            ...(character.primaryWeapon ? [character.primaryWeapon] : []),
            ...(character.secondaryWeapon ? [character.secondaryWeapon] : []),
            ...(character.activeArmor && !character.isWolfFormActive ? [character.activeArmor] : []),
            ...character.domainCards.map(name => DOMAIN_CARDS.find(c => c.name === name)).filter((c): c is DomainCard => !!c),
            ...(activeBeastForm ? activeBeastForm.features.map(f => ({ name: f.name, description: f.description, type: 'Beastform' })) : []),
        ];

        // Apply modifiers from all features
        for (const item of allItemsAndFeatures) {
            // Use a type guard to safely access either the 'feature' or 'description' property.
            const featureString = 'description' in item ? item.description : (item.feature || '');

            // Generic parser for simple mods
            const featureParts = featureString.split(';').map((s: string) => s.trim());
            for (const part of featureParts) {
                const parsed = parseModifier(part);
                 if (parsed) {
                    if (parsed.stat.includes('evasion')) evasion += parsed.value;
                    if (parsed.stat.includes('armor score')) armorScore += parsed.value;
                }
            }
            
            // Special/Complex cases
            if ('name' in item && item.name === 'Nimble') evasion += 1;
            if ('name' in item && item.name === 'Conjure Shield' && character.hope >= 2) evasion += character.proficiency;
            if ('name' in item && item.name === 'Unwavering') { majorThreshold += 1; severeThreshold += 1; }
            if ('name' in item && item.name === 'Unrelenting') { majorThreshold += 2; severeThreshold += 2; }
            if ('name' in item && item.name === 'Undaunted') { majorThreshold += 3; severeThreshold += 3; }
            if ('name' in item && item.name === 'Ascendant') severeThreshold += 4;
            if ('name' in item && item.name === 'Bravesword' && 'feature' in item && item.feature?.includes('+3 to Severe damage threshold')) severeThreshold += 3;
            if ('name' in item && item.name === 'Armorer') armorScore += 1;
        }

        return {
            evasion: evasion,
            traits: traits,
            armorScore: Math.min(armorScore, 12),
            damageThresholds: { major: majorThreshold, severe: severeThreshold },
            maxHP: character.hp.max,
            maxStress: character.stress.max,
        };
    }, [character]);

    useEffect(() => {
        let updateNeeded = false;
        const changes: Partial<Character> = {};
    
        // Armor update logic
        if (character.armor.max !== derivedStats.armorScore || (derivedStats.armorScore === 0 && character.armor.current !== 0)) {
            const currentRatio = (character.armor.max > 0) ? (character.armor.current / character.armor.max) : 1;
            let newCurrent = Math.round(derivedStats.armorScore * currentRatio);
            if(derivedStats.armorScore === 0) newCurrent = 0;
            
            if(character.armor.max !== derivedStats.armorScore || character.armor.current !== newCurrent) {
                changes.armor = { max: derivedStats.armorScore, current: newCurrent };
                updateNeeded = true;
            }
        }
    
        // Capping for HP/Stress on revert
        if (character.hp.current > derivedStats.maxHP) {
            changes.hp = { ...character.hp, current: derivedStats.maxHP };
            updateNeeded = true;
        }
        if (character.stress.current > derivedStats.maxStress) {
            changes.stress = { ...character.stress, current: derivedStats.maxStress };
            updateNeeded = true;
        }
    
        if(updateNeeded) {
            onUpdateCharacter({ ...character, ...changes });
        }
    }, [derivedStats.armorScore, derivedStats.maxHP, derivedStats.maxStress, character, onUpdateCharacter]);


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

    const handleFavorChange = (change: number) => {
        const currentValue = character.favor || 0;
        const updatedValue = Math.max(0, currentValue + change);
        onUpdateCharacter({ ...character, favor: updatedValue });
    };
    
    const handleAbilityUsageChange = (name: string, value: boolean | number) => {
        const newUsage = { ...character.abilityUsage, [name]: value };
        onUpdateCharacter({ ...character, abilityUsage: newUsage });
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
    
    const handleAddCardToVault = (cardName: string) => {
        const newVault = [...character.vault, cardName];
        onUpdateCharacter({ ...character, vault: newVault });
        setIsAddDomainCardModalOpen(false);
    };

    const handleLevelUp = (updatedChar: Character) => {
        onUpdateCharacter(updatedChar);
        setIsLevelUpModalOpen(false);
    };

    const handleProfileImageUpdate = (imageData: string) => {
        onUpdateCharacter({ ...character, profileImage: imageData });
        setIsImageEditorOpen(false);
    };
    
    const loadoutCards = useMemo(() => {
        return DOMAIN_CARDS.filter(card => character.domainCards.includes(card.name))
                           .sort((a,b) => a.level - b.level || a.name.localeCompare(b.name));
    }, [character.domainCards]);

    const classFeatures = useMemo(() => {
        return CLASS_FEATURES.filter(feature => feature.className === character.class);
    }, [character.class]);
    
    const handleConfirmRest = (restData: { type: 'short' | 'long'; moves: string[]; newFocus?: number }) => {
        const { type, moves, newFocus } = restData;
        
        const tempChar: Character = JSON.parse(JSON.stringify(character));

        if (type === 'long') {
            moves.forEach(moveId => {
                switch (moveId) {
                    case 'tend_all_wounds':
                        tempChar.hp.current = derivedStats.maxHP;
                        break;
                    case 'clear_all_stress':
                        tempChar.stress.current = derivedStats.maxStress;
                        break;
                    case 'repair_all_armor':
                        tempChar.armor.current = derivedStats.armorScore;
                        break;
                    case 'prepare':
                        tempChar.hope = Math.min(6, tempChar.hope + 1);
                        break;
                    case 'tithe_to_patron': {
                        const favorGained = Math.floor(Math.random() * 4) + 1;
                        tempChar.favor = (tempChar.favor || 0) + favorGained;
                        setTimeout(() => alert(`You paid your tithe and gained ${favorGained} Favor!`), 100);
                        break;
                    }
                    case 'work_on_project':
                        break;
                }
            });
    
            if (moves.includes('work_on_project')) {
                 setTimeout(() => alert("Remember to describe your project work to your GM and manage its countdown."), 100);
            }
            const prepareCount = moves.filter(m => m === 'prepare').length;
            if (prepareCount > 0) {
                 setTimeout(() => alert(`You prepared for the day and gained ${prepareCount} Hope! (If you prepared with party members, you each gain 2 per 'Prepare' action instead).`), 100);
            }
        } else { // Short rest
            moves.forEach(moveId => {
                switch (moveId) {
                    case 'tend_wounds':
                        tempChar.hp.current = Math.min(derivedStats.maxHP, tempChar.hp.current + 2);
                        break;
                    case 'take_breather':
                        tempChar.stress.current = Math.min(derivedStats.maxStress, tempChar.stress.current + 2);
                        break;
                    case 'repair_armor':
                        tempChar.armor.current = Math.min(derivedStats.armorScore, tempChar.armor.current + 2);
                        break;
                    case 'rummage_pack':
                        tempChar.hope = Math.max(0, tempChar.hope - 1);
                        setTimeout(() => alert("You spent 1 Hope and found a useful mundane item! Describe it to your GM."), 100);
                        break;
                }
            });
        }
        
        // Brawler (Martial Artist) Focus Reset on ANY rest
        if (tempChar.class === 'Brawler' && tempChar.subclass === 'Martial Artist' && newFocus !== undefined) {
            const maxFocus = newFocus;
            tempChar.focus = { current: maxFocus, max: maxFocus };
            tempChar.activeMartialStance = undefined; // Stance deactivates on rest
        }

        // Reset ability usages
        const newAbilityUsage = { ...tempChar.abilityUsage };
        const allTrackableAbilities = [
            ...classFeatures,
            ...character.subclassFeatures,
            ...loadoutCards,
        ];

        allTrackableAbilities.forEach(ability => {
            const desc = 'description' in ability ? ability.description.toLowerCase() : '';
            const isOncePerRest = desc.includes('once per rest');
            const isOncePerLongRest = desc.includes('once per long rest');
            
            const resetAbility = (name: string) => {
                delete newAbilityUsage[name];
            };
            
            if (type === 'long') {
                if (isOncePerRest || isOncePerLongRest) resetAbility(ability.name);
                
                // Special case for multi-use abilities
                if (ability.name === 'Gifted Performer') {
                    resetAbility(`${ability.name}: Relaxing Song`);
                    resetAbility(`${ability.name}: Epic Song`);
                    resetAbility(`${ability.name}: Heartbreaking Song`);
                }
                
                // Handle token resets for long rests
                const spellcastTraitName = getSpellcastTrait(tempChar);
                const tokenResets: { [key: string]: number } = {
                    'Inspirational Words': tempChar.traits.presence,
                    'Strategic Approach': tempChar.traits.knowledge,
                    'Restoration': tempChar.traits[spellcastTraitName],
                };
                if (tokenResets[ability.name] !== undefined) {
                    newAbilityUsage[ability.name] = tokenResets[ability.name];
                }

            } else if (type === 'short') {
                if (isOncePerRest) resetAbility(ability.name);
            }
        });
        
        tempChar.abilityUsage = newAbilityUsage;
    
        onUpdateCharacter(tempChar);
        setIsRestModalOpen(false);
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
    
    const handleSendToVault = (cardName: string) => {
        const newDomainCards = character.domainCards.filter(c => c !== cardName);
        const newVault = [...character.vault, cardName];
        onUpdateCharacter({ ...character, domainCards: newDomainCards, vault: newVault });
    };
    
    const handleRecallFromVault = (cardName: string) => {
        const cardToRecall = DOMAIN_CARDS.find(c => c.name === cardName);
        if (!cardToRecall) return;

        const recallCost = cardToRecall.recallCost ?? 0;
        if (character.hope < recallCost || character.domainCards.length >= MAX_LOADOUT) {
            alert("Cannot recall card. Check Hope or loadout limit.");
            return;
        }

        const newVault = character.vault.filter(c => c !== cardName);
        const newDomainCards = [...character.domainCards, cardName];
        const newHope = character.hope - recallCost;

        onUpdateCharacter({ ...character, vault: newVault, domainCards: newDomainCards, hope: newHope });
    };

    const handleShiftStance = (stance: MartialStance) => {
        if (character.focus && character.focus.current > 0) {
            onUpdateCharacter({
                ...character,
                focus: { ...character.focus, current: character.focus.current - 1 },
                activeMartialStance: stance
            });
        } else {
            alert("Not enough Focus to shift stance.");
        }
    };

    const handleDeactivateStance = () => {
        onUpdateCharacter({ ...character, activeMartialStance: undefined });
    };

    const characterTier = useMemo(() => {
        const level = character.level;
        if (level >= 8) return 4;
        if (level >= 5) return 3;
        if (level >= 2) return 2;
        return 1;
    }, [character.level]);

    const totalStancesAllowed = useMemo(() => {
        let allowed = 0;
        if (character.level >= 1) allowed = 2;
        if (character.level >= 2) allowed = 4;
        if (character.level >= 5) allowed = 6;
        if (character.level >= 8) allowed = 8;
        return allowed;
    }, [character.level]);

    const stancesToLearnCount = useMemo(() => {
        if (character.class !== 'Brawler' || character.subclass !== 'Martial Artist') return 0;
        const currentStances = character.martialStances?.length || 0;
        return Math.max(0, totalStancesAllowed - currentStances);
    }, [character, totalStancesAllowed]);

    const availableStancesForLearning = useMemo(() => {
        if (!stancesToLearnCount) return [];
        const knownStances = new Set((character.martialStances || []).map(s => s.name));
        return MARTIAL_STANCES.filter(s => s.tier <= characterTier && !knownStances.has(s.name));
    }, [stancesToLearnCount, characterTier, character.martialStances]);

    const handleLearnStances = (newStanceNames: string[]) => {
        const newStances = MARTIAL_STANCES.filter(s => newStanceNames.includes(s.name));
        onUpdateCharacter({
            ...character,
            martialStances: [...(character.martialStances || []), ...newStances]
        });
        setIsStanceModalOpen(false);
    };


    const communityFeature = COMMUNITIES.find(c => c.name === character.community)?.feature;

    const vaultCards = useMemo(() => {
        return DOMAIN_CARDS.filter(card => character.vault.includes(card.name))
                           .sort((a,b) => a.level - b.level || a.name.localeCompare(b.name));
    }, [character.vault]);

    return (
        <div className="space-y-6">
            {isImageEditorOpen && (
                <ProfileImageEditorModal
                    currentImage={character.profileImage}
                    onClose={() => setIsImageEditorOpen(false)}
                    onSave={handleProfileImageUpdate}
                />
            )}
            {isStanceModalOpen && (
                <StanceSelectorModal
                    availableStances={availableStancesForLearning}
                    onClose={() => setIsStanceModalOpen(false)}
                    onConfirm={handleLearnStances}
                    title="Learn New Stances"
                    selectionLimit={stancesToLearnCount}
                />
            )}
            <header className="flex flex-col sm:flex-row justify-between items-center gap-6">
                <div className="flex items-center gap-4 sm:gap-6">
                    <div 
                        className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-slate-700 border-2 border-slate-600 group flex-shrink-0 cursor-pointer"
                        onClick={() => setIsImageEditorOpen(true)}
                        role="button"
                        aria-label="Change profile image"
                    >
                        <img 
                            src={character.profileImage || DEFAULT_PROFILE_IMAGE} 
                            alt={character.name} 
                            className="w-full h-full rounded-full object-cover" 
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 rounded-full flex items-center justify-center transition-opacity">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                            </svg>
                        </div>
                    </div>
                    <div className="text-center sm:text-left">
                        <h1 className="text-4xl sm:text-5xl font-bold text-teal-400">{character.name}</h1>
                        <p className="text-slate-400 text-lg mt-1">{character.ancestry} {character.class} ({character.subclass}) - Level {character.level}</p>
                    </div>
                </div>
                 <div className="flex gap-2 justify-center sm:justify-end">
                    <button onClick={() => setIsRestModalOpen(true)} className="bg-green-600 hover:bg-green-500 text-white font-bold py-2 px-4 rounded-lg">
                        Rest
                    </button>
                    <button onClick={() => setIsLevelUpModalOpen(true)} disabled={character.level >= 10} className="bg-yellow-600 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded-lg disabled:bg-slate-600 disabled:cursor-not-allowed">
                        Level Up!
                    </button>
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* --- Left Column (33%) --- */}
                <div className="space-y-6 md:col-span-1">
                    <Card title="Combat Stats">
                        <div className="space-y-4">
                            <ThresholdTracker label="HP" current={character.hp.current} max={derivedStats.maxHP} onSet={(v) => handleStatChange('hp', v)} onReset={() => handleStatChange('hp', derivedStats.maxHP)} color="bg-red-500" showAsMarked />
                            <ThresholdTracker label="Stress" current={character.stress.current} max={derivedStats.maxStress} onSet={(v) => handleStatChange('stress', v)} onReset={() => handleStatChange('stress', derivedStats.maxStress)} color="bg-purple-500" showAsMarked />
                            <ThresholdTracker label="Armor" current={character.armor.current} max={derivedStats.armorScore} onSet={(v) => handleStatChange('armor', v)} onReset={() => handleStatChange('armor', derivedStats.armorScore)} color="bg-sky-500" showAsMarked />
                            <ThresholdTracker label="Hope" current={character.hope} max={6} onSet={handleHopeChange} onReset={() => handleHopeChange(0)} color="bg-yellow-400" />
                        </div>
                        <div className="mt-4 pt-4 border-t border-slate-700">
                            <h4 className="font-semibold text-slate-300 mb-2 text-center">Damage Thresholds</h4>
                            <div className="grid grid-cols-3 gap-2 text-center">
                                <div className="bg-sky-800/50 border border-sky-700 p-2 rounded-lg">
                                    <div className="text-xs text-sky-300 font-bold uppercase tracking-wider">Minor</div>
                                    <div className="text-lg sm:text-xl font-bold text-slate-100 font-mono">
                                        1-{derivedStats.damageThresholds.major - 1}
                                    </div>
                                </div>
                                <div className="bg-amber-800/50 border border-amber-700 p-2 rounded-lg">
                                    <div className="text-xs text-amber-300 font-bold uppercase tracking-wider">Major</div>
                                    <div className="text-lg sm:text-xl font-bold text-slate-100 font-mono">
                                        {derivedStats.damageThresholds.major}
                                    </div>
                                </div>
                                <div className="bg-red-800/50 border border-red-700 p-2 rounded-lg">
                                    <div className="text-xs text-red-300 font-bold uppercase tracking-wider">Severe</div>
                                    <div className="text-lg sm:text-xl font-bold text-slate-100 font-mono">
                                        {derivedStats.damageThresholds.severe}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3 mt-4">
                            <StatDisplay label="Proficiency" value={character.proficiency} />
                            <StatDisplay label="Evasion" value={derivedStats.evasion} />
                        </div>
                    </Card>
                    <Card title="Traits">
                        <div className="grid grid-cols-2 gap-3">
                            {TRAIT_NAMES_ORDER.map(trait => <StatDisplay key={trait} label={trait} value={derivedStats.traits[trait]} />)}
                        </div>
                    </Card>
                    {character.class === 'Warlock' && (
                        <Card title="Patron & Favor">
                            <div className="space-y-4">
                                <div>
                                    <EditableField
                                        label="Patron Name"
                                        value={character.patronName || ''}
                                        onSave={(newName) => onUpdateCharacter({ ...character, patronName: newName })}
                                        inputClass="text-lg font-bold text-teal-300"
                                    />
                                </div>

                                <div className="space-y-3">
                                    <h4 className="font-semibold text-slate-300 border-b border-slate-700 pb-1">Boons</h4>
                                    {character.boons?.map((boon, index) => {
                                        const characterTier = character.level >= 8 ? 4 : character.level >= 5 ? 3 : character.level >= 2 ? 2 : 1;
                                        const boonValue = 3 + (characterTier - 1);

                                        return (
                                            <div key={index} className="flex justify-between items-center bg-slate-700/50 p-2 rounded-md">
                                                <EditableField
                                                    label={`Boon ${index + 1}`}
                                                    value={boon.name}
                                                    onSave={(newName) => {
                                                        const newBoons = [...(character.boons || [])];
                                                        newBoons[index] = { ...newBoons[index], name: newName };
                                                        onUpdateCharacter({ ...character, boons: newBoons });
                                                    }}
                                                    inputClass="text-md text-slate-100"
                                                />
                                                <span className="text-xl font-bold text-teal-300 font-mono">+{boonValue}</span>
                                            </div>
                                        );
                                    })}
                                </div>

                                <StatDisplay label="Favor" value={character.favor || 0} isEditable onUpdate={handleFavorChange} />

                                <p className="text-xs text-slate-400 italic pt-2 border-t border-slate-700">
                                    During a long rest, you may pay one of your downtime actions as a tithe to your patron to gain 1d4 Favor. If you forgo this offering, the GM gains a Fear. Before making an action roll where a Boon is applicable, you can spend a Favor to add its bonus to the roll.
                                </p>
                            </div>
                        </Card>
                    )}
                    {character.class === 'Brawler' && character.subclass === 'Martial Artist' && character.focus && (
                        <Card title="Martial Form & Focus" headerContent={
                            stancesToLearnCount > 0 && (
                                <button onClick={() => setIsStanceModalOpen(true)} className="text-sm bg-sky-600 hover:bg-sky-500 py-1 px-3 rounded-md">
                                    Learn Stances ({stancesToLearnCount})
                                </button>
                            )
                        }>
                            <div className="space-y-4">
                                <ThresholdTracker 
                                    label="Focus" 
                                    current={character.focus.current} 
                                    max={character.focus.max} 
                                    onSet={(v) => onUpdateCharacter({...character, focus: {...character.focus!, current: v}})}
                                    color="bg-indigo-500" 
                                />
                                {character.activeMartialStance ? (
                                    <div className="bg-slate-700/50 p-3 rounded-lg border border-slate-600">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <p className="text-xs text-indigo-300 font-semibold">Active Stance</p>
                                                <h4 className="font-bold text-lg text-slate-100">{character.activeMartialStance.name}</h4>
                                            </div>
                                            <button onClick={handleDeactivateStance} className="text-xs bg-slate-600 hover:bg-slate-500 px-2 py-1 rounded">Deactivate</button>
                                        </div>
                                        <p className="text-sm text-slate-300 mt-1">{character.activeMartialStance.description}</p>
                                    </div>
                                ) : (
                                    <p className="text-center text-slate-400 text-sm">No active stance.</p>
                                )}
                                <div>
                                    <h4 className="font-semibold text-slate-300 mb-2">Learned Stances</h4>
                                    <div className="space-y-3">
                                        {character.martialStances?.map(stance => (
                                            <div key={stance.name} className="p-3 bg-slate-700/50 rounded-lg border border-slate-700">
                                                <div className="flex justify-between items-start gap-2">
                                                    <div>
                                                        <h5 className="font-bold text-slate-100">{stance.name}</h5>
                                                        <p className="text-xs text-slate-400 font-mono">Tier {stance.tier}</p>
                                                    </div>
                                                    <button
                                                        onClick={() => handleShiftStance(stance)}
                                                        disabled={character.focus!.current === 0 || character.activeMartialStance?.name === stance.name}
                                                        className="bg-sky-600 hover:bg-sky-500 text-white font-bold py-1 px-3 rounded-md text-sm disabled:bg-slate-600 disabled:cursor-not-allowed"
                                                    >
                                                        Shift
                                                    </button>
                                                </div>
                                                <p className="text-sm text-slate-300 mt-2 border-t border-slate-600/50 pt-2">{stance.description}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </Card>
                    )}
                     {character.class === 'Druid' && (
                        <BeastformDisplay character={character} onUpdateCharacter={onUpdateCharacter} />
                    )}
                    {character.class === 'Blood Hunter' && character.subclass === 'Order of the Lycan' && (
                        <WolfFormDisplay character={character} onUpdateCharacter={onUpdateCharacter} />
                    )}
                    <Card title="Class & Subclass Features">
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-xl font-semibold text-teal-400 border-b border-slate-700 pb-1 mb-3">Class Features</h3>
                                <div className="space-y-3">
                                    {classFeatures.map(feature => (
                                        <FeatureDisplayItem 
                                            key={feature.name}
                                            name={feature.name}
                                            type={feature.type}
                                            description={feature.description}
                                            character={character}
                                            onUsageChange={handleAbilityUsageChange}
                                        />
                                    ))}
                                </div>
                            </div>
                            {character.subclassFeatures && character.subclassFeatures.length > 0 && (
                                <div>
                                    <h3 className="text-xl font-semibold text-teal-400 border-b border-slate-700 pb-1 mb-3">Subclass Features</h3>
                                    <div className="space-y-3">
                                        {character.subclassFeatures.map(feature => (
                                            <FeatureDisplayItem 
                                                key={feature.name}
                                                name={feature.name}
                                                type={feature.type}
                                                description={feature.description}
                                                character={character}
                                                onUsageChange={handleAbilityUsageChange}
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </Card>
                    <Card title="Combat & Equipment" headerContent={<button onClick={() => setIsEquipmentModalOpen(true)} className="text-sm bg-slate-600 hover:bg-slate-500 py-1 px-3 rounded-md">Change</button>}>
                        <div className="grid grid-cols-1 gap-4">
                            {character.isWolfFormActive ? (
                                <EquipmentItem item={WOLF_FORM_DATA.unarmedStrike as any} isBeastformAttack={true} />
                            ) : character.activeBeastFormName ? (
                                <EquipmentItem item={ALL_BEASTFORMS.find(b => b.name === character.activeBeastFormName)?.attack} isBeastformAttack={true} />
                            ) : (
                                <>
                                    {character.activeArmor && <EquipmentItem item={character.activeArmor} />}
                                    {character.primaryWeapon && <EquipmentItem item={character.primaryWeapon} />}
                                    {character.secondaryWeapon && <EquipmentItem item={character.secondaryWeapon} />}
                                </>
                            )}
                        </div>
                    </Card>
                </div>

                {/* --- Right Column (67%) --- */}
                <div className="space-y-6 md:col-span-2">
                    <Card 
                        title={`Loadout (${loadoutCards.length} / ${MAX_LOADOUT})`}
                        headerContent={
                            <button onClick={() => setIsAddDomainCardModalOpen(true)} className="text-sm bg-slate-600 hover:bg-slate-500 py-1 px-3 rounded-md">
                                + Add Card
                            </button>
                        }
                    >
                        <div className="space-y-3">
                            {loadoutCards.map(card => (
                                <DomainCardDisplay 
                                    key={card.name} 
                                    card={card}
                                    button={
                                        <button 
                                            onClick={() => handleSendToVault(card.name)} 
                                            className="text-xs bg-slate-600 hover:bg-slate-500 text-white font-semibold py-1 px-2.5 rounded-md transition-colors"
                                            title="Send to Vault"
                                        >
                                            Vault
                                        </button>
                                    }
                                    character={character}
                                    onUsageChange={handleAbilityUsageChange}
                                />
                            ))}
                            {loadoutCards.length === 0 && <p className="text-center text-slate-400">Recall cards from your vault to build your loadout.</p>}
                        </div>
                    </Card>
                    <Card title="The Vault">
                        <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
                            {vaultCards.map(card => {
                                const recallCost = card.recallCost ?? 0;
                                const isDisabled = loadoutCards.length >= MAX_LOADOUT || character.hope < recallCost;
                                const title = loadoutCards.length >= MAX_LOADOUT ? "Loadout is full" : character.hope < recallCost ? "Not enough Hope" : `Recall for ${recallCost} Hope`;
                                
                                return (
                                    <DomainCardDisplay
                                        key={card.name}
                                        card={card}
                                        button={
                                            <button
                                                onClick={() => handleRecallFromVault(card.name)}
                                                disabled={isDisabled}
                                                className="text-xs bg-sky-600 hover:bg-sky-500 text-white font-semibold py-1 px-2.5 rounded-md transition-colors disabled:bg-slate-500 disabled:cursor-not-allowed"
                                                title={title}
                                            >
                                                Recall
                                            </button>
                                        }
                                        character={character}
                                        onUsageChange={handleAbilityUsageChange}
                                    />
                                );
                            })}
                            {vaultCards.length === 0 && <p className="text-center text-slate-400">Your vault is empty. Gain new cards by leveling up.</p>}
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
                    <Card title="Inventory">
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <StatDisplay label="Gold" value={character.gold} isEditable onUpdate={(c) => handleSimpleValueChange('gold', c)} />
                            <StatDisplay label="Bolsa" value={character.bolsa || 0} isEditable onUpdate={(c) => handleSimpleValueChange('bolsa', c)} />
                        </div>
                        <ul className="space-y-2 pr-2">
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
            {isAddDomainCardModalOpen && <AddDomainCardModal character={character} onCardAdd={handleAddCardToVault} onClose={() => setIsAddDomainCardModalOpen(false)} />}
            {isRestModalOpen && <RestModal character={character} onConfirm={handleConfirmRest} onClose={() => setIsRestModalOpen(false)} armorScore={derivedStats.armorScore}/>}
        </div>
    );
};

// Helper components for display
const EquipmentItem: React.FC<{item: (Weapon | Armor | BeastForm['attack']) | undefined, isBeastformAttack?: boolean}> = ({ item, isBeastformAttack = false }) => {
    if (!item) return null;

    if (isBeastformAttack) {
        const attack = item as any; // Can be BeastForm attack or WolfForm attack
        const title = attack.name || 'Beastform Attack';
        return (
            <div className="p-3 bg-slate-700/50 rounded-lg border border-slate-700">
                <h4 className="font-bold text-slate-100">{title}</h4>
                <div className="text-sm text-slate-300">
                    <span>Dmg: <span className="font-mono">{attack.damage}</span></span> | <span>Trait: <span className="font-mono">{attack.trait}</span></span> | <span>Range: <span className="font-mono">{attack.range}</span></span>
                </div>
                {attack.feature && <p className="text-xs text-slate-400 mt-1 italic">{attack.feature}</p>}
            </div>
        );
    }

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

export default CharacterSheet;