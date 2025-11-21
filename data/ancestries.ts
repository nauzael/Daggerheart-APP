
export interface Ancestry {
  name: string;
  features: {
    name: string;
    description: string;
  }[];
}

export const ANCESTRIES: Ancestry[] = [
  {
    name: "Clank",
    features: [
      { name: "Purposeful Design", description: "Decide who made you and for what purpose. At character creation, choose one of your Experiences that best aligns with this purpose and gain a permanent +1 bonus to it." },
      { name: "Efficient", description: "When you take a short rest, you can choose a long rest move instead of a short rest move." },
    ],
  },
  {
    name: "Drakona",
    features: [
      { name: "Scales", description: "Your scales act as natural protection. When you would take Severe damage, you can mark a Stress to mark 1 fewer Hit Points." },
      { name: "Elemental Breath", description: "Choose an element for your breath (such as electricity, fire, or ice). You can use this breath against a target or group of targets within Very Close range, treating it as an Instinct weapon that deals d8 magic damage using your Proficiency." },
    ],
  },
  {
    name: "Dwarf",
    features: [
      { name: "Thick Skin", description: "When you take Minor damage, you can mark 2 Stress instead of marking a Hit Point." },
      { name: "Increased Fortitude", description: "Spend 3 Hope to halve incoming physical damage." },
    ],
  },
  {
    name: "Elf",
    features: [
      { name: "Quick Reactions", description: "Mark a Stress to gain advantage on a reaction roll." },
      { name: "Celestial Trance", description: "During a rest, you can drop into a trance to choose an additional downtime move." },
    ],
  },
  {
    name: "Faerie",
    features: [
      { name: "Luckbender", description: "Once per session, after you or a willing ally within Close range makes an action roll, you can spend 3 Hope to reroll the Duality Dice." },
      { name: "Wings", description: "You can fly. While flying, you can mark a Stress after an adversary makes an attack against you to gain a +2 bonus to your Evasion against that attack." },
    ],
  },
  {
    name: "Faun",
    features: [
      { name: "Caprine Leap", description: "You can leap anywhere within Close range as though you were using normal movement, allowing you to vault obstacles, jump across gaps, or scale barriers with ease." },
      { name: "Kick", description: "When you succeed on an attack against a target within Melee range, you can mark a Stress to kick yourself off them, dealing an extra 2d6 damage and knocking back either yourself or the target to Very Close range." },
    ],
  },
  {
    name: "Firbolg",
    features: [
      { name: "Charge", description: "When you succeed on an Agility Roll to move from Far or Very Far range into Melee range with one or more targets, you can mark a Stress to deal 1d12 physical damage to all targets within Melee range." },
      { name: "Unshakable", description: "When you would mark a Stress, roll a d6. On a result of 6, don't mark it." },
    ],
  },
  {
    name: "Fungril",
    features: [
      { name: "Fungril Network", description: "Make an Instinct Roll (12) to use your mycelial array to speak with others of your ancestry. On a success, you can communicate across any distance." },
      { name: "Death Connection", description: "While touching a corpse that died recently, you can mark a Stress to extract one memory from the corpse related to a specific emotion or sensation of your choice." },
    ],
  },
  {
    name: "Galapa",
    features: [
      { name: "Shell", description: "Gain a bonus to your damage thresholds equal to your Proficiency." },
      { name: "Retract", description: "Mark a Stress to retract into your shell. While in your shell, you have resistance to physical damage, you have disadvantage on action rolls, and you can't move." },
    ],
  },
  {
    name: "Giant",
    features: [
      { name: "Endurance", description: "Gain an additional Hit Point slot at character creation." },
      { name: "Reach", description: "Treat any weapon, ability, spell, or other feature that has a Melee range as though it has a Very Close range instead." },
    ],
  },
  {
    name: "Goblin",
    features: [
      { name: "Surefooted", description: "You ignore disadvantage on Agility Rolls." },
      { name: "Danger Sense", description: "Once per rest, mark a Stress to force an adversary to reroll an attack against you or an ally within Very Close range." },
    ],
  },
  {
    name: "Halfling",
    features: [
      { name: "Luckbringer", description: "At the start of each session, everyone in your party gains a Hope." },
      { name: "Internal Compass", description: "When you roll a 1 on your Hope Die, you can reroll it." },
    ],
  },
  {
    name: "Human",
    features: [
      { name: "High Stamina", description: "Gain an additional Stress slot at character creation." },
      { name: "Adaptability", description: "When you fail a roll that utilized one of your Experiences, you can mark a Stress to reroll." },
    ],
  },
  {
    name: "Infernis",
    features: [
      { name: "Fearless", description: "When you roll with Fear, you can mark 2 Stress to change it into a roll with Hope instead." },
      { name: "Dread Visage", description: "You have advantage on rolls to intimidate hostile creatures." },
    ],
  },
  {
    name: "Katari",
    features: [
      { name: "Feline Instincts", description: "When you make an Agility Roll, you can spend 2 Hope to reroll your Hope Die." },
      { name: "Retracting Claws", description: "Make an Agility Roll to scratch a target within Melee range. On a success, they become temporarily Vulnerable." },
    ],
  },
  {
    name: "Orc",
    features: [
      { name: "Sturdy", description: "When you have 1 Hit Point remaining, attacks against you have disadvantage." },
      { name: "Tusks", description: "When you succeed on an attack against a target within Melee range, you can spend a Hope to gore the target with your tusks, dealing an extra 1d6 damage." },
    ],
  },
  {
    name: "Ribbet",
    features: [
      { name: "Amphibious", description: "You can breathe and move naturally underwater." },
      { name: "Long Tongue", description: "You can use your long tongue to grab onto things within Close range. Mark a Stress to use your tongue as a Finesse Close weapon that deals d12 physical damage using your Proficiency." },
    ],
  },
  {
    name: "Simiah",
    features: [
      { name: "Natural Climber", description: "You have advantage on Agility Rolls that involve balancing and climbing." },
      { name: "Nimble", description: "Gain a permanent +1 bonus to your Evasion at character creation." },
    ],
  },
  // Legacy/Homebrew Ancestries (Kept but moved to bottom)
  {
    name: "Earthkin",
    features: [
      { name: "Stoneskin", description: "Gain a +1 bonus to your Armor Score and Damage Thresholds." },
      { name: "Immoveable", description: "While your feet are touching the ground, you cannot be lifted or moved against your will." },
    ],
  },
  {
    name: "Tidekin",
    features: [
      { name: "Amphibious", description: "You can breathe and move naturally underwater." },
      { name: "Lifespring", description: "Once per rest, when you have access to a small amount of water, you can mark 2 Stress to heal a Hit Point on yourself or an ally." },
    ],
  },
  {
    name: "Emberkin",
    features: [
      { name: "Fireproof", description: "You are immune to damage from magical or mundane flame." },
      { name: "Ignition", description: "Mark a Stress to wreathe your primary weapon in flame until the end of the scene. While ablaze, it gives off a bright light and grants a 1d6 bonus to damage rolls against targets within Melee range." },
    ],
  },
  {
    name: "Skykin",
    features: [
      { name: "Gale Force", description: "Mark a Stress to conjure a gust of wind that carries you or an ally up to Very Far range. Additionally, you can always control the speed at which you fall." },
      { name: "Eye of the Storm", description: "Spend 2 Hope to grant a +1 bonus to either your or an ally's Evasion until you next take Severe damage or you use Eye of the Storm again." },
    ],
  },
  {
    name: "Aetheris",
    features: [
      { name: "Hallowed Aura", description: "Once per rest, when an ally within Close range rolls with Fear, you can make it a roll with Hope instead." },
      { name: "Divine Countenance", description: "You have advantage on rolls to command or persuade." },
    ],
  },
  {
    name: "Gnome",
    features: [
      { name: "Nimble Fingers", description: "When you make a Finesse Roll, you can spend 2 Hope to reroll your Hope Die." },
      { name: "True Sight", description: "You have advantage on rolls to see through illusions." },
    ],
  },
];
