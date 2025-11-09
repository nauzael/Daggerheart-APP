import { BeastForm } from '../types';

export const ALL_BEASTFORMS: BeastForm[] = [
    // TIER 1
    {
        name: "Agile Scout",
        tier: 1,
        examples: "(Fox, Mouse, Weasel, etc.)",
        traitBonus: { trait: 'agility', value: 1 },
        evasionBonus: 2,
        attack: { trait: 'agility', range: 'Melee', damage: 'd4 phy' },
        advantages: ['deceive', 'locate', 'sneak'],
        features: [
            { name: "Agile", description: "Your movement is silent, and you can spend a Hope to move up to Far range without rolling." },
            { name: "Fragile", description: "When you take Major or greater damage, you drop out of Beastform." }
        ]
    },
    {
        name: "Household Friend",
        tier: 1,
        examples: "(Cat, Dog, Rabbit, etc.)",
        traitBonus: { trait: 'instinct', value: 1 },
        evasionBonus: 2,
        attack: { trait: 'instinct', range: 'Melee', damage: 'd6 phy' },
        advantages: ['climb', 'locate', 'protect'],
        features: [
            { name: "Companion", description: "When you Help an Ally, you can roll a d8 as your advantage die." },
            { name: "Fragile", description: "When you take Major or greater damage, you drop out of Beastform." }
        ]
    },
    {
        name: "Nimble Grazer",
        tier: 1,
        examples: "(Deer, Gazelle, Goat, etc.)",
        traitBonus: { trait: 'agility', value: 1 },
        evasionBonus: 3,
        attack: { trait: 'agility', range: 'Melee', damage: 'd6 phy' },
        advantages: ['leap', 'sneak', 'sprint'],
        features: [
            { name: "Elusive Prey", description: "When an attack roll against you would succeed, you can mark a Stress and roll a d4. Add the result to your Evasion against this attack." },
            { name: "Fragile", description: "When you take Major or greater damage, you drop out of Beastform." }
        ]
    },
    {
        name: "Pack Predator",
        tier: 1,
        examples: "(Coyote, Hyena, Wolf, etc.)",
        traitBonus: { trait: 'strength', value: 2 },
        evasionBonus: 1,
        attack: { trait: 'strength', range: 'Melee', damage: 'd8+2 phy' },
        advantages: ['attack', 'sprint', 'track'],
        features: [
            { name: "Hobbling Strike", description: "When you succeed on an attack against a target within Melee range, you can mark a Stress to make the target temporarily Vulnerable." },
            { name: "Pack Hunting", description: "When you succeed on an attack against the same target as an ally who acts immediately before you, add a d8 to your damage roll." }
        ]
    },
    {
        name: "Aquatic Scout",
        tier: 1,
        examples: "(Eel, Fish, Octopus, etc.)",
        traitBonus: { trait: 'agility', value: 1 },
        evasionBonus: 2,
        attack: { trait: 'agility', range: 'Melee', damage: 'd4 phy' },
        advantages: ['navigate', 'sneak', 'swim'],
        features: [
            { name: "Aquatic", description: "You can breathe and move naturally underwater." },
            { name: "Fragile", description: "When you take Major or greater damage, you drop out of Beastform." }
        ]
    },
    {
        name: "Stalking Arachnid",
        tier: 1,
        examples: "(Tarantula, Wolf Spider, etc.)",
        traitBonus: { trait: 'finesse', value: 1 },
        evasionBonus: 2,
        attack: { trait: 'finesse', range: 'Melee', damage: 'd6+1 phy' },
        advantages: ['attack', 'climb', 'sneak'],
        features: [
            { name: "Venomous Bite", description: "When you succeed on an attack against a target within Melee range, the target becomes temporarily Poisoned. A Poisoned creature takes 1d10 direct physical damage each time they act." },
            { name: "Webslinger", description: "You can create a strong web material useful for both adventuring and battle. The web is resilient enough to support one creature. You can temporarily Restrain a target within Close range by succeeding on a Finesse Roll against them." }
        ]
    },
    // TIER 2
    {
        name: "Armored Sentry",
        tier: 2,
        examples: "(Armadillo, Pangolin, Turtle, etc.)",
        traitBonus: { trait: 'strength', value: 1 },
        evasionBonus: 1,
        attack: { trait: 'strength', range: 'Melee', damage: 'd8+2 phy' },
        advantages: ['dig', 'locate', 'protect'],
        features: [
            { name: "Armored Shell", description: "Your hardened exterior gives you resistance to physical damage. Additionally, mark an Armor Slot to retract into your shell. While in your shell, physical damage is reduced by a number equal to your Armor Score (after applying resistance), but you can’t perform other actions without leaving this form." },
            { name: "Cannonball", description: "Mark a Stress to allow an ally to throw or launch you at an adversary. To do so, the ally makes an attack roll using Agility or Strength (their choice) against a target within Close range. On a success, the adversary takes d12+2 physical damage using the thrower’s Proficiency. You can spend a Hope to target an additional adversary within Very Close range of the first. The second target takes half the damage dealt to the first target." }
        ]
    },
    {
        name: "Powerful Beast",
        tier: 2,
        examples: "(Bear, Bull, Moose, etc.)",
        traitBonus: { trait: 'strength', value: 1 },
        evasionBonus: 3,
        attack: { trait: 'strength', range: 'Melee', damage: 'd10+4 phy' },
        advantages: ['navigate', 'protect', 'scare'],
        features: [
            { name: "Rampage", description: "When you roll a 1 on a damage die, you can roll a d10 and add the result to the damage roll. Additionally, before you make an attack roll, you can mark a Stress to gain a +1 bonus to your Proficiency for that attack." },
            { name: "Thick Hide", description: "You gain a +2 bonus to your damage thresholds." }
        ]
    },
    {
        name: "Mighty Strider",
        tier: 2,
        examples: "(Camel, Horse, Zebra, etc.)",
        traitBonus: { trait: 'agility', value: 1 },
        evasionBonus: 2,
        attack: { trait: 'agility', range: 'Melee', damage: 'd8+1 phy' },
        advantages: ['leap', 'navigate', 'sprint'],
        features: [
            { name: "Carrier", description: "You can carry up to two willing allies with you when you move." },
            { name: "Trample", description: "Mark a Stress to move up to Close range in a straight line and make an attack against all targets within Melee range of the line. Targets you succeed against take d8+1 physical damage using your Proficiency and are temporarily Vulnerable." }
        ]
    },
    {
        name: "Striking Serpent",
        tier: 2,
        examples: "(Cobra, Rattlesnake, Viper, etc.)",
        traitBonus: { trait: 'finesse', value: 1 },
        evasionBonus: 2,
        attack: { trait: 'finesse', range: 'Very Close', damage: 'd8+4 phy' },
        advantages: ['climb', 'deceive', 'sprint'],
        features: [
            { name: "Venomous Strike", description: "Make an attack against any number of targets within Very Close range. On a success, a target is temporarily Poisoned. A Poisoned creature takes 1d10 physical direct damage each time they act." },
            { name: "Warning Hiss", description: "Mark a Stress to force any number of targets within Melee range to move back to Very Close range." }
        ]
    },
    {
        name: "Pouncing Predator",
        tier: 2,
        examples: "(Cheetah, Lion, Panther, etc.)",
        traitBonus: { trait: 'instinct', value: 1 },
        evasionBonus: 3,
        attack: { trait: 'instinct', range: 'Melee', damage: 'd8+6 phy' },
        advantages: ['attack', 'climb', 'sneak'],
        features: [
            { name: "Fleet", description: "Spend a Hope to move up to Far range without rolling." },
            { name: "Takedown", description: "Mark a Stress to move into Melee range of a target and make an attack roll against them. On a success, you gain a +2 bonus to your Proficiency for this attack and the target must mark a Stress." }
        ]
    },
    {
        name: "Winged Beast",
        tier: 2,
        examples: "(Hawk, Owl, Raven, etc.)",
        traitBonus: { trait: 'finesse', value: 1 },
        evasionBonus: 3,
        attack: { trait: 'finesse', range: 'Melee', damage: 'd4+2 phy' },
        advantages: ['deceive', 'locate', 'scare'],
        features: [
            { name: "Bird's-Eye View", description: "You can fly at will. Once per rest while you are airborne, you can ask the GM a question about the scene below you without needing to roll. The first time a character makes a roll to act on this information, they gain advantage on the roll." },
            { name: "Hollow Bones", description: "You gain a −2 penalty to your damage thresholds." }
        ]
    },
    // TIER 3
    {
        name: "Great Predator",
        tier: 3,
        examples: "(Dire Wolf, Velociraptor, Sabertooth Tiger, etc.)",
        traitBonus: { trait: 'strength', value: 2 },
        evasionBonus: 2,
        attack: { trait: 'strength', range: 'Melee', damage: 'd12+8 phy' },
        advantages: ['attack', 'sneak', 'sprint'],
        features: [
            { name: "Carrier", description: "You can carry up to two willing allies with you when you move." },
            { name: "Vicious Maul", description: "When you succeed on an attack against a target, you can spend a Hope to make them temporarily Vulnerable and gain a +1 bonus to your Proficiency for this attack." }
        ]
    },
    {
        name: "Mighty Lizard",
        tier: 3,
        examples: "(Alligator, Crocodile, Gila Monster, etc.)",
        traitBonus: { trait: 'instinct', value: 2 },
        evasionBonus: 1,
        attack: { trait: 'instinct', range: 'Melee', damage: 'd10+7 phy' },
        advantages: ['attack', 'sneak', 'track'],
        features: [
            { name: "Physical Defense", description: "You gain a +3 bonus to your damage thresholds." },
            { name: "Snapping Strike", description: "When you succeed on an attack against a target within Melee range, you can spend a Hope to clamp that opponent in your jaws, making them temporarily Restrained and Vulnerable." }
        ]
    },
    {
        name: "Great Winged Beast",
        tier: 3,
        examples: "(Giant Eagle, Falcon, etc.)",
        traitBonus: { trait: 'finesse', value: 2 },
        evasionBonus: 3,
        attack: { trait: 'finesse', range: 'Melee', damage: 'd8+6 phy' },
        advantages: ['deceive', 'distract', 'locate'],
        features: [
            { name: "Bird's-Eye View", description: "You can fly at will. Once per rest while you are airborne, you can ask the GM a question about the scene below you without needing to roll. The first time a character makes a roll to act on this information, they gain advantage on the roll." },
            { name: "Carrier", description: "You can carry up to two willing allies with you when you move." }
        ]
    },
    {
        name: "Aquatic Predator",
        tier: 3,
        examples: "(Dolphin, Orca, Shark, etc.)",
        traitBonus: { trait: 'agility', value: 2 },
        evasionBonus: 4,
        attack: { trait: 'agility', range: 'Melee', damage: 'd10+6 phy' },
        advantages: ['attack', 'swim', 'track'],
        features: [
            { name: "Aquatic", description: "You can breathe and move naturally underwater." },
            { name: "Vicious Maul", description: "When you succeed on an attack against a target, you can spend a Hope to make them Vulnerable and gain a +1 bonus to your Proficiency for this attack." }
        ]
    },
    {
        name: "Legendary Beast",
        tier: 3,
        examples: "(Upgraded Tier 1 Options)",
        evasionBonus: 0, // Placeholder
        attack: { trait: 'strength', range: 'Melee', damage: ''}, // Placeholder
        advantages: [],
        features: [
            { name: "Evolved", description: "Pick a Tier 1 Beastform option and become a larger, more powerful version of that creature. While you’re in this form, you retain all traits and features from the original form and gain the following bonuses: A +6 bonus to damage rolls, a +1 bonus to the trait used by this form, and a +2 bonus to Evasion." }
        ]
    },
    {
        name: "Legendary Hybrid",
        tier: 3,
        examples: "(Griffon, Sphinx, etc.)",
        traitBonus: { trait: 'strength', value: 2 },
        evasionBonus: 3,
        attack: { trait: 'strength', range: 'Melee', damage: 'd10+8' },
        advantages: [],
        features: [
            { name: "Hybrid Features", description: "To transform into this creature, mark an additional Stress. Choose any two Beastform options from Tiers 1–2. Choose a total of four advantages and two features from those options." }
        ]
    },
    // TIER 4
    {
        name: "Massive Behemoth",
        tier: 4,
        examples: "(Elephant, Mammoth, Rhinoceros, etc.)",
        traitBonus: { trait: 'strength', value: 3 },
        evasionBonus: 1,
        attack: { trait: 'strength', range: 'Melee', damage: 'd12+12 phy' },
        advantages: ['locate', 'protect', 'scare', 'sprint'],
        features: [
            { name: "Carrier", description: "You can carry up to four willing allies with you when you move." },
            { name: "Demolish", description: "Spend a Hope to move up to Far range in a straight line and make an attack against all targets within Melee range of the line. Targets you succeed against take d8+10 physical damage using your Proficiency and are temporarily Vulnerable." },
            { name: "Undaunted", description: "You gain a +2 bonus to all your damage thresholds." }
        ]
    },
    {
        name: "Terrible Lizard",
        tier: 4,
        examples: "(Brachiosaurus, Tyrannosaurus, etc.)",
        traitBonus: { trait: 'strength', value: 3 },
        evasionBonus: 2,
        attack: { trait: 'strength', range: 'Melee', damage: 'd12+10 phy' },
        advantages: ['attack', 'deceive', 'scare', 'track'],
        features: [
            { name: "Devastating Strikes", description: "When you deal Severe damage to a target within Melee range, you can mark a Stress to force them to mark an additional Hit Point." },
            { name: "Massive Stride", description: "You can move up to Far range without rolling. You ignore rough terrain (at the GM’s discretion) due to your size." }
        ]
    },
    {
        name: "Mythic Aerial Hunter",
        tier: 4,
        examples: "(Dragon, Pterodactyl, Roc, Wyvern, etc.)",
        traitBonus: { trait: 'finesse', value: 3 },
        evasionBonus: 4,
        attack: { trait: 'finesse', range: 'Melee', damage: 'd10+11 phy' },
        advantages: ['attack', 'deceive', 'locate', 'navigate'],
        features: [
            { name: "Carrier", description: "You can carry up to three willing allies with you when you move." },
            { name: "Deadly Raptor", description: "You can fly at will and move up to Far range as part of your action. When you move in a straight line into Melee range of a target from at least Close range and make an attack against that target in the same action, you can reroll all damage dice that rolled a result lower than your Proficiency." }
        ]
    },
    {
        name: "Epic Aquatic Beast",
        tier: 4,
        examples: "(Giant Squid, Whale, etc.)",
        traitBonus: { trait: 'agility', value: 3 },
        evasionBonus: 3,
        attack: { trait: 'agility', range: 'Melee', damage: 'd10+10 phy' },
        advantages: ['locate', 'protect', 'scare', 'track'],
        features: [
            { name: "Ocean Master", description: "You can breathe and move naturally underwater. When you succeed on an attack against a target within Melee range, you can temporarily Restrain them." },
            { name: "Unyielding", description: "When you would mark an Armor Slot, roll a d6. On a result of 5 or higher, reduce the severity by one threshold without marking an Armor Slot." }
        ]
    },
    {
        name: "Mythic Beast",
        tier: 4,
        examples: "(Upgraded Tier 1 or Tier 2 Options)",
        evasionBonus: 0, // Placeholder
        attack: { trait: 'strength', range: 'Melee', damage: ''}, // Placeholder
        advantages: [],
        features: [
            { name: "Evolved", description: "Pick a Tier 1 or Tier 2 Beastform option and become a larger, more powerful version of that creature. While you’re in this form, you retain all traits and features from the original form and gain the following bonuses: A +9 bonus to damage rolls, a +2 bonus to the trait used by this form, a +3 bonus to Evasion, and your damage die increases by one size (d6 becomes d8, d8 becomes d10, etc.)." }
        ]
    },
    {
        name: "Mythic Hybrid",
        tier: 4,
        examples: "(Chimera, Cockatrice, Manticore, etc.)",
        traitBonus: { trait: 'strength', value: 3 },
        evasionBonus: 2,
        attack: { trait: 'strength', range: 'Melee', damage: 'd12+10 phy' },
        advantages: [],
        features: [
            { name: "Hybrid Features", description: "To transform into this creature, mark 2 additional Stress. Choose any three Beastform options from Tiers 1-3. Choose a total of five advantages and three features from those options." }
        ]
    }
];
