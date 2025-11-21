
export interface GameRule {
    name: string;
    category: 'Condition' | 'Mechanic' | 'Combat' | 'Downtime' | 'Character' | 'Equipment' | 'Magic' | 'GM Mechanics';
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
        description: "You cannot move, but you can still take actions from your current position. Breaking free usually requires a Strength or Agility roll against the difficulty."
    },
    {
        name: "Vulnerable",
        category: "Condition",
        description: "All rolls targeting you have advantage. You are in a difficult position, knocked over, or off guard."
    },
    {
        name: "Temporary Condition",
        category: "Condition",
        description: "Can be cleared by making an action roll (Difficulty set by GM) or by the GM describing how an adversary clears it."
    },

    // --- CORE MECHANICS ---
    {
        name: "The Spotlight",
        category: "Mechanic",
        description: "The focus of the scene. It moves organically between PCs. The GM takes the spotlight when a PC rolls with Fear or fails."
    },
    {
        name: "Duality Dice",
        category: "Mechanic",
        description: "Two d12s (Hope & Fear). Success if Total (Stat + Mods + Dice) ≥ Difficulty. Hope > Fear = Success with Hope (Gain 1 Hope). Fear > Hope = Success with Fear (GM gains 1 Fear)."
    },
    {
        name: "Critical Success",
        category: "Mechanic",
        description: "Matching Duality Dice (e.g., 5-5). Counts as Success with Hope regardless of total. Gain 1 Hope, Clear 1 Stress. On attacks: Deal max potential damage + roll result."
    },
    {
        name: "Advantage / Disadvantage",
        category: "Mechanic",
        description: "Roll a d6 with your Duality Dice. Add (Advantage) or Subtract (Disadvantage) the result. They cancel each other out. If multiple sources, take highest d6."
    },
    {
        name: "Hope",
        category: "Mechanic",
        description: "Max 6. Spend to: Help an Ally (+1d6), Utilize Experience (+Modifier), Tag Team (3 Hope), or use Class/Domain features. Generated on rolls with Hope."
    },
    {
        name: "Fear",
        category: "Mechanic",
        description: "GM resource. Gained on rolls with Fear. Spent to activate adversary moves, environment effects, interrupt players, or use Fear Moves."
    },
    {
        name: "Help an Ally",
        category: "Mechanic",
        description: "Spend 1 Hope. Roll a d6 (Advantage Die). The ally adds the result to their roll. Multiple helpers don't stack advantage dice (take highest)."
    },
    {
        name: "Tag Team Roll",
        category: "Mechanic",
        description: "Once per session per player. Spend 3 Hope. You and an ally both act. Pick the best Duality Roll result. On attack success, sum both damage rolls."
    },
    {
        name: "Group Action Roll",
        category: "Mechanic",
        description: "Leader makes Action Roll. Others make Reaction Rolls using relevant traits. Leader gets +1 to total per success, -1 per failure."
    },

    // --- MAGIC ---
    {
        name: "Spellcast Roll",
        category: "Magic",
        description: "A roll using your class's Spellcast Trait. Used to attack with magic, maintain spells, or overcome magical resistance."
    },
    {
        name: "Grimoires",
        category: "Magic",
        description: "Domain cards that contain multiple spells. You usually can only have one active effect from a Grimoire at a time unless specified otherwise."
    },

    // --- COMBAT & MOVEMENT ---
    {
        name: "Action Move",
        category: "Combat",
        description: "When making an action roll, you can move to anywhere within Close range as part of that action."
    },
    {
        name: "Agility Roll (Move)",
        category: "Combat",
        description: "Required to move Far or Very Far, or to move effectively when not taking another action (e.g., dashing). Failure may mean you stop short or face consequences."
    },
    {
        name: "Ranges",
        category: "Combat",
        description: "Melee (Touch), Very Close (5-10ft / Card length), Close (10-30ft / Pencil length), Far (30-100ft / Paper length), Very Far (100-300ft)."
    },
    {
        name: "Damage Thresholds",
        category: "Combat",
        description: "Damage < Major: Minor (Mark 1 HP). Damage < Severe: Major (Mark 2 HP). Damage ≥ Severe: Severe (Mark 3 HP)."
    },
    {
        name: "Armor Slots",
        category: "Combat",
        description: "Mark 1 Armor Slot to reduce damage severity by one step (Severe -> Major -> Minor -> None). Can usually only mark 1 slot per instance of damage."
    },
    {
        name: "Stress",
        category: "Combat",
        description: "Represents strain. If you must mark Stress but have no slots, mark 1 HP instead. When Stress is full, you are Vulnerable."
    },
    {
        name: "Death Moves",
        category: "Combat",
        description: "On marking last HP: 1. Blaze of Glory (Crit action then die). 2. Avoid Death (Unconscious, roll Hope Die vs Level for Scar). 3. Risk It All (Roll Duality: Hope > Fear = Live & Heal; Fear > Hope = Die)."
    },
    {
        name: "Scars",
        category: "Combat",
        description: "Permanent consequence of Avoiding Death. Cross out a Hope slot permanently. Lose last Hope slot = Retire/Die."
    },
    {
        name: "Falling Damage",
        category: "Combat",
        description: "Very Close Fall: 1d10+3 phy. Close Fall: 1d20+5 phy. Far/Very Far Fall: 1d100+15 phy (or death)."
    },
    {
        name: "Collision Damage",
        category: "Combat",
        description: "If a character collides with an object or character at dangerous speed, they take 1d20+5 direct physical damage."
    },
    {
        name: "Improvised Weapons",
        category: "Combat",
        description: "Usually deal d6 physical damage. Burden and Range determined by GM based on object size."
    },

    // --- EQUIPMENT ---
    {
        name: "Switching Weapons",
        category: "Equipment",
        description: "In danger: Mark 1 Stress to swap active weapon with inventory. In calm: Swap freely."
    },
    {
        name: "Gold",
        category: "Equipment",
        description: "Abstracted wealth. 10 Handfuls = 1 Bag. 10 Bags = 1 Chest."
    },
    {
        name: "Burden",
        category: "Equipment",
        description: "You have two hands. Two-handed weapons use both. Cannot equip more than hands allow."
    },
    
    // --- PROGRESSION & CHARACTER ---
    {
        name: "Tiers of Play",
        category: "Character",
        description: "Tier 1 (Lvl 1), Tier 2 (Lvl 2-4), Tier 3 (Lvl 5-7), Tier 4 (Lvl 8-10). Add your Level to base Armor Thresholds."
    },
    {
        name: "Multiclassing",
        category: "Character",
        description: "Available at Lvl 5. Pick 2nd class. Gain domain + subclass feature (foundation). Select domain cards from 2nd class at half level (rounded up)."
    },
    {
        name: "Experiences",
        category: "Character",
        description: "Narrative traits (e.g. 'Ex-Soldier'). Spend 1 Hope to add its modifier (+2 usually) to a relevant roll."
    },

    // --- DOWNTIME ---
    {
        name: "Short Rest",
        category: "Downtime",
        description: "Approx 1 hour. Swap cards. Choose 2: Tend Wounds (1d4+Tier HP), Clear Stress (1d4+Tier), Repair Armor (1d4+Tier slots), Prepare (Gain Hope)."
    },
    {
        name: "Long Rest",
        category: "Downtime",
        description: "Full night/sleep. Swap cards. Choose 2: Tend All Wounds, Clear All Stress, Repair All Armor, Prepare (Gain Hope, party gains 2), Work on Project."
    },
    {
        name: "Projects",
        category: "Downtime",
        description: "Long-term goals progressed during Long Rests using Countdowns. GM determines progress/roll."
    },

    // --- GM MECHANICS ---
    {
        name: "Fate Roll",
        category: "GM Mechanics",
        description: "A roll using only the Hope or Fear die to determine chance outcomes (Luck/Fortune). Does not generate Hope/Fear currency."
    },
    {
        name: "Countdowns",
        category: "GM Mechanics",
        description: "Dice (d4 to d12) tracking impending events. Tick down (reduce value by 1) on failures or time passing. Trigger at 0."
    },
    {
        name: "Adversary Rolls",
        category: "GM Mechanics",
        description: "Uses d20 + Modifier vs PC Evasion. Crit Success on Natural 20 (deals max damage + roll). GM can spend Fear to add Adversary Experience to the roll."
    },
    {
        name: "Fear Moves",
        category: "GM Mechanics",
        description: "GM spends Fear tokens to: Activate Adversary special abilities, Interrupt PC turn, Add reinforcements, Alter environment, or trigger a Countdown."
    }
];
