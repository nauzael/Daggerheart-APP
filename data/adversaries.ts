
import { Adversary } from '../types';

// This is a template list. When adding to the board, we will clone these and add unique IDs.
export const ADVERSARY_TEMPLATES: Omit<Adversary, 'id' | 'name'>[] = [
    // TIER 1
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
            { name: "Relentless (3)", type: "Passive", description: "Can be spotlighted up to 3 times per GM turn." },
            { name: "Earth Eruption", type: "Action", description: "Mark a Stress. All creatures in Very Close must make Agility Reaction Roll or be knocked over (Vulnerable)." },
            { name: "Spit Acid", type: "Action", description: "Attack all targets in front (Close). Success: 2d6 phy dmg + mark Armor Slot without benefit. If can't mark armor, mark +1 HP and gain Fear." },
            { name: "Acid Bath", type: "Reaction", description: "When taking Severe damage, splash 1d10 phy dmg to all in Close range. Ground becomes hazardous (1d6 dmg)." }
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
            { name: "Bite", type: "Action", description: "Mark a Stress to attack (Melee). Success: 3d4+10 phy dmg and target is Restrained until successful Strength Roll." },
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
        motives: "Bite off heads, feast, rip limbs, stomp",
        features: [
            { name: "Ramp Up", type: "Passive", description: "Spend a Fear to spotlight. Can attack all targets within range." },
            { name: "Bone Breaker", type: "Passive", description: "Attacks deal direct damage." },
            { name: "Hail of Boulders", type: "Action", description: "Mark Stress to throw at all targets in Far. 1d10+2 phy dmg. Gain Fear if multiple targets hit." }
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
        motives: "Destroy environment, serve creator, smash target",
        features: [
             { name: "Relentless (2)", type: "Passive", description: "Can be spotlighted up to 2 times per GM turn." },
             { name: "Weak Structure", type: "Passive", description: "When marking HP from physical damage, mark an additional HP." },
             { name: "Trample", type: "Action", description: "Mark Stress to attack targets in path while moving. Success: 1d8 phy dmg." },
             { name: "Death Quake", type: "Reaction", description: "On death: Attack all in Very Close with advantage. Success: 1d12+2 magic dmg." }
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
            { name: "Climber", type: "Passive", description: "Climbs as easily as they run." },
            { name: "From Above", type: "Passive", description: "When succeeding on standard attack from above, deal 1d10+1 phy damage instead." }
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
        originalName: "Skeleton Archer",
        tier: 1,
        type: "Ranged",
        difficulty: 9,
        thresholds: { major: 4, severe: 7 },
        hp: { max: 3, current: 3 },
        stress: { max: 2, current: 0 },
        attack: { modifier: 2, name: "Shortbow", range: "Far", damage: "1d8+1 phy" },
        motives: "Perforate distracted targets, play dead, steal skin",
        features: [
            { name: "Opportunist", type: "Passive", description: "When two or more adversaries are within Very Close range of a creature, all damage the Archer deals to that creature is doubled." },
            { name: "Deadly Shot", type: "Action", description: "Make an attack against a Vulnerable target within Far range. On a success, mark a Stress to deal 3d4+8 physical damage." }
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
            { name: "Mockery", type: "Action", description: "Mark Stress to force target in Close to make Presence Reaction (14). Failure: mark 2 Stress and become Vulnerable." },
            { name: "Scapegoat", type: "Action", description: "Spend Fear. Convince crowd that target is the cause of conflict." }
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
            { name: "Ground Slam", type: "Action", description: "Slam ground. Targets in Very Close knocked to Far and mark Stress." },
            { name: "Grab and Drag", type: "Action", description: "Attack target in Close. Success: Spend Fear to pull to Melee, deal 1d6+2 phy dmg, and Restrain." }
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
        motives: "Defend territory, harry, protect pack",
        features: [
            { name: "Pack Tactics", type: "Passive", description: "If another Dire Wolf is in Melee of target, deal 1d6+5 phy dmg and gain Fear." },
            { name: "Hobbling Strike", type: "Action", description: "Mark Stress to attack in Melee. Success: 3d4+10 direct phy dmg and Vulnerable." }
        ]
    },
    {
        originalName: "Giant Mosquitoes",
        tier: 1,
        type: "Horde",
        difficulty: 10,
        thresholds: { major: 5, severe: 9 },
        hp: { max: 6, current: 6 },
        stress: { max: 3, current: 0 },
        attack: { modifier: -2, name: "Proboscis", range: "Melee", damage: "1d8+3 phy" },
        motives: "Fly away, harass, steal blood",
        features: [
            { name: "Horde (1d4+1)", type: "Passive", description: "At half HP, attack deals 1d4+1 damage." },
            { name: "Flying", type: "Passive", description: "While flying, +2 Difficulty." },
            { name: "Bloodsucker", type: "Reaction", description: "When attack marks HP, mark Stress to force target to mark additional HP." }
        ]
    },
    {
        originalName: "Giant Rat",
        tier: 1,
        type: "Minion",
        difficulty: 10,
        thresholds: { major: 100, severe: 100 }, // None
        hp: { max: 1, current: 1 },
        stress: { max: 1, current: 0 },
        attack: { modifier: -4, name: "Claws", range: "Melee", damage: "1 phy" },
        motives: "Burrow, hunger, scavenge",
        features: [
            { name: "Minion (3)", type: "Passive", description: "Defeated on any damage. Every 3 dmg defeats an additional minion." },
            { name: "Group Attack", type: "Action", description: "Spend Fear to group attack. Deal 1 phy dmg each. Combine damage." }
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
            { name: "Double Strike", type: "Action", description: "Mark Stress to attack two targets in Melee." },
            { name: "Venomous Stinger", type: "Action", description: "Attack target in Very Close. Success: Spend Fear to deal 1d4+4 phy dmg and Poison." },
            { name: "Momentum", type: "Reaction", description: "When attacking PC successfully, gain Fear." }
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
        motives: "Climb, feed, keep distance",
        features: [
            { name: "Armor-Shredding Shards", type: "Passive", description: "On successful attack against snake, attacker must mark Armor Slot or +1 HP." },
            { name: "Spinning Serpent", type: "Action", description: "Mark Stress to attack all in Very Close. Success: 1d6+1 phy dmg." },
            { name: "Spitter", type: "Action", description: "Spend Fear. Roll d6. On 5+, targets in Far make Agility Reaction or take 1d4 phy dmg." }
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
            { name: "Maintain Distance", type: "Passive", description: "After attack, move anywhere in Far range." },
            { name: "Fall Back", type: "Reaction", description: "When creature moves into Melee, mark Stress to move to Close and attack (1d10+2 phy dmg)." }
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
        motives: "Arrest, close gates, pin down",
        features: [
            { name: "Hobbling Shot", type: "Action", description: "Attack target in Far. Success: Mark Stress to deal 1d12+3 phy dmg. Target marking HP has disadvantage on Agility." }
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
        motives: "Arrest, close gates, pin down",
        features: [
            { name: "Shield Wall", type: "Passive", description: "Moving into Very Close requires Agility Roll. Difficulty +1 per guard in line." },
            { name: "Detain", type: "Action", description: "Attack target in Very Close. Success: Mark Stress to Restrain until break free." }
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
        motives: "Arrest, close gates, seek glory",
        features: [
            { name: "Rally Guards", type: "Action", description: "Spend 2 Fear to spotlight self and up to 2d4 allies in Far." },
            { name: "On My Signal", type: "Reaction", description: "Countdown (5). Ticks on PC attack. Triggers: All Archer Guards in Far attack with advantage." },
            { name: "Momentum", type: "Reaction", description: "When making successful attack on PC, gain Fear." }
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
            { name: "Curse", type: "Action", description: "Curse target in Far. Mark Stress when target rolls Hope to force Fear." },
            { name: "Chaotic Flux", type: "Action", description: "Attack 3 targets in Very Close. Mark Stress to deal 2d6+3 mag dmg." }
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
        motives: "Grapple, intimidate, steal",
        features: [
            { name: "I've Got 'Em", type: "Passive", description: "Restrained creatures take double damage from others." },
            { name: "Hold Them Down", type: "Action", description: "Attack target in Melee. Success: No damage, but Restrained and Vulnerable." }
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
            { name: "Minion (3)", type: "Passive", description: "Defeated on any damage. Every 3 dmg defeats an additional minion." },
            { name: "Group Attack", type: "Action", description: "Spend Fear to group attack. Deal 2 phy dmg each. Combine damage." }
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
        motives: "Bully, command, profit",
        features: [
            { name: "Tactician", type: "Action", description: "When spotlighted, mark Stress to spotlight 2 allies in Close." },
            { name: "More Where That Came From", type: "Action", description: "Summon 3 Lackeys in Far." },
            { name: "Coup de Grace", type: "Action", description: "Spend Fear to attack Vulnerable target in Close. Success: 2d6+12 phy dmg." }
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
            { name: "Backstab", type: "Passive", description: "Deal 1d6+6 phy dmg if attacking with advantage." },
            { name: "Cloaked", type: "Action", description: "Become Hidden until next attack. Attacks while Hidden have advantage." }
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
        motives: "Ambush, hide, profit",
        features: [
            { name: "Unseen Strike", type: "Passive", description: "If Hidden, successful attack deals 1d10+4 phy dmg." }
        ]
    },
    // TIER 2
    {
        originalName: "Archer Squadron",
        tier: 2,
        type: "Horde",
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
        motives: "Anticipate, get paid, kill",
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
        motives: "Ambush, get out alive, kill",
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
        motives: "Change tactics, trample foes",
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
        motives: "Cackle, consume magic",
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
        motives: "Curry favor, hinder foes",
        features: [
            { name: "Enervating Blast", type: "Action", description: "Spend Fear to attack. Success: Target marks Stress." },
            { name: "Shroud of the Fallen", type: "Action", description: "Mark Stress to give Protection (Resistance) to ally in Close." },
            { name: "Shadow Shackles", type: "Action", description: "Spend Fear. Targets in Close of point in Far are Restrained." },
            { name: "Fear Is Fuel", type: "Reaction", description: "When PC rolls Failure with Fear, clear Stress." }
        ]
    },
    // TIER 3
    {
        originalName: "Adult Flickerfly",
        tier: 3,
        type: "Solo",
        difficulty: 17,
        thresholds: { major: 20, severe: 35 },
        hp: { max: 12, current: 12 },
        stress: { max: 6, current: 0 },
        attack: { modifier: 3, name: "Wing Slash", range: "Very Close", damage: "3d20 phy" },
        motives: "Collect shiny things, hunt, swoop",
        features: [
            { name: "Relentless (4)", type: "Passive", description: "Can be spotlighted 4 times per GM turn." },
            { name: "Never Misses", type: "Passive", description: "Target Evasion halved against attacks." },
            { name: "Whirlwind", type: "Action", description: "Spend Fear to attack all in Very Close. Success: 3d8 direct phy dmg." },
            { name: "Mind Dance", type: "Action", description: "Mark Stress. Targets in Close make Instinct Reaction. Failure: Gain Fear, learn a fear of target." }
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
            { name: "Rockslide", type: "Action", description: "Mark Stress. Targets in Close make Agility Reaction (19) or take 2d12+5 phy dmg and become Vulnerable." }
        ]
    },
    // TIER 4
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
            { name: "Not Today", type: "Reaction", description: "At 7+ HP marked, Spend Fear to teleport away." }
        ]
    },
    {
        originalName: "Ashen Tyrant (Dragon)",
        tier: 4,
        type: "Solo",
        difficulty: 18,
        thresholds: { major: 29, severe: 55 },
        hp: { max: 8, current: 8 },
        stress: { max: 5, current: 0 },
        attack: { modifier: 10, name: "Claws and Teeth", range: "Close", damage: "4d12+15 phy" },
        motives: "Choke, fly, intimidate, kill",
        features: [
            { name: "Relentless (4)", type: "Passive", description: "Can be spotlighted 4 times per GM turn." },
            { name: "Cornered", type: "Passive", description: "Mark Stress instead of Fear to spotlight." },
            { name: "Ashes to Ashes", type: "Passive", description: "When PC in Close fails, they lose Hope and you gain Fear." },
            { name: "Desperate Rampage", type: "Action", description: "Mark Stress to attack all in Close. Success: 2d20+2 phy dmg, knockback, mark Stress." },
            { name: "Ashen Cloud", type: "Action", description: "Spend Fear to create cloud in Far. Disadvantage on rolls inside." }
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
    }
];
