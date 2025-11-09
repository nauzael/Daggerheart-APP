import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { Character, Experience, Weapon, Armor, AncestryFeature, BeastForm } from '../types';
import Card from './Card';
import DomainSelector from './DomainSelector';
import AbilitySelector from './AbilitySelector';
import { Class, CLASSES } from '../data/classes';
import { Ancestry, ANCESTRIES } from '../data/ancestries';
import { Community, COMMUNITIES } from '../data/communities';
import { SUBCLASS_FEATURES } from '../data/subclassFeatures';
import EquipmentSelectorModal from './EquipmentSelectorModal';
import { ALL_BEASTFORMS } from '../data/beastforms';
import SelectionModal from './SelectionModal';
import { CLASS_FEATURES } from '../data/classFeatures';


interface CharacterCreatorProps {
  onCharacterCreate: (character: Character) => void;
  onCancel: () => void;
}

const TRAIT_MODIFIERS = [+2, +1, +1, +0, +0, -1];
const TRAIT_NAMES: (keyof Character['traits'])[] = ['strength', 'agility', 'finesse', 'instinct', 'presence', 'knowledge'];

const initialCharacterState: Omit<Character, 'id' | 'domains' | 'evasion' | 'hp' | 'stress' | 'armor' | 'subclassFeatures' | 'notes' | 'ancestryFeatures' | 'inventory' | 'vault' | 'abilityUsage' | 'beastForms' | 'activeBeastFormName'> = {
    name: '',
    level: 1,
    class: CLASSES[0].name,
    subclass: '',
    ancestry: ANCESTRIES[0].name,
    community: COMMUNITIES[0].name,
    experiences: [{name: '', modifier: 2, description: ''}, {name: '', modifier: 2, description: ''}],
    traits: { strength: 0, agility: 0, finesse: 0, instinct: 0, knowledge: 0, presence: 0 },
    proficiency: 1,
    hope: 2,
    gold: 1, // Handful
    bolsa: 0,
    domainCards: ['', ''],
};

// Helper component for displaying selection and opening modal
const SelectionDisplay: React.FC<{label: string, value: string, onClick: () => void, className?: string}> = ({ label, value, onClick, className }) => (
    <div className={className}>
        <label className="block text-sm font-bold mb-1 text-slate-400 capitalize">{label}</label>
        <button
            type="button"
            onClick={onClick}
            className="w-full bg-slate-700 border border-slate-600 rounded-md py-2 px-3 text-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 text-left h-10 truncate"
        >
            {value || `Select a ${label}`}
        </button>
    </div>
);


const CharacterCreator: React.FC<CharacterCreatorProps> = ({ onCharacterCreate, onCancel }) => {
  const [charData, setCharData] = useState<Partial<Character>>(initialCharacterState);
  const [notes, setNotes] = useState('');
  const [assignedTraits, setAssignedTraits] = useState<Partial<Record<keyof Character['traits'], string>>>({});
  const [isMixedAncestry, setIsMixedAncestry] = useState(false);
  const [mixedAncestryName, setMixedAncestryName] = useState('');
  const [firstAncestry, setFirstAncestry] = useState(ANCESTRIES[0].name);
  const [secondAncestry, setSecondAncestry] = useState(ANCESTRIES[0].name);
  const [potionChoice, setPotionChoice] = useState('Minor Health Potion');
  const [classItemChoice, setClassItemChoice] = useState('');
  const [spellItem, setSpellItem] = useState('');
  const [isEquipmentModalOpen, setIsEquipmentModalOpen] = useState(false);
  const [equipmentConfirmed, setEquipmentConfirmed] = useState(false);
  const [selectedBeastform, setSelectedBeastform] = useState('');
  
  const [modalConfig, setModalConfig] = useState<{
      isOpen: boolean;
      type: 'class' | 'ancestry' | 'community' | 'first_ancestry' | 'second_ancestry' | 'subclass' | null;
  }>({ isOpen: false, type: null });
  
  const selectedClass = useMemo(() => CLASSES.find(c => c.name === charData.class) || CLASSES[0], [charData.class]);
  const tier1Beastforms = useMemo(() => ALL_BEASTFORMS.filter(b => b.tier === 1), []);
  
  const classItemOptions = useMemo(() => {
    if (!selectedClass) return [];
    const itemsString = selectedClass.items;
    return itemsString.split(' or ').map(s => s.trim());
  }, [selectedClass]);

  useEffect(() => {
      setClassItemChoice('');
      if(classItemOptions.length === 1) {
          setClassItemChoice(classItemOptions[0]);
      }
       if (selectedClass.name !== 'Druid') {
            setSelectedBeastform('');
        }
  }, [selectedClass, classItemOptions]);

  const isFormValid = useMemo(() => {
    const allTraitsAssigned = Object.keys(assignedTraits).length === TRAIT_NAMES.length && Object.values(assignedTraits).every(v => v !== '');
    const mixedAncestryValid = !isMixedAncestry || (isMixedAncestry && mixedAncestryName.trim() !== '');
    const classItemValid = classItemOptions.length === 1 || (classItemOptions.length > 1 && classItemChoice !== '');
    const druidFormValid = selectedClass.name !== 'Druid' || (selectedClass.name === 'Druid' && selectedBeastform !== '');
    return charData.name?.trim() && charData.subclass && allTraitsAssigned && charData.domainCards?.filter(Boolean).length === 2 && charData.experiences?.every(e => e.name.trim()) && mixedAncestryValid && classItemValid && equipmentConfirmed && druidFormValid;
  }, [charData, assignedTraits, isMixedAncestry, mixedAncestryName, classItemChoice, classItemOptions, equipmentConfirmed, selectedClass.name, selectedBeastform]);

  const handleClassChange = (newClassName: string) => {
    setCharData(prev => ({
        ...prev,
        class: newClassName,
        subclass: '',
        domainCards: ['', ''],
    }));
  };

  const handleSimpleChange = (field: keyof Character) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setCharData(prev => ({ ...prev, [field]: e.target.value }));
  };
  
  const handleExperienceChange = (index: number, field: 'name' | 'description') => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const newExperiences = [...(charData.experiences || [])] as Experience[];
      newExperiences[index] = {...newExperiences[index], [field]: e.target.value};
      setCharData(prev => ({...prev, experiences: newExperiences}));
  }

 const handleTraitAssignment = useCallback((traitName: keyof Character['traits'], value: string) => {
    setAssignedTraits(prev => {
        const newAssigned = { ...prev };
        const oldValue = prev[traitName];
        if (value !== "") {
            newAssigned[traitName] = value;
        } else {
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
  
  const handleEquipmentConfirm = (selections: { armor?: Armor, primary?: Weapon, secondary?: Weapon }) => {
      setCharData(prev => ({
          ...prev,
          activeArmor: selections.armor,
          primaryWeapon: selections.primary,
          secondaryWeapon: selections.secondary
      }));
      setEquipmentConfirmed(true);
      setIsEquipmentModalOpen(false);
  };

  const handleAbilitySelect = (slotIndex: number, cardName: string) => {
    setCharData(prev => {
        const currentCards = [...(prev.domainCards || ['', ''])];
        currentCards[slotIndex] = cardName;
        return { ...prev, domainCards: currentCards };
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
    
    let finalAncestryName = charData.ancestry!;
    let finalAncestryFeatures: AncestryFeature[] = [];

    if (isMixedAncestry) {
        finalAncestryName = mixedAncestryName;
        const ancestry1 = ANCESTRIES.find(a => a.name === firstAncestry);
        const ancestry2 = ANCESTRIES.find(a => a.name === secondAncestry);
        if (ancestry1 && ancestry2) {
            finalAncestryFeatures = [ancestry1.features[0], ancestry2.features[1]];
        }
    } else {
        const ancestryData = ANCESTRIES.find(a => a.name === charData.ancestry);
        if (ancestryData) {
            finalAncestryFeatures = ancestryData.features;
        }
    }

    const finalInventory = ["A torch", "50 feet of rope", "Basic supplies"];
    if (potionChoice) finalInventory.push(potionChoice);
    if (classItemChoice) finalInventory.push(classItemChoice);
    if (spellItem.trim()) finalInventory.push(`Spells carried in: ${spellItem.trim()}`);
    
    let finalBeastForms: BeastForm[] = [];
    if (selectedClass.name === 'Druid' && selectedBeastform) {
        const form = ALL_BEASTFORMS.find(b => b.name === selectedBeastform);
        if (form) {
            finalBeastForms.push(form);
        }
    }


    const finalCharacter: Character = {
        ...(initialCharacterState as any),
        ...charData,
        id: crypto.randomUUID(),
        class: selectedClass.name,
        domains: selectedClass.domains,
        evasion: selectedClass.startingEvasion,
        subclass: charData.subclass!,
        ancestry: finalAncestryName,
        ancestryFeatures: finalAncestryFeatures,
        community: charData.community!,
        traits: finalTraits,
        experiences: charData.experiences!,
        inventory: finalInventory,
        notes: notes.split('\n').filter(n => n.trim() !== ''),
        hp: { max: selectedClass.startingHP, current: selectedClass.startingHP },
        stress: { max: 6, current: 6},
        armor: { max: armor.baseScore, current: armor.baseScore },
        domainCards: charData.domainCards!.filter(Boolean),
        vault: [],
        abilityUsage: {},
        subclassFeatures: foundationFeature ? [foundationFeature] : [],
        beastForms: finalBeastForms,
    } as Character;
    onCharacterCreate(finalCharacter);
  };

  const openModal = (type: 'class' | 'ancestry' | 'community' | 'first_ancestry' | 'second_ancestry' | 'subclass') => {
      setModalConfig({ isOpen: true, type });
  };
  const closeModal = () => setModalConfig({ isOpen: false, type: null });

  const handleModalConfirm = (selection: string) => {
      switch (modalConfig.type) {
          case 'class':
              handleClassChange(selection);
              break;
          case 'ancestry':
              setCharData(prev => ({ ...prev, ancestry: selection }));
              break;
          case 'community':
              setCharData(prev => ({ ...prev, community: selection }));
              break;
          case 'first_ancestry':
              setFirstAncestry(selection);
              break;
          case 'second_ancestry':
              setSecondAncestry(selection);
              break;
          case 'subclass':
              setCharData(prev => ({ ...prev, subclass: selection }));
              break;
      }
      closeModal();
  };
  
  const renderClassDetails = (item: Class) => {
      const features = CLASS_FEATURES.filter(f => f.className === item.name);

      const FeatureCard: React.FC<{ feature: (typeof features)[0] }> = ({ feature }) => (
          <div className="p-3 bg-slate-800 rounded-lg border border-slate-700">
              <div className="flex justify-between items-center">
                <h4 className="font-bold text-slate-100">{feature.name}</h4>
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${feature.type === 'Hope' ? 'bg-yellow-800 text-yellow-200 border-yellow-600' : 'bg-sky-800 text-sky-200 border-sky-600'}`}>{feature.type}</span>
              </div>
              <p className="text-sm text-slate-400 mt-1">{feature.description}</p>
              {feature.type === 'Hope' && <p className="text-xs text-yellow-400 font-semibold mt-1">Cost: 3 Hope</p>}
          </div>
      );

      return (
          <div className="space-y-4 text-slate-300">
              <h3 className="text-2xl font-bold text-teal-300">{item.name}</h3>
              <p className="text-sm italic text-slate-400">{item.description}</p>

              <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="bg-slate-800 p-2 rounded-lg">
                      <p className="text-sm text-slate-400">Starting HP</p>
                      <p className="text-xl font-bold text-slate-100">{item.startingHP}</p>
                  </div>
                  <div className="bg-slate-800 p-2 rounded-lg">
                      <p className="text-sm text-slate-400">Starting Evasion</p>
                      <p className="text-xl font-bold text-slate-100">{item.startingEvasion}</p>
                  </div>
              </div>

              <div>
                  <h4 className="font-semibold text-slate-200">Class Features:</h4>
                  <div className="space-y-2 mt-1">
                      {features.map(feature => <FeatureCard key={feature.name} feature={feature} />)}
                  </div>
              </div>

              <div>
                  <h4 className="font-semibold text-slate-200">Domains:</h4>
                  <p className="text-sm font-semibold text-slate-400">{item.domains.join(', ')}</p>
              </div>

              <div>
                  <h4 className="font-semibold text-slate-200">Subclasses:</h4>
                  <ul className="list-disc list-inside text-sm text-slate-400">
                      {item.subclasses.map(sc => <li key={sc}>{sc}</li>)}
                  </ul>
              </div>
              
              <div>
                  <h4 className="font-semibold text-slate-200">Starting Item:</h4>
                  <p className="text-sm italic text-slate-400">{item.items}</p>
              </div>
          </div>
      );
  }

  const renderAncestryDetails = (item: Ancestry) => (
      <div className="space-y-4 text-slate-300">
          <h3 className="text-2xl font-bold text-teal-300">{item.name}</h3>
          <div>
              <h4 className="font-semibold text-slate-200">Features:</h4>
              <ul className="space-y-2 mt-1">
                  {item.features.map(feature => (
                      <li key={feature.name} className="p-2 bg-slate-800 rounded-lg">
                          <p className="font-bold text-slate-100">{feature.name}</p>
                          <p className="text-sm text-slate-400">{feature.description}</p>
                      </li>
                  ))}
              </ul>
          </div>
      </div>
  );

  const renderCommunityDetails = (item: Community) => (
      <div className="space-y-4 text-slate-300">
          <h3 className="text-2xl font-bold text-teal-300">{item.name}</h3>
          <div>
              <h4 className="font-semibold text-slate-200">Feature:</h4>
              <div className="mt-1 p-2 bg-slate-800 rounded-lg">
                  <p className="font-bold text-slate-100">{item.feature.name}</p>
                  <p className="text-sm text-slate-400">{item.feature.description}</p>
              </div>
          </div>
          <div>
              <h4 className="font-semibold text-slate-200">Adjectives:</h4>
              <p className="text-sm italic text-slate-400">{item.adjectives.join(', ')}</p>
          </div>
      </div>
  );

  const renderSubclassDetails = (item: { name: string }) => {
    const foundation = SUBCLASS_FEATURES.find(f => f.subclass === item.name && f.type === 'Foundation');
    const specialization = SUBCLASS_FEATURES.find(f => f.subclass === item.name && f.type === 'Specialization');
    const mastery = SUBCLASS_FEATURES.find(f => f.subclass === item.name && f.type === 'Mastery');

    if (!foundation) {
        return <p className="text-slate-400">Details not available for this subclass.</p>;
    }

    const FeatureCard = ({ title, feature }: { title: string, feature: typeof foundation | undefined }) => {
        if (!feature) return null;
        return (
            <div>
                <h4 className="font-semibold text-slate-200">{title}</h4>
                <div className="mt-1 p-3 bg-slate-800 rounded-lg border border-slate-700">
                    <p className="font-bold text-slate-100">{feature.name}</p>
                    <p className="text-sm text-slate-400 mt-1">{feature.description}</p>
                </div>
            </div>
        );
    };

    return (
        <div className="space-y-4 text-slate-300">
            <h3 className="text-2xl font-bold text-teal-300">{item.name}</h3>
            <p className="text-sm text-slate-400">Review the full progression for the {item.name} subclass.</p>
            <div className="space-y-3">
                <FeatureCard title="Foundation Feature (Level 1)" feature={foundation} />
                <FeatureCard title="Specialization Feature (Tier 2)" feature={specialization} />
                <FeatureCard title="Mastery Feature (Tier 3)" feature={mastery} />
            </div>
        </div>
    );
};

  const renderModal = () => {
      if (!modalConfig.isOpen) return null;

      let props: any;
      switch (modalConfig.type) {
          case 'class':
              props = {
                  title: "Select a Class",
                  items: CLASSES,
                  renderItemDetails: renderClassDetails,
                  initialSelection: charData.class,
              };
              break;
          case 'subclass':
              props = {
                  title: "Select a Subclass",
                  items: selectedClass.subclasses.map(sc => ({ name: sc })),
                  renderItemDetails: renderSubclassDetails,
                  initialSelection: charData.subclass,
              };
              break;
          case 'ancestry':
              props = {
                  title: "Select an Ancestry",
                  items: ANCESTRIES,
                  renderItemDetails: renderAncestryDetails,
                  initialSelection: charData.ancestry,
              };
              break;
          case 'community':
              props = {
                  title: "Select a Community",
                  items: COMMUNITIES,
                  renderItemDetails: renderCommunityDetails,
                  initialSelection: charData.community,
              };
              break;
          case 'first_ancestry':
              props = {
                  title: "Select First Ancestry",
                  items: ANCESTRIES,
                  renderItemDetails: renderAncestryDetails,
                  initialSelection: firstAncestry,
              };
              break;
          case 'second_ancestry':
              props = {
                  title: "Select Second Ancestry",
                  items: ANCESTRIES,
                  renderItemDetails: renderAncestryDetails,
                  initialSelection: secondAncestry,
              };
              break;
          default:
              return null;
      }
      return <SelectionModal {...props} onConfirm={handleModalConfirm} onClose={closeModal} isOpen={modalConfig.isOpen} />;
  };


  return (
    <form onSubmit={handleSubmit} className="space-y-6">
        {renderModal()}
        <Card title="Step 1 & 2: Class & Heritage">
            <div className="mb-4">
                <label htmlFor="character-name" className="block text-sm font-bold mb-1 text-slate-400">Character Name*</label>
                <input
                    id="character-name"
                    type="text"
                    placeholder="Enter Character Name"
                    value={charData.name || ''}
                    onChange={handleSimpleChange('name')}
                    className="w-full bg-slate-700 border border-slate-600 rounded-md py-2 px-3 text-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <SelectionDisplay label="Class" value={charData.class!} onClick={() => openModal('class')} />
                <SelectionDisplay label="Subclass" value={charData.subclass!} onClick={() => openModal('subclass')} />
            </div>
             <div className="mt-4 pt-4 border-t border-slate-700">
                <div className="flex items-center gap-3 mb-4">
                    <input type="checkbox" id="mixed-ancestry" checked={isMixedAncestry} onChange={e => setIsMixedAncestry(e.target.checked)} className="h-4 w-4 rounded bg-slate-700 border-slate-600 text-teal-500 focus:ring-teal-500" />
                    <label htmlFor="mixed-ancestry" className="text-slate-300">Create Mixed Ancestry</label>
                </div>
                {isMixedAncestry ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <input type="text" placeholder="Mixed Ancestry Name*" value={mixedAncestryName} onChange={e => setMixedAncestryName(e.target.value)} className="w-full bg-slate-700 border border-slate-600 rounded-md py-2 px-3 text-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500" />
                        <SelectionDisplay label="First Ancestry (1st feature)" value={firstAncestry} onClick={() => openModal('first_ancestry')} />
                        <SelectionDisplay label="Second Ancestry (2nd feature)" value={secondAncestry} onClick={() => openModal('second_ancestry')} />
                    </div>
                ) : (
                     <div className="mb-4">
                        <SelectionDisplay label="Ancestry" value={charData.ancestry!} onClick={() => openModal('ancestry')} className="w-full md:max-w-xs" />
                     </div>
                )}
                <div>
                     <SelectionDisplay label="Community" value={charData.community!} onClick={() => openModal('community')} className="w-full md:max-w-xs" />
                </div>
            </div>
        </Card>

        <Card title="Step 3: Assign Traits">
            <p className="text-slate-400 mb-4 text-sm">Assign a modifier to each trait. Modifiers: <span className="font-mono">{TRAIT_MODIFIERS.join(', ')}</span></p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {TRAIT_NAMES.map(traitName => (
                    <div key={traitName}>
                        <label className="block text-sm font-bold mb-1 text-slate-400 capitalize">{traitName}</label>
                        <select
                            value={assignedTraits[traitName] || ''}
                            onChange={e => handleTraitAssignment(traitName, e.target.value)}
                            className="w-full bg-slate-700 border border-slate-600 rounded-md py-2 px-3 text-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
                        >
                            <option value="">Assign Modifier*</option>
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
        
        <Card title="Step 4 & 5: Stats & Equipment">
            <div className="flex flex-col sm:flex-row justify-between items-center bg-slate-700/50 p-4 rounded-lg">
                <div className="text-center sm:text-left mb-4 sm:mb-0">
                    <p className="font-semibold text-slate-200">Starting stats are determined by your class.</p>
                    <p className="text-sm text-slate-400">Select your starting gear to see your final armor score.</p>
                </div>
                <button 
                    type="button" 
                    onClick={() => setIsEquipmentModalOpen(true)}
                    className="bg-sky-600 hover:bg-sky-500 text-white font-bold py-2 px-6 rounded-lg flex items-center gap-2"
                >
                    {equipmentConfirmed ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                             <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                             <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                        </svg>
                    )}
                    {equipmentConfirmed ? 'Edit Equipment' : 'Select Equipment*'}
                </button>
            </div>
        </Card>

        <Card title="Step 6 & 7: Background & Experiences">
            <p className="text-slate-400 mb-4 text-sm">Each of your experiences provides a <span className="font-mono">+2</span> modifier when you spend a Hope on a relevant roll.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <input type="text" placeholder="Experience 1 (Title)*" value={charData.experiences?.[0].name || ''} onChange={handleExperienceChange(0, 'name')} className="w-full bg-slate-700 border border-slate-600 rounded-md py-2 px-3 text-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500" />
                    <textarea placeholder="Detail (optional)" value={charData.experiences?.[0].description || ''} onChange={handleExperienceChange(0, 'description')} rows={2} className="mt-2 w-full bg-slate-700 border border-slate-600 rounded-md py-2 px-3 text-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500" />
                </div>
                 <div>
                    <input type="text" placeholder="Experience 2 (Title)*" value={charData.experiences?.[1].name || ''} onChange={handleExperienceChange(1, 'name')} className="w-full bg-slate-700 border border-slate-600 rounded-md py-2 px-3 text-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500" />
                    <textarea placeholder="Detail (optional)" value={charData.experiences?.[1].description || ''} onChange={handleExperienceChange(1, 'description')} rows={2} className="mt-2 w-full bg-slate-700 border border-slate-600 rounded-md py-2 px-3 text-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500" />
                 </div>
                 <textarea placeholder="Background, Notes, Connections..." value={notes} onChange={(e) => setNotes(e.target.value)} rows={5} className="md:col-span-2 w-full bg-slate-700 border border-slate-600 rounded-md py-2 px-3 text-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500" />
            </div>
        </Card>
        
        {selectedClass.name === 'Druid' && (
            <Card title="Choose Beastform">
                <p className="text-slate-400 mb-4 text-sm">As a Druid, you begin with knowledge of one Tier 1 beast form.</p>
                <select 
                    value={selectedBeastform} 
                    onChange={e => setSelectedBeastform(e.target.value)} 
                    className="w-full bg-slate-700 border border-slate-600 rounded-md py-2 px-3 text-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                    <option value="">Select a Beastform*</option>
                    {tier1Beastforms.map(form => <option key={form.name} value={form.name}>{form.name}</option>)}
                </select>
                {selectedBeastform && (() => {
                    const form = ALL_BEASTFORMS.find(b=>b.name === selectedBeastform);
                    if (!form) return null;
                    const traitBonusString = form.traitBonus ? `${form.traitBonus.trait.charAt(0).toUpperCase() + form.traitBonus.trait.slice(1)} +${form.traitBonus.value}` : 'None';
                    return (
                        <div className="mt-4 p-4 bg-slate-700/50 rounded-lg border border-slate-700 space-y-3">
                            <div>
                                <h4 className="font-bold text-lg text-teal-300">{form.name}</h4>
                                <p className="text-sm text-slate-300 italic">{form.examples}</p>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-2 text-sm">
                                <div className="bg-slate-800/50 p-2 rounded">
                                    <div className="font-bold text-slate-400">Bonuses</div>
                                    <p className="font-mono text-slate-100">{traitBonusString} | Evasion +{form.evasionBonus}</p>
                                </div>
                                <div className="bg-slate-800/50 p-2 rounded">
                                    <div className="font-bold text-slate-400">Attack</div>
                                    <p className="text-sm text-slate-400 font-mono truncate">
                                        {form.attack.trait} | {form.attack.range} | {form.attack.damage}
                                    </p>
                                </div>
                            </div>

                            <div>
                                <h5 className="font-semibold text-slate-200">Advantages</h5>
                                <p className="text-sm text-slate-300">Gain advantage on: {form.advantages.join(', ')}.</p>
                            </div>

                            <div>
                                <h5 className="font-semibold text-slate-200">Features</h5>
                                <ul className="list-disc list-inside space-y-1 text-sm text-slate-300">
                                    {form.features.map(feature => (
                                        <li key={feature.name}>
                                            <span className="font-semibold">{feature.name}:</span> {feature.description}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    );
                })()}
            </Card>
        )}

        <Card title="Step 8: Domain Cards">
            <DomainSelector selectedClass={selectedClass} />
            <AbilitySelector
                selectedDomains={selectedClass.domains}
                selectedAbilities={charData.domainCards || ['', '']}
                onAbilitySelect={handleAbilitySelect}
            />
        </Card>

        <Card title="Step 9: Starting Inventory">
            <div className="space-y-4">
                <div>
                    <h4 className="font-semibold text-slate-300">You automatically get:</h4>
                    <ul className="list-disc list-inside text-slate-400">
                        <li>A torch, 50 feet of rope, basic supplies, and a handful of gold.</li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-semibold text-slate-300">Choose one potion:</h4>
                    <div className="flex gap-4 mt-2">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input type="radio" name="potion" value="Minor Health Potion" checked={potionChoice === 'Minor Health Potion'} onChange={e => setPotionChoice(e.target.value)} className="form-radio bg-slate-700 border-slate-600 text-teal-500 focus:ring-teal-500"/>
                            Minor Health Potion
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input type="radio" name="potion" value="Minor Stamina Potion" checked={potionChoice === 'Minor Stamina Potion'} onChange={e => setPotionChoice(e.target.value)} className="form-radio bg-slate-700 border-slate-600 text-teal-500 focus:ring-teal-500"/>
                            Minor Stamina Potion
                        </label>
                    </div>
                </div>

                <div>
                    <h4 className="font-semibold text-slate-300">Class Item:</h4>
                    {classItemOptions.length > 1 ? (
                        <div className="flex flex-col gap-2 mt-2">
                             {classItemOptions.map(item => (
                                 <label key={item} className="flex items-center gap-2 cursor-pointer">
                                     <input type="radio" name="class-item" value={item} checked={classItemChoice === item} onChange={e => setClassItemChoice(e.target.value)} className="form-radio bg-slate-700 border-slate-600 text-teal-500 focus:ring-teal-500"/>
                                     {item}
                                 </label>
                             ))}
                        </div>
                    ) : (
                        <p className="text-slate-400 mt-1">{selectedClass.items}</p>
                    )}
                </div>

                <div>
                    <label htmlFor="spell-item" className="font-semibold text-slate-300">Decide what you carry your spells in (e.g., songbook, journal):</label>
                    <input id="spell-item" type="text" value={spellItem} onChange={e => setSpellItem(e.target.value)} className="mt-2 w-full bg-slate-700 border border-slate-600 rounded-md py-2 px-3 text-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500" />
                </div>
            </div>
        </Card>
        
        {isEquipmentModalOpen && (
            <EquipmentSelectorModal 
                isOpen={isEquipmentModalOpen}
                onClose={() => setIsEquipmentModalOpen(false)}
                onConfirm={handleEquipmentConfirm}
                selectedClass={selectedClass}
                initialSelections={{
                    armor: charData.activeArmor,
                    primary: charData.primaryWeapon,
                    secondary: charData.secondaryWeapon
                }}
            />
        )}
        
        <div className="mt-8 flex justify-center items-center gap-4">
            <button 
                type="button" 
                onClick={onCancel}
                className="bg-slate-600 hover:bg-slate-500 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition duration-300"
            >
                Cancel
            </button>
            <button 
                type="submit" 
                disabled={!isFormValid}
                className="bg-teal-600 hover:bg-teal-500 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition duration-300 transform hover:scale-105 disabled:bg-slate-600 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
            >
                Create Character
            </button>
        </div>
        {!isFormValid && <p className="text-red-400 text-sm mt-2 text-center">Please fill out all required fields (*).</p>}
    </form>
  );
};

export default CharacterCreator;