import { MartialStance } from '../types';

export const MARTIAL_STANCES: MartialStance[] = [
    // Tier 1
    {
        name: 'Flowing River Stance',
        tier: 1,
        description: 'You move with the grace of water, deflecting and redirecting blows. Gain a +1 bonus to your Evasion.'
    },
    {
        name: 'Stone Mountain Stance',
        tier: 1,
        description: 'You root yourself to the earth, becoming an immovable bastion. Gain a +1 bonus to your Armor Score.'
    },
    {
        name: 'Rushing Wind Stance',
        tier: 1,
        description: 'Your attacks are swift and powerful like a gale. The first unarmed attack you make after entering this stance deals an additional 1d6 physical damage.'
    },
    {
        name: 'Patient Heron Stance',
        tier: 1,
        description: 'You wait for the perfect moment to strike. After an adversary misses you with a Melee attack, your next unarmed attack against them has advantage.'
    },
    // Tier 2
    {
        name: 'Serpent\'s Coil Stance',
        tier: 2,
        description: 'Your movements are constricting and fluid. You have advantage on action rolls made to grapple or restrain an adversary.'
    },
    {
        name: 'Drunken Master Stance',
        tier: 2,
        description: 'Your stumbling, unpredictable movements make you a difficult target. The first attack made against you in a round has disadvantage.'
    },
    {
        name: 'Phoenix Fire Stance',
        tier: 2,
        description: 'Your strikes radiate with inner energy. On a successful unarmed attack, you can mark a Stress to deal 1d4 magic damage to another adversary within Melee range.'
    },
    {
        name: 'Tiger\'s Fury Stance',
        tier: 2,
        description: 'You strike with overwhelming ferocity. When you make an unarmed attack, you can add your Strength to the damage roll, in addition to any other traits used.'
    },
    // Tier 3
    {
        name: 'Dragon\'s Breath Stance',
        tier: 3,
        description: 'You channel your ki into a powerful blast. Mark a Stress to make a ranged attack using Instinct against a target within Close range, dealing 2d8+Proficiency magic damage.'
    },
    {
        name: 'Void Stance',
        tier: 3,
        description: 'You become momentarily untouchable. Once per rest while in this stance, when an attack would hit you, you can spend an additional Focus to cause the attack to fail.'
    },
    {
        name: 'Hundred Fists Stance',
        tier: 3,
        description: 'Your hands are a blur of motion. After making a successful unarmed attack, you can spend an additional Focus to immediately make another unarmed attack against the same target.'
    },
];
