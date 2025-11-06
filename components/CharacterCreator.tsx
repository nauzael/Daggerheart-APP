import React, { useState, useMemo, useCallback } from 'react';
import { Character, Experience, Weapon, Armor } from '../types';
import Card from './Card';
import DomainSelector from './DomainSelector';
import AbilitySelector from './AbilitySelector';
import { CLASSES } from '../data/classes';
import { ANCESTRIES } from '../data/ancestries';
import { COMMUNITIES } from '../data/communities';
import { ARMORS, PRIMARY_WEAPONS, SECONDARY_WEAPONS } from '../data/equipment';
import { SUBCLASS_FEATURES } from '../data/subclassFeatures';

interface CharacterCreatorProps {
  onCharacterCreate: (character: Character) => void;
}

const TRAIT_MODIFIERS = [+2, +1, +1, +0, +0, -1];
const TRAIT_NAMES: (keyof Character['traits'])[] = ['strength', 'agility', 'finesse', 'instinct', 'presence', 'knowledge'];

const initialCharacterState: Omit<Character, 'class' | 'domains' | 'evasion' | 'hp' | 'stress' | 'armor' | 'subclassFeatures' > = {
    name: '',
    level: 1,
    subclass: '',
    ancestry: ANCESTRIES[0].name,
    community: COMMUNITIES[0].name,
    experiences: [{name: '', modifier: 2}, {name: '', modifier: 2}],
    traits: { strength: 0, agility: 0, finesse: 0, instinct: 0, knowledge: 0, presence: 0 },
    proficiency: 1,
    hope: 2,
    gold: 1, // Handful
    inventory: ["Una antorcha", "50 pies de cuerda", "Suministros básicos", "Poción de Salud Menor"],
    domainCards: [],
    notes: '',
};

const CharacterCreator: React.FC<CharacterCreatorProps> = ({ onCharacterCreate }) => {
  const [charData, setCharData] = useState<Partial<Character>>({
      ...initialCharacterState,
      class: CLASSES[0].name
  });
  const [assignedTraits, setAssignedTraits] = useState<Partial<Record<keyof Character['traits'], string>>>({});
  
  const selectedClass = useMemo(() => CLASSES.find(c => c.name === charData.class) || CLASSES[0], [charData.class]);
  
  const isFormValid = useMemo(() => {
    const allTraitsAssigned = Object.keys(assignedTraits).length === TRAIT_NAMES.length && Object.values(assignedTraits).every(v => v !== '');
    return charData.name?.trim() && charData.subclass && allTraitsAssigned && charData.domainCards?.length === 2 && charData.experiences?.every(e => e.name.trim());
  }, [charData, assignedTraits]);

  const handleClassChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newClassName = e.target.value;
    const newClass = CLASSES.find(c => c.name === newClassName)!;
    setCharData(prev => ({
        ...prev,
        class: newClassName,
        subclass: '',
        domainCards: [],
        inventory: [...(initialCharacterState.inventory || []), newClass.items],
    }));
  };

  const handleSimpleChange = (field: keyof Character) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setCharData(prev => ({ ...prev, [field]: e.target.value }));
  };
  
  const handleExperienceChange = (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const newExperiences = [...(charData.experiences || [])];
      newExperiences[index] = {...newExperiences[index], name: e.target.value};
      setCharData(prev => ({...prev, experiences: newExperiences}));
  }

 const handleTraitAssignment = useCallback((traitName: keyof Character['traits'], value: string) => {
    setAssignedTraits(prev => {
        const newAssigned = { ...prev };
        
        // Find the old value for the current trait to correctly manage counts
        const oldValue = prev[traitName];

        // If setting a new value, update the state
        if (value !== "") {
            newAssigned[traitName] = value;
        } else {
            // If clearing the value, remove the trait from the assigned list
            delete newAssigned[traitName];
        }
        
        return newAssigned;
    });
}, []);

  const availableCounts = useMemo(() => TRAIT_MODIFIERS.reduce((acc, mod) => {
    const key = String(mod);
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {} as Record<string, number>), []);

  const usedCounts = useMemo(() => Object.values(assignedTraits).reduce((acc, value) => {
    if (value && value !== '') {
        const key = String(value);
        acc[key] = (acc[key] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>), [assignedTraits]);
  
  const handleEquipmentChange = (type: 'activeArmor' | 'primaryWeapon' | 'secondaryWeapon') => (e: React.ChangeEvent<HTMLSelectElement>) => {
      const itemName = e.target.value;
      let item;
      if (type === 'activeArmor') item = ARMORS.find(a => a.name === itemName);
      if (type === 'primaryWeapon') item = PRIMARY_WEAPONS.find(w => w.name === itemName);
      if (type === 'secondaryWeapon') item = SECONDARY_WEAPONS.find(w => w.name === itemName);

      const newState: Partial<Character> = { [type]: item || undefined };

      if (type === 'primaryWeapon' && (item as Weapon)?.burden === 'Two-Handed') {
          newState.secondaryWeapon = undefined;
      }
      
      setCharData(prev => ({...prev, ...newState}));
  };

  const handleAbilityToggle = (abilityName: string) => {
    setCharData(prev => {
        const currentCards = prev.domainCards || [];
        const newCards = currentCards.includes(abilityName)
            ? currentCards.filter(d => d !== abilityName)
            : [...currentCards, abilityName];
        
        if (newCards.length > 2) {
            return prev;
        }
        return { ...prev, domainCards: newCards };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;

    const finalTraits: Character['traits'] = { strength: 0, agility: 0, finesse: 0, instinct: 0, knowledge: 0, presence: 0 };
    Object.entries(assignedTraits).forEach(([trait, value]) => {
        finalTraits[trait as keyof Character['traits']] = Number(value);
    });

    const armor = charData.activeArmor || { baseScore: 0 };
    const foundationFeature = SUBCLASS_FEATURES.find(f => f.subclass === charData.subclass && f.type === 'Foundation');
    
    const finalCharacter: Character = {
        ...initialCharacterState,
        ...charData,
        class: selectedClass.name,
        domains: selectedClass.domains,
        evasion: selectedClass.startingEvasion,
        subclass: charData.subclass!,
        ancestry: charData.ancestry!,
        community: charData.community!,
        traits: finalTraits,
        experiences: charData.experiences!,
        hp: { max: selectedClass.startingHP, current: selectedClass.startingHP },
        stress: { max: 6, current: 6},
        armor: { max: armor.baseScore, current: armor.baseScore },
        domainCards: charData.domainCards!,
        subclassFeatures: foundationFeature ? [foundationFeature] : [],
    } as Character;
    onCharacterCreate(finalCharacter);
  };

  const primaryWeapon = charData.primaryWeapon as Weapon | undefined;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
        <Card title="Paso 1 y 2: Clase y Herencia">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <input type="text" placeholder="Nombre del Personaje*" value={charData.name || ''} onChange={handleSimpleChange('name')} className="w-full bg-slate-700 border border-slate-600 rounded-md py-2 px-3 text-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500" />
                <select value={charData.class} onChange={handleClassChange} className="w-full bg-slate-700 border border-slate-600 rounded-md py-2 px-3 text-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500">
                    {CLASSES.map(c => <option key={c.name} value={c.name}>{c.name}</option>)}
                </select>
                <select value={charData.subclass} onChange={handleSimpleChange('subclass')} className="w-full bg-slate-700 border border-slate-600 rounded-md py-2 px-3 text-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500">
                    <option value="">Selecciona una Subclase*</option>
                    {selectedClass.subclasses.map(sc => <option key={sc} value={sc}>{sc}</option>)}
                </select>
                <select value={charData.ancestry} onChange={handleSimpleChange('ancestry')} className="w-full bg-slate-700 border border-slate-600 rounded-md py-2 px-3 text-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500">
                    {ANCESTRIES.map(a => <option key={a.name} value={a.name}>{a.name}</option>)}
                </select>
                <select value={charData.community} onChange={handleSimpleChange('community')} className="w-full bg-slate-700 border border-slate-600 rounded-md py-2 px-3 text-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500">
                    {COMMUNITIES.map(c => <option key={c.name} value={c.name}>{c.name}</option>)}
                </select>
            </div>
        </Card>

        <Card title="Paso 3: Asignar Rasgos">
            <p className="text-slate-400 mb-4 text-sm">Asigna un modificador a cada rasgo. Modificadores: <span className="font-mono">{TRAIT_MODIFIERS.join(', ')}</span></p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {TRAIT_NAMES.map(traitName => (
                    <div key={traitName}>
                        <label className="block text-sm font-bold mb-1 text-slate-400 capitalize">{traitName === 'strength' ? 'Fuerza' : traitName === 'agility' ? 'Agilidad' : traitName === 'finesse' ? 'Finura' : traitName === 'instinct' ? 'Instinto' : traitName === 'presence' ? 'Presencia' : 'Conocimiento'}</label>
                        <select
                            value={assignedTraits[traitName] || ''}
                            onChange={e => handleTraitAssignment(traitName, e.target.value)}
                            className="w-full bg-slate-700 border border-slate-600 rounded-md py-2 px-3 text-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
                        >
                            <option value="">Asignar Modificador*</option>
                            {TRAIT_MODIFIERS.map((mod, index) => {
                                const modString = String(mod);
                                const isCurrentValue = assignedTraits[traitName] === modString;
                                const usedCount = usedCounts[modString] || 0;
                                const availableCount = availableCounts[modString];
                                const isDisabled = usedCount >= availableCount && !isCurrentValue;

                                return (
                                    <option key={`${mod}-${index}`} value={modString} disabled={isDisabled}>
                                        {mod > 0 ? `+${mod}` : mod}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                ))}
            </div>
        </Card>
        
        <Card title="Paso 4 y 5: Estadísticas y Equipo">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                 <div><span className="text-slate-400">PV:</span> <span className="font-bold text-slate-100">{selectedClass.startingHP}</span></div>
                 <div><span className="text-slate-400">Evasión:</span> <span className="font-bold text-slate-100">{selectedClass.startingEvasion}</span></div>
                 <div><span className="text-slate-400">Estrés:</span> <span className="font-bold text-slate-100">6</span></div>
                 <div><span className="text-slate-400">Esperanza:</span> <span className="font-bold text-slate-100">2</span></div>
            </div>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                 <select value={charData.activeArmor?.name || ''} onChange={handleEquipmentChange('activeArmor')} className="w-full bg-slate-700 border border-slate-600 rounded-md py-2 px-3 text-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500">
                    <option value="">Seleccionar Armadura</option>
                    {ARMORS.map(a => <option key={a.name} value={a.name}>{a.name}</option>)}
                 </select>
                 <select value={charData.primaryWeapon?.name || ''} onChange={handleEquipmentChange('primaryWeapon')} className="w-full bg-slate-700 border border-slate-600 rounded-md py-2 px-3 text-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500">
                    <option value="">Seleccionar Arma Principal</option>
                    {PRIMARY_WEAPONS.map(w => <option key={w.name} value={w.name}>{w.name}</option>)}
                 </select>
                 <select value={charData.secondaryWeapon?.name || ''} onChange={handleEquipmentChange('secondaryWeapon')} className="w-full bg-slate-700 border border-slate-600 rounded-md py-2 px-3 text-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500" disabled={primaryWeapon?.burden === 'Two-Handed'}>
                    <option value="">Seleccionar Arma Secundaria</option>
                    {SECONDARY_WEAPONS.map(w => <option key={w.name} value={w.name}>{w.name}</option>)}
                 </select>
             </div>
        </Card>

         <Card title="Paso 6 y 7: Trasfondo y Experiencias">
            <p className="text-slate-400 mb-4 text-sm">Cada una de tus experiencias proporciona un modificador de <span className="font-mono">+2</span> cuando gastas una Esperanza en una tirada relevante.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <input type="text" placeholder="Experiencia 1*" value={charData.experiences?.[0].name || ''} onChange={handleExperienceChange(0)} className="w-full bg-slate-700 border border-slate-600 rounded-md py-2 px-3 text-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500" />
                 <input type="text" placeholder="Experiencia 2*" value={charData.experiences?.[1].name || ''} onChange={handleExperienceChange(1)} className="w-full bg-slate-700 border border-slate-600 rounded-md py-2 px-3 text-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500" />
                 <textarea placeholder="Trasfondo, Notas, Conexiones..." value={charData.notes || ''} onChange={handleSimpleChange('notes')} rows={5} className="md:col-span-2 w-full bg-slate-700 border border-slate-600 rounded-md py-2 px-3 text-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500" />
            </div>
        </Card>

        <Card title="Paso 8: Cartas de Dominio">
            <DomainSelector selectedClass={selectedClass} />
            <AbilitySelector
                selectedDomains={selectedClass.domains}
                selectedAbilities={charData.domainCards || []}
                onAbilityToggle={handleAbilityToggle}
            />
        </Card>
        
        <div className="mt-8 text-center">
            <button 
                type="submit" 
                disabled={!isFormValid}
                className="bg-teal-600 hover:bg-teal-500 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition duration-300 transform hover:scale-105 disabled:bg-slate-600 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
            >
                Crear Personaje
            </button>
             {!isFormValid && <p className="text-red-400 text-sm mt-2">Por favor, rellena todos los campos requeridos (*).</p>}
        </div>
    </form>
  );
};

export default CharacterCreator;