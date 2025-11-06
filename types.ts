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

export interface SubclassFeature {
  name: string;
  type: 'Foundation' | 'Specialization' | 'Mastery';
  subclass: string;
  description: string;
}

export interface Character {
  name: string;
  level: number;
  class: string;
  subclass: string;
  ancestry: string;
  community: string;
  experiences: Experience[];
  domains: string[]; // Names of the two domains from the class
  traits: {
    strength: number;
    agility: number;
    finesse: number;
    instinct: number;
    knowledge: number;
    presence: number;
  };
  evasion: number;
  proficiency: number;
  hp: { current: number; max: number };
  stress: { current: number; max: number };
  armor: { current: number; max: number };
  hope: number;
  gold: number;
  inventory: string[];
  domainCards: string[]; // Names of the chosen cards
  subclassFeatures: SubclassFeature[];
  notes: string; 
  
  primaryWeapon?: Weapon;
  secondaryWeapon?: Weapon;
  activeArmor?: Armor;
}

export type TraitName = keyof Character['traits'];