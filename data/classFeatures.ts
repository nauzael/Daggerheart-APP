export interface ClassFeature {
    className: string;
    name: string;
    description: string;
    type: 'Standard' | 'Hope';
}

export const CLASS_FEATURES: ClassFeature[] = [
    // Assassin
    { className: 'Assassin', name: 'Marked for Death', type: 'Standard', description: "On a successful weapon attack, you can mark a Stress to make the target Marked for Death. Attacks you make against a target that's Marked for Death gain a bonus to damage equal to +1d4 per tier. You can only have one adversary Marked for Death at a time, and can't transfer or remove the condition except by defeating the target. The GM can spend a number of Fear equal to your Proficiency to remove the Marked for Death condition. Otherwise, it ends automatically when you take a rest." },
    { className: 'Assassin', name: 'Get In & Get Out', type: 'Hope', description: 'Spend a Hope to ask the GM for either a quick or inconspicuous way into or out of a building or structure you can see. The next roll you make that capitalizes on this information has advantage.' },
    { className: 'Assassin', name: 'Grim Resolve', type: 'Hope', description: 'Spend 3 Hope to clear 2 Stress.' },
    // Bard
    { className: 'Bard', name: 'Rally', type: 'Standard', description: 'Once per session, give yourself and each ally a Rally Die (d6, upgrades to d8 at level 5).' },
    { className: 'Bard', name: 'Make a Scene', type: 'Hope', description: 'Spend 3 Hope to temporarily Distract a target, giving them a -2 penalty to their Difficulty.' },
    // Blood Hunter
    { className: 'Blood Hunter', name: 'Crimson Rite', type: 'Standard', description: 'Mark a Hit Point to enchant one of your active weapons. Until you finish your next rest, that weapon deals physical or magic damage (choose when you use this feature) and an extra 1d6 damage when you hit with it. This extra damage increases to 2d6 at level 5 and 3d6 at level 8.' },
    { className: 'Blood Hunter', name: 'Grim Psychometry', type: 'Standard', description: 'While inspecting a creature, a location, or an object within Very Close range, make a Spellcast Roll (12). On a success, mark a Stress to have a vision of the most recent violence involving the target, and until you finish a rest, you have advantage on any action roll to recall lore about things in the vision.' },
    { className: 'Blood Hunter', name: 'Blood Maledict', type: 'Hope', description: 'Spend 3 Hope to target a creature within Far range or in a vision from your Grim Psychometry. Until you finish a rest, take Severe damage, or use this feature again, you have advantage on all action rolls against the target.' },
    // Brawler
    { className: 'Brawler', name: 'I Am The Weapon', type: 'Standard', description: "While you don't have any equipped weapons: Your Evasion has a +1 bonus. Your unarmed strikes are considered a Melee weapon, use the trait of your choice, and deal d10+d6 phy damage. Both dice scale with your Proficiency." },
    { className: 'Brawler', name: 'Combo Strikes', type: 'Standard', description: "After making a damage roll with a Melee weapon but before dealing that damage to the target, mark a Stress to start a combo strike. When you do, roll your Combo Die and note its value. Then, roll your Combo Die again. If the value of the second roll is equal to or greater than your first roll, continue rolling until the latest Combo Die's roll is less than the roll that preceeded it. Total all rolled values and add that amount to your weapon's damage. These values cannot be adjusted by features that affect damage dice. Your Combo Die starts as a d4. When you level up, once per tier you may use one of your advancement options to increase your Combo Die instead." },
    { className: 'Brawler', name: 'Staggering Strike', type: 'Hope', description: 'Spend 3 Hope when you hit an adversary to also deal them a Stress and make them temporarily Staggered. While Staggered, all attack rolls they make are at disadvantage.' },
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
    // Warlock
    { className: 'Warlock', name: 'Warlock Patron & Favor', type: 'Standard', description: "You have a patron to whom you have committed yourself in exchange for power. Create a name for your patron and write it above. Then add two Boons that represent your patron's spheres of influence and set their values to +3. Anytime you increase your tier, these Boons also gain a permanent +1 bonus. Start with 2 Favor. During a long rest, pay one of your downtime actions as a tithe to your patron. When you do, gain 1d4 Favor from them. If you choose to forgo this offering, the GM instead gains a Fear. Before making an action roll where the Boon would be applicable, you can spend a Favor to call on your patron and add its bonus to the roll." },
    { className: 'Warlock', name: 'Patron\'s Protection', type: 'Hope', description: 'On a successful attack against you, you can spend 3 Hope. If you do, the GM must spend a Fear to make the attack hit, or it misses.' },
    // Warrior
    { className: 'Warrior', name: 'Attack of Opportunity', type: 'Standard', description: 'If an adversary within Melee range attempts to leave that range, make a reaction roll to stop them, damage them, or move with them.' },
    { className: 'Warrior', name: 'Combat Training', type: 'Standard', description: 'You ignore burden when equipping weapons. When you deal physical damage, you gain a bonus to your damage roll equal to your level.' },
    { className: 'Warrior', name: 'No Mercy', type: 'Hope', description: 'Spend 3 Hope to gain a +1 bonus to your attack rolls until your next rest.' },
    // Witch
    { className: 'Witch', name: 'Hex', type: 'Standard', description: 'When a creature causes you or an ally within Close range to mark any number of Hit Points, you can mark a Stress to Hex them. While Hexed, they gain a penalty to their damage thresholds equal to your Spellcast trait and a penalty to their Difficulty equal to your tier. You can only have one target Hexed at a time.' },
    { className: 'Witch', name: 'Commune', type: 'Standard', description: 'During a long rest, you can commune with an entity (an ancestor, deity, spirit, aspect of nature, etc.). Ask them a question, then roll 4d6. If any of the dice have matching values, you get more than one effect. 6: You witness a relevant scene play out. 5: You see a vision relevant to the answer. 4: You hear sounds relevant to the answer. 3: You feel a sensation relevant to the answer. 2: You smell an odor relevant to the answer. 1: You taste a flavor relevant to the answer.' },
    { className: 'Witch', name: 'Witch\'s Charm', type: 'Hope', description: 'When you or an ally within Far range rolls a failure, you can spend 3 Hope to change into a success with Fear instead.' },
    // Wizard
    { className: 'Wizard', name: 'Prestidigitation', type: 'Standard', description: 'You can perform harmless, subtle magical effects at will.' },
    { className: 'Wizard', name: 'Strange Patterns', type: 'Standard', description: 'Choose a number between 1 and 12. When you roll that number on a Duality Die, gain a Hope or clear a Stress.' },
    { className: 'Wizard', name: 'Not This Time', type: 'Hope', description: 'Spend 3 Hope to force an adversary within Far range to reroll an attack or damage roll.' },
];