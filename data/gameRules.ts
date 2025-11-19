
export interface GameRule {
    name: string;
    category: 'Condition' | 'Mechanic' | 'Combat' | 'Downtime' | 'Character';
    description: string;
}

export const GAME_RULES: GameRule[] = [
    // --- CONDITIONS ---
    {
        name: "Hidden",
        category: "Condition",
        description: "You are out of sight and enemies don't know your location. Rolls against you have disadvantage. You lose this if an enemy moves to see you, you move into line of sight, or you make an attack."
    },
    {
        name: "Restrained",
        category: "Condition",
        description: "You cannot move, but you can still take actions from your current position."
    },
    {
        name: "Vulnerable",
        category: "Condition",
        description: "All rolls targeting you have advantage."
    },
    {
        name: "Temporary Condition",
        category: "Condition",
        description: "A condition that can be cleared by making a move against it (usually an action roll). Special conditions require specific actions to clear."
    },

    // --- CORE MECHANICS ---
    {
        name: "Duality Dice",
        category: "Mechanic",
        description: "Two d12s (one Hope, one Fear) rolled for action rolls. The total + modifiers is compared to Difficulty. The die with the higher value determines the outcome (With Hope or With Fear)."
    },
    {
        name: "Success with Hope",
        category: "Mechanic",
        description: "Total ≥ Difficulty AND Hope Die > Fear Die. You succeed and gain 1 Hope."
    },
    {
        name: "Success with Fear",
        category: "Mechanic",
        description: "Total ≥ Difficulty AND Fear Die > Hope Die. You succeed, but with a cost or complication. The GM gains 1 Fear."
    },
    {
        name: "Failure with Hope",
        category: "Mechanic",
        description: "Total < Difficulty AND Hope Die > Fear Die. You fail with a minor consequence, but gain 1 Hope."
    },
    {
        name: "Failure with Fear",
        category: "Mechanic",
        description: "Total < Difficulty AND Fear Die > Hope Die. You fail with a major consequence. The GM gains 1 Fear."
    },
    {
        name: "Critical Success",
        category: "Mechanic",
        description: "Duality Dice show matching numbers (e.g., 5 and 5). Automatic success with a bonus, gain 1 Hope, and clear 1 Stress. Counts as a roll 'With Hope'."
    },
    {
        name: "Advantage",
        category: "Mechanic",
        description: "Roll a d6 with your Duality Dice and ADD the result to your total. Cancels out Disadvantage."
    },
    {
        name: "Disadvantage",
        category: "Mechanic",
        description: "Roll a d6 with your Duality Dice and SUBTRACT the result from your total. Cancels out Advantage."
    },
    {
        name: "Hope",
        category: "Mechanic",
        description: "A resource to fuel abilities, Help an Ally (give advantage), Utilize an Experience (add modifier), or initiate a Tag Team Roll. Max 6."
    },
    {
        name: "Fear",
        category: "Mechanic",
        description: "A GM resource used to activate adversary abilities, interrupt players, or make hard moves. Max 12."
    },
    {
        name: "Help an Ally",
        category: "Mechanic",
        description: "Spend 1 Hope to give an ally Advantage (roll a d6 and add it) on their action roll. Multiple players can help, but only the highest d6 applies."
    },
    {
        name: "Tag Team Roll",
        category: "Mechanic",
        description: "Spend 3 Hope to combine actions with another PC. Both roll; pick the best result to apply to the combined action. On success, both deal damage combined."
    },
    {
        name: "Group Action Roll",
        category: "Mechanic",
        description: "One PC leads. Others make reaction rolls. Leader gets +1 to their roll for every success, -1 for every failure."
    },
    
    // --- CHARACTER TRAITS ---
    {
        name: "Agility",
        category: "Character",
        description: "Sprint, Leap, Maneuver. Speed, nimbleness, and reaction time."
    },
    {
        name: "Strength",
        category: "Character",
        description: "Lift, Smash, Grapple. Physical power, stamina, and force."
    },
    {
        name: "Finesse",
        category: "Character",
        description: "Control, Hide, Tinker. Accuracy, stealth, and dexterity."
    },
    {
        name: "Instinct",
        category: "Character",
        description: "Perceive, Sense, Navigate. Awareness, intuition, and survival."
    },
    {
        name: "Presence",
        category: "Character",
        description: "Charm, Perform, Deceive. Personality, social influence, and aura."
    },
    {
        name: "Knowledge",
        category: "Character",
        description: "Recall, Analyze, Comprehend. Intelligence, deduction, and memory."
    },
    {
        name: "Evasion",
        category: "Character",
        description: "The Difficulty rating for enemies to hit you. Base determined by class + modifiers."
    },
    {
        name: "Proficiency",
        category: "Character",
        description: "Determines the number of damage dice you roll for weapons and spells."
    },

    // --- COMBAT ---
    {
        name: "Hit Points (HP)",
        category: "Combat",
        description: "Physical health. Marking last HP causes you to fall and make a Death Move."
    },
    {
        name: "Stress",
        category: "Combat",
        description: "Mental/physical strain. If you must mark Stress but are full, mark 1 HP instead. Full Stress makes you Vulnerable."
    },
    {
        name: "Damage Thresholds",
        category: "Combat",
        description: "Determines HP loss. < Minor: 0 HP. ≥ Minor: 1 HP. ≥ Major: 2 HP. ≥ Severe: 3 HP. (Massive Rule: 2x Severe = 4 HP)."
    },
    {
        name: "Armor Slots",
        category: "Combat",
        description: "Mark 1 Armor Slot to reduce incoming damage amount (e.g. by your Armor Score) before comparing to thresholds."
    },
    {
        name: "Attack Roll",
        category: "Combat",
        description: "An action roll against a target's Difficulty (or Evasion). On success, roll damage."
    },
    {
        name: "Damage Roll",
        category: "Combat",
        description: "Roll damage dice (based on Proficiency). Add flat modifiers. Compare total to target's Thresholds."
    },
    {
        name: "Critical Damage",
        category: "Combat",
        description: "On a Crit Attack: Roll damage normally, then add the maximum possible result of the dice to the total."
    },
    {
        name: "Reaction Roll",
        category: "Combat",
        description: "A roll made to avoid/withstand an effect. Does not generate Hope/Fear. Critical Success ignores the effect entirely."
    },
    {
        name: "Range: Melee",
        category: "Combat",
        description: "Arm's reach (approx 5ft)."
    },
    {
        name: "Range: Very Close",
        category: "Combat",
        description: "5-10 ft. Can move to Melee as part of action."
    },
    {
        name: "Range: Close",
        category: "Combat",
        description: "10-30 ft. Can move to Melee as part of action."
    },
    {
        name: "Range: Far",
        category: "Combat",
        description: "30-100 ft. Need Agility roll to move to Melee safely."
    },
    {
        name: "Range: Very Far",
        category: "Combat",
        description: "100-300 ft. Need Agility roll to move to Melee safely."
    },
    {
        name: "Resistance",
        category: "Combat",
        description: "Reduce incoming damage of that type by half (round up) before thresholds."
    },
    {
        name: "Immunity",
        category: "Combat",
        description: "Ignore all damage of that type."
    },
    {
        name: "Death Move",
        category: "Combat",
        description: "Triggered when marking last HP. Choose: Blaze of Glory (One crit action, then die), Avoid Death (Unconscious, risk scars), or Risk It All (Roll Duality)."
    },

    // --- DOWNTIME ---
    {
        name: "Short Rest",
        category: "Downtime",
        description: "Approx 1 hour. Choose 2: Tend Wounds (1d4+Tier HP), Clear Stress (1d4+Tier), Repair Armor (1d4+Tier slots), Prepare (Gain Hope)."
    },
    {
        name: "Long Rest",
        category: "Downtime",
        description: "Sleep/Camp. Choose 2: Tend All Wounds (Full HP), Clear All Stress, Repair All Armor, Prepare (Gain Hope), Work on Project. Reset abilities."
    },
    {
        name: "Domain Cards",
        category: "Downtime",
        description: "Swap cards between Loadout (active) and Vault (inactive) freely during rest. Swapping otherwise costs Stress equal to Recall Cost."
    }
];
