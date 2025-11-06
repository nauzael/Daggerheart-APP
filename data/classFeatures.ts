export interface ClassFeature {
    className: string;
    name: string;
    description: string;
    type: 'Standard' | 'Hope';
}

export const CLASS_FEATURES: ClassFeature[] = [
    // Bard
    { className: 'Bard', name: 'Rally', type: 'Standard', description: 'Once per session, give yourself and each ally a Rally Die (d6, upgrades to d8 at level 5).' },
    { className: 'Bard', name: 'Make a Scene', type: 'Hope', description: 'Spend 3 Hope to temporarily Distract a target, giving them a -2 penalty to their Difficulty.' },
    // Druid
    { className: 'Druid', name: 'Beastform', type: 'Standard', description: 'Mark a Stress to magically transform into a creature from the Beastform list.' },
    { className: 'Druid', name: 'Wildtouch', type: 'Standard', description: 'You can perform harmless, subtle effects that involve nature (e.g., make a flower grow, summon a gust of wind).' },
    { className: 'Druid', name: 'Evolution', type: 'Hope', description: 'Spend 3 Hope to transform into a Beastform without marking a Stress and raise one trait by +1.' },
    // Guardian
    { className: 'Guardian', name: 'Unstoppable', type: 'Standard', description: 'Once per long rest, become Unstoppable. Gain an Unstoppable Die (d4, upgrades to d6 at level 5) that grows as you deal damage and lets you reduce incoming physical damage.' },
    { className: 'Guardian', name: 'Frontline Tank', type: 'Hope', description: 'Spend 3 Hope to clear 2 Armor Slots.' },
    // Ranger
    { className: 'Ranger', name: 'Ranger\'s Focus', type: 'Standard', description: 'Spend a Hope and make an attack. On a success, the target becomes your Focus, granting you benefits against them (know their direction, they mark Stress on damage, reroll failures).' },
    { className: 'Ranger', name: 'Hold Them Off', type: 'Hope', description: 'Spend 3 Hope when you succeed on a weapon attack to use that same roll against two additional adversaries within range.' },
    // Rogue
    { className: 'Rogue', name: 'Cloaked', type: 'Standard', description: 'Any time you would be Hidden, you are instead Cloaked, remaining unseen even if stationary when an adversary moves to where they would see you.' },
    { className: 'Rogue', name: 'Sneak Attack', type: 'Standard', description: 'When you succeed on an attack while Cloaked or while an ally is within Melee range of your target, add a number of d6s equal to your tier to your damage roll.' },
    { className: 'Rogue', name: 'Rogue\'s Dodge', type: 'Hope', description: 'Spend 3 Hope to gain a +2 bonus to your Evasion until the next time an attack succeeds against you.' },
    // Seraph
    { className: 'Seraph', name: 'Prayer Dice', type: 'Standard', description: 'At the beginning of each session, roll a number of d4s equal to your subclass\'s Spellcast trait. Spend them to reduce damage, add to a roll, or gain Hope.' },
    { className: 'Seraph', name: 'Life Support', type: 'Hope', description: 'Spend 3 Hope to clear a Hit Point on an ally within Close range.' },
    // Sorcerer
    { className: 'Sorcerer', name: 'Arcane Sense', type: 'Standard', description: 'You can sense the presence of magical people and objects within Close range.' },
    { className: 'Sorcerer', name: 'Minor Illusion', type: 'Standard', description: 'Make a Spellcast Roll (10) to create a minor visual illusion no larger than yourself within Close range.' },
    { className: 'Sorcerer', name: 'Channel Raw Power', type: 'Standard', description: 'Once per long rest, you can place a domain card from your loadout into your vault to either gain Hope equal to the card\'s level or enhance a spell that deals damage.' },
    { className: 'Sorcerer', name: 'Volatile Magic', type: 'Hope', description: 'Spend 3 Hope to reroll any number of your damage dice on an attack that deals magic damage.' },
    // Warrior
    { className: 'Warrior', name: 'Attack of Opportunity', type: 'Standard', description: 'If an adversary within Melee range attempts to leave that range, make a reaction roll to stop them, damage them, or move with them.' },
    { className: 'Warrior', name: 'Combat Training', type: 'Standard', description: 'You ignore burden when equipping weapons. When you deal physical damage, you gain a bonus to your damage roll equal to your level.' },
    { className: 'Warrior', name: 'No Mercy', type: 'Hope', description: 'Spend 3 Hope to gain a +1 bonus to your attack rolls until your next rest.' },
    // Wizard
    { className: 'Wizard', name: 'Prestidigitation', type: 'Standard', description: 'You can perform harmless, subtle magical effects at will.' },
    { className: 'Wizard', name: 'Strange Patterns', type: 'Standard', description: 'Choose a number between 1 and 12. When you roll that number on a Duality Die, gain a Hope or clear a Stress.' },
    { className: 'Wizard', name: 'Not This Time', type: 'Hope', description: 'Spend 3 Hope to force an adversary within Far range to reroll an attack or damage roll.' },
];
