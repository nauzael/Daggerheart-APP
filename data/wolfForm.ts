import { Weapon } from '../types';

// A simplified weapon-like type for the wolf attack
type WolfFormAttack = Pick<Weapon, 'name' | 'trait' | 'range' | 'damage' | 'feature'>;

export const WOLF_FORM_DATA: {
    name: string;
    description: string;
    unarmedStrike: WolfFormAttack;
    advantages: string[];
    frenzy: string;
    bonusDie: (tier: number) => 'd4' | 'd6' | 'd8' | 'd10';
    controlTheBeast: string;
} = {
    name: "Wolf Form",
    description: "You are considered Unarmored.",
    unarmedStrike: {
        name: "Unarmed Strike (Wolf)",
        trait: "Agility or Strength",
        range: "Melee",
        damage: 'd12 phy',
        feature: 'Vicious: On a success with Hope, roll an additional damage die.',
    },
    advantages: [
        'Advantage on rolls to perceive via hearing and scent.',
        'Advantage on rolls to track creatures.'
    ],
    frenzy: "When you mark your last Stress, you must succeed on a Presence Roll (14). On a failure, you Frenzy. While in a Frenzy, you must attack the nearest creature, whether friend or foe. After you make an attack roll while in a Frenzy, you can clear this condition.",
    bonusDie: (tier: number) => {
        if (tier >= 4) return 'd10'; // Tier 4 is levels 8-10
        if (tier === 3) return 'd8'; // Tier 3 is levels 5-7
        if (tier === 2) return 'd6'; // Tier 2 is levels 2-4
        return 'd4'; // Tier 1 is level 1
    },
    controlTheBeast: "You can apply this form's bonus die to your Agility and Strength Action Rolls."
};
