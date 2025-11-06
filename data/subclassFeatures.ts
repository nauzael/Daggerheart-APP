import { SubclassFeature } from "../types";

export const SUBCLASS_FEATURES: SubclassFeature[] = [
    // Bard
    { name: 'Gifted Performer', subclass: 'Troubadour', type: 'Foundation', description: 'You can play three different types of songs, once each per long rest: Relaxing Song (clear 1 HP), Epic Song (make target Vulnerable), Heartbreaking Song (gain 1 Hope).' },
    { name: 'Maestro', subclass: 'Troubadour', type: 'Specialization', description: 'When you give a Rally Die to an ally, they can gain a Hope or clear a Stress.' },
    { name: 'Virtuoso', subclass: 'Troubadour', type: 'Mastery', description: 'You can perform each of your "Gifted Performer" songs twice per long rest.' },
    { name: 'Rousing Speech', subclass: 'Wordsmith', type: 'Foundation', description: 'Once per long rest, give an inspiring speech. All allies within Far range clear 2 Stress.' },
    { name: 'Eloquent', subclass: 'Wordsmith', type: 'Specialization', description: 'Once per session, when you encourage an ally, you can either find them a tool, Help them without spending Hope, or give them an additional downtime move.' },
    { name: 'Epic Poetry', subclass: 'Wordsmith', type: 'Mastery', description: 'Your Rally Die increases to a d10. Additionally, when you Help an Ally, you can roll a d10 as your advantage die.' },
    
    // Druid
    { name: 'Elemental Incarnation', subclass: 'Warden of the Elements', type: 'Foundation', description: 'Mark a Stress to Channel an element (Fire, Earth, Water, Air) until your next rest, gaining a benefit.' },
    { name: 'Elemental Aura', subclass: 'Warden of the Elements', type: 'Specialization', description: 'Once per rest while Channeling, assume an aura matching your element affecting targets in Close range.' },
    { name: 'Elemental Dominion', subclass: 'Warden of the Elements', type: 'Mastery', description: 'You further embody your element, gaining a powerful new benefit while Channeling.' },
    { name: 'Clarity of Nature', subclass: 'Warden of Renewal', type: 'Foundation', description: 'Once per long rest, create a space of natural serenity. When you rest there, clear Stress equal to your Instinct.' },
    { name: 'Regenerative Reach', subclass: 'Warden of Renewal', type: 'Specialization', description: 'You can target creatures within Very Close range with your "Regeneration" feature.' },
    { name: 'Defender', subclass: 'Warden of Renewal', type: 'Mastery', description: 'In Beastform, when an ally in Close range marks 2+ HP, you can mark a Stress to reduce the HP they mark by 1.' },

    // Guardian
    { name: 'Unwavering', subclass: 'Stalwart', type: 'Foundation', description: 'Gain a permanent +1 bonus to your damage thresholds.' },
    { name: 'Unrelenting', subclass: 'Stalwart', type: 'Specialization', description: 'Gain a permanent +2 bonus to your damage thresholds.' },
    { name: 'Undaunted', subclass: 'Stalwart', type: 'Mastery', description: 'Gain a permanent +3 bonus to your damage thresholds.' },
    { name: 'At Ease', subclass: 'Vengeance', type: 'Foundation', description: 'Gain an additional Stress slot.' },
    { name: 'Act of Reprisal', subclass: 'Vengeance', type: 'Specialization', description: 'When an adversary damages an ally in Melee range, gain +1 Proficiency for your next successful attack against that adversary.' },
    { name: 'Nemesis', subclass: 'Vengeance', type: 'Mastery', description: 'Spend 2 Hope to Prioritize an adversary. When you attack them, you can swap your Hope and Fear Dice results.' },
    
    // Ranger
    { name: 'Companion', subclass: 'Beastbound', type: 'Foundation', description: 'You have an animal companion. Take the Ranger Companion sheet.' },
    { name: 'Expert Training', subclass: 'Beastbound', type: 'Specialization', description: 'Choose an additional level-up option for your companion.' },
    { name: 'Advanced Training', subclass: 'Beastbound', type: 'Mastery', description: 'Choose two additional level-up options for your companion.' },
    { name: 'Ruthless Predator', subclass: 'Wayfinder', type: 'Foundation', description: 'When you make a damage roll, you can mark a Stress to gain +1 Proficiency. When you deal Severe damage, they must mark a Stress.' },
    { name: 'Elusive Predator', subclass: 'Wayfinder', type: 'Specialization', description: 'When your Focus makes an attack against you, gain +2 Evasion against it.' },
    { name: 'Apex Predator', subclass: 'Wayfinder', type: 'Mastery', description: 'Before you attack your Focus, spend a Hope. On a success, remove a Fear from the GM\'s Fear pool.' },

    // Rogue
    { name: 'Shadow Stepper', subclass: 'Nightwalker', type: 'Foundation', description: 'Mark a Stress to move from one shadow to another within Far range and become Cloaked.' },
    { name: 'Dark Cloud', subclass: 'Nightwalker', type: 'Specialization', description: 'Make a Spellcast Roll (15) to create a temporary dark cloud in Close range, blocking line of sight.' },
    { name: 'Fleeting Shadow', subclass: 'Nightwalker', type: 'Mastery', description: 'Gain +1 Evasion. You can use your Shadow Stepper to move within Very Far range.' },
    { name: 'Well-Connected', subclass: 'Syndicate', type: 'Foundation', description: 'When you arrive in a prominent town, you know somebody who calls this place home.' },
    { name: 'Contacts Everywhere', subclass: 'Syndicate', type: 'Specialization', description: 'Once per session, you can briefly call on a shady contact for a benefit.' },
    { name: 'Reliable Backup', subclass: 'Syndicate', type: 'Mastery', description: 'You can use your "Contacts Everywhere" feature three times per session, with added benefits.' },

    // Seraph
    { name: 'Spirit Weapon', subclass: 'Divine Wielder', type: 'Foundation', description: 'Your equipped weapon can fly to attack an adversary in Close range and return. Mark a Stress to target an additional adversary.' },
    { name: 'Devout', subclass: 'Divine Wielder', type: 'Specialization', description: 'When you roll Prayer Dice, roll an additional die and discard the lowest. Use "Sparing Touch" twice per long rest.' },
    { name: 'Sacred Resonance', subclass: 'Divine Wielder', type: 'Mastery', description: 'When rolling damage for your Spirit Weapon, if any die results match, double the value of each matching die.' },
    { name: 'Wings of Light', subclass: 'Winged Sentinel', type: 'Foundation', description: 'You can fly. While flying, you can Mark a Stress to carry another creature or Spend a Hope to deal an extra 1d8 damage on an attack.' },
    { name: 'Ethereal Visage', subclass: 'Winged Sentinel', type: 'Specialization', description: 'While flying, you have advantage on Presence Rolls. On a success with Hope, you can remove a Fear from the GM\'s pool.' },
    { name: 'Ascendant', subclass: 'Winged Sentinel', type: 'Mastery', description: 'Gain a permanent +4 bonus to your Severe damage threshold. Your "Wings of Light" feature now deals an extra 1d12 damage.' },

    // Sorcerer
    { name: 'Elementalist', subclass: 'Elemental Origin', type: 'Foundation', description: 'Choose an element. Spend a Hope to gain +2 to a roll or +3 to its damage by using your element.' },
    { name: 'Natural Evasion', subclass: 'Elemental Origin', type: 'Specialization', description: 'When an attack succeeds, mark a Stress and describe using your element to defend, rolling a d6 and adding it to your Evasion.' },
    { name: 'Transcendence', subclass: 'Elemental Origin', type: 'Mastery', description: 'Once per long rest, transform into a physical manifestation of your element, choosing two benefits until your next rest.' },
    { name: 'Manipulate Magic', subclass: 'Primal Origin', type: 'Foundation', description: 'After you cast a spell or make a magic attack, mark a Stress to modify it (e.g., extend range, gain +2 to roll, double a damage die).' },
    { name: 'Enchanted Aid', subclass: 'Primal Origin', type: 'Specialization', description: 'When you Help an Ally with a Spellcast Roll, roll a d8 as your advantage die. Once per long rest, you can swap their Duality Dice results.' },
    { name: 'Arcane Charge', subclass: 'Primal Origin', type: 'Mastery', description: 'When you take magic damage, become Charged. When you successfully make a magic attack while Charged, you can clear it for +10 damage or +3 to a reaction Difficulty.' },

    // Warrior
    { name: 'Courage', subclass: 'Call of the Brave', type: 'Foundation', description: 'When you fail a roll with Fear, you gain a Hope.' },
    { name: 'Rise to the Challenge', subclass: 'Call of the Brave', type: 'Specialization', description: 'While you have 2 or fewer unmarked Hit Points, you can roll a d20 as your Hope Die.' },
    { name: 'Camaraderie', subclass: 'Call of the Brave', type: 'Mastery', description: 'You can initiate a Tag Team Roll one additional time per session. When an ally initiates one with you, they only need to spend 2 Hope.' },
    { name: 'Slayer', subclass: 'Call of the Slayer', type: 'Foundation', description: 'Gain a pool of Slayer Dice. On a roll with Hope, place a d6 on this card instead of gaining Hope. Spend Slayer Dice to add to attack or damage rolls.' },
    { name: 'Weapon Specialist', subclass: 'Call of the Slayer', type: 'Specialization', description: 'When you succeed on an attack, spend a Hope to add one of the damage dice from your secondary weapon. Once per long rest, reroll any 1s on your Slayer Dice.' },
    { name: 'Martial Preparation', subclass: 'Call of the Slayer', type: 'Mastery', description: "Your party gains access to the Martial Preparation downtime move, granting each a d6 Slayer Die." },
    
    // Wizard
    { name: 'Prepared', subclass: 'School of Knowledge', type: 'Foundation', description: 'Take an additional domain card of your level or lower from a domain you have access to.' },
    { name: 'Accomplished', subclass: 'School of Knowledge', type: 'Specialization', description: 'Take an additional domain card of your level or lower from a domain you have access to.' },
    { name: 'Brilliant', subclass: 'School of Knowledge', type: 'Mastery', description: 'Take an additional domain card of your level or lower from a domain you have access to.' },
    { name: 'Battlemage', subclass: 'School of War', type: 'Foundation', description: 'Gain an additional Hit Point slot.' },
    { name: 'Conjure Shield', subclass: 'School of War', type: 'Specialization', description: 'While you have at least 2 Hope, you add your Proficiency to your Evasion.' },
    { name: 'Thrive in Chaos', subclass: 'School of War', type: 'Mastery', description: 'When you succeed on an attack, you can mark a Stress after rolling damage to force the target to mark an additional Hit Point.' }
];