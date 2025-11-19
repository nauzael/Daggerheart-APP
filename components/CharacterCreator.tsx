
import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { Character, Experience, Weapon, Armor, AncestryFeature, BeastForm, MartialStance, Stat, TraitName } from '../types';
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
import { DOMAIN_CARDS, DomainCard } from '../data/domainCards';
import BeastformCard from './BeastformCard';
import StanceSelectorModal from './StanceSelectorModal';
import { MARTIAL_STANCES } from '../data/martialStances';
import { DaggerheartLogo } from './DaggerheartLogo';


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
    potions: 0,
    domainCards: ['', ''],
};

// Helper to determine the primary spellcasting trait for a class
const getSpellcastTrait = (char: Partial<Pick<Character, 'class'>>): TraitName => {
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
  const [isSummaryModalOpen, setIsSummaryModalOpen] = useState(false);
  const [patronDetails, setPatronDetails] = useState({ name: '', boon1: '', boon2: '' });
  const [isStanceModalOpen, setIsStanceModalOpen] = useState(false);
  const [selectedStances, setSelectedStances] = useState<string[]>([]);
  const [martialArtistFocus, setMartialArtistFocus] = useState<string>('');
  const [isChainingClassToSubclass, setIsChainingClassToSubclass] = useState(false);
  
  const [modalConfig, setModalConfig] = useState<{
      isOpen: boolean;
      type: 'class' | 'ancestry' | 'community' | 'first_ancestry' | 'second_ancestry' | 'subclass' | null;
  }>({ isOpen: false, type: null });
  
  const selectedClass = useMemo(() => CLASSES.find(c => c.name === charData.class) || CLASSES[0], [charData.class]);
  const tier1Beastforms = useMemo(() => ALL_BEASTFORMS.filter(b => b.tier === 1), []);
  
  useEffect(() => {
    if (isChainingClassToSubclass && charData.class) {
        openModal('subclass');
        setIsChainingClassToSubclass(false);
    }
  }, [charData.class, isChainingClassToSubclass]);

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
       if (selectedClass.name !== 'Warlock') {
            setPatronDetails({ name: '', boon1: '', boon2: '' });
       }
       if (charData.subclass !== 'Martial Artist') {
           setSelectedStances([]);
           setMartialArtistFocus('');
       }
  }, [selectedClass, classItemOptions, charData.subclass]);

  const isFormValid = useMemo(() => {
    const allTraitsAssigned = Object.keys(assignedTraits).length === TRAIT_NAMES.length && Object.values(assignedTraits).every(v => v !== '');
    const mixedAncestryValid = !isMixedAncestry || (isMixedAncestry && mixedAncestryName.trim() !== '');
    const classItemValid = classItemOptions.length === 1 || (classItemOptions.length > 1 && classItemChoice !== '');
    const druidFormValid = selectedClass.name !== 'Druid' || (selectedClass.name === 'Druid' && selectedBeastform !== '');
    const warlockValid = selectedClass.name !== 'Warlock' || (patronDetails.name.trim() !== '' && patronDetails.boon1.trim() !== '' && patronDetails.boon2.trim() !== '');
    const martialArtistValid = !(selectedClass.name === 'Brawler' && charData.subclass === 'Martial Artist') || (selectedStances.length === 2 && martialArtistFocus.trim() !== '' && Number(martialArtistFocus) >= 1 && Number(martialArtistFocus) <= 6);
    return charData.name?.trim() && charData.subclass && allTraitsAssigned && charData.domainCards?.filter(Boolean).length === 2 && charData.experiences?.every(e => e.name.trim()) && mixedAncestryValid && classItemValid && equipmentConfirmed && druidFormValid && warlockValid && martialArtistValid;
  }, [charData, assignedTraits, isMixedAncestry, mixedAncestryName, classItemChoice, classItemOptions, equipmentConfirmed, selectedClass.name, selectedBeastform, patronDetails, selectedStances, martialArtistFocus]);

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

  const handleApplySuggestedTraits = useCallback(() => {
    if (selectedClass?.suggestedTraits) {
        const newAssigned: Partial<Record<keyof Character['traits'], string>> = {};
        for (const trait in selectedClass.suggestedTraits) {
            const key = trait as keyof Character['traits'];
            const value = selectedClass.suggestedTraits[key as keyof typeof selectedClass.suggestedTraits];
            newAssigned[key] = String(value);
        }
        setAssignedTraits(newAssigned);
    }
  }, [selectedClass]);

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

  const handleFinalizeCharacter = () => {
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

    const finalAbilityUsage: { [key: string]: boolean | number } = {};
    const spellcastTraitName = getSpellcastTrait({ class: selectedClass.name });
    const selectedDomainCardNames = charData.domainCards!.filter(Boolean);
    const allCardsForUsage = DOMAIN_CARDS.filter(c => selectedDomainCardNames.includes(c.name));

    allCardsForUsage.forEach(card => {
        if (!card) return;
        const desc = card.description.toLowerCase();
        const startsFull = desc.includes('after a long rest') || desc.includes('at the beginning of a session');

        if (startsFull) {
            let maxValue: number | undefined;
            const tokenMatch = desc.match(/place a number of tokens equal to your (\w+)/);

            if (tokenMatch && tokenMatch[1]) {
                const attribute = tokenMatch[1] as TraitName | 'proficiency';
                maxValue = finalTraits[attribute] ?? 1; // proficiency is 1 at level 1
            } else if (card.name === 'Unleash Chaos' || card.name === 'Restoration') {
                maxValue = finalTraits[spellcastTraitName];
            } else if (card.name === 'Inspirational Words') {
                maxValue = finalTraits.presence;
            } else if (card.name === 'Fane of the Wilds') {
                const sageCardsCount = allCardsForUsage.filter(c => c?.domain === 'Sage').length;
                maxValue = sageCardsCount;
            }

            if (maxValue !== undefined) {
                finalAbilityUsage[card.name] = maxValue;
            }
        }
    });

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
        abilityUsage: finalAbilityUsage,
        subclassFeatures: foundationFeature ? [foundationFeature] : [],
        beastForms: finalBeastForms,
    } as Character;
    
    if (selectedClass.name === 'Warlock') {
        finalCharacter.patronName = patronDetails.name;
        finalCharacter.boons = [
            { name: patronDetails.boon1, value: 3 },
            { name: patronDetails.boon2, value: 3 }
        ];
        finalCharacter.favor = 2;
    }
    
    if (selectedClass.name === 'Brawler' && charData.subclass === 'Martial Artist') {
        finalCharacter.martialStances = MARTIAL_STANCES.filter(s => selectedStances.includes(s.name));
        const maxFocus = parseInt(martialArtistFocus, 10);
        finalCharacter.focus = { current: maxFocus, max: maxFocus };
    }

    onCharacterCreate(finalCharacter);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;
    setIsSummaryModalOpen(true);
  };


  const openModal = (type: 'class' | 'ancestry' | 'community' | 'first_ancestry' | 'second_ancestry' | 'subclass') => {
      setModalConfig({ isOpen: true, type });
  };
  const closeModal = () => setModalConfig({ isOpen: false, type: null });

  const handleModalConfirm = (selection: string) => {
      switch (modalConfig.type) {
          case 'class':
              if (selection !== charData.class) {
                  setIsChainingClassToSubclass(true);
                  handleClassChange(selection);
              }
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

  const renderConfirmationSummaryModal = () => {
    if (!isSummaryModalOpen) return null;

    // Helper components for detailed display
    const SummaryFeature: React.FC<{ title: string, name: string, description: string }> = ({ title, name, description }) => (
        <div className="bg-slate-700/50 p-3 rounded-lg">
            <p className="text-xs text-slate-400 font-semibold">{title}</p>
            <p className="font-bold text-slate-100">{name}</p>
            <p className="text-sm text-slate-400 mt-1">{description}</p>
        </div>
    );

    const SummaryEquipmentItem: React.FC<{ item: Weapon | Armor | undefined }> = ({ item }) => {
        if (!item) return null;
        const isWeapon = 'damage' in item;
        return (
             <div className="bg-slate-700/50 p-3 rounded-lg">
                <p className="font-bold text-slate-100">{item.name}</p>
                <div className="text-xs text-slate-400">
                    {isWeapon ? (
                        <span>Dmg: {(item as Weapon).damage} | Trait: {(item as Weapon).trait} | Range: {(item as Weapon).range}</span>
                    ) : (
                        <span>Score: {(item as Armor).baseScore} | Thresholds: {(item as Armor).baseThresholds}</span>
                    )}
                </div>
                {item.feature && <p className="text-xs text-slate-400 mt-1 italic">{item.feature}</p>}
            </div>
        );
    };

    const renderGrimoireDescription = (card: DomainCard) => {
        const spells = card.description.split('\n').filter(s => s.trim() !== '');
        return (
            <div className="mt-2 space-y-1 border-t border-slate-600/50 pt-2">
                {spells.map((spell, index) => {
                    const parts = spell.split(':');
                    const spellName = parts[0];
                    const spellDescription = parts.slice(1).join(':').trim();
                    return (
                        <div key={index} className="text-xs text-slate-400">
                            <span className="font-semibold text-slate-300">{spellName}:</span> {spellDescription}
                        </div>
                    );
                })}
            </div>
        );
    };
    
    // Calculate final data for summary display
    const finalTraits: Character['traits'] = { strength: 0, agility: 0, finesse: 0, instinct: 0, knowledge: 0, presence: 0 };
    Object.entries(assignedTraits).forEach(([trait, value]) => {
        finalTraits[trait as keyof Character['traits']] = Number(value);
    });

    const armor = charData.activeArmor || { baseScore: 0 };
    const foundationFeature = SUBCLASS_FEATURES.find(f => f.subclass === charData.subclass && f.type === 'Foundation');
    const communityData = COMMUNITIES.find(c => c.name === charData.community);

    let finalAncestryName = isMixedAncestry ? mixedAncestryName : charData.ancestry!;
    let finalAncestryFeatures: AncestryFeature[] = [];
    if (isMixedAncestry) {
        const ancestry1 = ANCESTRIES.find(a => a.name === firstAncestry);
        const ancestry2 = ANCESTRIES.find(a => a.name === secondAncestry);
        if (ancestry1 && ancestry2) {
            finalAncestryFeatures = [ancestry1.features[0], ancestry2.features[1]];
        }
    } else {
        const ancestryData = ANCESTRIES.find(a => a.name === charData.ancestry);
        if (ancestryData) finalAncestryFeatures = ancestryData.features;
    }

    const selectedDomainCards = DOMAIN_CARDS.filter(card => charData.domainCards?.includes(card.name));
    const beastformDetails = selectedClass.name === 'Druid' ? ALL_BEASTFORMS.find(b => b.name === selectedBeastform) : undefined;
    const finalMartialStances = selectedClass.name === 'Brawler' && charData.subclass === 'Martial Artist'
        ? MARTIAL_STANCES.filter(s => selectedStances.includes(s.name))
        : [];

    const finalInventory = ["A torch", "50 feet of rope", "Basic supplies"];
    if (potionChoice) finalInventory.push(potionChoice);
    if (classItemChoice) finalInventory.push(classItemChoice);
    if (spellItem.trim()) finalInventory.push(`Spells carried in: ${spellItem.trim()}`);

    return (
      <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4 animate-fade-in">
        <div className="bg-slate-800 rounded-lg shadow-xl p-4 sm:p-6 border border-slate-700 w-full max-w-4xl max-h-[90vh] flex flex-col">
          <div className="flex justify-between items-center mb-4 flex-shrink-0">
            <h2 className="text-3xl font-bold text-teal-400">Character Summary</h2>
            <button onClick={() => setIsSummaryModalOpen(false)} className="text-slate-400 hover:text-white text-3xl leading-none">&times;</button>
          </div>

          <div className="overflow-y-auto pr-2 space-y-6 text-slate-300">
            {/* Main Info */}
            <div className="bg-slate-700/50 p-4 rounded-lg">
                <h3 className="text-2xl font-bold text-center text-slate-100">{charData.name}</h3>
                <p className="text-center text-slate-400">
                    {finalAncestryName} {communityData?.name} | Level 1 {selectedClass.name} ({charData.subclass})
                </p>
            </div>
            {/* Stats & Traits */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <h3 className="text-xl font-semibold text-slate-200 mb-2">Combat Stats</h3>
                    <div className="grid grid-cols-3 gap-3 text-center">
                         <div className="bg-slate-700 p-3 rounded-lg"><p className="text-sm text-slate-400">HP</p><p className="text-2xl font-bold text-slate-100">{selectedClass.startingHP}</p></div>
                         <div className="bg-slate-700 p-3 rounded-lg"><p className="text-sm text-slate-400">Evasion</p><p className="text-2xl font-bold text-slate-100">{selectedClass.startingEvasion}</p></div>
                         <div className="bg-slate-700 p-3 rounded-lg"><p className="text-sm text-slate-400">Armor</p><p className="text-2xl font-bold text-slate-100">{armor.baseScore}</p></div>
                    </div>
                </div>
                 <div>
                    <h3 className="text-xl font-semibold text-slate-200 mb-2">Traits</h3>
                    <div className="grid grid-cols-3 gap-3">
                        {TRAIT_NAMES.map(trait => (
                            <div key={trait} className="bg-slate-700 p-2 rounded-lg text-center">
                                <p className="text-sm text-slate-400 capitalize">{trait}</p>
                                <p className="text-xl font-bold text-teal-300">{finalTraits[trait] > 0 ? `+${finalTraits[trait]}` : finalTraits[trait]}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Features */}
             <div>
                <h3 className="text-xl font-semibold text-slate-200 mb-2">Features</h3>
                <div className="space-y-3">
                    {foundationFeature && <SummaryFeature title="Foundation Feature" name={foundationFeature.name} description={foundationFeature.description} />}
                    {finalAncestryFeatures.map(f => <SummaryFeature key={f.name} title="Ancestry Feature" name={f.name} description={f.description} />)}
                    {communityData && <SummaryFeature title="Community Feature" name={communityData.feature.name} description={communityData.feature.description} />}
                </div>
             </div>

            {/* Equipment & Experiences */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <h3 className="text-xl font-semibold text-slate-200 mb-2">Equipment</h3>
                    <div className="space-y-2">
                        <SummaryEquipmentItem item={charData.activeArmor} />
                        <SummaryEquipmentItem item={charData.primaryWeapon} />
                        <SummaryEquipmentItem item={charData.secondaryWeapon} />
                    </div>
                </div>
                 <div>
                    <h3 className="text-xl font-semibold text-slate-200 mb-2">Starting Inventory</h3>
                    <ul className="list-disc list-inside text-sm text-slate-400 space-y-1 bg-slate-700/50 p-3 rounded-lg">
                        {finalInventory.map((item, i) => <li key={i}>{item}</li>)}
                    </ul>
                </div>
            </div>

            {/* Experiences & Domain Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <h3 className="text-xl font-semibold text-slate-200 mb-2">Experiences</h3>
                    <div className="space-y-2">
                        {charData.experiences?.map((exp, i) => (
                             <div key={i} className="bg-slate-700/50 p-3 rounded-lg">
                                <p className="font-bold text-slate-100">{exp.name} <span className="font-mono text-teal-300 text-sm">(+2)</span></p>
                                {exp.description && <p className="text-sm text-slate-400 mt-1 italic">{exp.description}</p>}
                            </div>
                        ))}
                    </div>
                </div>
                <div>
                    <h3 className="text-xl font-semibold text-slate-200 mb-2">Domain Cards</h3>
                    <div className="space-y-2">
                        {selectedDomainCards.map(card => (
                            <div key={card.name} className="bg-slate-700/50 p-3 rounded-lg">
                                <p className="font-bold text-slate-100">{card.name}</p>
                                <p className="text-xs text-slate-400 font-mono">{card.domain} / {card.type}</p>
                                {card.type === 'Grimoire'
                                  ? renderGrimoireDescription(card)
                                  : card.description && <p className="text-sm text-slate-400 mt-2 border-t border-slate-600/50 pt-2">{card.description}</p>
                                }
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            
            {beastformDetails && (
                <div>
                    <h3 className="text-xl font-semibold text-slate-200 mb-2">Starting Beastform</h3>
                    <BeastformCard form={beastformDetails} />
                </div>
            )}
            
            {finalMartialStances.length > 0 && (
                 <div>
                    <h3 className="text-xl font-semibold text-slate-200 mb-2">Starting Martial Stances & Focus</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div className="bg-slate-700 p-3 rounded-lg sm:col-span-1 text-center">
                            <p className="text-sm text-slate-400">Initial Focus</p>
                            <p className="text-2xl font-bold text-teal-300">{parseInt(martialArtistFocus, 10)}</p>
                        </div>
                        <div className="space-y-2 sm:col-span-2">
                            {finalMartialStances.map(stance => (
                                <div key={stance.name} className="bg-slate-700/50 p-3 rounded-lg">
                                    <p className="font-bold text-slate-100">{stance.name}</p>
                                    <p className="text-sm text-slate-400 mt-1">{stance.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}


            {notes.trim() && (
                 <div>
                    <h3 className="text-xl font-semibold text-slate-200 mb-2">Notes & Background</h3>
                    <p className="text-sm text-slate-400 whitespace-pre-wrap bg-slate-700/50 p-3 rounded-lg">{notes}</p>
                </div>
            )}
          </div>
          <div className="flex justify-center gap-4 pt-6 mt-auto flex-shrink-0">
            <button onClick={() => setIsSummaryModalOpen(false)} className="bg-slate-600 hover:bg-slate-500 text-white font-bold py-3 px-8 rounded-lg">
              Edit
            </button>
            <button onClick={handleFinalizeCharacter} className="bg-green-600 hover:bg-green-500 text-white font-bold py-3 px-8 rounded-lg">
              Finalize Character
            </button>
          </div>
        </div>
      </div>
    );
  };


  return (
    <form onSubmit={handleSubmit} className="space-y-6">
        <div className="text-center mb-6 pt-4">
            <div className="inline-block mx-auto mb-2">
                <DaggerheartLogo />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-100 tracking-tight">
              Create Character
            </h1>
        </div>

        {renderModal()}
        {renderConfirmationSummaryModal()}
        {isStanceModalOpen && (
            <StanceSelectorModal
                availableStances={MARTIAL_STANCES.filter(s => s.tier === 1)}
                onClose={() => setIsStanceModalOpen(false)}
                onConfirm={(stances) => setSelectedStances(stances)}
                title="Select Starting Stances"
                selectionLimit={2}
            />
        )}
        <div className="grid grid-cols-1 md:grid-cols-10 gap-6">
            {/* Left Column (30%) */}
            <div className="md:col-span-3 space-y-6">
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
                     {selectedClass.name === 'Warlock' && (
                        <div className="mt-4 pt-4 border-t border-slate-700 space-y-3 animate-fade-in">
                            <h4 className="text-md font-bold text-slate-300">Patron Details*</h4>
                            <div>
                                <label className="block text-xs font-bold mb-1 text-slate-400">Patron Name</label>
                                <input
                                    type="text"
                                    placeholder="e.g., The Keeper of Secrets"
                                    value={patronDetails.name}
                                    onChange={(e) => setPatronDetails(p => ({ ...p, name: e.target.value }))}
                                    className="w-full bg-slate-700 border border-slate-600 rounded-md py-2 px-3 text-slate-200"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs font-bold mb-1 text-slate-400">Boon 1 Name (Sphere of Influence)</label>
                                    <input
                                        type="text"
                                        placeholder="e.g., Deception"
                                        value={patronDetails.boon1}
                                        onChange={(e) => setPatronDetails(p => ({ ...p, boon1: e.target.value }))}
                                        className="w-full bg-slate-700 border border-slate-600 rounded-md py-2 px-3 text-slate-200"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold mb-1 text-slate-400">Boon 2 Name (Sphere of Influence)</label>
                                    <input
                                        type="text"
                                        placeholder="e.g., Persuasion"
                                        value={patronDetails.boon2}
                                        onChange={(e) => setPatronDetails(p => ({ ...p, boon2: e.target.value }))}
                                        className="w-full bg-slate-700 border border-slate-600 rounded-md py-2 px-3 text-slate-200"
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                     {selectedClass.name === 'Brawler' && charData.subclass === 'Martial Artist' && (
                        <div className="mt-4 pt-4 border-t border-slate-700 space-y-3 animate-fade-in">
                            <div className="flex justify-between items-center">
                                <h4 className="text-md font-bold text-slate-300">Martial Stances*</h4>
                                <span className={`font-mono px-2 py-0.5 rounded text-xs ${selectedStances.length === 2 ? 'bg-green-500 text-white' : 'bg-slate-700 text-slate-300'}`}>
                                    {selectedStances.length} / 2
                                </span>
                            </div>
                            <button
                                type="button"
                                onClick={() => setIsStanceModalOpen(true)}
                                className="w-full bg-sky-600 hover:bg-sky-500 text-white font-bold py-2 px-4 rounded-lg"
                            >
                                Select Stances
                            </button>
                            {selectedStances.length > 0 && (
                                <ul className="text-sm text-slate-400 list-disc list-inside">
                                    {selectedStances.map(s => <li key={s}>{s}</li>)}
                                </ul>
                            )}
                             <div className="mt-4 pt-4 border-t border-slate-700">
                                <h4 className="text-md font-bold text-slate-300">Initial Focus*</h4>
                                <p className="text-xs text-slate-400 mb-2">Roll a number of d6s equal to your Instinct. Your Focus is the highest value rolled.</p>
                                <input
                                    type="number"
                                    min="1"
                                    max="6"
                                    placeholder="Enter highest d6 roll"
                                    value={martialArtistFocus}
                                    onChange={(e) => setMartialArtistFocus(e.target.value)}
                                    className="w-full bg-slate-700 border border-slate-600 rounded-md py-2 px-3 text-slate-200"
                                />
                            </div>
                        </div>
                    )}
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
                    <div className="my-4 flex justify-center">
                        <button
                            type="button"
                            onClick={handleApplySuggestedTraits}
                            disabled={!charData.class}
                            className="bg-sky-600 hover:bg-sky-500 text-white font-bold py-2 px-6 rounded-lg transition-colors disabled:bg-slate-600 disabled:cursor-not-allowed"
                        >
                            Apply Suggested Traits for {selectedClass.name}
                        </button>
                    </div>
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
            </div>

            {/* Right Column (70%) */}
            <div className="md:col-span-7 space-y-6">
                <Card title="Step 4 & 5: Stats & Equipment">
                    <div className="flex flex-col gap-4">
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
            </div>
        </div>
        
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
