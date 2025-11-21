
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
        description: 'Bards are the most charismatic people in all the realms. Masters of captivation, they specialize in performance to bolster allies and influence social situations.',
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
        description: "A force of nature, preserving the balance of life and death by channeling the wilds themselves through you. Druids can transform into beasts and shape nature itself.",
        startingHP: 6,
        startingEvasion: 10,
        domains: ['Sage', 'Arcana'],
        subclasses: ['Warden of the Elements', 'Warden of Renewal'],
        items: 'A small bag of rocks and bones or a strange pendant found in the dirt',
        suggestedTraits: { agility: 1, strength: 0, finesse: 1, instinct: 2, presence: -1, knowledge: 0 },
        suggestedEquipment: { armor: 'Leather Armor', primary: 'Shortstaff', secondary: 'Round Shield' }
    },
    {
        name: 'Guardian',
        description: 'You run into danger to protect your party, keeping watch over those who might not survive without you there. Guardians fight with remarkable ferocity and defend their cohort above all else.',
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
        description: 'Your keen eyes and graceful haste make you indispensable when tracking down enemies and navigating the wilds. Rangers are sly tacticians and expert trackers.',
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
        description: 'You have experience fighting with your blade as well as your wit, preferring to move quickly and fight quietly. Rogues trick their foes through social manipulation as easily as breaking locks.',
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
        description: 'You have taken a vow to a god who helps you channel sacred arcane power to keep your party on their feet. Seraphs are divine fighters and healers imbued with sacred purpose.',
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
        description: 'You were born with innate magical power, and you’ve learned how to wield that power to get what you want. Sorcerers channel untamed forces, shaping reality with instinct.',
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
        description: 'You run into battle without hesitation or caution, knowing you can strike down whatever enemy stands in your path. Warriors master weapons and violence through years of training.',
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
        description: 'You have become familiar with the arcane through the relentless study of grimoires and other tools of magic. Wizards acquire and hone immense magical power over years of learning.',
        startingHP: 5,
        startingEvasion: 11,
        domains: ['Codex', 'Splendor'],
        subclasses: ['School of Knowledge', 'School of War'],
        items: 'A book you\'re trying to translate or a tiny, harmless elemental pet',
        suggestedTraits: { agility: -1, strength: 0, finesse: 0, instinct: 1, presence: 1, knowledge: 2 },
        suggestedEquipment: { armor: 'Leather Armor', primary: 'Greatstaff' }
    }
];
