import { Traits } from '../types';

export interface Class {
    name: string;
    description: string;
    startingHP: number;
    startingEvasion: number;
    domains: string[];
    subclasses: string[];
    items: string;
    suggestedTraits?: Traits;
    suggestedEquipment?: {
        armor: string;
        primary: string;
        secondary?: string;
    };
}

export const CLASSES: Class[] = [
    {
        name: 'Bard',
        description: 'A charismatic performer who weaves magic through music, stories, and speeches. Bards inspire allies, captivate audiences, and manipulate the emotions of others to turn the tide of any situation.',
        startingHP: 5,
        startingEvasion: 10,
        domains: ['Grace', 'Codex'],
        subclasses: ['Troubadour', 'Wordsmith'],
        items: 'A romance novel or a letter never opened',
        suggestedTraits: { agility: 0, strength: -1, finesse: 1, instinct: 0, presence: 2, knowledge: 1 },
        suggestedEquipment: { armor: 'Gambeson Armor', primary: 'Rapier', secondary: 'Small Dagger' }
    },
    {
        name: 'Brawler',
        description: 'A martial combatant who channels their inner strength and discipline, turning their own body into a formidable weapon. Brawlers excel in unarmed, close-quarters combat, delivering devastating blows and enduring incredible punishment.',
        startingHP: 6,
        startingEvasion: 10,
        domains: ['Bone', 'Valor'],
        subclasses: ['Juggernaut', 'Martial Artist'],
        items: "hand wraps from a mentor or a book about your secret hobby",
        suggestedTraits: { agility: 1, strength: 1, finesse: 0, instinct: 2, presence: 0, knowledge: -1 },
        suggestedEquipment: { armor: 'Leather Armor', primary: 'Quarterstaff' }
    },
    {
        name: 'Blood Hunter',
        description: "A grim warrior who harnesses the forbidden power of hemocraft—blood magic—to hunt down and destroy evil. Blood Hunters sacrifice their own vitality to gain an edge in their relentless pursuit of darkness.",
        startingHP: 6,
        startingEvasion: 9,
        domains: ['Blade', 'Blood'],
        subclasses: ['Order of the Ghost Slayer', 'Order of the Mutant', 'Order of the Lycan'],
        items: "a steel needle or a vial holding a foe's blood",
        suggestedTraits: { agility: 2, strength: -1, finesse: 1, instinct: 1, presence: 0, knowledge: 0 },
        suggestedEquipment: { armor: 'Leather Armor', primary: 'Longsword' }
    },
    {
        name: 'Assassin',
        description: 'A deadly specialist who utilizes unmatched stealth and precision to ambush the unwary. Assassins are masters of infiltration and elimination, thriving in the shadows to execute their contracts with lethal efficiency.',
        startingHP: 6,
        startingEvasion: 12,
        domains: ['Midnight', 'Blade'],
        subclasses: ['Executioners Guild', 'Poisoners Guild'],
        items: "a list of names with several marked off or a mortar and pestle inscribed with a mysterious insignia",
        suggestedTraits: { agility: 2, strength: -1, finesse: 1, instinct: 0, presence: 0, knowledge: 1 },
        suggestedEquipment: { armor: 'Leather Armor', primary: 'Broadsword', secondary: 'Shortsword' }
    },
    {
        name: 'Druid',
        description: "A warden of the natural world, deeply connected to the earth and its creatures. Druids command nature's raw power, shapeshift into powerful beasts, and protect the balance of the wild.",
        startingHP: 6,
        startingEvasion: 10,
        domains: ['Sage', 'Arcana'],
        subclasses: ['Warden of the Elements', 'Warden of Renewal'],
        items: 'A small bag of rocks and bones or a strange pendant',
        suggestedTraits: { agility: 1, strength: 0, finesse: 1, instinct: 2, presence: -1, knowledge: 0 },
        suggestedEquipment: { armor: 'Leather Armor', primary: 'Shortstaff', secondary: 'Round Shield' }
    },
    {
        name: 'Guardian',
        description: 'An unwavering protector who stands as a bulwark between their allies and danger. Guardians are masters of defense, using their formidable strength and resilience to shield others from harm.',
        startingHP: 7,
        startingEvasion: 9,
        domains: ['Valor', 'Blade'],
        subclasses: ['Stalwart', 'Vengeance'],
        items: 'A totem from your mentor or a secret key',
        suggestedTraits: { agility: 1, strength: 2, finesse: -1, instinct: 0, presence: 1, knowledge: 0 },
        suggestedEquipment: { armor: 'Chainmail Armor', primary: 'Battleaxe' }
    },
    {
        name: 'Ranger',
        description: 'A skilled hunter and tracker, at home in the wilderness. Rangers are masters of survival and ranged combat, often forming deep bonds with animal companions and relentlessly pursuing their chosen quarry.',
        startingHP: 6,
        startingEvasion: 12,
        domains: ['Bone', 'Sage'],
        subclasses: ['Beastbound', 'Wayfinder'],
        items: 'A trophy from your first kill or a seemingly broken compass',
        suggestedTraits: { agility: 2, strength: 0, finesse: 1, instinct: 1, presence: -1, knowledge: 0 },
        suggestedEquipment: { armor: 'Leather Armor', primary: 'Shortbow' }
    },
    {
        name: 'Rogue',
        description: 'A master of stealth, deception, and precision strikes. Rogues thrive in the shadows, exploiting weaknesses with cunning tactics and disappearing before their enemies know what hit them.',
        startingHP: 6,
        startingEvasion: 12,
        domains: ['Midnight', 'Grace'],
        subclasses: ['Nightwalker', 'Syndicate'],
        items: 'A set of forgery tools or a grappling hook',
        suggestedTraits: { agility: 1, strength: -1, finesse: 2, instinct: 0, presence: 1, knowledge: 0 },
        suggestedEquipment: { armor: 'Gambeson Armor', primary: 'Dagger', secondary: 'Small Dagger' }
    },
    {
        name: 'Seraph',
        description: 'A divine agent, channeling celestial power to heal the wounded and smite the wicked. Seraphs are beacons of hope, wielding sacred energy to protect the innocent and uphold their sacred vows.',
        startingHP: 7,
        startingEvasion: 9,
        domains: ['Splendor', 'Valor'],
        subclasses: ['Divine Wielder', 'Winged Sentinel'],
        items: 'A bundle of offerings or a sigil of your god',
        suggestedTraits: { agility: 0, strength: 2, finesse: 0, instinct: 1, presence: 1, knowledge: -1 },
        suggestedEquipment: { armor: 'Chainmail Armor', primary: 'Hallowed Axe', secondary: 'Round Shield' }
    },
    {
        name: 'Sorcerer',
        description: 'A wielder of innate, untamed magic that flows from their very being. Sorcerers command raw arcane forces, shaping reality with instinct and power that others can only dream of.',
        startingHP: 6,
        startingEvasion: 10,
        domains: ['Arcana', 'Midnight'],
        subclasses: ['Elemental Origin', 'Primal Origin'],
        items: 'A whispering orb or a family heirloom',
        suggestedTraits: { agility: 0, strength: -1, finesse: 1, instinct: 2, presence: 1, knowledge: 0 },
        suggestedEquipment: { armor: 'Gambeson Armor', primary: 'Dualstaff' }
    },
    {
        name: 'Warrior',
        description: 'A master of martial combat, relying on skill, strength, and tactical prowess. Warriors are versatile fighters, adept with a variety of weapons and techniques to overcome any challenge on the battlefield.',
        startingHP: 6,
        startingEvasion: 11,
        domains: ['Blade', 'Bone'],
        subclasses: ['Call of the Brave', 'Call of the Slayer'],
        items: 'The drawing of a lover or a sharpening stone',
        suggestedTraits: { agility: 2, strength: 1, finesse: 0, instinct: 1, presence: -1, knowledge: 0 },
        suggestedEquipment: { armor: 'Chainmail Armor', primary: 'Longsword' }
    },
    {
        name: 'Warlock',
        description: "A seeker of forbidden knowledge who has forged a pact with a powerful, otherworldly patron in exchange for great power. Warlocks wield strange and potent magics gifted to them by their benefactors.",
        startingHP: 6,
        startingEvasion: 10,
        domains: ['Dread', 'Grace'],
        subclasses: ['Pact of the Endless', 'Pact of the Wrathful'],
        items: "a carving that symbolizes your patron or a ring you can't remove",
        suggestedTraits: { agility: 1, strength: -1, finesse: 0, instinct: 1, presence: 2, knowledge: 0 },
        suggestedEquipment: { armor: 'Leather Armor', primary: 'Scepter' }
    },
    {
        name: 'Witch',
        description: 'A weaver of mysterious powers drawn from the earth, sky, and spirit world. Witches craft protective charms, brew potent concoctions, and hex their enemies through an ancient and intuitive connection to magic.',
        startingHP: 5,
        startingEvasion: 10,
        domains: ['Dread', 'Sage'],
        subclasses: ['Hedge', 'Moon'],
        items: "a handcrafted besom or a pouch of animal bones you found in the wild",
        suggestedTraits: { agility: 0, strength: -1, finesse: 0, instinct: 2, presence: 1, knowledge: 1 },
        suggestedEquipment: { armor: 'Gambeson Armor', primary: 'Dualstaff' }
    },
    {
        name: 'Wizard',
        description: 'A dedicated scholar of the arcane arts, whose power comes from rigorous study and intellectual mastery. Wizards manipulate the fabric of magic through spells learned from ancient tomes and scrolls.',
        startingHP: 5,
        startingEvasion: 11,
        domains: ['Codex', 'Splendor'],
        subclasses: ['School of Knowledge', 'School of War'],
        items: 'A book you\'re trying to translate or a tiny, harmless elemental pet',
        suggestedTraits: { agility: -1, strength: 0, finesse: 0, instinct: 1, presence: 1, knowledge: 2 },
        suggestedEquipment: { armor: 'Leather Armor', primary: 'Greatstaff' }
    }
];