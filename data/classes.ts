export interface Class {
    name: string;
    startingHP: number;
    startingEvasion: number;
    domains: string[];
    subclasses: string[];
    items: string;
}

export const CLASSES: Class[] = [
    {
        name: 'Bard',
        startingHP: 5,
        startingEvasion: 10,
        domains: ['Grace', 'Codex'],
        subclasses: ['Troubadour', 'Wordsmith'],
        items: 'A romance novel or a letter never opened'
    },
    {
        name: 'Druid',
        startingHP: 6,
        startingEvasion: 10,
        domains: ['Sage', 'Arcana'],
        subclasses: ['Warden of the Elements', 'Warden of Renewal'],
        items: 'A small bag of rocks and bones or a strange pendant'
    },
    {
        name: 'Guardian',
        startingHP: 7,
        startingEvasion: 9,
        domains: ['Valor', 'Blade'],
        subclasses: ['Stalwart', 'Vengeance'],
        items: 'A totem from your mentor or a secret key'
    },
    {
        name: 'Ranger',
        startingHP: 6,
        startingEvasion: 12,
        domains: ['Bone', 'Sage'],
        subclasses: ['Beastbound', 'Wayfinder'],
        items: 'A trophy from your first kill or a seemingly broken compass'
    },
    {
        name: 'Rogue',
        startingHP: 6,
        startingEvasion: 12,
        domains: ['Midnight', 'Grace'],
        subclasses: ['Nightwalker', 'Syndicate'],
        items: 'A set of forgery tools or a grappling hook'
    },
    {
        name: 'Seraph',
        startingHP: 7,
        startingEvasion: 9,
        domains: ['Splendor', 'Valor'],
        subclasses: ['Divine Wielder', 'Winged Sentinel'],
        items: 'A bundle of offerings or a sigil of your god'
    },
    {
        name: 'Sorcerer',
        startingHP: 6,
        startingEvasion: 10,
        domains: ['Arcana', 'Midnight'],
        subclasses: ['Elemental Origin', 'Primal Origin'],
        items: 'A whispering orb or a family heirloom'
    },
    {
        name: 'Warrior',
        startingHP: 6,
        startingEvasion: 11,
        domains: ['Blade', 'Bone'],
        subclasses: ['Call of the Brave', 'Call of the Slayer'],
        items: 'The drawing of a lover or a sharpening stone'
    },
    {
        name: 'Wizard',
        startingHP: 5,
        startingEvasion: 11,
        domains: ['Codex', 'Splendor'],
        subclasses: ['School of Knowledge', 'School of War'],
        items: 'A book you\'re trying to translate or a tiny, harmless elemental pet'
    }
];
