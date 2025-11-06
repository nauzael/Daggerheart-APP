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
    { name: 'Ego Blade', trait: 'Agility', range: 'Melee', damage: 'd12+4 mag', burden: 'One-Handed', tier: 2, feature: 'Pompous: You must have a Presence of 0 or lower to use this weapon.', type: 'Primary' },
    { name: 'Casting Sword', trait: 'Strength', range: 'Melee', damage: 'd10+4 mag', burden: 'Two-Handed', tier: 2, feature: 'Versatile: This weapon can also be used with these statistics—Knowledge, Far, d6+3.', type: 'Primary' },
    { name: 'Devouring Dagger', trait: 'Finesse', range: 'Melee', damage: 'd8+4 mag', burden: 'One-Handed', tier: 2, feature: 'Scary: On a successful attack, the target must mark a Stress.', type: 'Primary' },
    { name: 'Hammer of Exota', trait: 'Instinct', range: 'Melee', damage: 'd8+6 mag', burden: 'Two-Handed', tier: 2, feature: 'Eruptive: On a successful attack against a target within Melee range, all other adversaries within Very Close range must succeed on a reaction roll (14) or take half damage.', type: 'Primary' },
    { name: 'Yutari Bloodbow', trait: 'Finesse', range: 'Far', damage: 'd6+4 mag', burden: 'Two-Handed', tier: 2, feature: 'Brutal: When you roll the maximum value on a damage die, roll an additional damage die.', type: 'Primary' },
    { name: 'Elder Bow', trait: 'Instinct', range: 'Far', damage: 'd6+4 mag', burden: 'Two-Handed', tier: 2, feature: 'Powerful: On a successful attack, roll an additional damage die and discard the lowest result.', type: 'Primary' },
    { name: 'Scepter of Elias', trait: 'Presence', range: 'Far', damage: 'd6+3 mag', burden: 'One-Handed', tier: 2, feature: 'Invigorating: On a successful attack, roll a d4. On a result of 4, clear a Stress.', type: 'Primary' },
    { name: 'Wand of Enthrallment', trait: 'Presence', range: 'Far', damage: 'd6+4 mag', burden: 'One-Handed', tier: 2, feature: 'Persuasive: Before you make a Presence Roll, you can mark a Stress to gain a +2 bonus to the result.', type: 'Primary' },
    { name: 'Keeper\'s Staff', trait: 'Knowledge', range: 'Far', damage: 'd6+4 mag', burden: 'Two-Handed', tier: 2, feature: 'Reliable: +1 to attack rolls', type: 'Primary' },
    // Wheelchairs
    { name: 'Improved Light-Frame Wheelchair', trait: 'Agility', range: 'Melee', damage: 'd8+3 phy', burden: 'One-Handed', tier: 2, feature: 'Quick: When you make an attack, you can mark a Stress to target another creature within range.', type: 'Primary' },
    { name: 'Improved Heavy-Frame Wheelchair', trait: 'Strength', range: 'Melee', damage: 'd12+6 phy', burden: 'Two-Handed', tier: 2, feature: 'Heavy: -1 to Evasion', type: 'Primary' },
    { name: 'Improved Arcane-Frame Wheelchair', trait: 'Spellcast', range: 'Far', damage: 'd6+3 mag', burden: 'One-Handed', tier: 2, feature: 'Reliable: +1 to attack rolls', type: 'Primary' },
];

const SECONDARY_WEAPONS_T2: Weapon[] = [
    { name: 'Improved Shortsword', trait: 'Agility', range: 'Melee', damage: 'd8+2 phy', burden: 'One-Handed', tier: 2, feature: 'Paired: +3 to primary weapon damage to targets within Melee range', type: 'Secondary' },
    { name: 'Improved Round Shield', trait: 'Strength', range: 'Melee', damage: 'd4+2 phy', burden: 'One-Handed', tier: 2, feature: 'Protective: +2 to Armor Score', type: 'Secondary' },
    { name: 'Improved Tower Shield', trait: 'Strength', range: 'Melee', damage: 'd6+2 phy', burden: 'One-Handed', tier: 2, feature: 'Barrier: +3 to Armor Score; -1 to Evasion', type: 'Secondary' },
    { name: 'Improved Small Dagger', trait: 'Finesse', range: 'Melee', damage: 'd8+2 phy', burden: 'One-Handed', tier: 2, feature: 'Paired: +3 to primary weapon damage to targets within Melee range', type: 'Secondary' },
    { name: 'Improved Whip', trait: 'Presence', range: 'Very Close', damage: 'd6+2 phy', burden: 'One-Handed', tier: 2, feature: 'Startling: Mark a Stress to crack the whip and force all adversaries within Melee range back to Close range.', type: 'Secondary' },
    { name: 'Improved Grappler', trait: 'Finesse', range: 'Close', damage: 'd6+2 phy', burden: 'One-Handed', tier: 2, feature: 'Hooked: On a successful attack, you can pull the target into Melee range.', type: 'Secondary' },
    { name: 'Improved Hand Crossbow', trait: 'Finesse', range: 'Far', damage: 'd6+3 phy', burden: 'One-Handed', tier: 2, type: 'Secondary' },
    { name: 'Spiked Shield', trait: 'Strength', range: 'Melee', damage: 'd6+2 phy', burden: 'One-Handed', tier: 2, feature: 'Double Duty: +1 to Armor Score; +1 to primary weapon damage within Melee range', type: 'Secondary' },
    { name: 'Parrying Dagger', trait: 'Finesse', range: 'Melee', damage: 'd6+2 phy', burden: 'One-Handed', tier: 2, feature: "Parry: When you are attacked, roll this weapon's damage dice. If any of the attacker's damage dice rolled the same value, the matching results are discarded.", type: 'Secondary' },
    { name: 'Returning Axe', trait: 'Agility', range: 'Close', damage: 'd6+4 phy', burden: 'One-Handed', tier: 2, feature: 'Returning: When this weapon is thrown within its range, it appears in your hand immediately after the attack.', type: 'Secondary' },
];

// TIER 3
const ARMORS_T3: Armor[] = [
    { name: 'Advanced Gambeson Armor', baseThresholds: '9/23', baseScore: 5, tier: 3, feature: 'Flexible: +1 to Evasion' },
    { name: 'Advanced Leather Armor', baseThresholds: '11/27', baseScore: 5, tier: 3 },
    { name: 'Advanced Chainmail Armor', baseThresholds: '13/31', baseScore: 6, tier: 3, feature: 'Heavy: -1 to Evasion' },
    { name: 'Advanced Full Plate Armor', baseThresholds: '15/35', baseScore: 6, tier: 3, feature: 'Very Heavy: -2 to Evasion; -1 to Agility' },
    { name: 'Bellamoi Fine Armor', baseThresholds: '11/27', baseScore: 5, tier: 3, feature: 'Gilded: +1 to Presence' },
    { name: 'Dragonscale Armor', baseThresholds: '11/27', baseScore: 5, tier: 3, feature: 'Impenetrable: Once per short rest, when you would mark your last Hit Point, you can instead mark a Stress.' },
    { name: 'Spiked Plate Armor', baseThresholds: '10/25', baseScore: 5, tier: 3, feature: 'Sharp: On a successful attack against a target within Melee range, add a d4 to the damage roll.' },
    { name: 'Bladefare Armor', baseThresholds: '16/39', baseScore: 6, tier: 3, feature: "Physical: You can't mark an Armor Slot to reduce magic damage." },
    { name: "Monett's Cloak", baseThresholds: '16/39', baseScore: 6, tier: 3, feature: "Magic: You can't mark an Armor Slot to reduce physical damage." },
    { name: 'Runes of Fortification', baseThresholds: '17/43', baseScore: 6, tier: 3, feature: 'Painful: Each time you mark an Armor Slot, you must mark a Stress.' },
];

const PRIMARY_WEAPONS_T3: Weapon[] = [
    // Physical
    { name: 'Advanced Broadsword', trait: 'Agility', range: 'Melee', damage: 'd8+6 phy', burden: 'One-Handed', tier: 3, feature: 'Reliable: +1 to attack rolls', type: 'Primary' },
    { name: 'Advanced Longsword', trait: 'Agility', range: 'Melee', damage: 'd8+9 phy', burden: 'Two-Handed', tier: 3, type: 'Primary' },
    { name: 'Advanced Battleaxe', trait: 'Strength', range: 'Melee', damage: 'd10+9 phy', burden: 'Two-Handed', tier: 3, type: 'Primary' },
    { name: 'Advanced Greatsword', trait: 'Strength', range: 'Melee', damage: 'd10+9 phy', burden: 'Two-Handed', tier: 3, feature: 'Massive: -1 to Evasion; on a successful attack, roll an additional damage die and discard the lowest result.', type: 'Primary' },
    { name: 'Flickerfly Blade', trait: 'Agility', range: 'Melee', damage: 'd8+5 phy', burden: 'One-Handed', tier: 3, feature: 'Sharpwing: Gain a bonus to your damage rolls equal to your Agility.', type: 'Primary' },
    { name: 'Bravesword', trait: 'Strength', range: 'Melee', damage: 'd12+7 phy', burden: 'Two-Handed', tier: 3, feature: 'Brave: -1 to Evasion; +3 to Severe damage threshold', type: 'Primary' },
    // Magic
    { name: 'Advanced Arcane Gauntlets', trait: 'Strength', range: 'Melee', damage: 'd10+9 mag', burden: 'Two-Handed', tier: 3, type: 'Primary' },
    { name: 'Advanced Hallowed Axe', trait: 'Strength', range: 'Melee', damage: 'd8+7 mag', burden: 'One-Handed', tier: 3, type: 'Primary' },
    { name: 'Advanced Glowing Rings', trait: 'Agility', range: 'Very Close', damage: 'd10+8 mag', burden: 'Two-Handed', tier: 3, type: 'Primary' },
    { name: 'Axe of Fortunis', trait: 'Strength', range: 'Melee', damage: 'd10+8 mag', burden: 'Two-Handed', tier: 3, feature: 'Lucky: On a failed attack, you can mark a Stress to reroll your attack.', type: 'Primary' },
    { name: 'Firestaff', trait: 'Instinct', range: 'Far', damage: 'd6+7 mag', burden: 'Two-Handed', tier: 3, feature: 'Burning: When you roll a 6 on a damage die, the target must mark a Stress.', type: 'Primary' },
    // Wheelchairs
    { name: 'Advanced Light-Frame Wheelchair', trait: 'Agility', range: 'Melee', damage: 'd8+6 phy', burden: 'One-Handed', tier: 3, feature: 'Quick: When you make an attack, you can mark a Stress to target another creature within range.', type: 'Primary' },
    { name: 'Advanced Heavy-Frame Wheelchair', trait: 'Strength', range: 'Melee', damage: 'd12+9 phy', burden: 'Two-Handed', tier: 3, feature: 'Heavy: -1 to Evasion', type: 'Primary' },
    { name: 'Advanced Arcane-Frame Wheelchair', trait: 'Spellcast', range: 'Far', damage: 'd6+6 mag', burden: 'One-Handed', tier: 3, feature: 'Reliable: +1 to attack rolls', type: 'Primary' },
];

const SECONDARY_WEAPONS_T3: Weapon[] = [
    { name: 'Advanced Shortsword', trait: 'Agility', range: 'Melee', damage: 'd8+4 phy', burden: 'One-Handed', tier: 3, feature: 'Paired: +4 to primary weapon damage to targets within Melee range', type: 'Secondary' },
    { name: 'Advanced Round Shield', trait: 'Strength', range: 'Melee', damage: 'd4+4 phy', burden: 'One-Handed', tier: 3, feature: 'Protective: +3 to Armor Score', type: 'Secondary' },
    { name: 'Advanced Tower Shield', trait: 'Strength', range: 'Melee', damage: 'd6+4 phy', burden: 'One-Handed', tier: 3, feature: 'Barrier: +4 to Armor Score; -1 to Evasion', type: 'Secondary' },
    { name: 'Buckler', trait: 'Agility', range: 'Melee', damage: 'd4+4 phy', burden: 'One-Handed', tier: 3, feature: 'Deflecting: When you are attacked, you can mark an Armor Slot to gain a bonus to your Evasion equal to your available Armor Score against the attack.', type: 'Secondary' },
    { name: 'Powered Gauntlet', trait: 'Knowledge', range: 'Close', damage: 'd6+4 phy', burden: 'One-Handed', tier: 3, feature: 'Charged: Mark a Stress to gain a +1 bonus to your Proficiency on a primary weapon attack.', type: 'Secondary' },
];


// TIER 4
const ARMORS_T4: Armor[] = [
    { name: 'Legendary Gambeson Armor', baseThresholds: '11/32', baseScore: 6, tier: 4, feature: 'Flexible: +1 to Evasion' },
    { name: 'Legendary Leather Armor', baseThresholds: '13/36', baseScore: 6, tier: 4 },
    { name: 'Legendary Chainmail Armor', baseThresholds: '15/40', baseScore: 7, tier: 4, feature: 'Heavy: -1 to Evasion' },
    { name: 'Legendary Full Plate Armor', baseThresholds: '17/44', baseScore: 7, tier: 4, feature: 'Very Heavy: -2 to Evasion; -1 to Agility' },
    { name: 'Dunamis Silkchain', baseThresholds: '13/36', baseScore: 7, tier: 4, feature: 'Timeslowing: Mark an Armor Slot to roll a d4 and add its result as a bonus to your Evasion against an incoming attack.' },
    { name: 'Channeling Armor', baseThresholds: '13/36', baseScore: 5, tier: 4, feature: 'Channeling: +1 to Spellcast Rolls' },
    { name: 'Emberwoven Armor', baseThresholds: '13/36', baseScore: 6, tier: 4, feature: 'Burning: When an adversary attacks you within Melee range, they mark a Stress.' },
    { name: 'Full Fortified Armor', baseThresholds: '15/40', baseScore: 4, tier: 4, feature: 'Fortified: When you mark an Armor Slot, you reduce the severity of an attack by two thresholds instead of one.' },
    { name: 'Veritas Opal Armor', baseThresholds: '13/36', baseScore: 6, tier: 4, feature: 'Truthseeking: This armor glows when another creature within Close range tells a lie.' },
    { name: 'Savior Chainmail', baseThresholds: '18/48', baseScore: 8, tier: 4, feature: 'Difficult: -1 to all character traits and Evasion' },
];

const PRIMARY_WEAPONS_T4: Weapon[] = [
    // Physical
    { name: 'Legendary Greatsword', trait: 'Strength', range: 'Melee', damage: 'd10+12 phy', burden: 'Two-Handed', tier: 4, feature: 'Massive: -1 to Evasion; on a successful attack, roll an additional damage die and discard the lowest result.', type: 'Primary' },
    { name: 'Sledge Axe', trait: 'Strength', range: 'Melee', damage: 'd12+13 phy', burden: 'Two-Handed', tier: 4, feature: 'Destructive: -1 to Agility; on a successful attack, all adversaries within Very Close range must mark a Stress.', type: 'Primary' },
    // Magic
    { name: 'Legendary Arcane Gauntlets', trait: 'Strength', range: 'Melee', damage: 'd10+12 mag', burden: 'Two-Handed', tier: 4, type: 'Primary' },
    { name: 'Sword of Light & Flame', trait: 'Strength', range: 'Melee', damage: 'd10+11 mag', burden: 'Two-Handed', tier: 4, feature: 'Hot: This weapon cuts through solid material.', type: 'Primary' },
    { name: 'Bloodstaff', trait: 'Instinct', range: 'Far', damage: 'd20+7 mag', burden: 'Two-Handed', tier: 4, feature: 'Painful: Each time you make a successful attack, you must mark a Stress.', type: 'Primary' },
    // Wheelchairs
    { name: 'Legendary Light-Frame Wheelchair', trait: 'Agility', range: 'Melee', damage: 'd8+9 phy', burden: 'One-Handed', tier: 4, feature: 'Quick: When you make an attack, you can mark a Stress to target another creature within range.', type: 'Primary' },
    { name: 'Legendary Heavy-Frame Wheelchair', trait: 'Strength', range: 'Melee', damage: 'd12+12 phy', burden: 'Two-Handed', tier: 4, feature: 'Heavy: -1 to Evasion', type: 'Primary' },
    { name: 'Legendary Arcane-Frame Wheelchair', trait: 'Spellcast', range: 'Far', damage: 'd6+9 mag', burden: 'One-Handed', tier: 4, feature: 'Reliable: +1 to attack rolls', type: 'Primary' },
];

const SECONDARY_WEAPONS_T4: Weapon[] = [
    { name: 'Legendary Shortsword', trait: 'Agility', range: 'Melee', damage: 'd8+6 phy', burden: 'One-Handed', tier: 4, feature: 'Paired: +5 to primary weapon damage to targets within Melee range', type: 'Secondary' },
    { name: 'Legendary Round Shield', trait: 'Strength', range: 'Melee', damage: 'd4+6 phy', burden: 'One-Handed', tier: 4, feature: 'Protective: +4 to Armor Score', type: 'Secondary' },
    { name: 'Legendary Tower Shield', trait: 'Strength', range: 'Melee', damage: 'd6+6 phy', burden: 'One-Handed', tier: 4, feature: 'Barrier: +5 to Armor Score; -1 to Evasion.', type: 'Secondary' },
    { name: 'Braveshield', trait: 'Agility', range: 'Melee', damage: 'd4+6 phy', burden: 'One-Handed', tier: 4, feature: 'Sheltering: When you mark an Armor Slot, it reduces damage for you and all allies within Melee range of you who took the same damage.', type: 'Secondary' },
    { name: 'Knuckle Claws', trait: 'Strength', range: 'Melee', damage: 'd6+8 phy', burden: 'One-Handed', tier: 4, feature: 'Doubled Up: When you make an attack with your primary weapon, you can deal damage to another target within Melee range.', type: 'Secondary' },
    { name: 'Primer Shard', trait: 'Instinct', range: 'Very Close', damage: 'd4 phy', burden: 'One-Handed', tier: 4, feature: 'Locked On: On a successful attack, your next attack against the same target with your primary weapon automatically succeeds.', type: 'Secondary' },
];

export const ALL_ARMORS: Armor[] = [...ARMORS_T1, ...ARMORS_T2, ...ARMORS_T3, ...ARMORS_T4];
export const ALL_PRIMARY_WEAPONS: Weapon[] = [...PRIMARY_WEAPONS_T1, ...PRIMARY_WEAPONS_T2, ...PRIMARY_WEAPONS_T3, ...PRIMARY_WEAPONS_T4];
export const ALL_SECONDARY_WEAPONS: Weapon[] = [...SECONDARY_WEAPONS_T1, ...SECONDARY_WEAPONS_T2, ...SECONDARY_WEAPONS_T3, ...SECONDARY_WEAPONS_T4];

// For initial creation
export const ARMORS = ARMORS_T1;
export const PRIMARY_WEAPONS = PRIMARY_WEAPONS_T1;
export const SECONDARY_WEAPONS = SECONDARY_WEAPONS_T1;