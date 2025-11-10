export interface Community {
  name: string;
  feature: {
    name: string;
    description: string;
  };
  adjectives: string[];
}

export const COMMUNITIES: Community[] = [
  {
    name: "Highborne",
    feature: {
      name: "Privilege",
      description: "You have advantage on rolls to consort with nobles, negotiate prices, or leverage your reputation to get what you want."
    },
    adjectives: ["amiable", "candid", "conniving", "enterprising", "ostentatious", "unflappable"]
  },
  {
    name: "Loreborne",
    feature: {
      name: "Well-Read",
      description: "You have advantage on rolls that involve the history, culture, or politics of a prominent person or place."
    },
    adjectives: ["direct", "eloquent", "inquisitive", "patient", "rhapsodic", "witty"]
  },
  {
    name: "Orderborne",
    feature: {
      name: "Dedicated",
      description: "Record three sayings or values. Once per rest, when embodying one of these principles, you can roll a d20 as your Hope Die."
    },
    adjectives: ["ambitious", "benevolent", "pensive", "prudent", "sardonic", "stoic"]
  },
  {
    name: "Ridgeborne",
    feature: {
      name: "Steady",
      description: "You have advantage on rolls to traverse dangerous cliffs and ledges, navigate harsh environments, and use your survival knowledge."
    },
    adjectives: ["bold", "hardy", "indomitable", "loyal", "reserved", "stubborn"]
  },
  {
    name: "Seaborne",
    feature: {
      name: "Know the Tide",
      description: "When you roll with Fear, place a token on your community card (max equal to your level). You can spend tokens for a +1 bonus per token on action rolls."
    },
    adjectives: ["candid", "cooperative", "exuberant", "fierce", "resolute", "weathered"]
  },
  {
    name: "Slyborne",
    feature: {
      name: "Scoundrel",
      description: "You have advantage on rolls to negotiate with criminals, detect lies, or find a safe place to hide."
    },
    adjectives: ["calculating", "clever", "formidable", "perceptive", "shrewd", "tenacious"]
  },
  {
    name: "Underborne",
    feature: {
      name: "Low-Light Living",
      description: "When you're in an area with low light or heavy shadow, you have advantage on rolls to hide, investigate, or perceive details within that area."
    },
    adjectives: ["composed", "elusive", "indomitable", "innovative", "resourceful", "unpretentious"]
  },
  {
    name: "Wanderborne",
    feature: {
      name: "Nomadic Pack",
      description: "Once per session, you can spend a Hope to reach into your pack and pull out a mundane item that's useful to your situation."
    },
    adjectives: ["inscrutable", "magnanimous", "mirthful", "reliable", "savvy", "unorthodox"]
  },
  {
    name: "Wildborne",
    feature: {
      name: "Lightfoot",
      description: "Your movement is naturally silent. You have advantage on rolls to move without being heard."
    },
    adjectives: ["hardy", "loyal", "nurturing", "reclusive", "sagacious", "vibrant"]
  },
  {
    name: "Duneborne",
    feature: {
      name: "Oasis",
      description: "During a short rest, you or an ally can reroll a die used for a downtime action."
    },
    adjectives: ["arid", "shifting", "hardy", "resourceful", "sun-scorched", "nomadic"]
  },
  {
    name: "Freeborne",
    feature: {
      name: "Unbound",
      description: "Once per session, when you make an action roll with Fear, you can change it to a roll with Hope instead."
    },
    adjectives: ["liberated", "defiant", "independent", "resilient", "determined", "unshackled"]
  },
  {
    name: "Frostborne",
    feature: {
      name: "Hardy",
      description: "Once per rest, you can Help an Ally traverse difficult terrain without spending a Hope."
    },
    adjectives: ["icy", "stoic", "enduring", "fierce", "isolated", "winter-worn"]
  },
  {
    name: "Hearthborne",
    feature: {
      name: "Close-Knit",
      description: "Once per long rest, you can spend any number of Hope to give an ally the same number of Hope."
    },
    adjectives: ["humble", "kind", "grounded", "neighborly", "simple", "warm"]
  },
  {
    name: "Reborne",
    feature: {
      name: "Found Family",
      description: "Once per session, you can spend a Hope to use an ally's community ability. When you do, your ally gains a Hope. At any point, when you've discovered the community you were once a part of, or have joined a new community, you can permanently trade this community card for that one instead."
    },
    adjectives: ["amnesiac", "searching", "adaptable", "new", "curious", "unwritten"]
  },
  {
    name: "Warborne",
    feature: {
      name: "Brave Face",
      description: "Once per session, when an attack would cause you to mark a Stress, you can spend a Hope instead."
    },
    adjectives: ["ravaged", "scarred", "cynical", "tough", "vigilant", "battle-weary"]
  }
];