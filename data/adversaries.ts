
import { Adversary } from '../types';

// This is a template list. When adding to the board, we will clone these and add unique IDs.
export const ADVERSARY_TEMPLATES: Omit<Adversary, 'id' | 'name'>[] = [
    // --- TIER 1 (LEVEL 1) ---
    {
        originalName: "Acid Burrower",
        tier: 1,
        type: "Solo",
        difficulty: 14,
        thresholds: { major: 8, severe: 15 },
        hp: { max: 8, current: 8 },
        stress: { max: 3, current: 0 },
        attack: { modifier: 3, name: "Claws", range: "Very Close", damage: "1d12+2 phy" },
        motives: "Burrow, drag away, feed, reposition",
        features: [
            { name: "Relentless (3)", type: "Passive", description: "The Burrower can be spotlighted up to three times per GM turn. Spend Fear as usual to spotlight them." },
            { name: "Earth Eruption", type: "Action", description: "Mark a Stress to have the Burrower burst out of the ground. All creatures within Very Close range must succeed on an Agility Reaction Roll or be knocked over, making them Vulnerable until they next act." },
            { name: "Spit Acid", type: "Action", description: "Make an attack against all targets in front of the Burrower within Close range. Targets the Burrower succeeds against take 2d6 physical damage and must mark an Armor Slot without receiving its benefits. If they can't, they mark an additional HP and you gain a Fear." },
            { name: "Acid Bath", type: "Reaction", description: "When the Burrower takes Severe damage, all creatures within Close range are bathed in their acidic blood, taking 1d10 physical damage. This splash covers the ground within Very Close range with blood, and all creatures other than the Burrower who move through it take 1d6 physical damage." }
        ]
    },
    {
        originalName: "Bear",
        tier: 1,
        type: "Bruiser",
        difficulty: 14,
        thresholds: { major: 9, severe: 17 },
        hp: { max: 7, current: 7 },
        stress: { max: 2, current: 0 },
        attack: { modifier: 1, name: "Claws", range: "Melee", damage: "1d8+3 phy" },
        motives: "Climb, defend territory, pummel, track",
        features: [
            { name: "Overwhelming Force", type: "Passive", description: "Targets who mark HP from the Bear's standard attack are knocked back to Very Close range." },
            { name: "Bite", type: "Action", description: "Mark a Stress to make an attack against a target within Melee range. On a success, deal 3d4+10 physical damage and the target is Restrained until they break free with a successful Strength Roll." },
            { name: "Momentum", type: "Reaction", description: "When the Bear makes a successful attack against a PC, you gain a Fear." }
        ]
    },
    {
        originalName: "Cave Ogre",
        tier: 1,
        type: "Solo",
        difficulty: 13,
        thresholds: { major: 8, severe: 15 },
        hp: { max: 8, current: 8 },
        stress: { max: 3, current: 0 },
        attack: { modifier: 1, name: "Club", range: "Very Close", damage: "1d10+2 phy" },
        motives: "Bite off heads, feast, rip limbs, stomp, throw enemies",
        features: [
            { name: "Ramp Up", type: "Passive", description: "You must spend a Fear to spotlight the Ogre. While spotlighted, they can make their standard attack against all targets within range." },
            { name: "Bone Breaker", type: "Passive", description: "The Ogre's attacks deal direct damage." },
            { name: "Hail of Boulders", type: "Action", description: "Mark a Stress to pick up heavy objects and throw them at all targets in front of the Ogre within Far range. Targets the Ogre succeeds against take 1d10+2 physical damage. If they succeed against more than one target, you gain a Fear." },
            { name: "Rampaging Fury", type: "Reaction", description: "When the Ogre marks 2 or more HP, they can rampage. Move the Ogre to a point within Close range and deal 2d6+3 direct physical damage to all targets in their path." }
        ]
    },
    {
        originalName: "Construct",
        tier: 1,
        type: "Solo",
        difficulty: 13,
        thresholds: { major: 7, severe: 15 },
        hp: { max: 9, current: 9 },
        stress: { max: 4, current: 0 },
        attack: { modifier: 4, name: "Fist Slam", range: "Melee", damage: "1d20 phy" },
        motives: "Destroy environment, serve creator, smash target, trample groups",
        features: [
            { name: "Relentless (2)", type: "Passive", description: "The Construct can be spotlighted up to two times per GM turn. Spend Fear as usual to spotlight them." },
            { name: "Weak Structure", type: "Passive", description: "When the Construct marks HP from physical damage, they must mark an additional HP." },
            { name: "Trample", type: "Action", description: "Mark a Stress to make an attack against all targets in the Construct's path when they move. Targets the Construct succeeds against take 1d8 physical damage." },
            { name: "Overload", type: "Reaction", description: "Before rolling damage for the Construct's attack, you can mark a Stress to gain a +10 bonus to the damage roll. The Construct can then take the spotlight again." },
            { name: "Death Quake", type: "Reaction", description: "When the Construct marks their last HP, the magic powering them ruptures. All targets within Very Close range must succeed on an attack roll (against Construct) or take 1d12+2 magic damage." }
        ]
    },
    {
        originalName: "Courtier",
        tier: 1,
        type: "Social",
        difficulty: 12,
        thresholds: { major: 4, severe: 8 },
        hp: { max: 3, current: 3 },
        stress: { max: 4, current: 0 },
        attack: { modifier: -4, name: "Daggers", range: "Melee", damage: "1d4+2 phy" },
        motives: "Discredit, gain favor, maneuver, scheme",
        features: [
            { name: "Mockery", type: "Action", description: "Mark a Stress to say something mocking and force a target within Close range to make a Presence Reaction Roll (14). On a failure, the target must mark 2 Stress and is Vulnerable until the scene ends." },
            { name: "Scapegoat", type: "Action", description: "Spend a Fear and target a PC. The Courtier convinces a crowd or prominent individual that the target is the cause of their current conflict or misfortune." }
        ]
    },
    {
        originalName: "Deeproot Defender",
        tier: 1,
        type: "Bruiser",
        difficulty: 10,
        thresholds: { major: 8, severe: 14 },
        hp: { max: 7, current: 7 },
        stress: { max: 3, current: 0 },
        attack: { modifier: 2, name: "Vines", range: "Close", damage: "1d8+3 phy" },
        motives: "Ambush, grab, protect, pummel",
        features: [
            { name: "Ground Slam", type: "Action", description: "Slam the ground, knocking all targets within Very Close range back to Far range. Each target knocked back this way must mark a Stress." },
            { name: "Grab and Drag", type: "Action", description: "Make an attack against a target within Close range. On a success, spend a Fear to pull them into Melee range, deal 1d6+2 physical damage, and Restrain them until the Defender takes Severe damage." }
        ]
    },
    {
        originalName: "Dire Wolf",
        tier: 1,
        type: "Skulk",
        difficulty: 12,
        thresholds: { major: 5, severe: 9 },
        hp: { max: 4, current: 4 },
        stress: { max: 3, current: 0 },
        attack: { modifier: 2, name: "Claws", range: "Melee", damage: "1d6+2 phy" },
        motives: "Defend territory, harry, protect pack, surround, trail",
        features: [
            { name: "Pack Tactics", type: "Passive", description: "If the Wolf makes a successful standard attack and another Dire Wolf is within Melee range of the target, deal 1d6+5 physical damage instead of their standard damage and you gain a Fear." },
            { name: "Hobbling Strike", type: "Action", description: "Mark a Stress to make an attack against a target within Melee range. On a success, deal 3d4+10 direct physical damage and make them Vulnerable until they clear at least 1 HP." }
        ]
    },
    {
        originalName: "Giant Mosquitoes",
        tier: 1,
        type: "Horde (5/HP)",
        difficulty: 10,
        thresholds: { major: 5, severe: 9 },
        hp: { max: 6, current: 6 },
        stress: { max: 3, current: 0 },
        attack: { modifier: -2, name: "Proboscis", range: "Melee", damage: "1d8+3 phy" },
        motives: "Fly away, harass, steal blood",
        features: [
            { name: "Horde (1d4+1)", type: "Passive", description: "When the Mosquitoes have marked half or more of their HP, their standard attack deals 1d4+1 physical damage instead." },
            { name: "Flying", type: "Passive", description: "While flying, the Mosquitoes have a +2 bonus to their Difficulty." },
            { name: "Bloodsucker", type: "Reaction", description: "When the Mosquitoes’ attack causes a target to mark HP, you can mark a Stress to force the target to mark an additional HP." }
        ]
    },
    {
        originalName: "Giant Rat",
        tier: 1,
        type: "Minion",
        difficulty: 10,
        thresholds: { major: 100, severe: 100 },
        hp: { max: 1, current: 1 },
        stress: { max: 1, current: 0 },
        attack: { modifier: -4, name: "Claws", range: "Melee", damage: "1 phy" },
        motives: "Burrow, hunger, scavenge, wear down",
        features: [
            { name: "Minion (3)", type: "Passive", description: "Defeated on any damage. For every 3 damage dealt, defeat an additional Minion within range." },
            { name: "Group Attack", type: "Action", description: "Spend a Fear to choose a target and spotlight all Giant Rats within Close range. They make one shared attack. On success, deal 1 physical damage each (combined)." }
        ]
    },
    {
        originalName: "Giant Scorpion",
        tier: 1,
        type: "Bruiser",
        difficulty: 13,
        thresholds: { major: 7, severe: 13 },
        hp: { max: 6, current: 6 },
        stress: { max: 3, current: 0 },
        attack: { modifier: 1, name: "Pincers", range: "Melee", damage: "1d12+2 phy" },
        motives: "Ambush, feed, grapple, poison",
        features: [
            { name: "Double Strike", type: "Action", description: "Mark a Stress to make a standard attack against two targets within Melee range." },
            { name: "Venomous Stinger", type: "Action", description: "Attack target in Very Close. On success, spend a Fear to deal 1d4+4 physical damage and Poison them (1d6 roll before act, on 4 or lower mark Stress)." },
            { name: "Momentum", type: "Reaction", description: "When the Scorpion makes a successful attack against a PC, you gain a Fear." }
        ]
    },
    {
        originalName: "Glass Snake",
        tier: 1,
        type: "Standard",
        difficulty: 14,
        thresholds: { major: 6, severe: 10 },
        hp: { max: 5, current: 5 },
        stress: { max: 3, current: 0 },
        attack: { modifier: 2, name: "Glass Fangs", range: "Very Close", damage: "1d8+2 phy" },
        motives: "Climb, feed, keep distance, scare",
        features: [
            { name: "Armor-Shredding Shards", type: "Passive", description: "On successful attack within Melee against the Snake, attacker must mark an Armor Slot without benefits. If they can't, mark an additional HP." },
            { name: "Spinning Serpent", type: "Action", description: "Mark a Stress to make an attack against all targets within Very Close range. Success deals 1d6+1 physical damage." },
            { name: "Spitter", type: "Action", description: "Spend a Fear to roll a d6. On 5+, all targets in front within Far range must succeed Agility Reaction or take 1d4 physical damage." }
        ]
    },
    {
        originalName: "Harrier",
        tier: 1,
        type: "Standard",
        difficulty: 12,
        thresholds: { major: 5, severe: 9 },
        hp: { max: 3, current: 3 },
        stress: { max: 3, current: 0 },
        attack: { modifier: 1, name: "Javelin", range: "Close", damage: "1d6+2 phy" },
        motives: "Flank, harry, kite, profit",
        features: [
            { name: "Maintain Distance", type: "Passive", description: "After making a standard attack, the Harrier can move anywhere within Far range." },
            { name: "Fall Back", type: "Reaction", description: "When a creature moves into Melee range to attack, mark a Stress before the roll to move to Close range and attack that creature (deal 1d10+2 physical damage)." }
        ]
    },
    {
        originalName: "Mountain Troll",
        tier: 1,
        type: "Solo",
        difficulty: 14,
        thresholds: { major: 8, severe: 15 },
        hp: { max: 8, current: 8 },
        stress: { max: 3, current: 0 },
        attack: { modifier: 2, name: "Skull Flail", range: "Very Close", damage: "1d10+3 phy" },
        motives: "Ambush from behind, attack from above, bellow, smash enemies against the rocks, throw large boulders",
        features: [
            { name: "Relentless (3)", type: "Passive", description: "The Troll can be spotlighted up to three times per GM turn. Spend Fear as usual to spotlight them." },
            { name: "Stolen Armor", type: "Passive", description: "When combat begins, active a Countdown equal to the number of PCs. Whenever the Troll takes damage, tick down the countdown and reduce the HP the Troll marks by 1. When it triggers, the Troll evolves into an Enraged Mountain Troll." },
            { name: "Flail Swipe", type: "Action", description: "Mark a Stress to make an attack against all targets in front of the Troll within Very Close range. On a success, the Troll deals 2d10+3 instead of its normal damage. Cannot be used while evolved." },
            { name: "Enraged Evolution", type: "Passive", description: "Gains +1 Difficulty. Attack becomes Claw Swipe (1d8+1 phy). Can use Double Swipe Action (Spend Fear to move to Close and attack target in Melee twice. Combine damage and target loses Hope)." }
        ]
    },
    {
        originalName: "Rabble Mawb",
        tier: 1,
        type: "Horde (3/HP)",
        difficulty: 8,
        thresholds: { major: 4, severe: 8 },
        hp: { max: 4, current: 4 },
        stress: { max: 2, current: 0 },
        attack: { modifier: -2, name: "Chomp", range: "Melee", damage: "1d6+3 phy" },
        motives: "Chitter and chew, clump together, roll around",
        features: [
            { name: "Horde (1d4)", type: "Passive", description: "When the Rabble Mawb has marked half or more of their HP, their standard attack deals 1d4 physical damage instead." },
            { name: "Come Back Worse", type: "Reaction", description: "When defeated, spend a Fear to bring this Rabble Mawb back to life. Gains +X bonus to rolls, where X is number of times used." }
        ]
    },
    {
        originalName: "Redcap Candlemaker",
        tier: 1,
        type: "Leader",
        difficulty: 13,
        thresholds: { major: 7, severe: 13 },
        hp: { max: 6, current: 6 },
        stress: { max: 3, current: 0 },
        attack: { modifier: 3, name: "Burning Candlestick", range: "Very Close", damage: "1d10+2 mag" },
        motives: "Cast long shadows, keep out of the fray, show them the light",
        features: [
            { name: "Hand of Glory", type: "Passive", description: "When appears, put 5 tokens on card. Remove one when marking HP. While has tokens, Candlemaker is Hidden." },
            { name: "Torchbearer", type: "Passive", description: "While has tokens, any Redcap within Close range gains +1 to damage rolls." },
            { name: "Dance in the Flames", type: "Action", description: "Spend a token. Fireball at Far point. Very Close radius Agility Reaction. Fail: 2d10 mag dmg. Success: Half damage." }
        ]
    },
    {
        originalName: "Redcap Butcher",
        tier: 1,
        type: "Standard",
        difficulty: 12,
        thresholds: { major: 5, severe: 10 },
        hp: { max: 4, current: 4 },
        stress: { max: 3, current: 0 },
        attack: { modifier: 1, name: "Meat Cleaver", range: "Melee", damage: "1d8+1 phy" },
        motives: "Give them the runaround, grin disconcertingly, hack and slash, scramble",
        features: [
            { name: "Chop Happy", type: "Action", description: "Mark a Stress to attack up to three targets within range. For each target who marks a HP, you gain a Fear." },
            { name: "Knife Thrower", type: "Action", description: "Mark a Stress to attack target in Far. Advantage if Hidden." }
        ]
    },
    {
        originalName: "Archer Guard",
        tier: 1,
        type: "Ranged",
        difficulty: 10,
        thresholds: { major: 4, severe: 8 },
        hp: { max: 3, current: 3 },
        stress: { max: 2, current: 0 },
        attack: { modifier: 1, name: "Longbow", range: "Far", damage: "1d8+3 phy" },
        motives: "Arrest, close gates, make it through the day, pin down",
        features: [
            { name: "Hobbling Shot", type: "Action", description: "Attack target within Far. On success, mark Stress to deal 1d12+3 physical damage. If target marks HP, they have disadvantage on Agility Rolls until clearing 1 HP." }
        ]
    },
    {
        originalName: "Bladed Guard",
        tier: 1,
        type: "Standard",
        difficulty: 12,
        thresholds: { major: 5, severe: 9 },
        hp: { max: 5, current: 5 },
        stress: { max: 2, current: 0 },
        attack: { modifier: 1, name: "Longsword", range: "Melee", damage: "1d6+1 phy" },
        motives: "Arrest, close gates, make it through the day, pin down",
        features: [
            { name: "Shield Wall", type: "Passive", description: "Creature trying to move within Very Close must succeed Agility Roll. Difficulty increases by number of adjacent Bladed Guards." },
            { name: "Detain", type: "Action", description: "Attack target within Very Close. On success, mark Stress to Restrain target until they break free." }
        ]
    },
    {
        originalName: "Head Guard",
        tier: 1,
        type: "Leader",
        difficulty: 15,
        thresholds: { major: 7, severe: 13 },
        hp: { max: 7, current: 7 },
        stress: { max: 3, current: 0 },
        attack: { modifier: 4, name: "Mace", range: "Melee", damage: "1d10+4 phy" },
        motives: "Arrest, close gates, pin down, seek glory",
        features: [
            { name: "Rally Guards", type: "Action", description: "Spend 2 Fear to spotlight the Head Guard and up to 2d4 allies within Far range." },
            { name: "On My Signal", type: "Reaction", description: "Countdown (5). Ticks when PC attacks. Triggers: All Archer Guards in Far attack with advantage." },
            { name: "Momentum", type: "Reaction", description: "When the Head Guard makes a successful attack against a PC, you gain a Fear." }
        ]
    },
    {
        originalName: "Jagged Knife Bandit",
        tier: 1,
        type: "Standard",
        difficulty: 12,
        thresholds: { major: 8, severe: 14 },
        hp: { max: 5, current: 5 },
        stress: { max: 3, current: 0 },
        attack: { modifier: 1, name: "Daggers", range: "Melee", damage: "1d8+1 phy" },
        motives: "Escape, profit, steal, throw smoke",
        features: [
            { name: "Climber", type: "Passive", description: "The Bandit climbs just as easily as they run." },
            { name: "From Above", type: "Passive", description: "When succeeding on a standard attack from above a target, deal 1d10+1 physical damage instead of their standard damage." }
        ]
    },
    {
        originalName: "Jagged Knife Hexer",
        tier: 1,
        type: "Support",
        difficulty: 13,
        thresholds: { major: 5, severe: 9 },
        hp: { max: 4, current: 4 },
        stress: { max: 4, current: 0 },
        attack: { modifier: 2, name: "Staff", range: "Far", damage: "1d6+2 mag" },
        motives: "Command, hex, profit",
        features: [
            { name: "Curse", type: "Action", description: "Curse target within Far. While Cursed, mark a Stress when target rolls with Hope to make it with Fear instead." },
            { name: "Chaotic Flux", type: "Action", description: "Attack up to 3 targets in Very Close. Mark Stress to deal 2d6+3 magic damage to successful targets." }
        ]
    },
    {
        originalName: "Jagged Knife Kneebreaker",
        tier: 1,
        type: "Bruiser",
        difficulty: 12,
        thresholds: { major: 7, severe: 14 },
        hp: { max: 7, current: 7 },
        stress: { max: 4, current: 0 },
        attack: { modifier: -3, name: "Club", range: "Melee", damage: "1d4+6 phy" },
        motives: "Grapple, intimidate, profit, steal",
        features: [
            { name: "I've Got 'Em", type: "Passive", description: "Creatures Restrained by the Kneebreaker take double damage from attacks by other adversaries." },
            { name: "Hold Them Down", type: "Action", description: "Attack target within Melee. On success, no damage but target is Restrained and Vulnerable. Freed if Kneebreaker takes Major+ damage." }
        ]
    },
    {
        originalName: "Jagged Knife Lackey",
        tier: 1,
        type: "Minion",
        difficulty: 9,
        thresholds: { major: 100, severe: 100 },
        hp: { max: 1, current: 1 },
        stress: { max: 1, current: 0 },
        attack: { modifier: -2, name: "Daggers", range: "Melee", damage: "2 phy" },
        motives: "Escape, profit, throw smoke",
        features: [
            { name: "Minion (3)", type: "Passive", description: "Defeated on any damage. Every 3 damage defeats additional minion." },
            { name: "Group Attack", type: "Action", description: "Spend a Fear to group attack. Deal 2 physical damage each. Combine damage." }
        ]
    },
    {
        originalName: "Jagged Knife Lieutenant",
        tier: 1,
        type: "Leader",
        difficulty: 13,
        thresholds: { major: 7, severe: 14 },
        hp: { max: 6, current: 6 },
        stress: { max: 3, current: 0 },
        attack: { modifier: 2, name: "Javelin", range: "Close", damage: "1d8+3 phy" },
        motives: "Bully, command, profit, reinforce",
        features: [
            { name: "Tactician", type: "Action", description: "When spotlighted, mark a Stress to also spotlight two allies within Close range." },
            { name: "More Where That Came From", type: "Action", description: "Summon three Jagged Knife Lackeys, who appear at Far range." },
            { name: "Coup de Grace", type: "Action", description: "Spend a Fear to attack a Vulnerable target within Close. Success: 2d6+12 physical damage." },
            { name: "Momentum", type: "Reaction", description: "When the Lieutenant makes a successful attack against a PC, you gain a Fear." }
        ]
    },
    {
        originalName: "Jagged Knife Shadow",
        tier: 1,
        type: "Skulk",
        difficulty: 12,
        thresholds: { major: 4, severe: 8 },
        hp: { max: 3, current: 3 },
        stress: { max: 3, current: 0 },
        attack: { modifier: 1, name: "Daggers", range: "Melee", damage: "1d4+4 phy" },
        motives: "Ambush, conceal, divide, profit",
        features: [
            { name: "Backstab", type: "Passive", description: "Deal 1d6+6 physical damage if attack has advantage." },
            { name: "Cloaked", type: "Action", description: "Become Hidden until next attack. Attacks made while Hidden from this feature have advantage." }
        ]
    },
    {
        originalName: "Jagged Knife Sniper",
        tier: 1,
        type: "Ranged",
        difficulty: 13,
        thresholds: { major: 4, severe: 7 },
        hp: { max: 3, current: 3 },
        stress: { max: 2, current: 0 },
        attack: { modifier: -1, name: "Shortbow", range: "Far", damage: "1d10+2 phy" },
        motives: "Ambush, hide, profit, reposition",
        features: [
            { name: "Unseen Strike", type: "Passive", description: "If Hidden, successful attack deals 1d10+4 physical damage." }
        ]
    },
    {
        originalName: "Merchant",
        tier: 1,
        type: "Social",
        difficulty: 12,
        thresholds: { major: 4, severe: 8 },
        hp: { max: 3, current: 3 },
        stress: { max: 3, current: 0 },
        attack: { modifier: -4, name: "Club", range: "Melee", damage: "1d4+1 phy" },
        motives: "Buy low sell high, create demand, inflate prices, seek profit",
        features: [
            { name: "Preferential Treatment", type: "Passive", description: "Success on Presence Roll grants discount. Failure increases cost and gives disadvantage on future rolls." },
            { name: "The Runaround", type: "Passive", description: "When a PC rolls 14 or lower on Presence Roll against Merchant, they must mark a Stress." }
        ]
    },
    {
        originalName: "Minor Chaos Elemental",
        tier: 1,
        type: "Solo",
        difficulty: 14,
        thresholds: { major: 7, severe: 14 },
        hp: { max: 7, current: 7 },
        stress: { max: 3, current: 0 },
        attack: { modifier: 3, name: "Warp Blast", range: "Close", damage: "1d12+6 mag" },
        motives: "Confound, destabilize, transmogrify",
        features: [
            { name: "Arcane Form", type: "Passive", description: "Resistant to magic damage." },
            { name: "Sickening Flux", type: "Action", description: "Mark a HP to force all targets in Close to mark Stress and become Vulnerable." },
            { name: "Remake Reality", type: "Action", description: "Spend a Fear to transform Very Close area. Targets take 2d6+3 direct magic damage." },
            { name: "Magical Reflection", type: "Reaction", description: "When taking damage from Close, deal half damage back to attacker." },
            { name: "Momentum", type: "Reaction", description: "When making successful attack on PC, gain Fear." }
        ]
    },
    {
        originalName: "Minor Fire Elemental",
        tier: 1,
        type: "Solo",
        difficulty: 13,
        thresholds: { major: 7, severe: 15 },
        hp: { max: 9, current: 9 },
        stress: { max: 3, current: 0 },
        attack: { modifier: 3, name: "Elemental Blast", range: "Far", damage: "1d10+4 mag" },
        motives: "Encircle enemies, grow in size, intimidate, start fires",
        features: [
            { name: "Relentless (2)", type: "Passive", description: "Can be spotlighted 2 times per GM turn." },
            { name: "Scorched Earth", type: "Action", description: "Mark Stress to ignite ground at a point in Far. Very Close area deals 2d8 mag dmg (Agility Reaction)." },
            { name: "Explosion", type: "Action", description: "Spend Fear to explode. Attack all in Close. Success: 1d8 mag dmg + knockback." },
            { name: "Consume Kindling", type: "Reaction", description: "3/scene: consume flammable objects to clear HP or Stress." },
            { name: "Momentum", type: "Reaction", description: "Gain Fear on successful attack against PC." }
        ]
    },
    {
        originalName: "Minor Demon",
        tier: 1,
        type: "Solo",
        difficulty: 14,
        thresholds: { major: 8, severe: 15 },
        hp: { max: 8, current: 8 },
        stress: { max: 4, current: 0 },
        attack: { modifier: 3, name: "Claws", range: "Melee", damage: "1d8+6 phy" },
        motives: "Act erratically, corral targets, relish pain, torment",
        features: [
            { name: "Relentless (2)", type: "Passive", description: "Can be spotlighted 2 times per GM turn." },
            { name: "All Must Fall", type: "Passive", description: "PC rolling Failure with Fear in Close loses a Hope." },
            { name: "Hellfire", type: "Action", description: "Spend Fear to rain fire in Far. Agility Reaction. Fail: 1d20+3 mag dmg." },
            { name: "Reaper", type: "Reaction", description: "Mark Stress to add bonus damage equal to marked HP." },
            { name: "Momentum", type: "Reaction", description: "Gain Fear on successful attack against PC." }
        ]
    },
    {
        originalName: "Minor Treant",
        tier: 1,
        type: "Minion",
        difficulty: 10,
        thresholds: { major: 100, severe: 100 },
        hp: { max: 1, current: 1 },
        stress: { max: 1, current: 0 },
        attack: { modifier: -2, name: "Clawed Branch", range: "Melee", damage: "4 phy" },
        motives: "Crush, overwhelm, protect",
        features: [
            { name: "Minion (5)", type: "Passive", description: "Defeated on any damage. Every 5 damage defeats additional minion." },
            { name: "Group Attack", type: "Action", description: "Spend Fear to group attack. Deal 4 phy dmg each. Combine damage." }
        ]
    },
    {
        originalName: "Green Ooze",
        tier: 1,
        type: "Skulk",
        difficulty: 8,
        thresholds: { major: 5, severe: 10 },
        hp: { max: 5, current: 5 },
        stress: { max: 2, current: 0 },
        attack: { modifier: 1, name: "Ooze Appendage", range: "Melee", damage: "1d6+1 mag" },
        motives: "Camouflage, consume and multiply, creep up, envelop",
        features: [
            { name: "Slow", type: "Passive", description: "Needs token to act." },
            { name: "Acidic Form", type: "Passive", description: "On success, target must mark Armor Slot without benefit, or mark extra HP." },
            { name: "Envelop", type: "Action", description: "Attack target in Melee. Success: Envelop target (mark 2 Stress + 1 Stress on action)." },
            { name: "Split", type: "Reaction", description: "At 3+ HP marked, Spend Fear to split into two Tiny Green Oozes." }
        ]
    },
    {
        originalName: "Tiny Green Ooze",
        tier: 1,
        type: "Skulk",
        difficulty: 14,
        thresholds: { major: 4, severe: 100 },
        hp: { max: 2, current: 2 },
        stress: { max: 1, current: 0 },
        attack: { modifier: -1, name: "Ooze Appendage", range: "Melee", damage: "1d4+1 mag" },
        motives: "Camouflage, creep up",
        features: [
            { name: "Acidic Form", type: "Passive", description: "On success, target must mark Armor Slot without benefit, or mark extra HP." }
        ]
    },
    {
        originalName: "Red Ooze",
        tier: 1,
        type: "Skulk",
        difficulty: 10,
        thresholds: { major: 6, severe: 11 },
        hp: { max: 5, current: 5 },
        stress: { max: 3, current: 0 },
        attack: { modifier: 1, name: "Ooze Appendage", range: "Melee", damage: "1d8+3 mag" },
        motives: "Camouflage, consume and multiply, ignite, start fires",
        features: [
            { name: "Creeping Fire", type: "Passive", description: "Only moves Very Close. Ignites flammable objects." },
            { name: "Ignite", type: "Action", description: "Attack target in Very Close. Success: 1d8 mag dmg + Ignited (1d4 dmg on action)." },
            { name: "Split", type: "Reaction", description: "At 3+ HP marked, Spend Fear to split into two Tiny Red Oozes." }
        ]
    },
    {
        originalName: "Tiny Red Ooze",
        tier: 1,
        type: "Skulk",
        difficulty: 11,
        thresholds: { major: 5, severe: 100 },
        hp: { max: 2, current: 2 },
        stress: { max: 1, current: 0 },
        attack: { modifier: -1, name: "Ooze Appendage", range: "Melee", damage: "1d4+2 mag" },
        motives: "Blaze, camouflage",
        features: [
            { name: "Burning", type: "Reaction", description: "When creature in Melee deals damage to Ooze, they take 1d6 direct mag dmg." }
        ]
    },
    {
        originalName: "Petty Noble",
        tier: 1,
        type: "Social",
        difficulty: 14,
        thresholds: { major: 6, severe: 10 },
        hp: { max: 3, current: 3 },
        stress: { max: 5, current: 0 },
        attack: { modifier: -3, name: "Rapier", range: "Melee", damage: "1d6+1 phy" },
        motives: "Abuse power, gather resources, mobilize minions",
        features: [
            { name: "My Land, My Rules", type: "Passive", description: "Social actions against Noble on their land have disadvantage." },
            { name: "Guards, Seize Them!", type: "Action", description: "1/scene: Mark Stress to summon 1d4 Bladed Guards in Far." },
            { name: "Exile", type: "Action", description: "Spend Fear. Target is exiled (disadvantage on social situations in domain)." }
        ]
    },
    {
        originalName: "Pirate Captain",
        tier: 1,
        type: "Leader",
        difficulty: 14,
        thresholds: { major: 7, severe: 14 },
        hp: { max: 7, current: 7 },
        stress: { max: 5, current: 0 },
        attack: { modifier: 4, name: "Cutlass", range: "Melee", damage: "1d12+2 phy" },
        motives: "Command, make 'em walk the plank, plunder, raid",
        features: [
            { name: "Swashbuckler", type: "Passive", description: "When marking 2 or fewer HP from melee attack, attacker marks Stress." },
            { name: "Reinforcements", type: "Action", description: "1/scene: Mark Stress to summon Pirate Raiders Horde in Far." },
            { name: "No Quarter", type: "Action", description: "Spend Fear. Target surrounded by 3+ pirates makes Presence Reaction or marks 1d4+1 Stress." },
            { name: "Momentum", type: "Reaction", description: "Gain Fear on successful attack against PC." }
        ]
    },
    {
        originalName: "Pirate Raiders",
        tier: 1,
        type: "Horde (3/HP)",
        difficulty: 12,
        thresholds: { major: 5, severe: 11 },
        hp: { max: 4, current: 4 },
        stress: { max: 3, current: 0 },
        attack: { modifier: 1, name: "Cutlass", range: "Melee", damage: "1d8+2 phy" },
        motives: "Gang up, plunder, raid",
        features: [
            { name: "Horde (1d4+1)", type: "Passive", description: "At half HP, attack deals 1d4+1 damage." },
            { name: "Swashbuckler", type: "Passive", description: "When marking 2 or fewer HP from melee attack, attacker marks Stress." }
        ]
    },
    {
        originalName: "Pirate Tough",
        tier: 1,
        type: "Bruiser",
        difficulty: 13,
        thresholds: { major: 8, severe: 15 },
        hp: { max: 5, current: 5 },
        stress: { max: 3, current: 0 },
        attack: { modifier: 1, name: "Massive Fists", range: "Melee", damage: "2d6 phy" },
        motives: "Plunder, raid, smash, terrorize",
        features: [
            { name: "Swashbuckler", type: "Passive", description: "When marking 2 or fewer HP from melee attack, attacker marks Stress." },
            { name: "Clear the Decks", type: "Action", description: "Attack target in Very Close. Success: Mark Stress to move to Melee, deal 3d4 phy dmg + knockback." }
        ]
    },
    {
        originalName: "Sellsword",
        tier: 1,
        type: "Minion",
        difficulty: 10,
        thresholds: { major: 100, severe: 100 },
        hp: { max: 1, current: 1 },
        stress: { max: 1, current: 0 },
        attack: { modifier: 3, name: "Longsword", range: "Melee", damage: "3 phy" },
        motives: "Charge, lacerate, overwhelm, profit",
        features: [
            { name: "Minion (4)", type: "Passive", description: "Defeated on any damage. Every 4 damage defeats additional minion." },
            { name: "Group Attack", type: "Action", description: "Spend Fear to group attack. Deal 3 phy dmg each. Combine damage." }
        ]
    },
    {
        originalName: "Skeleton Dredge",
        tier: 1,
        type: "Minion",
        difficulty: 8,
        thresholds: { major: 100, severe: 100 },
        hp: { max: 1, current: 1 },
        stress: { max: 1, current: 0 },
        attack: { modifier: -1, name: "Bone Claws", range: "Melee", damage: "1 phy" },
        motives: "Fall apart, overwhelm, play dead, steal skin",
        features: [
            { name: "Minion (4)", type: "Passive", description: "Defeated on any damage. Every 4 damage defeats additional minion." },
            { name: "Group Attack", type: "Action", description: "Spend Fear to group attack. Deal 1 phy dmg each. Combine damage." }
        ]
    },
    {
        originalName: "Skeleton Knight",
        tier: 1,
        type: "Bruiser",
        difficulty: 13,
        thresholds: { major: 7, severe: 13 },
        hp: { max: 5, current: 5 },
        stress: { max: 2, current: 0 },
        attack: { modifier: 2, name: "Rusty Greatsword", range: "Melee", damage: "1d10+2 phy" },
        motives: "Cut down the living, steal skin, wreak havoc",
        features: [
            { name: "Terrifying", type: "Passive", description: "On successful attack, all PCs in Close lose Hope and GM gains Fear." },
            { name: "Cut to the Bone", type: "Action", description: "Mark Stress to attack all in Very Close. Success: 1d8+2 phy dmg + mark Stress." },
            { name: "Dig Two Graves", type: "Reaction", description: "On defeat, attack target in Very Close. Success: 1d4+8 phy dmg and lose 1d4 Hope." }
        ]
    },
    {
        originalName: "Skeleton Warrior",
        tier: 1,
        type: "Standard",
        difficulty: 10,
        thresholds: { major: 4, severe: 8 },
        hp: { max: 3, current: 3 },
        stress: { max: 2, current: 0 },
        attack: { modifier: 0, name: "Sword", range: "Melee", damage: "1d6+2 phy" },
        motives: "Feign death, gang up, steal skin",
        features: [
            { name: "Only Bones", type: "Passive", description: "The Warrior is resistant to physical damage." },
            { name: "Won't Stay Dead", type: "Reaction", description: "When defeated, spotlight them and roll a d6. On a 6, if other adversaries are present, re-forms with full HP." }
        ]
    },
    {
        originalName: "Spellblade",
        tier: 1,
        type: "Leader",
        difficulty: 14,
        thresholds: { major: 8, severe: 14 },
        hp: { max: 6, current: 6 },
        stress: { max: 3, current: 0 },
        attack: { modifier: 3, name: "Empowered Longsword", range: "Melee", damage: "1d8+4 phy/mag" },
        motives: "Blast, command, endure",
        features: [
            { name: "Arcane Steel", type: "Passive", description: "Attacks deal both physical and magic damage." },
            { name: "Suppressing Blast", type: "Action", description: "Mark Stress. Group in Far makes Agility Reaction. Fail: 1d8+2 mag dmg + gain Fear." },
            { name: "Move as a Unit", type: "Action", description: "Spend 2 Fear to spotlight up to 5 allies in Far." },
            { name: "Momentum", type: "Reaction", description: "Gain Fear on successful attack against PC." }
        ]
    },
    {
        originalName: "Swarm of Rats",
        tier: 1,
        type: "Horde (10/HP)",
        difficulty: 10,
        thresholds: { major: 6, severe: 10 },
        hp: { max: 6, current: 6 },
        stress: { max: 2, current: 0 },
        attack: { modifier: -3, name: "Claws", range: "Melee", damage: "1d8+2 phy" },
        motives: "Consume, obscure, swarm",
        features: [
            { name: "Horde (1d4+1)", type: "Passive", description: "At half HP, attack deals 1d4+1 damage." },
            { name: "In Your Face", type: "Passive", description: "Targets in Melee have disadvantage on attacks against targets other than Swarm." }
        ]
    },
    {
        originalName: "Sylvan Soldier",
        tier: 1,
        type: "Standard",
        difficulty: 11,
        thresholds: { major: 6, severe: 11 },
        hp: { max: 4, current: 4 },
        stress: { max: 2, current: 0 },
        attack: { modifier: 0, name: "Scythe", range: "Melee", damage: "1d8+1 phy" },
        motives: "Ambush, hide, overwhelm, protect, trail",
        features: [
            { name: "Pack Tactics", type: "Passive", description: "If another Sylvan Soldier in Melee of target, deal 1d8+5 phy dmg instead." },
            { name: "Forest Control", type: "Action", description: "Spend Fear to pull tree. Agility Reaction (15) or 1d10 phy dmg." },
            { name: "Blend In", type: "Reaction", description: "On successful attack, mark Stress to become Hidden." }
        ]
    },
    {
        originalName: "Tangle Bramble Swarm",
        tier: 1,
        type: "Horde (3/HP)",
        difficulty: 12,
        thresholds: { major: 6, severe: 11 },
        hp: { max: 6, current: 6 },
        stress: { max: 3, current: 0 },
        attack: { modifier: 0, name: "Thorns", range: "Melee", damage: "1d6+3 phy" },
        motives: "Digest, entangle, immobilize",
        features: [
            { name: "Horde (1d4+2)", type: "Passive", description: "At half HP, attack deals 1d4+2 damage." },
            { name: "Crush", type: "Action", description: "Mark Stress to deal 2d6+8 direct phy dmg to target with 3+ bramble tokens." },
            { name: "Encumber", type: "Reaction", description: "On hit, give bramble token. 1+ Restrained. 3+ Vulnerable. Remove via Finesse (12+tokens) or Major dmg. Removal spawns Minions." }
        ]
    },
    {
        originalName: "Tangle Bramble",
        tier: 1,
        type: "Minion",
        difficulty: 11,
        thresholds: { major: 100, severe: 100 },
        hp: { max: 1, current: 1 },
        stress: { max: 1, current: 0 },
        attack: { modifier: -1, name: "Thorns", range: "Melee", damage: "2 phy" },
        motives: "Combine, drain, entangle",
        features: [
            { name: "Minion (4)", type: "Passive", description: "Defeated on any damage. Every 4 damage defeats additional minion." },
            { name: "Group Attack", type: "Action", description: "Spend Fear to group attack. Deal 2 phy dmg each." },
            { name: "Drain and Multiply", type: "Reaction", description: "When marking HP on target with 3+ minions nearby, combine into Swarm." }
        ]
    },
    {
        originalName: "Weaponmaster",
        tier: 1,
        type: "Bruiser",
        difficulty: 14,
        thresholds: { major: 8, severe: 15 },
        hp: { max: 6, current: 6 },
        stress: { max: 3, current: 0 },
        attack: { modifier: 2, name: "Claymore", range: "Very Close", damage: "1d12+2 phy" },
        motives: "Act first, aim for the weakest, intimidate",
        features: [
            { name: "Goading Strike", type: "Action", description: "Attack target. Success: Mark Stress to Taunt. Target has disadvantage against others." },
            { name: "Adrenaline Burst", type: "Action", description: "1/scene: Spend Fear to clear 2 HP and 2 Stress." },
            { name: "Momentum", type: "Reaction", description: "Gain Fear on successful attack against PC." }
        ]
    },
    {
        originalName: "Young Dryad",
        tier: 1,
        type: "Leader",
        difficulty: 11,
        thresholds: { major: 6, severe: 11 },
        hp: { max: 6, current: 6 },
        stress: { max: 2, current: 0 },
        attack: { modifier: 0, name: "Scythe", range: "Melee", damage: "1d8+5 phy" },
        motives: "Command, nurture, prune the unwelcome",
        features: [
            { name: "Voice of the Forest", type: "Action", description: "Mark Stress to spotlight 1d4 allies in range of target. Their attacks deal half damage." },
            { name: "Thorny Cage", type: "Action", description: "Spend Fear to cage target in Very Close. Restrained until Strength Roll." },
            { name: "Momentum", type: "Reaction", description: "Gain Fear on successful attack against PC." }
        ]
    },
    {
        originalName: "Brawny Zombie",
        tier: 1,
        type: "Bruiser",
        difficulty: 10,
        thresholds: { major: 8, severe: 15 },
        hp: { max: 7, current: 7 },
        stress: { max: 4, current: 0 },
        attack: { modifier: 2, name: "Slam", range: "Very Close", damage: "1d12+3 phy" },
        motives: "Crush, destroy, hail debris, slam",
        features: [
            { name: "Slow", type: "Passive", description: "Needs token to act." },
            { name: "Rend Asunder", type: "Action", description: "Attack Restrained target with advantage. Deals direct damage." },
            { name: "Rip and Tear", type: "Reaction", description: "On successful attack, mark Stress to Restrain target and force 2 Stress." }
        ]
    },
    {
        originalName: "Patchwork Zombie Hulk",
        tier: 1,
        type: "Solo",
        difficulty: 13,
        thresholds: { major: 8, severe: 15 },
        hp: { max: 10, current: 10 },
        stress: { max: 3, current: 0 },
        attack: { modifier: 4, name: "Too Many Arms", range: "Very Close", damage: "1d20 phy" },
        motives: "Absorb corpses, flail, hunger, terrify",
        features: [
            { name: "Destructible", type: "Passive", description: "Taking Major+ damage marks +1 HP." },
            { name: "Flailing Limbs", type: "Passive", description: "Standard attack hits all in Very Close." },
            { name: "Another for the Pile", type: "Action", description: "Absorb nearby corpse to clear HP and Stress." },
            { name: "Tormented Screams", type: "Action", description: "Mark Stress. PCs in Far make Presence Reaction (13). Fail: Lose Hope + GM Fear. Success: Mark Stress." }
        ]
    },
    {
        originalName: "Rotted Zombie",
        tier: 1,
        type: "Minion",
        difficulty: 8,
        thresholds: { major: 100, severe: 100 },
        hp: { max: 1, current: 1 },
        stress: { max: 1, current: 0 },
        attack: { modifier: -3, name: "Bite", range: "Melee", damage: "2 phy" },
        motives: "Eat flesh, hunger, maul, surround",
        features: [
            { name: "Minion (3)", type: "Passive", description: "Defeated on any damage. Every 3 damage defeats additional minion." },
            { name: "Group Attack", type: "Action", description: "Spend Fear to group attack. Deal 2 phy dmg each." }
        ]
    },
    {
        originalName: "Shambling Zombie",
        tier: 1,
        type: "Standard",
        difficulty: 10,
        thresholds: { major: 4, severe: 6 },
        hp: { max: 4, current: 4 },
        stress: { max: 1, current: 0 },
        attack: { modifier: 0, name: "Bite", range: "Melee", damage: "1d6+1 phy" },
        motives: "Devour, hungry, mob enemy, shred flesh",
        features: [
            { name: "Too Many to Handle", type: "Passive", description: "Attacks against target with multiple Zombies nearby have advantage." },
            { name: "Horrifying", type: "Passive", description: "Targets marking HP also mark Stress." }
        ]
    },
    {
        originalName: "Zombie Pack",
        tier: 1,
        type: "Horde (2/HP)",
        difficulty: 8,
        thresholds: { major: 6, severe: 12 },
        hp: { max: 6, current: 6 },
        stress: { max: 3, current: 0 },
        attack: { modifier: -1, name: "Bite", range: "Melee", damage: "1d10+2 phy" },
        motives: "Consume flesh, hunger, maul",
        features: [
            { name: "Horde (1d4+2)", type: "Passive", description: "At half HP, attack deals 1d4+2 damage." },
            { name: "Overwhelm", type: "Reaction", description: "When marking HP from melee attack, mark Stress to attack back." }
        ]
    },

    // --- TIER 2 (LEVELS 2-4) ---
    {
        originalName: "Archer Squadron",
        tier: 2,
        type: "Horde (2/HP)",
        difficulty: 13,
        thresholds: { major: 8, severe: 16 },
        hp: { max: 4, current: 4 },
        stress: { max: 3, current: 0 },
        attack: { modifier: 0, name: "Longbow", range: "Far", damage: "2d6+3 phy" },
        motives: "Stick together, survive, volley fire",
        features: [
            { name: "Horde (1d6+3)", type: "Passive", description: "At half HP, attack deals 1d6+3 damage." },
            { name: "Focused Volley", type: "Action", description: "Spend Fear. Attack point in Far with advantage against all in Close. 1d10+4 phy dmg." },
            { name: "Suppressing Fire", type: "Action", description: "Mark Stress. Target area in Far. Movement there triggers Agility Reaction (Failure: 2d6+3 phy dmg)." }
        ]
    },
    {
        originalName: "Apprentice Assassin",
        tier: 2,
        type: "Minion",
        difficulty: 13,
        thresholds: { major: 100, severe: 100 },
        hp: { max: 1, current: 1 },
        stress: { max: 1, current: 0 },
        attack: { modifier: -1, name: "Thrown Dagger", range: "Very Close", damage: "4 phy" },
        motives: "Act reckless, kill, prove worth",
        features: [
             { name: "Minion (6)", type: "Passive", description: "Defeated on any damage. Every 6 dmg defeats an additional minion." },
             { name: "Group Attack", type: "Action", description: "Spend Fear to group attack. Deal 4 phy dmg each. Combine damage." }
        ]
    },
    {
        originalName: "Assassin Poisoner",
        tier: 2,
        type: "Skulk",
        difficulty: 14,
        thresholds: { major: 8, severe: 16 },
        hp: { max: 4, current: 4 },
        stress: { max: 4, current: 0 },
        attack: { modifier: 3, name: "Poisoned Throwing Dagger", range: "Close", damage: "2d8+1 phy" },
        motives: "Anticipate, get paid, kill, taint food and water",
        features: [
            { name: "Grindletooth Venom", type: "Passive", description: "Targets marking HP are Vulnerable until clear 1 HP." },
            { name: "Out of Nowhere", type: "Passive", description: "Advantage on attacks if Hidden." },
            { name: "Fumigation", type: "Action", description: "Drop smoke bomb. Close area Dizzied (Disadvantage on next roll)." }
        ]
    },
    {
        originalName: "Master Assassin",
        tier: 2,
        type: "Leader",
        difficulty: 15,
        thresholds: { major: 12, severe: 25 },
        hp: { max: 7, current: 7 },
        stress: { max: 5, current: 0 },
        attack: { modifier: 5, name: "Serrated Dagger", range: "Close", damage: "2d10+2 phy" },
        motives: "Ambush, get out alive, kill, prepare for all scenarios",
        features: [
            { name: "Won't See It Coming", type: "Passive", description: "Deals direct damage while Hidden." },
            { name: "Strike as One", type: "Action", description: "Mark Stress to spotlight other Assassins equal to unmarked Stress." },
            { name: "The Subtle Blade", type: "Reaction", description: "On hit against Vulnerable, Spend Fear to deal Severe damage." },
            { name: "Momentum", type: "Reaction", description: "On successful attack against PC, gain Fear." }
        ]
    },
    {
        originalName: "Battle Box",
        tier: 2,
        type: "Solo",
        difficulty: 15,
        thresholds: { major: 10, severe: 20 },
        hp: { max: 8, current: 8 },
        stress: { max: 6, current: 0 },
        attack: { modifier: 2, name: "Slam", range: "Melee", damage: "2d6+3 phy" },
        motives: "Change tactics, trample foes, wait in disguise",
        features: [
            { name: "Relentless (2)", type: "Passive", description: "Can be spotlighted 2 times per GM turn." },
            { name: "Randomized Tactics", type: "Action", description: "Mark Stress and roll d6 for move (Beam, Fire Jets, Trample, Gas, Clap, Whine)." },
            { name: "Overcharge", type: "Reaction", description: "Mark Stress to add d6 to damage and gain Fear." },
            { name: "Death Quake", type: "Reaction", description: "On death, all in Close make Instinct Reaction or take 2d8+1 mag dmg." }
        ]
    },
    {
        originalName: "Chaos Skull",
        tier: 2,
        type: "Ranged",
        difficulty: 15,
        thresholds: { major: 8, severe: 16 },
        hp: { max: 5, current: 5 },
        stress: { max: 4, current: 0 },
        attack: { modifier: 2, name: "Energy Blast", range: "Close", damage: "2d8+3 mag" },
        motives: "Cackle, consume magic, serve creator",
        features: [
            { name: "Levitation", type: "Passive", description: "Levitates, can't be Restrained." },
            { name: "Wards", type: "Passive", description: "Resistant to magic damage." },
            { name: "Magic Burst", type: "Action", description: "Mark Stress to attack all in Close. Success: 2d6+4 mag dmg." },
            { name: "Siphon Magic", type: "Action", description: "Spend Fear to attack Spellcaster in Very Close. Success: Target marks 1d4 Stress, Skull clears that many." }
        ]
    },
    {
        originalName: "Conscript",
        tier: 2,
        type: "Minion",
        difficulty: 12,
        thresholds: { major: 100, severe: 100 },
        hp: { max: 1, current: 1 },
        stress: { max: 1, current: 0 },
        attack: { modifier: 0, name: "Spears", range: "Very Close", damage: "6 phy" },
        motives: "Follow orders, gang up, survive",
        features: [
             { name: "Minion (6)", type: "Passive", description: "Defeated on any damage. Every 6 dmg defeats an additional minion." },
             { name: "Group Attack", type: "Action", description: "Spend Fear to group attack. Deal 6 phy dmg each. Combine damage." }
        ]
    },
    {
        originalName: "Doppelhünd",
        tier: 2,
        type: "Skulk",
        difficulty: 14,
        thresholds: { major: 9, severe: 17 },
        hp: { max: 4, current: 4 },
        stress: { max: 5, current: 0 },
        attack: { modifier: 3, name: "Toothy Arms", range: "Very Close", damage: "2d8+2 phy" },
        motives: "Ambush prey, kill for sport, play with food, trick and deceive",
        features: [
            { name: "Blink Beast", type: "Passive", description: "Creates a duplicate. Attackers roll d6 to target real (even) or fake (odd). Fake attacks fail. Real hit dispels fake until Fear spent." },
            { name: "Double Lash", type: "Reaction", description: "When attacking, mark Stress to make additional attack. Combine damage if same target." }
        ]
    },
    {
        originalName: "Dragon Knight",
        tier: 2,
        type: "Bruiser",
        difficulty: 15,
        thresholds: { major: 15, severe: 30 },
        hp: { max: 5, current: 5 },
        stress: { max: 3, current: 0 },
        attack: { modifier: 2, name: "Lance", range: "Very Close", damage: "2d12+3 phy" },
        motives: "Exploit an opening, get some distance, knock off-balance, strike from above",
        features: [
            { name: "High Ground", type: "Passive", description: "+2 to attacks when attacking from above." },
            { name: "Enhanced Critical", type: "Passive", description: "Crits on 19-20." },
            { name: "Leaping Strike", type: "Action", description: "Mark Stress. Move Far to Melee. Attack with +1d12 dmg. Hit: Target marks Armor Slot without benefit." }
        ]
    },
    {
        originalName: "Gargoyle",
        tier: 2,
        type: "Bruiser",
        difficulty: 13,
        thresholds: { major: 14, severe: 28 },
        hp: { max: 8, current: 8 },
        stress: { max: 2, current: 0 },
        attack: { modifier: 2, name: "Stone Claws", range: "Melee", damage: "2d10+3 phy" },
        motives: "Hide in plain sight, overwatch, swoop down",
        features: [
            { name: "Stone Body", type: "Passive", description: "Resistant to physical damage." },
            { name: "Just a Statue", type: "Passive", description: "Indistinguishable from statue until acts or Instinct Roll." },
            { name: "Swooping Strike", type: "Action", description: "Move straight line in Far. Attack one target along path." }
        ]
    },
    {
        originalName: "Gobstalker",
        tier: 2,
        type: "Solo",
        difficulty: 15,
        thresholds: { major: 10, severe: 20 },
        hp: { max: 8, current: 8 },
        stress: { max: 6, current: 0 },
        attack: { modifier: 2, name: "Bite", range: "Melee", damage: "2d6+3 phy" },
        motives: "Ambush, dispose of rivals, seek riches, use magic at long range",
        features: [
            { name: "Relentless (3)", type: "Passive", description: "Can be spotlighted 3 times per GM turn." },
            { name: "Anti-mystica-halitosis", type: "Passive", description: "Negates magical effects in front within Close range." },
            { name: "Eyestalks", type: "Action", description: "Mark Stress to attack Far. Hit: Spend Fear for random ray effect (Beguile, Corrode, Doom, Hypnosis, Paralyze, Petrify, Push, Sear, Slow, Terrify)." }
        ]
    },

    // --- TIER 3 (LEVELS 5-7) ---
    {
        originalName: "Chimera",
        tier: 3,
        type: "Bruiser",
        difficulty: 17,
        thresholds: { major: 22, severe: 40 },
        hp: { max: 9, current: 9 },
        stress: { max: 5, current: 0 },
        attack: { modifier: 5, name: "Claws", range: "Melee", damage: "3d12 phy" },
        motives: "Play with their food, prowl their territory, reveal their bestial nature, slay cattle",
        features: [
            { name: "Rending Jaws", type: "Passive", description: "Successful attack requires marking 2 Armor Slots to reduce damage." },
            { name: "Breath of Fire", type: "Action", description: "Spend Fear. Up to 3 PCs in Close make Agility Reaction (20). Fail: 3d12 mag dmg." },
            { name: "Serpent Strike", type: "Reaction", description: "When attacked in Very Close, mark Stress to attack back. Hit: 4d4+10 phy dmg + Poison (3 or lower on d6 marks Stress)." },
            { name: "Double Claw", type: "Reaction", description: "After standard attack, mark Stress to attack again. Combine damage." }
        ]
    },
    {
        originalName: "Fellmounted Shadow King",
        tier: 3,
        type: "Support",
        difficulty: 16,
        thresholds: { major: 24, severe: 38 },
        hp: { max: 8, current: 8 },
        stress: { max: 5, current: 0 },
        attack: { modifier: 4, name: "Cursed Lance", range: "Close", damage: "3d10+6 phy/mag" },
        motives: "Acquire magical items for master, inspire fear, patrol the skies",
        features: [
            { name: "Light and Shadow", type: "Passive", description: "+1 to rolls in shadow/darkness, -1 in bright light." },
            { name: "Relic Hunter", type: "Passive", description: "Advantage against PCs with magical gear." },
            { name: "Hellsong", type: "Action", description: "Spend 2 Fear. PCs in Far make Presence Reaction (18). Fail: Mark Stress + lose Hope (or GM gains 2 Fear)." },
            { name: "Air Support", type: "Reaction", description: "3/scene: Spend Fear to let ally in Far reroll missed attack with advantage." }
        ]
    },
    {
        originalName: "Lamplight Beguiler",
        tier: 3,
        type: "Skulk",
        difficulty: 16,
        thresholds: { major: 16, severe: 32 },
        hp: { max: 6, current: 6 },
        stress: { max: 5, current: 0 },
        attack: { modifier: 0, name: "Jaws", range: "Melee", damage: "3d8+2 phy" },
        motives: "Entice with secret knowledge, snap the trap shut, speak through shapeshifted head stalk",
        features: [
            { name: "Doppel-Dangler", type: "Action", description: "Mark Stress. Head stalk shapeshifts into trusted figure." },
            { name: "Entice", type: "Action", description: "Spend Fear. Target in Close makes Presence Reaction (18) or moves to Melee. Disadvantage if trusting stalk." },
            { name: "Entangle", type: "Reaction", description: "When PC moves into Melee, Spend Fear to attack. Hit: Swallowed (Restrained, can only attack Beguiler). Disgorged on Major damage." },
            { name: "Rest and Digest", type: "Reaction", description: "When spotlighted with Swallowed creature, move to Far away from PCs." }
        ]
    },
    {
        originalName: "Whisper Wraith",
        tier: 3,
        type: "Ranged",
        difficulty: 18,
        thresholds: { major: 20, severe: 36 },
        hp: { max: 6, current: 6 },
        stress: { max: 6, current: 0 },
        attack: { modifier: 4, name: "Shadow Touch", range: "Melee", damage: "3d8+5 mag" },
        motives: "Bind limbs, drop from a great height, lift off the ground, swirl through the air, wrap around heads",
        features: [
            { name: "Spectral", type: "Passive", description: "Immune to physical, weak to magic. Moves through solid objects." },
            { name: "Spooky", type: "Passive", description: "On successful attack, PCs in Close mark Stress, GM gains Fear." },
            { name: "Nightmare Shroud", type: "Action", description: "Spend Fear to Shroud PC in Melee (disadvantage on attacks, mark Stress on Fear rolls). Remove with Strength/Attack Roll (20)." }
        ]
    },

    // --- TIER 4 (LEVELS 8-10) ---
    {
        originalName: "Cephilith Priest",
        tier: 4,
        type: "Leader",
        difficulty: 20,
        thresholds: { major: 37, severe: 70 },
        hp: { max: 7, current: 7 },
        stress: { max: 5, current: 0 },
        attack: { modifier: 8, name: "Psychic Strike", range: "Far", damage: "4d10+10 mag" },
        motives: "Attack the weak-minded, avoid melee, lord over, oppress",
        features: [
            { name: "Psychic Blast", type: "Action", description: "Spend Fear. 3 targets in Close make Knowledge/Instinct Reaction (20). Fail: 4d10+10 direct mag dmg + Vulnerable." },
            { name: "Cerebral Suction", type: "Action", description: "Spend Fear. Attack Vulnerable target in Melee. Strength Reaction or mark 1d6 Stress (Priest clears equal Stress)." },
            { name: "Telekinetic Grasp", type: "Reaction", description: "On successful attack, mark Stress to Restrain target (needs Hope to clear)." }
        ]
    },
    {
        originalName: "Hallowed Choir",
        tier: 4,
        type: "Horde (6/HP)",
        difficulty: 17,
        thresholds: { major: 24, severe: 48 },
        hp: { max: 7, current: 7 },
        stress: { max: 6, current: 0 },
        attack: { modifier: 2, name: "Choral Blast", range: "Far", damage: "4d10 mag" },
        motives: "Drown out disbelief, raise voices",
        features: [
            { name: "Horde (2d8+3)", type: "Passive", description: "At half HP, attack deals 2d8+3 damage." },
            { name: "Aural Assault", type: "Action", description: "Spend Fear. Remove Coda tokens. Deal 1d12 direct mag dmg per token to all in Close." },
            { name: "Celestial Coda", type: "Reaction", description: "Countdown (Loop 3). Ticks on action roll. Triggers: Add token. Tokens add +1 to Diff and Dmg." }
        ]
    },
    {
        originalName: "Owl Witch",
        tier: 4,
        type: "Social",
        difficulty: 19,
        thresholds: { major: 27, severe: 47 },
        hp: { max: 4, current: 4 },
        stress: { max: 3, current: 0 },
        attack: { modifier: 7, name: "Razor Talons", range: "Very Close", damage: "4d8+5 phy" },
        motives: "Consume essence, curse, predict death",
        features: [
            { name: "Ill Omen", type: "Passive", description: "PC in Close adds GM Fear count to their Fear Die result." },
            { name: "Witch Barrier", type: "Passive", description: "Resistant to magic damage." },
            { name: "Alluring Voice", type: "Action", description: "Spend Fear. Target in earshot makes Instinct Reaction or moves Far toward Witch." },
            { name: "Nightmare Stare", type: "Action", description: "Spend Fear. Target Afflicted (cannot clear HP/Stress) until comforted." },
            { name: "Visions of a Violent End", type: "Reaction", description: "When targeted, Spend Fear. Attacker makes Presence Reaction. Fail: Mark 1d4 Stress." }
        ]
    },
    {
        originalName: "Xero, Castle Killer",
        tier: 4,
        type: "Solo",
        difficulty: 20,
        thresholds: { major: 35, severe: 70 },
        hp: { max: 12, current: 12 },
        stress: { max: 10, current: 0 },
        attack: { modifier: 8, name: "Tail Swipe", range: "Close", damage: "4d12+6 phy" },
        motives: "Leave a wake of destruction, level buildings, stomp through settlements",
        features: [
            { name: "Relentless (X)", type: "Passive", description: "Spotlighted X times per GM turn (X = number of PCs)." },
            { name: "Collateral Damage", type: "Passive", description: "Movement destroys terrain/obstacles. Cannot be impeded." },
            { name: "Gigaton Stomp", type: "Action", description: "Spend Fear. Melee: 4d12 phy + Restrained. Close: Instinct Reaction or knockback to Far (Armor Slot or 4d12 dmg)." },
            { name: "Power Slide", type: "Action", description: "Mark Stress to move Close. Creatures in path Strength Reaction. Fail: 2 Armor Slots or Severe Dmg." },
            { name: "Radioactive Breath", type: "Action", description: "Spend Fear to charge. Next turn: Line (Close width) to edge of map. Agility Reaction. Fail: 4d12+12 direct mag dmg. Success: Half." },
            { name: "Regeneration", type: "Action", description: "3/scene: Spend Fear to clear equal HP." }
        ]
    }
];
