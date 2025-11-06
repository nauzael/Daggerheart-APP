import { Armor, Weapon } from '../types';

// TIER 1
const ARMORS_T1: Armor[] = [
    { name: 'Gambeson Armor', baseThresholds: '5/11', baseScore: 3, tier: 1, feature: 'Flexible: +1 to Evasion' },
    { name: 'Leather Armor', baseThresholds: '6/13', baseScore: 3, tier: 1 },
    { name: 'Chainmail Armor', baseThresholds: '7/15', baseScore: 4, tier: 1, feature: 'Heavy: -1 to Evasion' },
    { name: 'Full Plate Armor', baseThresholds: '8/17', baseScore: 4, tier: 1, feature: 'Very Heavy: -2 to Evasion; -1 to Agility' }
];

const PRIMARY_WEAPONS_T1: Weapon[] = [
    { name: 'Broadsword', trait: 'Agility', range: 'Melee', damage: 'd8 phy', burden: 'One-Handed', tier: 1, feature: 'Reliable: +1 to attack rolls', type: 'Primary' },
    { name: 'Longsword', trait: 'Agility', range: 'Melee', damage: 'd10+3 phy', burden: 'Two-Handed', tier: 1, type: 'Primary' },
    { name: 'Battleaxe', trait: 'Strength', range: 'Melee', damage: 'd10+3 phy', burden: 'Two-Handed', tier: 1, type: 'Primary' },
    { name: 'Greatsword', trait: 'Strength', range: 'Melee', damage: 'd10+3 phy', burden: 'Two-Handed', tier: 1, feature: 'Massive: -1 to Evasion; on a successful attack, roll an additional damage die and discard the lowest result.', type: 'Primary' },
    { name: 'Mace', trait: 'Strength', range: 'Melee', damage: 'd8+1 phy', burden: 'One-Handed', tier: 1, type: 'Primary' },
    { name: 'Warhammer', trait: 'Strength', range: 'Melee', damage: 'd12+3 phy', burden: 'Two-Handed', tier: 1, feature: 'Heavy: -1 to Evasion', type: 'Primary' },
    { name: 'Dagger', trait: 'Finesse', range: 'Melee', damage: 'd8+1 phy', burden: 'One-Handed', tier: 1, type: 'Primary' },
    { name: 'Quarterstaff', trait: 'Instinct', range: 'Melee', damage: 'd10+3 phy', burden: 'Two-Handed', tier: 1, type: 'Primary' },
    { name: 'Cutlass', trait: 'Presence', range: 'Melee', damage: 'd8+1 phy', burden: 'One-Handed', tier: 1, type: 'Primary' },
    { name: 'Rapier', trait: 'Presence', range: 'Melee', damage: 'd8 phy', burden: 'One-Handed', tier: 1, feature: 'Quick: When you make an attack, you can mark a Stress to target another creature within range.', type: 'Primary' },
    { name: 'Halberd', trait: 'Strength', range: 'Very Close', damage: 'd10+2 phy', burden: 'Two-Handed', tier: 1, feature: 'Cumbersome: -1 to Finesse', type: 'Primary' },
    { name: 'Spear', trait: 'Finesse', range: 'Very Close', damage: 'd8+3 phy', burden: 'Two-Handed', tier: 1, type: 'Primary' },
    { name: 'Shortbow', trait: 'Agility', range: 'Far', damage: 'd6+3 phy', burden: 'Two-Handed', tier: 1, type: 'Primary' },
    { name: 'Crossbow', trait: 'Finesse', range: 'Far', damage: 'd6+1 phy', burden: 'One-Handed', tier: 1, type: 'Primary' },
    { name: 'Longbow', trait: 'Agility', range: 'Very Far', damage: 'd8+3 phy', burden: 'Two-Handed', tier: 1, feature: 'Cumbersome: -1 to Finesse', type: 'Primary' },
    { name: 'Arcane Gauntlets', trait: 'Strength', range: 'Melee', damage: 'd10+3 mag', burden: 'Two-Handed', tier: 1, type: 'Primary' },
    { name: 'Hallowed Axe', trait: 'Strength', range: 'Melee', damage: 'd8+1 mag', burden: 'One-Handed', tier: 1, type: 'Primary' },
    { name: 'Glowing Rings', trait: 'Agility', range: 'Very Close', damage: 'd10+2 mag', burden: 'Two-Handed', tier: 1, type: 'Primary' },
    { name: 'Hand Runes', trait: 'Instinct', range: 'Very Close', damage: 'd10 mag', burden: 'One-Handed', tier: 1, type: 'Primary' },
    { name: 'Returning Blade', trait: 'Finesse', range: 'Close', damage: 'd8 mag', burden: 'One-Handed', tier: 1, feature: 'Returning: When this weapon is thrown within its range, it appears in your hand immediately after the attack.', type: 'Primary' },
    { name: 'Shortstaff', trait: 'Instinct', range: 'Close', damage: 'd8+1 mag', burden: 'One-Handed', tier: 1, type: 'Primary' },
    { name: 'Dualstaff', trait: 'Instinct', range: 'Far', damage: 'd6+3 mag', burden: 'Two-Handed', tier: 1, type: 'Primary' },
    { name: 'Scepter', trait: 'Presence', range: 'Far', damage: 'd6 mag', burden: 'Two-Handed', tier: 1, feature: 'Versatile: This weapon can also be used with these statistics—Presence, Melee, d8.', type: 'Primary' },
    { name: 'Wand', trait: 'Knowledge', range: 'Far', damage: 'd6+1 mag', burden: 'One-Handed', tier: 1, type: 'Primary' },
    { name: 'Greatstaff', trait: 'Knowledge', range: 'Very Far', damage: 'd6 mag', burden: 'Two-Handed', tier: 1, feature: 'Powerful: On a successful attack, roll an additional damage die and discard the lowest result.', type: 'Primary' },
    // Combat Wheelchairs T1
    { name: 'Light-Frame Wheelchair', trait: 'Agility', range: 'Melee', damage: 'd8 phy', burden: 'One-Handed', tier: 1, feature: 'Quick: When you make an attack, you can mark a Stress to target another creature within range.', type: 'Primary' },
    { name: 'Heavy-Frame Wheelchair', trait: 'Strength', range: 'Melee', damage: 'd12+3 phy', burden: 'Two-Handed', tier: 1, feature: 'Heavy: -1 to Evasion', type: 'Primary' },
    { name: 'Arcane-Frame Wheelchair', trait: 'Spellcast', range: 'Far', damage: 'd6 mag', burden: 'One-Handed', tier: 1, feature: 'Reliable: +1 to attack rolls', type: 'Primary' },
];

const SECONDARY_WEAPONS_T1: Weapon[] = [
    { name: 'Shortsword', trait: 'Agility', range: 'Melee', damage: 'd8 phy', burden: 'One-Handed', tier: 1, feature: 'Paired: +2 to primary weapon damage to targets within Melee range', type: 'Secondary' },
    { name: 'Round Shield', trait: 'Strength', range: 'Melee', damage: 'd4 phy', burden: 'One-Handed', tier: 1, feature: 'Protective: +1 to Armor Score', type: 'Secondary' },
    { name: 'Tower Shield', trait: 'Strength', range: 'Melee', damage: 'd6 phy', burden: 'One-Handed', tier: 1, feature: 'Barrier: +2 to Armor Score; -1 to Evasion', type: 'Secondary' },
    { name: 'Small Dagger', trait: 'Finesse', range: 'Melee', damage: 'd8 phy', burden: 'One-Handed', tier: 1, feature: 'Paired: +2 to primary weapon damage to targets within Melee range', type: 'Secondary' },
    { name: 'Whip', trait: 'Presence', range: 'Very Close', damage: 'd6 phy', burden: 'One-Handed', tier: 1, feature: 'Startling: Mark a Stress to crack the whip and force all adversaries within Melee range back to Close range.', type: 'Secondary' },
    { name: 'Grappler', trait: 'Finesse', range: 'Close', damage: 'd6 phy', burden: 'One-Handed', tier: 1, feature: 'Hooked: On a successful attack, you can pull the target into Melee range.', type: 'Secondary' },
    { name: 'Hand Crossbow', trait: 'Finesse', range: 'Far', damage: 'd6+1 phy', burden: 'One-Handed', tier: 1, type: 'Secondary' },
];

// TIER 2
const ARMORS_T2: Armor[] = [
    { name: 'Improved Gambeson Armor', baseThresholds: '7/16', baseScore: 4, tier: 2, feature: 'Flexible: +1 to Evasion' },
    { name: 'Improved Leather Armor', baseThresholds: '9/20', baseScore: 4, tier: 2 },
    { name: 'Improved Chainmail Armor', baseThresholds: '11/24', baseScore: 5, tier: 2, feature: 'Heavy: -1 to Evasion' },
    { name: 'Improved Full Plate Armor', baseThresholds: '13/28', baseScore: 5, tier: 2, feature: 'Very Heavy: -2 to Evasion; -1 to Agility' },
];

const PRIMARY_WEAPONS_T2: Weapon[] = [
    { name: 'Improved Greatsword', trait: 'Strength', range: 'Melee', damage: 'd10+6 phy', burden: 'Two-Handed', tier: 2, feature: 'Massive: -1 to Evasion; on a successful attack, roll an additional damage die and discard the lowest result.', type: 'Primary' },
    { name: 'Gilded Falchion', trait: 'Strength', range: 'Melee', damage: 'd10+4 phy', burden: 'One-Handed', tier: 2, feature: 'Powerful: On a successful attack, roll an additional damage die and discard the lowest result.', type: 'Primary' },
];

const SECONDARY_WEAPONS_T2: Weapon[] = [
    { name: 'Spiked Shield', trait: 'Strength', range: 'Melee', damage: 'd6+2 phy', burden: 'One-Handed', tier: 2, feature: 'Double Duty: +1 to Armor Score; +1 to primary weapon damage within Melee range', type: 'Secondary' },
    { name: 'Parrying Dagger', trait: 'Finesse', range: 'Melee', damage: 'd6+2 phy', burden: 'One-Handed', tier: 2, feature: 'Parry: When you are attacked, roll this weapon\'s damage dice. If any of the attacker\'s damage dice rolled the same value, the matching results are discarded.', type: 'Secondary' },
];

// TIER 3
const ARMORS_T3: Armor[] = [
    { name: 'Advanced Gambeson Armor', baseThresholds: '9/23', baseScore: 5, tier: 3, feature: 'Flexible: +1 to Evasion' },
    { name: 'Advanced Leather Armor', baseThresholds: '11/27', baseScore: 5, tier: 3 },
    { name: 'Advanced Chainmail Armor', baseThresholds: '13/31', baseScore: 6, tier: 3, feature: 'Heavy: -1 to Evasion' },
    { name: 'Advanced Full Plate Armor', baseThresholds: '15/35', baseScore: 6, tier: 3, feature: 'Very Heavy: -2 to Evasion; -1 to Agility' },
];

const PRIMARY_WEAPONS_T3: Weapon[] = [
    { name: 'Advanced Greatsword', trait: 'Strength', range: 'Melee', damage: 'd10+9 phy', burden: 'Two-Handed', tier: 3, feature: 'Massive: -1 to Evasion; on a successful attack, roll an additional damage die and discard the lowest result.', type: 'Primary' },
    { name: 'Flickerfly Blade', trait: 'Agility', range: 'Melee', damage: 'd8+5 phy', burden: 'One-Handed', tier: 3, feature: 'Sharpwing: Gain a bonus to your damage rolls equal to your Agility.', type: 'Primary' },
];

const SECONDARY_WEAPONS_T3: Weapon[] = [
    { name: 'Advanced Whip', trait: 'Presence', range: 'Very Close', damage: 'd6+4 phy', burden: 'One-Handed', tier: 3, feature: 'Startling: Mark a Stress to crack the whip and force all adversaries within Melee range back to Close range.', type: 'Secondary' },
    { name: 'Powered Gauntlet', trait: 'Knowledge', range: 'Close', damage: 'd6+4 phy', burden: 'One-Handed', tier: 3, feature: 'Charged: Mark a Stress to gain a +1 bonus to your Proficiency on a primary weapon attack.', type: 'Secondary' },
];


// TIER 4
const ARMORS_T4: Armor[] = [
    { name: 'Legendary Gambeson Armor', baseThresholds: '11/32', baseScore: 6, tier: 4, feature: 'Flexible: +1 to Evasion' },
    { name: 'Legendary Leather Armor', baseThresholds: '13/36', baseScore: 6, tier: 4 },
    { name: 'Legendary Chainmail Armor', baseThresholds: '15/40', baseScore: 7, tier: 4, feature: 'Heavy: -1 to Evasion' },
    { name: 'Legendary Full Plate Armor', baseThresholds: '17/44', baseScore: 7, tier: 4, feature: 'Very Heavy: -2 to Evasion; -1 to Agility' },
];

const PRIMARY_WEAPONS_T4: Weapon[] = [
    { name: 'Legendary Greatsword', trait: 'Strength', range: 'Melee', damage: 'd10+12 phy', burden: 'Two-Handed', tier: 4, feature: 'Massive: -1 to Evasion; on a successful attack, roll an additional damage die and discard the lowest result.', type: 'Primary' },
    { name: 'Sledge Axe', trait: 'Strength', range: 'Melee', damage: 'd12+13 phy', burden: 'Two-Handed', tier: 4, feature: 'Destructive: -1 to Agility; on a successful attack, all adversaries within Very Close range must mark a Stress.', type: 'Primary' },
];

const SECONDARY_WEAPONS_T4: Weapon[] = [
    { name: 'Legendary Whip', trait: 'Presence', range: 'Very Close', damage: 'd6+6 phy', burden: 'One-Handed', tier: 4, feature: 'Startling: Mark a Stress to crack the whip and force all adversaries within Melee range back to Close range.', type: 'Secondary' },
    { name: 'Braveshield', trait: 'Agility', range: 'Melee', damage: 'd4+6 phy', burden: 'One-Handed', tier: 4, feature: 'Sheltering: When you mark an Armor Slot, it reduces damage for you and all allies within Melee range of you who took the same damage.', type: 'Secondary' },
];

export const ALL_ARMORS: Armor[] = [...ARMORS_T1, ...ARMORS_T2, ...ARMORS_T3, ...ARMORS_T4];
export const ALL_PRIMARY_WEAPONS: Weapon[] = [...PRIMARY_WEAPONS_T1, ...PRIMARY_WEAPONS_T2, ...PRIMARY_WEAPONS_T3, ...PRIMARY_WEAPONS_T4];
export const ALL_SECONDARY_WEAPONS: Weapon[] = [...SECONDARY_WEAPONS_T1, ...SECONDARY_WEAPONS_T2, ...SECONDARY_WEAPONS_T3, ...SECONDARY_WEAPONS_T4];

// For initial creation
export const ARMORS = ARMORS_T1;
export const PRIMARY_WEAPONS = PRIMARY_WEAPONS_T1;
export const SECONDARY_WEAPONS = SECONDARY_WEAPONS_T1;
