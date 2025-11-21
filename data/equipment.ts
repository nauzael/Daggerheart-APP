
import { Armor, Weapon } from '../types';

// TIER 1
const ARMORS_T1: Armor[] = [
    { name: 'Gambeson Armor', baseThresholds: '5/11', baseScore: 3, tier: 1, feature: 'Flexible: +1 to Evasion' },
    { name: 'Leather Armor', baseThresholds: '6/13', baseScore: 3, tier: 1 },
    { name: 'Chainmail Armor', baseThresholds: '7/15', baseScore: 4, tier: 1, feature: 'Heavy: -1 to Evasion' },
    { name: 'Full Plate Armor', baseThresholds: '8/17', baseScore: 4, tier: 1, feature: 'Very Heavy: -2 to Evasion; -1 to Agility' }
];

const PRIMARY_WEAPONS_T1: Weapon[] = [
    // Physical
    { name: 'Broadsword', trait: 'Agility', range: 'Melee', damage: 'd8 phy', burden: 'One-Handed', tier: 1, feature: 'Reliable: +1 to attack rolls', type: 'Primary' },
    { name: 'Longsword', trait: 'Agility', range: 'Melee', damage: 'd8+3 phy', burden: 'Two-Handed', tier: 1, type: 'Primary' },
    { name: 'Battleaxe', trait: 'Strength', range: 'Melee', damage: 'd10+3 phy', burden: 'Two-Handed', tier: 1, type: 'Primary' },
    { name: 'Greatsword', trait: 'Strength', range: 'Melee', damage: 'd10+3 phy', burden: 'Two-Handed', tier: 1, feature: 'Massive: -1 to Evasion; on a successful attack, roll an additional damage die and discard the lowest result.', type: 'Primary' },
    { name: 'Mace', trait: 'Strength', range: 'Melee', damage: 'd8+1 phy', burden: 'One-Handed', tier: 1, type: 'Primary' },
    { name: 'Warhammer', trait: 'Strength', range: 'Melee', damage: 'd12+3 phy', burden: 'Two-Handed', tier: 1, feature: 'Heavy: -1 to Evasion', type: 'Primary' },
    { name: 'Dagger', trait: 'Finesse', range: 'Melee', damage: 'd8+1 phy', burden: 'One-Handed', tier: 1, type: 'Primary' },
    { name: 'Quarterstaff', trait: 'Instinct', range: 'Melee', damage: 'd10+3 phy', burden: 'Two-Handed', tier: 1, type: 'Primary' },
    { name: 'Cutlass', trait: 'Presence', range: 'Melee', damage: 'd8+1 phy', burden: 'One-Handed', tier: 1, type: 'Primary' },
    { name: 'Rapier', trait: 'Presence', range: 'Melee', damage: 'd8 phy', burden: 'One-Handed', tier: 1, feature: 'Quick: When you make an attack, you can mark a Stress to target another creature within range.', type: 'Primary' },
    { name: 'Halberd', trait: 'Strength', range: 'Very Close', damage: 'd10+2 phy', burden: 'Two-Handed', tier: 1, feature: 'Cumbersome: -1 to Finesse', type: 'Primary' },
    { name: 'Spear', trait: 'Finesse', range: 'Very Close', damage: 'd10+2 phy', burden: 'Two-Handed', tier: 1, feature: 'Cumbersome: -1 to Finesse', type: 'Primary' },
    { name: 'Shortbow', trait: 'Agility', range: 'Far', damage: 'd6+3 phy', burden: 'Two-Handed', tier: 1, type: 'Primary' },
    { name: 'Crossbow', trait: 'Finesse', range: 'Far', damage: 'd6+1 phy', burden: 'One-Handed', tier: 1, type: 'Primary' },
    { name: 'Longbow', trait: 'Agility', range: 'Very Far', damage: 'd8+3 phy', burden: 'Two-Handed', tier: 1, feature: 'Cumbersome: -1 to Finesse', type: 'Primary' },
    // Magic
    { name: 'Arcane Gauntlets', trait: 'Strength', range: 'Melee', damage: 'd10+3 mag', burden: 'Two-Handed', tier: 1, type: 'Primary' },
    { name: 'Hallowed Axe', trait: 'Strength', range: 'Melee', damage: 'd8+1 mag', burden: 'One-Handed', tier: 1, type: 'Primary' },
    { name: 'Glowing Rings', trait: 'Agility', range: 'Very Close', damage: 'd10+1 mag', burden: 'Two-Handed', tier: 1, type: 'Primary' },
    { name: 'Hand Runes', trait: 'Instinct', range: 'Very Close', damage: 'd10 mag', burden: 'One-Handed', tier: 1, type: 'Primary' },
    { name: 'Returning Blade', trait: 'Finesse', range: 'Close', damage: 'd8 mag', burden: 'One-Handed', tier: 1, feature: 'Returning: When this weapon is thrown within its range, it appears in your hand immediately after the attack.', type: 'Primary' },
    { name: 'Shortstaff', trait: 'Instinct', range: 'Close', damage: 'd8+1 mag', burden: 'One-Handed', tier: 1, type: 'Primary' },
    { name: 'Dualstaff', trait: 'Instinct', range: 'Far', damage: 'd6+3 mag', burden: 'Two-Handed', tier: 1, type: 'Primary' },
    { name: 'Scepter', trait: 'Presence', range: 'Far', damage: 'd6 mag', burden: 'Two-Handed', tier: 1, feature: 'Versatile: This weapon can also be used with these statistics—Presence, Melee, d8.', type: 'Primary' },
    { name: 'Wand', trait: 'Knowledge', range: 'Far', damage: 'd6+1 mag', burden: 'One-Handed', tier: 1, type: 'Primary' },
    { name: 'Greatstaff', trait: 'Knowledge', range: 'Very Far', damage: 'd6 mag', burden: 'Two-Handed', tier: 1, feature: 'Powerful: On a successful attack, roll an additional damage die and discard the lowest result.', type: 'Primary' },
    // Wheelchairs
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
    { name: 'Elundrian Chain Armor', baseThresholds: '9/21', baseScore: 4, tier: 2, feature: 'Warded: You reduce incoming magic damage by your Armor Score before applying it to your damage thresholds.' },
    { name: 'Harrowbone Armor', baseThresholds: '9/21', baseScore: 4, tier: 2, feature: 'Resilient: Before you mark your last Armor Slot, roll a d6. On a result of 6, reduce the severity by one threshold without marking an Armor Slot.' },
    { name: 'Irontree Breastplate Armor', baseThresholds: '9/20', baseScore: 4, tier: 2, feature: 'Reinforced: When you mark your last Armor Slot, increase your damage thresholds by +2 until you clear at least 1 Armor Slot.' },
    { name: 'Runetan Floating Armor', baseThresholds: '9/20', baseScore: 4, tier: 2, feature: 'Shifting: When you are targeted for an attack, you can mark an Armor Slot to give the attack roll against you disadvantage.' },
    { name: 'Tyris Soft Armor', baseThresholds: '8/18', baseScore: 5, tier: 2, feature: 'Quiet: You gain a +2 bonus to rolls you make to move silently.' },
    { name: 'Rosewild Armor', baseThresholds: '11/23', baseScore: 5, tier: 2, feature: 'Hopeful: When you would spend a Hope, you can mark an Armor Slot instead.' },
];

const PRIMARY_WEAPONS_T2: Weapon[] = [
    // Physical
    { name: 'Improved Broadsword', trait: 'Agility', range: 'Melee', damage: 'd8+3 phy', burden: 'One-Handed', tier: 2, feature: 'Reliable: +1 to attack rolls', type: 'Primary' },
    { name: 'Improved Longsword', trait: 'Agility', range: 'Melee', damage: 'd8+6 phy', burden: 'Two-Handed', tier: 2, type: 'Primary' },
    { name: 'Improved Battleaxe', trait: 'Strength', range: 'Melee', damage: 'd10+6 phy', burden: 'Two-Handed', tier: 2, type: 'Primary' },
    { name: 'Improved Greatsword', trait: 'Strength', range: 'Melee', damage: 'd10+6 phy', burden: 'Two-Handed', tier: 2, feature: 'Massive: -1 to Evasion; on a successful attack, roll an additional damage die and discard the lowest result.', type: 'Primary' },
    { name: 'Improved Mace', trait: 'Strength', range: 'Melee', damage: 'd8+4 phy', burden: 'One-Handed', tier: 2, type: 'Primary' },
    { name: 'Improved Warhammer', trait: 'Strength', range: 'Melee', damage: 'd12+6 phy', burden: 'Two-Handed', tier: 2, feature: 'Heavy: -1 to Evasion', type: 'Primary' },
    { name: 'Improved Dagger', trait: 'Finesse', range: 'Melee', damage: 'd8+4 phy', burden: 'One-Handed', tier: 2, type: 'Primary' },
    { name: 'Improved Quarterstaff', trait: 'Instinct', range: 'Melee', damage: 'd10+6 phy', burden: 'Two-Handed', tier: 2, type: 'Primary' },
    { name: 'Improved Cutlass', trait: 'Presence', range: 'Melee', damage: 'd8+4 phy', burden: 'One-Handed', tier: 2, type: 'Primary' },
    { name: 'Improved Rapier', trait: 'Presence', range: 'Melee', damage: 'd8+3 phy', burden: 'One-Handed', tier: 2, feature: 'Quick: When you make an attack, you can mark a Stress to target another creature within range.', type: 'Primary' },
    { name: 'Improved Halberd', trait: 'Strength', range: 'Very Close', damage: 'd10+5 phy', burden: 'Two-Handed', tier: 2, feature: 'Cumbersome: -1 to Finesse', type: 'Primary' },
    { name: 'Improved Spear', trait: 'Finesse', range: 'Very Close', damage: 'd10+5 phy', burden: 'Two-Handed', tier: 2, feature: 'Cumbersome: -1 to Finesse', type: 'Primary' },
    { name: 'Improved Shortbow', trait: 'Agility', range: 'Far', damage: 'd6+6 phy', burden: 'Two-Handed', tier: 2, type: 'Primary' },
    { name: 'Improved Crossbow', trait: 'Finesse', range: 'Far', damage: 'd6+4 phy', burden: 'One-Handed', tier: 2, type: 'Primary' },
    { name: 'Improved Longbow', trait: 'Agility', range: 'Very Far', damage: 'd8+6 phy', burden: 'Two-Handed', tier: 2, feature: 'Cumbersome: -1 to Finesse', type: 'Primary' },
    { name: 'Gilded Falchion', trait: 'Strength', range: 'Melee', damage: 'd10+4 phy', burden: 'One-Handed', tier: 2, feature: 'Powerful: On a successful attack, roll an additional damage die and discard the lowest result.', type: 'Primary' },
    { name: 'Knuckle Blades', trait: 'Strength', range: 'Melee', damage: 'd10+6 phy', burden: 'Two-Handed', tier: 2, feature: 'Brutal: When you roll the maximum value on a damage die, roll an additional damage die.', type: 'Primary' },
    { name: 'Urok Broadsword', trait: 'Finesse', range: 'Melee', damage: 'd8+3 phy', burden: 'One-Handed', tier: 2, feature: 'Deadly: When you deal Severe damage, the target must mark an additional HP.', type: 'Primary' },
    { name: 'Bladed Whip', trait: 'Agility', range: 'Very Close', damage: 'd8+3 phy', burden: 'One-Handed', tier: 2, feature: 'Quick: When you make an attack, you can mark a Stress to target another creature within range.', type: 'Primary' },
    { name: 'Steelforged Halberd', trait: 'Strength', range: 'Very Close', damage: 'd8+4 phy', burden: 'Two-Handed', tier: 2, feature: 'Scary: On a successful attack, the target must mark a Stress.', type: 'Primary' },
    { name: 'War Scythe', trait: 'Finesse', range: 'Very Close', damage: 'd8+5 phy', burden: 'Two-Handed', tier: 2, feature: 'Reliable: +1 to attack rolls', type: 'Primary' },
    { name: 'Blunderbuss', trait: 'Finesse', range: 'Close', damage: 'd8+6 phy', burden: 'Two-Handed', tier: 2, feature: 'Reloading: After you make an attack, roll a d6. On a result of 1, you must mark a Stress to reload this weapon before you can fire it again.', type: 'Primary' },
    { name: 'Greatbow', trait: 'Strength', range: 'Far', damage: 'd6+6 phy', burden: 'Two-Handed', tier: 2, feature: 'Powerful: On a successful attack, roll an additional damage die and discard the lowest result.', type: 'Primary' },
    { name: 'Finehair Bow', trait: 'Agility', range: 'Very Far', damage: 'd6+5 phy', burden: 'Two-Handed', tier: 2, feature: 'Reliable: +1 to attack rolls', type: 'Primary' },
    // Magic
    { name: 'Improved Arcane Gauntlets', trait: 'Strength', range: 'Melee', damage: 'd10+6 mag', burden: 'Two-Handed', tier: 2, type: 'Primary' },
    { name: 'Improved Hallowed Axe', trait: 'Strength', range: 'Melee', damage: 'd8+4 mag', burden: 'One-Handed', tier: 2, type: 'Primary' },
    { name: 'Improved Glowing Rings', trait: 'Agility', range: 'Very Close', damage: 'd10+5 mag', burden: 'Two-Handed', tier: 2, type: 'Primary' },
    { name: 'Improved Hand Runes', trait: 'Instinct', range: 'Very Close', damage: 'd10+3 mag', burden: 'One-Handed', tier: 2, type: 'Primary' },
    { name: 'Improved Returning Blade', trait: 'Finesse', range: 'Close', damage: 'd8+3 mag', burden: 'One-Handed', tier: 2, feature: 'Returning: When this weapon is thrown within its range, it appears in your hand immediately after the attack.', type: 'Primary' },
    { name: 'Improved Shortstaff', trait: 'Instinct', range: 'Close', damage: 'd8+4 mag', burden: 'One-Handed', tier: 2, type: 'Primary' },
    { name: 'Improved Dualstaff', trait: 'Instinct', range: 'Far', damage: 'd6+6 mag', burden: 'Two-Handed', tier: 2, type: 'Primary' },
    { name: 'Improved Scepter', trait: 'Presence', range: 'Far', damage: 'd6+3 mag', burden: 'Two-Handed', tier: 2, feature: 'Versatile: This weapon can also be used with these statistics—Presence, Melee, d8+3.', type: 'Primary' },
    { name: 'Improved Wand', trait: 'Knowledge', range: 'Far', damage: 'd6+4 mag', burden: 'One-Handed', tier: 2, type: 'Primary' },
    { name: 'Improved Greatstaff', trait: 'Knowledge', range: 'Very Far', damage: 'd6+3 mag', burden: 'Two-Handed', tier: 2, feature: 'Powerful: On a successful attack, roll an additional damage die and discard the lowest result.', type: 'Primary' },
    // Wheelchairs
    { name: 'Improved Light-Frame Wheelchair', trait: 'Agility', range: 'Melee', damage: 'd8+3 phy', burden: 'One-Handed', tier: 2, feature: 'Quick: When you make an attack, you can mark a Stress to target another creature within range.', type: 'Primary' },
    { name: 'Improved Heavy-Frame Wheelchair', trait: 'Strength', range: 'Melee', damage: 'd12+6 phy', burden: 'Two-Handed', tier: 2, feature: 'Heavy: -1 to Evasion', type: 'Primary' },
    { name: 'Improved Arcane-Frame Wheelchair', trait: 'Spellcast', range: 'Far', damage: 'd6+3 mag', burden: 'One-Handed', tier: 2, feature: 'Reliable: +1 to attack rolls', type: 'Primary' },
];

const SECONDARY_WEAPONS_T2: Weapon[] = [
    { name: 'Improved Shortsword', trait: 'Agility', range: 'Melee', damage: 'd8+3 phy', burden: 'One-Handed', tier: 2, feature: 'Paired: +2 to primary weapon damage to targets within Melee range', type: 'Secondary' },
    { name: 'Improved Round Shield', trait: 'Strength', range: 'Melee', damage: 'd4+3 phy', burden: 'One-Handed', tier: 2, feature: 'Protective: +1 to Armor Score', type: 'Secondary' },
    { name: 'Improved Tower Shield', trait: 'Strength', range: 'Melee', damage: 'd6+3 phy', burden: 'One-Handed', tier: 2, feature: 'Barrier: +2 to Armor Score; -1 to Evasion', type: 'Secondary' },
    { name: 'Improved Small Dagger', trait: 'Finesse', range: 'Melee', damage: 'd8+3 phy', burden: 'One-Handed', tier: 2, feature: 'Paired: +2 to primary weapon damage to targets within Melee range', type: 'Secondary' },
    { name: 'Improved Whip', trait: 'Presence', range: 'Very Close', damage: 'd6+3 phy', burden: 'One-Handed', tier: 2, feature: 'Startling: Mark a Stress to crack the whip and force all adversaries within Melee range back to Close range.', type: 'Secondary' },
    { name: 'Improved Grappler', trait: 'Finesse', range: 'Close', damage: 'd6+3 phy', burden: 'One-Handed', tier: 2, feature: 'Hooked: On a successful attack, you can pull the target into Melee range.', type: 'Secondary' },
    { name: 'Improved Hand Crossbow', trait: 'Finesse', range: 'Far', damage: 'd6+4 phy', burden: 'One-Handed', tier: 2, type: 'Secondary' },
];

// Placeholder Arrays for T3 and T4 to allow concatenation
const ARMORS_T3: Armor[] = [];
const PRIMARY_WEAPONS_T3: Weapon[] = [];
const SECONDARY_WEAPONS_T3: Weapon[] = [];

const ARMORS_T4: Armor[] = [];
const PRIMARY_WEAPONS_T4: Weapon[] = [];
const SECONDARY_WEAPONS_T4: Weapon[] = [];

// EXPORTS
export const ARMORS = [...ARMORS_T1, ...ARMORS_T2, ...ARMORS_T3, ...ARMORS_T4];
export const PRIMARY_WEAPONS = [...PRIMARY_WEAPONS_T1, ...PRIMARY_WEAPONS_T2, ...PRIMARY_WEAPONS_T3, ...PRIMARY_WEAPONS_T4];
export const SECONDARY_WEAPONS = [...SECONDARY_WEAPONS_T1, ...SECONDARY_WEAPONS_T2, ...SECONDARY_WEAPONS_T3, ...SECONDARY_WEAPONS_T4];

// Aliases for different import styles
export const ALL_ARMORS = ARMORS;
export const ALL_PRIMARY_WEAPONS = PRIMARY_WEAPONS;
export const ALL_SECONDARY_WEAPONS = SECONDARY_WEAPONS;
