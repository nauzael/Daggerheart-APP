
import { Environment } from '../types';

export const ENVIRONMENTS: Environment[] = [
    // TIER 1
    {
        name: "Raging River",
        tier: 1,
        type: "Traversal",
        difficulty: 10,
        impulses: ["Bar crossing", "Carry away the unready", "Divide the land"],
        features: [
            { name: "Dangerous Crossing", type: "Passive", description: "Crossing the river requires the party to complete a Progress Countdown (4). A PC who rolls a failure with Fear is immediately targeted by the 'Undertow' action without requiring a Fear to be spent.", questions: "Have any of the PCs forded rivers like this before? Are any of them afraid of drowning?" },
            { name: "Undertow", type: "Action", description: "Spend a Fear to catch a PC in the undertow. They must make an Agility Reaction Roll. On a failure, they take 1d6+1 physical damage and are moved a Close distance down the river, becoming Vulnerable. On a success, they must mark a Stress.", questions: "What trinkets lie along the riverbed? Do predators swim these rivers?" },
            { name: "Patient Hunter", type: "Action", description: "Spend a Fear to summon a Glass Snake within Close range of a chosen PC. It immediately takes the spotlight.", questions: "What treasures does the beast have? What travelers have already fallen victim?" }
        ]
    },
    {
        name: "Bustling Marketplace",
        tier: 1,
        type: "Social",
        difficulty: 10,
        impulses: ["Buy low and sell high", "Tempt and tantalize with wares"],
        features: [
            { name: "Tip the Scales", type: "Passive", description: "PCs can gain advantage on a Presence Roll by offering a handful of gold as part of the interaction.", questions: "Will any coin be accepted? How overt are the PCs in offering this bribe?" },
            { name: "Unexpected Find", type: "Action", description: "Reveal to the PCs that one of the merchants has something they want or need (food, rare book, map, key).", questions: "What cost beyond gold will the merchant ask for?" },
            { name: "Sticky Fingers", type: "Action", description: "A thief tries to steal something. PC must succeed Instinct Roll or lose an item. Chase requires Progress Countdown (6) vs Consequence Countdown (4).", questions: "What drove this person to pickpocketing?" }
        ]
    },
    {
        name: "Abandoned Grove",
        tier: 1,
        type: "Exploration",
        difficulty: 11,
        impulses: ["Draw in the curious", "Echo the past"],
        features: [
            { name: "Overgrown Battlefield", type: "Passive", description: "A PC can make an Instinct Roll to identify evidence of a past fight (broken weapons, treant corpse, twisted trees). Success reveals details.", questions: "Why did these groups come to blows? Why is the grove unused now?" },
            { name: "Barbed Vines", type: "Action", description: "All targets within Very Close of a point must make Agility Reaction or take 1d8+3 phy damage and become Restrained.", questions: "How many vines are there? Where do they grab you?" },
            { name: "You Are Not Welcome Here", type: "Action", description: "A Young Dryad and allies appear to confront the party.", questions: "What are the grove guardians concealing?" }
        ]
    },
    {
        name: "Cliffside Ascent",
        tier: 1,
        type: "Traversal",
        difficulty: 12,
        impulses: ["Cast the unready down", "Draw people to the top"],
        features: [
            { name: "The Climb", type: "Passive", description: "Climbing requires Progress Countdown (12). Crit: -3, Hope: -2, Fear: -1. Fail/Fear: +1 to countdown.", questions: "What strange formations are the stones arranged in?" },
            { name: "Pitons Left Behind", type: "Passive", description: "Previous climbers left pitons. If using them, a failed climb roll can mark Stress instead of ticking countdown up.", questions: "What do the pitons look like?" },
            { name: "Fall", type: "Action", description: "Spend a Fear. A PC's handhold fails. If not saved, they fall (tick up countdown by 2) and take damage based on countdown progress (1d12 to 3d12).", questions: "How can you tell others have fallen here?" }
        ]
    },
    // TIER 2
    {
        name: "Haunted City",
        tier: 2,
        type: "Exploration",
        difficulty: 14,
        impulses: ["Misdirect and disorient", "Replay apocalypses"],
        features: [
            { name: "Buried Knowledge", type: "Passive", description: "Make Instinct/Knowledge roll to learn secrets/loot. Failures yield vague info or cost Stress.", questions: "What greater secrets does the city contain?" },
            { name: "Ghostly Form", type: "Passive", description: "Adversaries here are ghostly (Resistant to Physical, move through objects).", questions: "What injuries speak to their cause of death?" },
            { name: "Dead Ends", type: "Action", description: "Ghosts manifest scenes from the past, changing the city layout, blocking paths, or creating challenges.", questions: "What do the ghosts want from you?" },
            { name: "Apocalypse Then", type: "Action", description: "Spend a Fear. Manifest echo of past disaster (Progress Countdown 5). Threats: Fire, stampedes, collapse.", questions: "Is this the disaster that led to abandonment?" }
        ]
    },
    {
        name: "Mountain Pass",
        tier: 2,
        type: "Traversal",
        difficulty: 15,
        impulses: ["Exact a chilling toll", "Slow down travel"],
        features: [
            { name: "Engraved Sigils", type: "Passive", description: "Knowledge Roll reveals these increase icy winds. Critical Success allows advantage to dispel.", questions: "Who laid this enchantment?" },
            { name: "Avalanche", type: "Action", description: "Spend a Fear. Agility/Strength Reaction. Fail: Knocked to Far, 2d20 phy damage, mark Stress. Success: Mark Stress.", questions: "How do PCs weather the avalanche?" },
            { name: "Icy Winds", type: "Reaction", description: "Countdown (Loop 4). Triggers: Strength Reaction or mark Stress. Cold weather gear gives advantage.", questions: "What body parts go numb first?" }
        ]
    },
    // TIER 3
    {
        name: "Castle Siege",
        tier: 3,
        type: "Event",
        difficulty: 17,
        impulses: ["Bleed out will to fight", "Breach walls", "Build tension"],
        features: [
            { name: "Secret Entrance", type: "Passive", description: "Instinct/Knowledge roll reveals secret way in.", questions: "How do they get in without revealing it?" },
            { name: "Siege Weapons", type: "Action", description: "Consequence Countdown (6). Triggers: Breach walls, GM gains 2 Fear, shift to Pitched Battle environment.", questions: "What siege weapons are deployed?" },
            { name: "Reinforcements!", type: "Action", description: "Summon Knight of the Realm and minions.", questions: "Who are they targeting first?" },
            { name: "Collateral Damage", type: "Reaction", description: "When adversary defeated, Spend Fear for stray siege shot. Area Agility Reaction or 3d8+3 dmg.", questions: "What debris is scattered?" }
        ]
    },
    {
        name: "Burning Heart of the Woods",
        tier: 3,
        type: "Exploration",
        difficulty: 16,
        impulses: ["Beat an uncanny rhythm", "Corrupt the woods"],
        features: [
            { name: "Chaos Magic Locus", type: "Passive", description: "Spellcast Rolls use two Fear Dice (take higher).", questions: "What does it feel like to work magic here?" },
            { name: "The Indigo Flame", type: "Passive", description: "Knowledge Roll reveals details about Fallen magic/corruption.", questions: "What Fallen cult corrupted these woods?" },
            { name: "Grasping Vines", type: "Action", description: "Agility Reaction or Restrained/Vulnerable. Escape deals 1d8+4 damage.", questions: "What painful memories do vines bring up?" },
            { name: "Choking Ash", type: "Reaction", description: "Countdown (Loop 6). Triggers: Strength/Instinct Reaction or 4d6+5 direct phy damage.", questions: "What hallucinations does the ash induce?" }
        ]
    },
    // TIER 4
    {
        name: "Imperial Court",
        tier: 4,
        type: "Social",
        difficulty: 20,
        impulses: ["Justify imperial rule", "Seduce rivals"],
        features: [
            { name: "All Roads Lead Here", type: "Passive", description: "Disadvantage on Presence Rolls for actions that don't fit imperial way.", questions: "How is language used to stifle dissent?" },
            { name: "The Gravity of Empire", type: "Action", description: "Spend Fear to offer a PC a golden opportunity. Presence Reaction: Fail means Mark All Stress or accept offer.", questions: "What do the PCs want desperately?" },
            { name: "Imperial Decree", type: "Action", description: "Spend Fear to tick down long-term countdown by 1d4.", questions: "What display of power expedited this?" }
        ]
    },
    {
        name: "Chaos Realm",
        tier: 4,
        type: "Traversal",
        difficulty: 20,
        impulses: ["Annihilate certainty", "Consume power", "Defy logic"],
        features: [
            { name: "Impossible Architecture", type: "Passive", description: "Movement requires Progress Countdown (8). Failure costs Stress.", questions: "What does it feel like to move here?" },
            { name: "Unmaking", type: "Action", description: "Spend Fear. Strength Reaction: Fail takes 4d10 direct magic damage.", questions: "What glimpse of other worlds do you see?" },
            { name: "Outer Realms Predators", type: "Action", description: "Spend Fear to summon Abomination/Corruptor/Thralls.", questions: "What remnants of the world do they cast aside?" }
        ]
    }
];
