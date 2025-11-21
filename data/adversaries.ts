
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
            { name: "Minion (3)", type: "Passive", description: "Defeated on any damage. Every 3 damage defeats an additional minion." },
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
        originalName: "Courtesan",
        tier: 2,
        type: "Social",
        difficulty: 13,
        thresholds: { major: 7, severe: 13 },
        hp: { max: 3, current: 3 },
        stress: { max: 4, current: 0 },
        attack: { modifier: -3, name: "Dagger", range: "Melee", damage: "1d4+3 phy" },
        motives: "Entice, maneuver, secure patrons",
        features: [
            { name: "Searing Glance", type: "Reaction", description: "When PC in Close makes Presence Roll, mark Stress. Failure: PC marks 2 Stress and Vulnerable. Success: PC marks 1 Stress." }
        ]
    },
    {
        originalName: "Cult Adept",
        tier: 2,
        type: "Support",
        difficulty: 14,
        thresholds: { major: 9, severe: 18 },
        hp: { max: 4, current: 4 },
        stress: { max: 6, current: 0 },
        attack: { modifier: 2, name: "Rune-Covered Rod", range: "Far", damage: "2d4+3 mag" },
        motives: "Curry favor, hinder foes, uncover knowledge",
        features: [
            { name: "Enervating Blast", type: "Action", description: "Spend Fear to attack. Success: Target marks Stress." },
            { name: "Shroud of the Fallen", type: "Action", description: "Mark Stress to give Protection (Resistance) to ally in Close." },
            { name: "Shadow Shackles", type: "Action", description: "Spend Fear. Targets in Close of point in Far are Restrained." },
            { name: "Fear Is Fuel", type: "Reaction", description: "When PC rolls Failure with Fear, clear Stress." }
        ]
    },
    {
        originalName: "Cult Fang",
        tier: 2,
        type: "Skulk",
        difficulty: 15,
        thresholds: { major: 9, severe: 17 },
        hp: { max: 4, current: 4 },
        stress: { max: 4, current: 0 },
        attack: { modifier: 2, name: "Long Knife", range: "Melee", damage: "2d8+4 phy" },
        motives: "Capture sacrifices, isolate prey, rise in the ranks",
        features: [
            { name: "Shadow's Embrace", type: "Passive", description: "Can climb/walk vertical surfaces. Mark Stress to move shadow-to-shadow in Far." },
            { name: "Pick Off the Straggler", type: "Action", description: "Mark Stress. Target in Melee makes Instinct Reaction. Fail: Mark 2 Stress, teleported to Far shadow, Vulnerable." }
        ]
    },
    {
        originalName: "Cult Initiate",
        tier: 2,
        type: "Minion",
        difficulty: 13,
        thresholds: { major: 100, severe: 100 },
        hp: { max: 1, current: 1 },
        stress: { max: 1, current: 0 },
        attack: { modifier: 0, name: "Ritual Dagger", range: "Melee", damage: "5 phy" },
        motives: "Follow orders, gain power, seek forbidden knowledge",
        features: [
            { name: "Minion (6)", type: "Passive", description: "Defeated on any damage. Every 6 damage defeats additional minion." },
            { name: "Group Attack", type: "Action", description: "Spend Fear to group attack. Deal 5 phy dmg each." }
        ]
    },
    {
        originalName: "Demonic Hound Pack",
        tier: 2,
        type: "Horde (1/HP)",
        difficulty: 15,
        thresholds: { major: 11, severe: 23 },
        hp: { max: 6, current: 6 },
        stress: { max: 3, current: 0 },
        attack: { modifier: 0, name: "Claws and Fangs", range: "Melee", damage: "2d8+2 phy" },
        motives: "Cause fear, consume flesh, please masters",
        features: [
            { name: "Horde (2d4+1)", type: "Passive", description: "At half HP, attack deals 2d4+1 damage." },
            { name: "Dreadhowl", type: "Action", description: "Mark Stress. All in Very Close lose Hope or mark 2 Stress." },
            { name: "Momentum", type: "Reaction", description: "Gain Fear on successful attack against PC." }
        ]
    },
    {
        originalName: "Electric Eels",
        tier: 2,
        type: "Horde (2/HP)",
        difficulty: 14,
        thresholds: { major: 10, severe: 20 },
        hp: { max: 5, current: 5 },
        stress: { max: 3, current: 0 },
        attack: { modifier: 0, name: "Shocking Bite", range: "Melee", damage: "2d6+4 phy" },
        motives: "Avoid larger predators, shock prey, tear apart",
        features: [
            { name: "Horde (2d4+1)", type: "Passive", description: "At half HP, attack deals 2d4+1 damage." },
            { name: "Paralyzing Shock", type: "Action", description: "Mark Stress. Attack all in Very Close. Gain Fear for each hit." }
        ]
    },
    {
        originalName: "Elite Soldier",
        tier: 2,
        type: "Standard",
        difficulty: 15,
        thresholds: { major: 9, severe: 18 },
        hp: { max: 4, current: 4 },
        stress: { max: 3, current: 0 },
        attack: { modifier: 1, name: "Spear", range: "Very Close", damage: "2d8+4 phy" },
        motives: "Gain glory, keep order, make alliances",
        features: [
            { name: "Reinforce", type: "Action", description: "Mark Stress to move to ally and attack. Success: 2d10+2 phy dmg and ally clears Stress." },
            { name: "Vassal's Loyalty", type: "Reaction", description: "Mark Stress to take damage for adjacent ally." }
        ]
    },
    {
        originalName: "Failed Experiment",
        tier: 2,
        type: "Standard",
        difficulty: 13,
        thresholds: { major: 12, severe: 23 },
        hp: { max: 3, current: 3 },
        stress: { max: 3, current: 0 },
        attack: { modifier: 1, name: "Bite and Claw", range: "Melee", damage: "2d6+5 phy" },
        motives: "Devour, hunt, track",
        features: [
            { name: "Warped Fortitude", type: "Passive", description: "Resistant to physical damage." },
            { name: "Overwhelm", type: "Passive", description: "Double damage against targets with other adversaries in Very Close." },
            { name: "Lurching Lunge", type: "Action", description: "Mark Stress to spotlight Experiment as additional GM move." }
        ]
    },
    {
        originalName: "Giant Beastmaster",
        tier: 2,
        type: "Leader",
        difficulty: 16,
        thresholds: { major: 12, severe: 24 },
        hp: { max: 6, current: 6 },
        stress: { max: 5, current: 0 },
        attack: { modifier: 2, name: "Longbow", range: "Far", damage: "2d8+4 phy" },
        motives: "Command, make a living, maneuver, pin down, protect companion animals",
        features: [
            { name: "Two as One", type: "Passive", description: "When spotlighted, can also spotlight a Tier 1 animal ally." },
            { name: "Pinning Strike", type: "Action", description: "On hit, mark Stress to pin target (Restrained)." },
            { name: "Deadly Companion", type: "Action", description: "2/scene: Summon Bear, Dire Wolf etc. at Close." }
        ]
    },
    {
        originalName: "Giant Brawler",
        tier: 2,
        type: "Bruiser",
        difficulty: 15,
        thresholds: { major: 14, severe: 28 },
        hp: { max: 7, current: 7 },
        stress: { max: 4, current: 0 },
        attack: { modifier: 2, name: "Warhammer", range: "Very Close", damage: "2d12+3 phy" },
        motives: "Make a living, overwhelm, slam, topple",
        features: [
            { name: "Battering Ram", type: "Action", description: "Mark Stress to smash object. Shrapnel 2d4+3 phy dmg (Agility Reaction)." },
            { name: "Bloody Reprisal", type: "Reaction", description: "When marking 2+ HP from Very Close, attack back with 2d6+15 phy dmg." },
            { name: "Momentum", type: "Reaction", description: "Gain Fear on successful attack against PC." }
        ]
    },
    {
        originalName: "Giant Recruit",
        tier: 2,
        type: "Minion",
        difficulty: 13,
        thresholds: { major: 100, severe: 100 },
        hp: { max: 1, current: 1 },
        stress: { max: 2, current: 0 },
        attack: { modifier: 1, name: "Warhammer", range: "Very Close", damage: "5 phy" },
        motives: "Batter, make a living, overwhelm, terrify",
        features: [
            { name: "Minion (7)", type: "Passive", description: "Defeated on any damage. Every 7 damage defeats additional minion." },
            { name: "Group Attack", type: "Action", description: "Spend Fear to group attack. Deal 5 phy dmg each. Combine damage." }
        ]
    },
    {
        originalName: "Giant Eagle",
        tier: 2,
        type: "Skulk",
        difficulty: 14,
        thresholds: { major: 8, severe: 19 },
        hp: { max: 4, current: 4 },
        stress: { max: 4, current: 0 },
        attack: { modifier: 1, name: "Claws and Beak", range: "Very Close", damage: "2d6+3 phy" },
        motives: "Hunt prey, stay mobile, strike decisively",
        features: [
            { name: "Flight", type: "Passive", description: "While flying, +3 Difficulty." },
            { name: "Deadly Dive", type: "Action", description: "Mark Stress to attack target in Far. Success: 2d10+2 phy dmg + Vulnerable." },
            { name: "Take Off", type: "Action", description: "Attack. Success: 2d4+3 phy dmg + Restrain and lift to Very Far." },
            { name: "Deadly Drop", type: "Action", description: "Drop Restrained target. 2d20 phy dmg on landing." }
        ]
    },
    {
        originalName: "Gorgon",
        tier: 2,
        type: "Solo",
        difficulty: 15,
        thresholds: { major: 13, severe: 25 },
        hp: { max: 9, current: 9 },
        stress: { max: 3, current: 0 },
        attack: { modifier: 4, name: "Sunsear Shortbow", range: "Far", damage: "2d20+3 mag" },
        motives: "Corner, hit-and-run, petrify, seek vengeance",
        features: [
            { name: "Relentless (2)", type: "Passive", description: "Can be spotlighted 2 times per GM turn." },
            { name: "Sunsear Arrows", type: "Passive", description: "Target Glows (advantage against them)." },
            { name: "Crown of Serpents", type: "Action", description: "Attack target in Melee. Success: 2d10+4 phy dmg + mark Stress." },
            { name: "Petrifying Gaze", type: "Reaction", description: "When taking damage from Close, spend Fear to start Petrification Countdown (4)." },
            { name: "Momentum", type: "Reaction", description: "Gain Fear on successful attack against PC." }
        ]
    },
    {
        originalName: "Juvenile Flickerfly",
        tier: 2,
        type: "Solo",
        difficulty: 14,
        thresholds: { major: 13, severe: 26 },
        hp: { max: 10, current: 10 },
        stress: { max: 5, current: 0 },
        attack: { modifier: 3, name: "Wing Slash", range: "Very Close", damage: "2d10+4 phy" },
        motives: "Collect shiny things, hunt, swoop",
        features: [
            { name: "Relentless (3)", type: "Passive", description: "Can be spotlighted 3 times per GM turn." },
            { name: "Peerless Accuracy", type: "Passive", description: "Roll d6 before attack. On 4+, halve target's Evasion." },
            { name: "Mind Dance", type: "Action", description: "Mark Stress. Targets in Close Instinct Reaction. Fail: Gain Fear + learn fear." },
            { name: "Hallucinatory Breath", type: "Reaction", description: "Countdown (d6) on first damage. Breath weapon: Instinct Reaction or mark Stress, lose Hope." }
        ]
    },
    {
        originalName: "Knight of the Realm",
        tier: 2,
        type: "Leader",
        difficulty: 15,
        thresholds: { major: 13, severe: 26 },
        hp: { max: 6, current: 6 },
        stress: { max: 4, current: 0 },
        attack: { modifier: 4, name: "Longsword", range: "Melee", damage: "2d10+4 phy" },
        motives: "Run down, seek glory, show dominance",
        features: [
            { name: "Chevalier", type: "Passive", description: "+2 Difficulty while mounted. Knocked off on Severe damage." },
            { name: "Heavily Armored", type: "Passive", description: "Reduce physical damage by 3." },
            { name: "Cavalry Charge", type: "Action", description: "Move Far and attack. Success: 2d8+4 phy dmg + mark Stress." },
            { name: "For the Realm!", type: "Action", description: "Mark Stress to spotlight 1d4+1 allies (half damage)." }
        ]
    },
    {
        originalName: "Masked Thief",
        tier: 2,
        type: "Skulk",
        difficulty: 14,
        thresholds: { major: 8, severe: 17 },
        hp: { max: 4, current: 4 },
        stress: { max: 5, current: 0 },
        attack: { modifier: 3, name: "Backsword", range: "Melee", damage: "2d8+3 phy" },
        motives: "Evade, hide, pilfer, profit",
        features: [
            { name: "Quick Hands", type: "Action", description: "Attack target in Melee. Success: 1d8+2 phy dmg + steal item." },
            { name: "Escape Plan", type: "Action", description: "Mark Stress to reveal snare trap. Agility Reaction (13) or suspended/Vulnerable." }
        ]
    },
    {
        originalName: "Merchant Baron",
        tier: 2,
        type: "Social",
        difficulty: 15,
        thresholds: { major: 9, severe: 19 },
        hp: { max: 5, current: 5 },
        stress: { max: 3, current: 0 },
        attack: { modifier: -2, name: "Rapier", range: "Melee", damage: "1d6+2 phy" },
        motives: "Abuse power, gather resources, mobilize minions",
        features: [
            { name: "Everyone Has a Price", type: "Action", description: "Spend Fear. Target must mark 2 Stress or take deal (Presence Reaction 17)." },
            { name: "The Best Muscle", type: "Action", description: "1/scene: Mark Stress to summon 1d4+1 Tier 1 adversaries." }
        ]
    },
    {
        originalName: "Minotaur Wrecker",
        tier: 2,
        type: "Bruiser",
        difficulty: 16,
        thresholds: { major: 14, severe: 27 },
        hp: { max: 7, current: 7 },
        stress: { max: 5, current: 0 },
        attack: { modifier: 2, name: "Battleaxe", range: "Very Close", damage: "2d8+5 phy" },
        motives: "Consume, gore, navigate, overpower, pursue",
        features: [
            { name: "Ramp Up", type: "Passive", description: "Spend Fear to spotlight. Attack all targets within range." },
            { name: "Charging Bull", type: "Action", description: "Mark Stress to charge. Targets in path take 2d6+8 phy dmg + knockback." },
            { name: "Gore", type: "Action", description: "Attack target in Very Close. Success: 2d8 direct physical damage." }
        ]
    },
    {
        originalName: "Mortal Hunter",
        tier: 2,
        type: "Leader",
        difficulty: 16,
        thresholds: { major: 15, severe: 27 },
        hp: { max: 6, current: 6 },
        stress: { max: 4, current: 0 },
        attack: { modifier: 5, name: "Tear at Flesh", range: "Very Close", damage: "2d12+1 phy" },
        motives: "Devour, hunt, track",
        features: [
            { name: "Terrifying", type: "Passive", description: "On successful attack, PCs in Far lose Hope, GM gains Fear." },
            { name: "Deathlock", type: "Action", description: "Spend Fear to curse target. Attacks against Deathlocked are direct damage." },
            { name: "Inevitable Death", type: "Action", description: "Mark Stress to spotlight 1d4 allies (half damage)." },
            { name: "Rampage", type: "Reaction", description: "Countdown (d6). Move Far and attack all in path. 2d8+2 phy dmg." }
        ]
    },
    {
        originalName: "Royal Advisor",
        tier: 2,
        type: "Social",
        difficulty: 14,
        thresholds: { major: 8, severe: 15 },
        hp: { max: 3, current: 3 },
        stress: { max: 3, current: 0 },
        attack: { modifier: -3, name: "Wand", range: "Far", damage: "1d4+3 phy" },
        motives: "Curry favor, manufacture evidence, scheme",
        features: [
            { name: "Devastating Retort", type: "Passive", description: "PC rolling <17 against Advisor marks Stress." },
            { name: "Bend Ears", type: "Action", description: "Mark Stress to influence NPC opinion." },
            { name: "Scapegoat", type: "Action", description: "Spend Fear to convince crowd target is responsible for problem." }
        ]
    },
    {
        originalName: "Secret-Keeper",
        tier: 2,
        type: "Leader",
        difficulty: 16,
        thresholds: { major: 13, severe: 26 },
        hp: { max: 7, current: 7 },
        stress: { max: 4, current: 0 },
        attack: { modifier: 3, name: "Sigil-laden Staff", range: "Far", damage: "2d12 mag" },
        motives: "Amass great power, plot, take command",
        features: [
            { name: "Seize Your Moment", type: "Action", description: "Spend 2 Fear to spotlight 1d4 allies (half damage)." },
            { name: "Our Master's Will", type: "Reaction", description: "When spotlighting ally in Far, mark Stress to gain Fear." },
            { name: "Summoning Ritual", type: "Reaction", description: "Countdown (6) ticking on HP marked. Triggers: Summon Minor Demon." },
            { name: "Fallen Hounds", type: "Reaction", description: "1/scene, when marking 2+ HP, mark Stress to summon Hound Pack." }
        ]
    },
    {
        originalName: "Shark",
        tier: 2,
        type: "Bruiser",
        difficulty: 14,
        thresholds: { major: 14, severe: 28 },
        hp: { max: 7, current: 7 },
        stress: { max: 3, current: 0 },
        attack: { modifier: 2, name: "Toothy Maw", range: "Very Close", damage: "2d12+1 phy" },
        motives: "Find the blood, isolate prey, target the weak",
        features: [
            { name: "Terrifying", type: "Passive", description: "On successful attack, PCs in Far lose Hope, GM gains Fear." },
            { name: "Rending Bite", type: "Passive", description: "Target must mark Armor Slot without benefit or mark extra HP." },
            { name: "Blood in the Water", type: "Reaction", description: "When creature in Close marks HP, mark Stress to attack them." }
        ]
    },
    {
        originalName: "Siren",
        tier: 2,
        type: "Skulk",
        difficulty: 14,
        thresholds: { major: 9, severe: 18 },
        hp: { max: 5, current: 5 },
        stress: { max: 3, current: 0 },
        attack: { modifier: 2, name: "Distended Jaw Bite", range: "Melee", damage: "2d6+3 phy" },
        motives: "Consume, lure prey, subdue with song",
        features: [
            { name: "Captive Audience", type: "Passive", description: "Deal 2d10+1 dmg against Entranced targets." },
            { name: "Enchanting Song", type: "Action", description: "Spend Fear. Targets in Close make Instinct Reaction. Fail: Entranced." }
        ]
    },
    {
        originalName: "Spectral Archer",
        tier: 2,
        type: "Ranged",
        difficulty: 13,
        thresholds: { major: 6, severe: 14 },
        hp: { max: 3, current: 3 },
        stress: { max: 3, current: 0 },
        attack: { modifier: 3, name: "Longbow", range: "Far", damage: "2d10+2 phy" },
        motives: "Move through solid objects, stay out of the fray",
        features: [
            { name: "Ghost", type: "Passive", description: "Resistant to physical. Move through objects." },
            { name: "Pick Your Target", type: "Action", description: "Spend Fear to attack PC near others. Success: 2d8+12 phy dmg." }
        ]
    },
    {
        originalName: "Spectral Captain",
        tier: 2,
        type: "Leader",
        difficulty: 16,
        thresholds: { major: 13, severe: 26 },
        hp: { max: 6, current: 6 },
        stress: { max: 4, current: 0 },
        attack: { modifier: 3, name: "Longbow", range: "Far", damage: "2d10+3 phy" },
        motives: "Move through solid objects, rally troops",
        features: [
            { name: "Ghost", type: "Passive", description: "Resistant to physical. Move through objects." },
            { name: "Unending Battle", type: "Action", description: "Spend 2 Fear to return 1d4+1 defeated Spectral allies." },
            { name: "Hold Fast", type: "Reaction", description: "Mark Stress to give allies +2 on reaction rolls." },
            { name: "Momentum", type: "Reaction", description: "Gain Fear on successful attack against PC." }
        ]
    },
    {
        originalName: "Spectral Guardian",
        tier: 2,
        type: "Standard",
        difficulty: 15,
        thresholds: { major: 7, severe: 15 },
        hp: { max: 4, current: 4 },
        stress: { max: 3, current: 0 },
        attack: { modifier: 1, name: "Spear", range: "Very Close", damage: "2d8+1 phy" },
        motives: "Move through solid objects, protect treasure",
        features: [
            { name: "Ghost", type: "Passive", description: "Resistant to physical. Move through objects." },
            { name: "Grave Blade", type: "Action", description: "Spend Fear to attack. Success: 2d10+6 phy dmg + mark Stress." }
        ]
    },
    {
        originalName: "Spy",
        tier: 2,
        type: "Social",
        difficulty: 15,
        thresholds: { major: 8, severe: 17 },
        hp: { max: 4, current: 4 },
        stress: { max: 3, current: 0 },
        attack: { modifier: -2, name: "Dagger", range: "Melee", damage: "2d6+3 phy" },
        motives: "Cut and run, disguise appearance, eavesdrop",
        features: [
            { name: "Gathering Secrets", type: "Action", description: "Spend Fear to know a secret about a PC." },
            { name: "Fly on the Wall", type: "Reaction", description: "Mark Stress to reveal Spy presence. Gain 1d4 Fear if they escape." }
        ]
    },
    {
        originalName: "Stonewraith",
        tier: 2,
        type: "Skulk",
        difficulty: 13,
        thresholds: { major: 11, severe: 22 },
        hp: { max: 6, current: 6 },
        stress: { max: 3, current: 0 },
        attack: { modifier: 3, name: "Bite and Claws", range: "Melee", damage: "2d8+6 phy" },
        motives: "Defend territory, isolate prey, stalk",
        features: [
            { name: "Stonestrider", type: "Passive", description: "Moves through stone (Hidden/Immune). Mark Stress to travel Far." },
            { name: "Rocky Ambush", type: "Action", description: "Mark Stress to leap and attack. Reaction 15 or 2d8 dmg + Restrained." },
            { name: "Avalanche Roar", type: "Action", description: "Spend Fear to cause cave-in. 2d10 phy dmg (Agility 14) + Rubble." },
            { name: "Momentum", type: "Reaction", description: "Gain Fear on successful attack against PC." }
        ]
    },
    {
        originalName: "War Wizard",
        tier: 2,
        type: "Ranged",
        difficulty: 16,
        thresholds: { major: 11, severe: 23 },
        hp: { max: 5, current: 5 },
        stress: { max: 6, current: 0 },
        attack: { modifier: 4, name: "Staff", range: "Far", damage: "2d10+4 mag" },
        motives: "Develop new spells, seek power, shatter formations",
        features: [
            { name: "Battle Teleport", type: "Passive", description: "Mark Stress to teleport Far before/after attack." },
            { name: "Refresh Warding Sphere", type: "Action", description: "Mark Stress to refresh Warding Sphere." },
            { name: "Eruption", type: "Action", description: "Spend Fear. Area in Far. Agility Reaction (14) or 2d10 phy dmg." },
            { name: "Arcane Artillery", type: "Action", description: "Spend Fear. All targets Reaction. Fail: 2d12 mag dmg." },
            { name: "Warding Sphere", type: "Reaction", description: "Deal 2d6 mag dmg to attacker in Close. (Needs Refresh)." }
        ]
    },

    // --- TIER 3 (LEVELS 5-7) ---
    {
        originalName: "Adult Flickerfly",
        tier: 3,
        type: "Solo",
        difficulty: 17,
        thresholds: { major: 20, severe: 35 },
        hp: { max: 12, current: 12 },
        stress: { max: 6, current: 0 },
        attack: { modifier: 3, name: "Wing Slash", range: "Very Close", damage: "3d20 phy" },
        motives: "Collect shiny things, hunt, nest, swoop",
        features: [
            { name: "Relentless (4)", type: "Passive", description: "Can be spotlighted 4 times per GM turn." },
            { name: "Never Misses", type: "Passive", description: "Target Evasion halved against attacks." },
            { name: "Whirlwind", type: "Action", description: "Spend Fear to attack all in Very Close. Success: 3d8 direct phy dmg." },
            { name: "Mind Dance", type: "Action", description: "Mark Stress. Targets in Close Instinct Reaction. Fail: Gain Fear + learn fear." },
            { name: "Hallucinatory Breath", type: "Reaction", description: "Countdown (d6) on first damage. Breath weapon: Instinct Reaction or mark Stress, lose Hope." }
        ]
    },
    {
        originalName: "Demon of Avarice",
        tier: 3,
        type: "Support",
        difficulty: 17,
        thresholds: { major: 15, severe: 29 },
        hp: { max: 6, current: 6 },
        stress: { max: 5, current: 0 },
        attack: { modifier: 2, name: "Hungry Maw", range: "Melee", damage: "3d6+5 mag" },
        motives: "Consume, fuel greed",
        features: [
            { name: "Money Talks", type: "Passive", description: "Attacks have disadvantage unless attacker spends gold." },
            { name: "Numbers Must Go Up", type: "Passive", description: "Bonus to attack rolls based on gold held." },
            { name: "Money Is Time", type: "Action", description: "Spend 3 gold or Fear to spotlight 1d4+1 allies." }
        ]
    },
    {
        originalName: "Demon of Despair",
        tier: 3,
        type: "Skulk",
        difficulty: 17,
        thresholds: { major: 18, severe: 35 },
        hp: { max: 6, current: 6 },
        stress: { max: 5, current: 0 },
        attack: { modifier: 3, name: "Miasma Bolt", range: "Far", damage: "3d6+1 mag" },
        motives: "Make fear contagious, undermine resolve",
        features: [
            { name: "Depths of Despair", type: "Passive", description: "Double damage to PCs with 0 Hope." },
            { name: "Your Struggle Is Pointless", type: "Action", description: "Spend Fear. PCs in Far replace Hope die with d8." },
            { name: "Your Friends Will Fail You", type: "Reaction", description: "When PC fails with Fear, mark Stress to make other PCs in Close lose Hope." }
        ]
    },
    {
        originalName: "Demon of Hubris",
        tier: 3,
        type: "Leader",
        difficulty: 18,
        thresholds: { major: 18, severe: 36 },
        hp: { max: 7, current: 7 },
        stress: { max: 5, current: 0 },
        attack: { modifier: 4, name: "Perfect Spear", range: "Very Close", damage: "3d10 phy" },
        motives: "Condescend, declare premature victory, prove superiority",
        features: [
            { name: "Terrifying", type: "Passive", description: "When making successful attack, all PCs in Far lose Hope, GM gains Fear." },
            { name: "Double or Nothing", type: "Passive", description: "PC can reroll Fear Die on failure. If still fail, mark 2 Stress, Demon clears Stress." },
            { name: "Unparalleled Skill", type: "Action", description: "Mark Stress to deal standard damage to target in Close." },
            { name: "The Root of Villainy", type: "Action", description: "Spend Fear to spotlight 2 other Demons." }
        ]
    },
    {
        originalName: "Demon of Jealousy",
        tier: 3,
        type: "Ranged",
        difficulty: 17,
        thresholds: { major: 17, severe: 30 },
        hp: { max: 6, current: 6 },
        stress: { max: 6, current: 0 },
        attack: { modifier: 4, name: "Psychic Assault", range: "Far", damage: "3d8+3 mag" },
        motives: "Join in on others' success, take what belongs to others, hold grudges",
        features: [
            { name: "Unprotected Mind", type: "Passive", description: "Standard attack deals direct damage." },
            { name: "My Turn", type: "Reaction", description: "When marking HP, Spend Fear to make attacker mark same HP." },
            { name: "Rivalry", type: "Reaction", description: "Mark Stress to add d4 to damage dealt by another adversary." },
            { name: "What's Yours Is Mine", type: "Reaction", description: "When PC takes Severe damage, Spend Fear to steal item." }
        ]
    },
    {
        originalName: "Demon of Wrath",
        tier: 3,
        type: "Bruiser",
        difficulty: 17,
        thresholds: { major: 22, severe: 40 },
        hp: { max: 7, current: 7 },
        stress: { max: 5, current: 0 },
        attack: { modifier: 3, name: "Fists", range: "Very Close", damage: "3d8+1 mag" },
        motives: "Fuel anger, impress rivals, wreak havoc",
        features: [
            { name: "Anger Unrelenting", type: "Passive", description: "Attacks deal direct damage." },
            { name: "Battle Lust", type: "Action", description: "Spend Fear. PCs in Far use d20 as Fear Die." },
            { name: "Retaliation", type: "Reaction", description: "When taking damage, mark Stress to attack back." },
            { name: "Blood and Souls", type: "Reaction", description: "Countdown (6) on violence. Triggers: Summon Minor Demons." }
        ]
    },
    {
        originalName: "Dire Bat",
        tier: 3,
        type: "Skulk",
        difficulty: 14,
        thresholds: { major: 16, severe: 30 },
        hp: { max: 5, current: 5 },
        stress: { max: 3, current: 0 },
        attack: { modifier: 2, name: "Claws and Teeth", range: "Melee", damage: "2d6+7 phy" },
        motives: "Dive-bomb, hide, protect leader",
        features: [
            { name: "Flying", type: "Passive", description: "+3 Difficulty while flying." },
            { name: "Screech", type: "Action", description: "Mark Stress. Targets in Far mark 1d4 Stress." },
            { name: "Guardian", type: "Reaction", description: "When Vampire ally marks HP, mark Stress to attack attacker with advantage." }
        ]
    },
    {
        originalName: "Dryad",
        tier: 3,
        type: "Leader",
        difficulty: 16,
        thresholds: { major: 24, severe: 38 },
        hp: { max: 8, current: 8 },
        stress: { max: 5, current: 0 },
        attack: { modifier: 4, name: "Deadfall Shortbow", range: "Far", damage: "3d10+1 phy" },
        motives: "Command, cultivate, drive out, preserve the forest",
        features: [
            { name: "Bramble Patch", type: "Action", description: "Mark Stress to create thorns in Far. 2d6+2 phy dmg/turn. Finesse Roll to leave." },
            { name: "Grow Saplings", type: "Action", description: "Spend Fear to summon 3 Treant Saplings." },
            { name: "We Are All One", type: "Reaction", description: "When ally dies, Spend Fear to clear 2 HP and 2 Stress." }
        ]
    },
    {
        originalName: "Elemental Spark",
        tier: 3,
        type: "Minion",
        difficulty: 15,
        thresholds: { major: 100, severe: 100 },
        hp: { max: 1, current: 1 },
        stress: { max: 1, current: 0 },
        attack: { modifier: 0, name: "Bursts of Fire", range: "Close", damage: "5 mag" },
        motives: "Blast, consume, gain mass",
        features: [
            { name: "Minion (9)", type: "Passive", description: "Defeated on any damage. Every 9 damage defeats additional minion." },
            { name: "Group Attack", type: "Action", description: "Spend Fear to group attack. Deal 5 mag dmg each." }
        ]
    },
    {
        originalName: "Greater Earth Elemental",
        tier: 3,
        type: "Bruiser",
        difficulty: 17,
        thresholds: { major: 22, severe: 40 },
        hp: { max: 10, current: 10 },
        stress: { max: 4, current: 0 },
        attack: { modifier: 7, name: "Boulder Fist", range: "Very Close", damage: "3d10+1 phy" },
        motives: "Avalanche, knock over, pummel",
        features: [
            { name: "Slow", type: "Passive", description: "Needs token to act." },
            { name: "Crushing Blows", type: "Passive", description: "Target must mark Armor Slot without benefit or mark extra HP." },
            { name: "Immovable Object", type: "Passive", description: "Moves less from attacks. Reduce physical damage by 7." },
            { name: "Rockslide", type: "Action", description: "Mark Stress. Targets in Close make Agility Reaction (19) or take 2d12+5 phy dmg and become Vulnerable." },
            { name: "Momentum", type: "Reaction", description: "Gain Fear on successful attack against PC." }
        ]
    },
    {
        originalName: "Greater Water Elemental",
        tier: 3,
        type: "Support",
        difficulty: 17,
        thresholds: { major: 17, severe: 34 },
        hp: { max: 5, current: 5 },
        stress: { max: 5, current: 0 },
        attack: { modifier: 3, name: "Crashing Wave", range: "Very Close", damage: "3d4+1 mag" },
        motives: "Deluge, disperse, drown",
        features: [
            { name: "Water Jet", type: "Action", description: "Mark Stress to attack. Success: 2d4+7 phy dmg and disadvantage on next action." },
            { name: "Drowning Embrace", type: "Action", description: "Spend Fear to attack all in Very Close. Success: Restrained and Vulnerable." },
            { name: "High Tide", type: "Reaction", description: "On hit, mark Stress to knock target back to Close." }
        ]
    },
    {
        originalName: "Huge Green Ooze",
        tier: 3,
        type: "Skulk",
        difficulty: 15,
        thresholds: { major: 15, severe: 30 },
        hp: { max: 7, current: 7 },
        stress: { max: 4, current: 0 },
        attack: { modifier: 3, name: "Ooze Appendage", range: "Melee", damage: "3d8+1 mag" },
        motives: "Camouflage, creep up, envelop, multiply",
        features: [
            { name: "Slow", type: "Passive", description: "Needs token to act." },
            { name: "Acidic Form", type: "Passive", description: "On success, target must mark Armor Slot without benefit, or mark extra HP." },
            { name: "Envelop", type: "Action", description: "Attack target in Melee. Success: Envelop (2 Stress + 1/action). Freed on Severe dmg." },
            { name: "Split", type: "Reaction", description: "At 4+ HP marked, Spend Fear to split into two Green Oozes." }
        ]
    },
    {
        originalName: "Hydra",
        tier: 3,
        type: "Solo",
        difficulty: 18,
        thresholds: { major: 19, severe: 35 },
        hp: { max: 10, current: 10 },
        stress: { max: 5, current: 0 },
        attack: { modifier: 3, name: "Bite", range: "Close", damage: "2d12+2 phy" },
        motives: "Devour, regenerate, terrify",
        features: [
            { name: "Many-Headed Menace", type: "Passive", description: "Starts with 3 heads (max 5). Loses head on Major+ damage." },
            { name: "Relentless (X)", type: "Passive", description: "Can be spotlighted X times (heads) per GM turn." },
            { name: "Regeneration", type: "Action", description: "Spend Fear to clear HP and grow 2 heads." },
            { name: "Terrifying Chorus", type: "Action", description: "All PCs in Far lose 2 Hope." },
            { name: "Magical Weakness", type: "Reaction", description: "Magic damage Dazes (immune to magic, no regen)." }
        ]
    },
    {
        originalName: "Monarch",
        tier: 3,
        type: "Social",
        difficulty: 16,
        thresholds: { major: 16, severe: 32 },
        hp: { max: 6, current: 6 },
        stress: { max: 5, current: 0 },
        attack: { modifier: 0, name: "Warhammer", range: "Melee", damage: "3d6+3 phy" },
        motives: "Control vassals, destroy rivals, forge a legacy",
        features: [
            { name: "Execute Them!", type: "Action", description: "Spend Fear per PC to condemn group. Presence Roll to demand trial." },
            { name: "Crownsguard", type: "Action", description: "1/scene: Mark Stress to summon 6 Tier 3 Minions." },
            { name: "Casus Belli", type: "Reaction", description: "Spend Fear to trigger Countdown (8) for war." }
        ]
    },
    {
        originalName: "Stag Knight",
        tier: 3,
        type: "Standard",
        difficulty: 17,
        thresholds: { major: 19, severe: 36 },
        hp: { max: 7, current: 7 },
        stress: { max: 5, current: 0 },
        attack: { modifier: 3, name: "Bramble Sword", range: "Melee", damage: "3d8+3 phy" },
        motives: "Isolate, maneuver, protect the forest",
        features: [
            { name: "From Above", type: "Passive", description: "Attack from above deals 3d12+3 phy dmg." },
            { name: "Blade of the Forest", type: "Action", description: "Spend Fear to attack all in Very Close. Deals 3d4 + Target Major Threshold." },
            { name: "Thorny Armor", type: "Reaction", description: "Mark Stress on hit to deal 1d10+5 phy dmg back." }
        ]
    },
    {
        originalName: "Oak Treant",
        tier: 3,
        type: "Bruiser",
        difficulty: 17,
        thresholds: { major: 22, severe: 40 },
        hp: { max: 7, current: 7 },
        stress: { max: 4, current: 0 },
        attack: { modifier: 2, name: "Branch", range: "Very Close", damage: "3d8+2 phy" },
        motives: "Hide in plain sight, root down, swing branches",
        features: [
            { name: "Just a Tree", type: "Passive", description: "Indistinguishable from tree until action." },
            { name: "Seed Barrage", type: "Action", description: "Mark Stress to attack 3 targets in Close. 2d10+5 phy dmg." },
            { name: "Take Root", type: "Action", description: "Mark Stress to Root. Resistant to physical." }
        ]
    },
    {
        originalName: "Treant Sapling",
        tier: 3,
        type: "Minion",
        difficulty: 14,
        thresholds: { major: 100, severe: 100 },
        hp: { max: 1, current: 1 },
        stress: { max: 1, current: 0 },
        attack: { modifier: 0, name: "Branches", range: "Melee", damage: "8 phy" },
        motives: "Blend in, preserve the forest, pummel",
        features: [
            { name: "Minion (6)", type: "Passive", description: "Defeated on any damage. Every 6 damage defeats additional minion." },
            { name: "Group Attack", type: "Action", description: "Spend Fear to group attack. Deal 8 phy dmg each." }
        ]
    },
    {
        originalName: "Head Vampire",
        tier: 3,
        type: "Leader",
        difficulty: 17,
        thresholds: { major: 22, severe: 42 },
        hp: { max: 6, current: 6 },
        stress: { max: 6, current: 0 },
        attack: { modifier: 5, name: "Rapier", range: "Melee", damage: "2d20+4 phy" },
        motives: "Create thralls, charm, command, fly",
        features: [
            { name: "Terrifying", type: "Passive", description: "On successful attack, PCs in Far lose Hope, GM gains Fear." },
            { name: "Look into My Eyes", type: "Passive", description: "Moving into Melee triggers Instinct Reaction. Fail: GM gains 1d4 Fear." },
            { name: "Feed on Followers", type: "Action", description: "Damage ally to clear HP." },
            { name: "The Hunt Is On", type: "Action", description: "Spend 2 Fear to summon 1d4 Vampires." },
            { name: "Lifesuck", type: "Reaction", description: "When spotlighted, roll d8. On 6+, targets in Very Close mark HP." }
        ]
    },
    {
        originalName: "Vampire",
        tier: 3,
        type: "Standard",
        difficulty: 16,
        thresholds: { major: 18, severe: 35 },
        hp: { max: 5, current: 5 },
        stress: { max: 4, current: 0 },
        attack: { modifier: 3, name: "Rapier", range: "Melee", damage: "3d8 phy" },
        motives: "Bite, charm, deceive, feed",
        features: [
            { name: "Draining Bite", type: "Action", description: "Attack target in Melee. Success: 5d4 phy dmg. Target loses Hope, marks Stress. Vampire clears HP." },
            { name: "Mistform", type: "Reaction", description: "Spend Fear to take half physical damage." }
        ]
    },
    {
        originalName: "Vault Guardian Gaoler",
        tier: 3,
        type: "Support",
        difficulty: 16,
        thresholds: { major: 19, severe: 33 },
        hp: { max: 5, current: 5 },
        stress: { max: 3, current: 0 },
        attack: { modifier: 2, name: "Body Bash", range: "Very Close", damage: "3d6+2 phy" },
        motives: "Carry away, entrap, protect, pummel",
        features: [
            { name: "Blocking Shield", type: "Passive", description: "Disadvantage on attacks from Melee." },
            { name: "Lock Up", type: "Action", description: "Mark Stress to attack. Success: Target Restrained inside Gaoler." }
        ]
    },
    {
        originalName: "Vault Guardian Sentinel",
        tier: 3,
        type: "Bruiser",
        difficulty: 17,
        thresholds: { major: 21, severe: 40 },
        hp: { max: 6, current: 6 },
        stress: { max: 3, current: 0 },
        attack: { modifier: 3, name: "Charged Mace", range: "Very Close", damage: "2d12+1 phy" },
        motives: "Destroy at any cost, expunge, protect",
        features: [
            { name: "Kinetic Slam", type: "Passive", description: "Targets damaged are knocked back to Very Close." },
            { name: "Box In", type: "Action", description: "Mark Stress to focus on target. Target has disadvantage on attacks." },
            { name: "Mana Bolt", type: "Action", description: "Spend Fear. Area in Far. Agility Reaction or 2d8+20 mag dmg." },
            { name: "Momentum", type: "Reaction", description: "Gain Fear on successful attack against PC." }
        ]
    },
    {
        originalName: "Vault Guardian Turret",
        tier: 3,
        type: "Ranged",
        difficulty: 16,
        thresholds: { major: 20, severe: 32 },
        hp: { max: 5, current: 5 },
        stress: { max: 4, current: 0 },
        attack: { modifier: 3, name: "Magitech Cannon", range: "Far", damage: "3d10+3 mag" },
        motives: "Concentrate fire, lock down, mark, protect",
        features: [
            { name: "Slow Firing", type: "Passive", description: "Needs token to attack." },
            { name: "Mark Target", type: "Action", description: "Spend Fear to Mark target (halve Evasion)." },
            { name: "Concentrate Fire", type: "Reaction", description: "Mark Stress to add damage to ally attack." },
            { name: "Detonation", type: "Reaction", description: "On destruction: 3d20 phy dmg to all in Close (Agility Reaction)." }
        ]
    },
    {
        originalName: "Young Ice Dragon",
        tier: 3,
        type: "Solo",
        difficulty: 18,
        thresholds: { major: 21, severe: 41 },
        hp: { max: 10, current: 10 },
        stress: { max: 6, current: 0 },
        attack: { modifier: 7, name: "Bite and Claws", range: "Close", damage: "4d10 phy" },
        motives: "Avalanche, defend lair, fly, freeze",
        features: [
            { name: "Relentless (3)", type: "Passive", description: "Can be spotlighted 3 times per GM turn." },
            { name: "Rend and Crush", type: "Passive", description: "Target must mark Stress if not using armor." },
            { name: "No Hope", type: "Passive", description: "PC rolling Fear in Far loses Hope." },
            { name: "Blizzard Breath", type: "Action", description: "Spend 2 Fear. Cone in Close. Agility Reaction or 4d6+5 mag dmg + Restrained." },
            { name: "Avalanche", type: "Action", description: "Spend Fear. Area in Far. Instinct Reaction or buried (Vulnerable). Gain Fear per failure." },
            { name: "Frozen Scales", type: "Reaction", description: "Attacker in Very Close marks Stress and becomes Chilled." },
            { name: "Momentum", type: "Reaction", description: "Gain Fear on successful attack against PC." }
        ]
    },

    // --- TIER 4 (LEVELS 8-10) ---
    {
        originalName: "Arch-Necromancer",
        tier: 4,
        type: "Leader",
        difficulty: 21,
        thresholds: { major: 33, severe: 66 },
        hp: { max: 9, current: 9 },
        stress: { max: 8, current: 0 },
        attack: { modifier: 6, name: "Necrotic Blast", range: "Far", damage: "4d12+8 mag" },
        motives: "Corrupt, decay, resurrect",
        features: [
            { name: "Dance of Death", type: "Action", description: "Mark Stress to spotlight 1d4 allies. Attacks deal half damage (full with Fear)." },
            { name: "Beam of Decay", type: "Action", description: "Mark 2 Stress. Targets in Far make Strength Reaction. Fail: 2d20+12 mag dmg and gain Fear." },
            { name: "Open the Gates", type: "Action", description: "Spend Fear to summon Zombie Legion." },
            { name: "Not Today", type: "Reaction", description: "At 7+ HP marked, Spend Fear to teleport away." },
            { name: "Your Life Is Mine", type: "Reaction", description: "Countdown (2d6). Drains HP/Stress from target to heal." }
        ]
    },
    {
        originalName: "Fallen Sorcerer",
        tier: 4,
        type: "Support",
        difficulty: 19,
        thresholds: { major: 26, severe: 42 },
        hp: { max: 6, current: 6 },
        stress: { max: 5, current: 0 },
        attack: { modifier: 4, name: "Corrupted Staff", range: "Far", damage: "4d6+10 mag" },
        motives: "Acquire, dishearten, dominate, torment",
        features: [
            { name: "Conflagration", type: "Action", description: "Spend Fear. Attack all in Close. 2d10+6 direct mag dmg." },
            { name: "Nightmare Tableau", type: "Action", description: "Mark Stress to trap target (Restrained + Vulnerable)." },
            { name: "Slippery", type: "Reaction", description: "Teleport on taking damage." },
            { name: "Shackles of Guilt", type: "Reaction", description: "Countdown (2d6). Targets Vulnerable + Stress. Fail escape = Lose Hope." }
        ]
    },
    {
        originalName: "Fallen Shock Troop",
        tier: 4,
        type: "Minion",
        difficulty: 18,
        thresholds: { major: 100, severe: 100 },
        hp: { max: 1, current: 1 },
        stress: { max: 1, current: 0 },
        attack: { modifier: 2, name: "Cursed Axe", range: "Very Close", damage: "12 phy" },
        motives: "Crush, dominate, earn relief, punish",
        features: [
            { name: "Minion (12)", type: "Passive", description: "Defeated on any damage. Every 12 damage defeats additional minion." },
            { name: "Aura of Doom", type: "Passive", description: "PC marking HP loses Hope." },
            { name: "Group Attack", type: "Action", description: "Spend Fear to group attack. Deal 12 phy dmg each." }
        ]
    },
    {
        originalName: "Fallen Warlord: Realm-Breaker",
        tier: 4,
        type: "Solo",
        difficulty: 20,
        thresholds: { major: 36, severe: 66 },
        hp: { max: 8, current: 8 },
        stress: { max: 5, current: 0 },
        attack: { modifier: 7, name: "Barbed Whip", range: "Close", damage: "4d8+7 phy" },
        motives: "Corrupt, dominate, punish, break the weak",
        features: [
            { name: "Relentless (2)", type: "Passive", description: "Can be spotlighted 2 times per GM turn." },
            { name: "Firespite Plate Armor", type: "Passive", description: "Reduce damage by 2d10." },
            { name: "Tormenting Lash", type: "Action", description: "Mark Stress to attack all in Very Close. Using armor costs 2 slots." },
            { name: "All-Consuming Rage", type: "Reaction", description: "Countdown (8). Triggers: 2d6+10 direct mag dmg to all in Far + summons. At 0, TPK." },
            { name: "Doombringer", type: "Reaction", description: "When target marks HP, all PCs in Far lose Hope." },
            { name: "Phase Change", type: "Reaction", description: "On defeat, replace with Undefeated Champion." }
        ]
    },
    {
        originalName: "Fallen Warlord: Undefeated Champion",
        tier: 4,
        type: "Solo",
        difficulty: 18,
        thresholds: { major: 35, severe: 58 },
        hp: { max: 11, current: 11 },
        stress: { max: 5, current: 0 },
        attack: { modifier: 8, name: "Heart-Shattering Sword", range: "Very Close", damage: "4d12+13 phy" },
        motives: "Dispatch merciless death, punish the defiant",
        features: [
            { name: "Relentless (3)", type: "Passive", description: "Can be spotlighted 3 times per GM turn." },
            { name: "Faltering Armor", type: "Passive", description: "Reduce damage by 1d10." },
            { name: "Shattering Strike", type: "Action", description: "Mark Stress. Attack all in Very Close. Lose Hope equal to HP marked." },
            { name: "Endless Legions", type: "Action", description: "Spend Fear to summon 2x PC count Shock Troops." },
            { name: "Circle of Defilement", type: "Reaction", description: "Countdown (1d8). Vulnerable zone." },
            { name: "Doombringer", type: "Reaction", description: "When target marks HP, all PCs in Far lose Hope." }
        ]
    },
    {
        originalName: "Hallowed Archer",
        tier: 4,
        type: "Ranged",
        difficulty: 19,
        thresholds: { major: 25, severe: 45 },
        hp: { max: 3, current: 3 },
        stress: { max: 2, current: 0 },
        attack: { modifier: 4, name: "Sanctified Longbow", range: "Far", damage: "4d8+8 phy" },
        motives: "Focus fire, obey, reposition, volley",
        features: [
            { name: "Punish the Guilty", type: "Passive", description: "Double damage to targets marked Guilty." },
            { name: "Divine Volley", type: "Action", description: "Mark Stress to attack up to 3 targets." }
        ]
    },
    {
        originalName: "Hallowed Soldier",
        tier: 4,
        type: "Minion",
        difficulty: 18,
        thresholds: { major: 100, severe: 100 },
        hp: { max: 1, current: 1 },
        stress: { max: 2, current: 0 },
        attack: { modifier: 2, name: "Sword and Shield", range: "Melee", damage: "10 phy" },
        motives: "Obey, outmaneuver, punish, swarm",
        features: [
            { name: "Minion (13)", type: "Passive", description: "Defeated on any damage. Every 13 damage defeats additional minion." },
            { name: "Divine Flight", type: "Passive", description: "While flying, Spend Fear to move Far." },
            { name: "Group Attack", type: "Action", description: "Spend Fear to group attack. Deal 10 phy dmg each." }
        ]
    },
    {
        originalName: "High Seraph",
        tier: 4,
        type: "Leader",
        difficulty: 20,
        thresholds: { major: 37, severe: 70 },
        hp: { max: 7, current: 7 },
        stress: { max: 5, current: 0 },
        attack: { modifier: 8, name: "Holy Sword", range: "Very Close", damage: "4d10+10 phy" },
        motives: "Enforce dogma, fly, pronounce judgment, smite",
        features: [
            { name: "Relentless (2)", type: "Passive", description: "Can be spotlighted 3 times per GM turn." },
            { name: "Judgment", type: "Action", description: "Spend Fear to make target Guilty (No Hope gain, take Severe dmg from Seraph)." },
            { name: "God Rays", type: "Action", description: "Mark Stress. Beam hits 20 targets. Presence Reaction or 4d6+12 mag dmg." },
            { name: "We Are One", type: "Action", description: "1/scene: Spend Fear to spotlight all allies (half damage)." }
        ]
    },
    {
        originalName: "Kraken",
        tier: 4,
        type: "Solo",
        difficulty: 20,
        thresholds: { major: 35, severe: 70 },
        hp: { max: 11, current: 11 },
        stress: { max: 8, current: 0 },
        attack: { modifier: 7, name: "Tentacles", range: "Close", damage: "4d12+10 phy" },
        motives: "Consume, crush, drown",
        features: [
            { name: "Relentless (3)", type: "Passive", description: "Can be spotlighted 3 times per GM turn." },
            { name: "Many Tentacles", type: "Passive", description: "With 7 or fewer HP marked, attack 2 targets." },
            { name: "Grapple and Drown", type: "Action", description: "Attack target in Close. Success: Mark Stress to Restrain and make Vulnerable underwater." },
            { name: "Boiling Blast", type: "Action", description: "Spend Fear. Line to Far. Agility Reaction or 4d6+9 phy dmg." }
        ]
    },
    {
        originalName: "Oracle of Doom",
        tier: 4,
        type: "Solo",
        difficulty: 20,
        thresholds: { major: 38, severe: 68 },
        hp: { max: 11, current: 11 },
        stress: { max: 10, current: 0 },
        attack: { modifier: 8, name: "Psychic Attack", range: "Far", damage: "4d8+9 mag" },
        motives: "Change environment, condemn, dishearten",
        features: [
            { name: "Terrifying", type: "Passive", description: "On successful attack, PCs in Far lose Hope, GM gains Fear." },
            { name: "Walls Closing In", type: "Passive", description: "Failure within Very Far causes Stress." },
            { name: "Pronounce Fate", type: "Action", description: "Spend Fear. Knowledge Reaction. Fail: Lose all Hope, 2d20+4 direct mag dmg." },
            { name: "Summon Tormentors", type: "Action", description: "1/day: Spend 2 Fear to summon 2d4 Minions." },
            { name: "Vengeful Fate", type: "Reaction", description: "Mark Stress to knockback attacker + 2d10+4 phy dmg." }
        ]
    },
    {
        originalName: "Outer Realms Abomination",
        tier: 4,
        type: "Bruiser",
        difficulty: 19,
        thresholds: { major: 35, severe: 71 },
        hp: { max: 7, current: 7 },
        stress: { max: 5, current: 0 },
        attack: { modifier: 0, name: "Massive Pseudopod", range: "Very Close", damage: "4d6+13 mag" }, // Modifier is +2d4 dynamic
        motives: "Demolish, devour, undermine",
        features: [
            { name: "Chaotic Form", type: "Passive", description: "Attack modifier is +2d4." },
            { name: "Disorienting Presence", type: "Passive", description: "On damage, Instinct Reaction or disadvantage + Fear." },
            { name: "Reality Quake", type: "Action", description: "Spend Fear. Knowledge Reaction or Unstuck (double costs)." },
            { name: "Unreal Form", type: "Reaction", description: "Reduce damage by 1d20." }
        ]
    },
    {
        originalName: "Outer Realms Corruptor",
        tier: 4,
        type: "Support",
        difficulty: 19,
        thresholds: { major: 27, severe: 47 },
        hp: { max: 4, current: 4 },
        stress: { max: 3, current: 0 },
        attack: { modifier: 7, name: "Corroding Pseudopod", range: "Very Close", damage: "4d8+5 mag" },
        motives: "Confuse, distract, overwhelm",
        features: [
            { name: "Will-Shattering Touch", type: "Passive", description: "PC taking damage loses a Hope." },
            { name: "Disgorge Reality Flotsam", type: "Action", description: "Mark Stress. Knowledge Reaction or mark 2 Stress." }
        ]
    },
    {
        originalName: "Outer Realms Thrall",
        tier: 4,
        type: "Minion",
        difficulty: 17,
        thresholds: { major: 100, severe: 100 },
        hp: { max: 1, current: 1 },
        stress: { max: 1, current: 0 },
        attack: { modifier: 3, name: "Claws and Teeth", range: "Very Close", damage: "11 phy" },
        motives: "Destroy, disgust, disorient, intimidate",
        features: [
            { name: "Minion (13)", type: "Passive", description: "Defeated on any damage. Every 13 damage defeats additional minion." },
            { name: "Group Attack", type: "Action", description: "Spend Fear to group attack. Deal 11 phy dmg each." }
        ]
    },
    {
        originalName: "Volcanic Dragon: Obsidian Predator",
        tier: 4,
        type: "Solo",
        difficulty: 19,
        thresholds: { major: 33, severe: 65 },
        hp: { max: 6, current: 6 },
        stress: { max: 5, current: 0 },
        attack: { modifier: 8, name: "Obsidian Claws", range: "Close", damage: "4d10+4 phy" },
        motives: "Defend lair, dive-bomb, fly, hunt",
        features: [
            { name: "Relentless (2)", type: "Passive", description: "Can be spotlighted 2 times per GM turn." },
            { name: "Obsidian Scales", type: "Passive", description: "Resistant to physical damage." },
            { name: "Avalanche Tail", type: "Action", description: "Mark Stress. Attack all in Close. 4d6+4 phy dmg + Knockback + Vulnerable." },
            { name: "Phase Change", type: "Reaction", description: "On defeat, replace with Molten Scourge." }
        ]
    },
    {
        originalName: "Volcanic Dragon: Molten Scourge",
        tier: 4,
        type: "Solo",
        difficulty: 20,
        thresholds: { major: 30, severe: 58 },
        hp: { max: 7, current: 7 },
        stress: { max: 5, current: 0 },
        attack: { modifier: 9, name: "Lava-Coated Claws", range: "Close", damage: "4d12+4 phy" },
        motives: "Douse with lava, incinerate, repel invaders",
        features: [
            { name: "Relentless (3)", type: "Passive", description: "Can be spotlighted 3 times per GM turn." },
            { name: "Cracked Scales", type: "Passive", description: "Gain Fear when taking damage." },
            { name: "Eruption", type: "Action", description: "Spend Fear. Agility Reaction in Very Close or 4d6+6 phy dmg." },
            { name: "Lava Splash", type: "Reaction", description: "On Severe damage from Very Close, deal 2d10+4 direct phy dmg." },
            { name: "Phase Change", type: "Reaction", description: "On defeat, replace with Ashen Tyrant." }
        ]
    },
    {
        originalName: "Volcanic Dragon: Ashen Tyrant",
        tier: 4,
        type: "Solo",
        difficulty: 18,
        thresholds: { major: 29, severe: 55 },
        hp: { max: 8, current: 8 },
        stress: { max: 5, current: 0 },
        attack: { modifier: 10, name: "Claws and Teeth", range: "Close", damage: "4d12+15 phy" },
        motives: "Choke, fly, intimidate, kill or be killed",
        features: [
            { name: "Relentless (4)", type: "Passive", description: "Can be spotlighted 4 times per GM turn." },
            { name: "Cornered", type: "Passive", description: "Mark Stress instead of Fear to spotlight." },
            { name: "Ashes to Ashes", type: "Passive", description: "When PC in Close fails, they lose Hope and you gain Fear." },
            { name: "Desperate Rampage", type: "Action", description: "Mark Stress to attack all in Close. Success: 2d20+2 phy dmg, knockback, mark Stress." },
            { name: "Ashen Cloud", type: "Action", description: "Spend Fear to create cloud in Far. Disadvantage on rolls inside." },
            { name: "Apocalyptic Thrashing", type: "Action", description: "Countdown (d12). Triggers: massive environmental damage." }
        ]
    },
    {
        originalName: "Perfected Zombie",
        tier: 4,
        type: "Bruiser",
        difficulty: 20,
        thresholds: { major: 40, severe: 70 },
        hp: { max: 9, current: 9 },
        stress: { max: 4, current: 0 },
        attack: { modifier: 4, name: "Greataxe", range: "Very Close", damage: "4d12+15 phy" },
        motives: "Consume, hound, maim, terrify",
        features: [
            { name: "Terrifying", type: "Passive", description: "On successful attack, PCs in Far lose Hope, GM gains Fear." },
            { name: "Fearsome Presence", type: "Passive", description: "PCs can't spend Hope against Zombie." },
            { name: "Perfect Strike", type: "Action", description: "Mark Stress to attack. Target Vulnerable until rest." },
            { name: "Skilled Opportunist", type: "Reaction", description: "Spend Fear to add damage to another adversary's attack." }
        ]
    },
    {
        originalName: "Zombie Legion",
        tier: 4,
        type: "Horde (3/HP)",
        difficulty: 17,
        thresholds: { major: 25, severe: 45 },
        hp: { max: 8, current: 8 },
        stress: { max: 5, current: 0 },
        attack: { modifier: 2, name: "Tentacles", range: "Close", damage: "4d6+10 phy" },
        motives: "Consume brain, shred flesh, surround",
        features: [
            { name: "Horde (2d6+5)", type: "Passive", description: "At half HP, attack deals 2d6+5 damage." },
            { name: "Unyielding", type: "Passive", description: "Resistant to physical damage." },
            { name: "Relentless (2)", type: "Passive", description: "Can be spotlighted 2 times per GM turn." },
            { name: "Overwhelm", type: "Reaction", description: "When taking Minor damage, mark Stress to attack back with advantage." }
        ]
    }
];
