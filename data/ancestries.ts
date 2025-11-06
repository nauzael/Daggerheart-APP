export interface AncestryFeature {
    name: string;
    description: string;
}

export interface Ancestry {
    name: string;
    features: AncestryFeature[];
}

export const ANCESTRIES: Ancestry[] = [
    {
        name: 'Human',
        features: [
            { name: 'High Stamina', description: 'Gain an additional Stress slot at character creation.' },
            { name: 'Adaptability', description: 'When you fail a roll that utilized one of your Experiences, you can mark a Stress to reroll.' }
        ]
    },
    {
        name: 'Clank',
        features: [
            { name: 'Purposeful Design', description: 'Choose one of your Experiences and gain a permanent +1 bonus to it.' },
            { name: 'Efficient', description: 'When you take a short rest, you can choose a long rest move instead.' }
        ]
    },
    {
        name: 'Drakona',
        features: [
            { name: 'Scales', description: 'When you would take Severe damage, you can mark a Stress to mark 1 fewer Hit Points.' },
            { name: 'Elemental Breath', description: 'Use an Instinct weapon that deals d8 magic damage within Very Close range.' }
        ]
    },
    {
        name: 'Dwarf',
        features: [
            { name: 'Thick Skin', description: 'When you take Minor damage, you can mark 2 Stress instead of marking a Hit Point.' },
            { name: 'Increased Fortitude', description: 'Spend 3 Hope to halve incoming physical damage.' }
        ]
    },
    {
        name: 'Elf',
        features: [
            { name: 'Quick Reactions', description: 'Mark a Stress to gain advantage on a reaction roll.' },
            { name: 'Celestial Trance', description: 'During a rest, you can choose an additional downtime move.' }
        ]
    },
    {
        name: 'Faerie',
        features: [
            { name: 'Luckbender', description: 'Once per session, spend 3 Hope to reroll the Duality Dice for you or an ally.' },
            { name: 'Wings', description: 'You can fly. While flying, mark a Stress to gain a +2 bonus to your Evasion against an attack.' }
        ]
    },
    {
        name: 'Faun',
        features: [
            { name: 'Caprine Leap', description: 'You can leap anywhere within Close range as normal movement.' },
            { name: 'Kick', description: 'On a successful melee attack, mark a Stress to deal an extra 2d6 damage and knock back yourself or the target.' }
        ]
    },
    {
        name: 'Firbolg',
        features: [
            { name: 'Charge', description: 'On a successful Agility Roll to move into Melee, mark a Stress to deal 1d12 physical damage to all targets within Melee.' },
            { name: 'Unshakable', description: 'When you would mark a Stress, roll a d6. On a 6, don\'t mark it.' }
        ]
    },
    {
        name: 'Fungril',
        features: [
            { name: 'Fungril Network', description: 'Make an Instinct Roll (12) to communicate with other fungril across any distance.' },
            { name: 'Death Connection', description: 'While touching a recent corpse, mark a Stress to extract one memory.' }
        ]
    },
    {
        name: 'Galapa',
        features: [
            { name: 'Shell', description: 'Gain a bonus to your damage thresholds equal to your Proficiency.' },
            { name: 'Retract', description: 'Mark a Stress to retract into your shell, gaining resistance to physical damage but disadvantage on action rolls.' }
        ]
    },
    {
        name: 'Giant',
        features: [
            { name: 'Endurance', description: 'Gain an additional Hit Point slot at character creation.' },
            { name: 'Reach', description: 'Treat any Melee range feature as though it has a Very Close range instead.' }
        ]
    },
    {
        name: 'Goblin',
        features: [
            { name: 'Surefooted', description: 'You ignore disadvantage on Agility Rolls.' },
            { name: 'Danger Sense', description: 'Once per rest, mark a Stress to force an adversary to reroll an attack.' }
        ]
    },
    {
        name: 'Halfling',
        features: [
            { name: 'Luckbringer', description: 'At the start of each session, everyone in your party gains a Hope.' },
            { name: 'Internal Compass', description: 'When you roll a 1 on your Hope Die, you can reroll it.' }
        ]
    },
    {
        name: 'Infernis',
        features: [
            { name: 'Fearless', description: 'When you roll with Fear, you can mark 2 Stress to change it into a roll with Hope instead.' },
            { name: 'Dread Visage', description: 'You have advantage on rolls to intimidate hostile creatures.' }
        ]
    },
    {
        name: 'Katari',
        features: [
            { name: 'Feline Instincts', description: 'When you make an Agility Roll, you can spend 2 Hope to reroll your Hope Die.' },
            { name: 'Retracting Claws', description: 'Make an Agility Roll to scratch a target, making them temporarily Vulnerable.' }
        ]
    },
    {
        name: 'Orc',
        features: [
            { name: 'Sturdy', description: 'When you have 1 Hit Point remaining, attacks against you have disadvantage.' },
            { name: 'Tusks', description: 'On a successful melee attack, spend a Hope to deal an extra 1d6 damage.' }
        ]
    },
    {
        name: 'Ribbet',
        features: [
            { name: 'Amphibious', description: 'You can breathe and move naturally underwater.' },
            { name: 'Long Tongue', description: 'Use your tongue as a Finesse Close weapon that deals d12 physical damage.' }
        ]
    },
    {
        name: 'Simiah',
        features: [
            { name: 'Natural Climber', description: 'You have advantage on Agility Rolls that involve balancing and climbing.' },
            { name: 'Nimble', description: 'Gain a permanent +1 bonus to your Evasion at character creation.' }
        ]
    }
];
