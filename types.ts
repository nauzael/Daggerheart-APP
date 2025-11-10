// Fix: Removed self-import of 'SubclassFeature' that was conflicting with the local declaration.

// Fix: Moved SubclassFeature definition here to break a circular dependency and export it correctly.
export interface SubclassFeature {
    name: string;
    subclass: string;
    type: 'Foundation' | 'Specialization' | 'Mastery';
    description: string;
}

// Fix: Replaced the incorrect component definition with the correct type definitions.
export type TraitName = 'strength' | 'agility' | 'finesse' | 'instinct' | 'knowledge' | 'presence';

export interface Traits {
    strength: number;
    agility: number;
    finesse: number;
    instinct: number;
    knowledge: number;
    presence: number;
}

export interface Stat {
    max: number;
    current: number;
}

export interface Experience {
    name: string;
    modifier: number;
    description?: string;
}

export interface Weapon {
    name: string;
    trait: string;
    range: string;
    damage: string;
    burden: string;
    tier: number;
    feature?: string;
    type: 'Primary' | 'Secondary';
}

export interface Armor {
    name: string;
    baseThresholds: string;
    baseScore: number;
    tier: number;
    feature?: string;
}

export interface AncestryFeature {
    name: string;
    description: string;
}

export interface BeastForm {
    name: string;
    tier: number;
    examples: string;
    traitBonus?: {
        trait: TraitName;
        value: number;
    };
    evasionBonus: number;
    attack: {
        trait: TraitName;
        damage: string;
        range: string;
    };
    advantages: string[];
    features: { name: string; description: string }[];
}

export interface Character {
    id: string;
    name: string;
    level: number;
    class: string;
    subclass: string;
    ancestry: string;
    ancestryFeatures: AncestryFeature[];
    community: string;
    experiences: Experience[];
    traits: Traits;
    proficiency: number;
    hope: number;
    gold: number;
    bolsa: number;
    inventory: string[];
    domains: string[];
    domainCards: string[];
    vault: string[];
    notes: string[];
    hp: Stat;
    stress: Stat;
    armor: Stat;
    evasion: number;
    subclassFeatures: SubclassFeature[];
    abilityUsage: { [key: string]: boolean | number };
    primaryWeapon?: Weapon;
    secondaryWeapon?: Weapon;
    activeArmor?: Armor;
    beastForms?: BeastForm[];
    activeBeastFormName?: string;
    activeBeastformTraitBonus?: { trait: TraitName; value: number };
    isWolfFormActive?: boolean;
}