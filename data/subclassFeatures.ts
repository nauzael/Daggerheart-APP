import { SubclassFeature } from '../types';

export const SUBCLASS_FEATURES: SubclassFeature[] = [
    // Bard - Troubadour
    { name: 'Gifted Performer', subclass: 'Troubadour', type: 'Foundation', description: 'You can play three different types of songs, once each per long rest: Relaxing Song, Epic Song, and Heartbreaking Song.' },
    { name: 'Maestro', subclass: 'Troubadour', type: 'Specialization', description: 'When you give a Rally Die to an ally, they can gain a Hope or clear a Stress.' },
    { name: 'Virtuoso', subclass: 'Troubadour', type: 'Mastery', description: 'You can perform each of your "Gifted Performer" feature\'s songs twice per long rest.' },
    // Bard - Wordsmith
    { name: 'Rousing Speech', subclass: 'Wordsmith', type: 'Foundation', description: 'Once per long rest, give an inspiring speech. All allies within Far range clear 2 Stress.' },
    { name: 'Heart of a Poet', subclass: 'Wordsmith', type: 'Foundation', description: 'After an action roll to impress, persuade, or offend, you can spend a Hope to add a d4 to the roll.' },
    { name: 'Eloquent', subclass: 'Wordsmith', type: 'Specialization', description: 'Once per session, when you encourage an ally, you can help them find a mundane item, help without spending Hope, or give an additional downtime move.' },
    { name: 'Epic Poetry', subclass: 'Wordsmith', type: 'Mastery', description: 'Your Rally Die increases to a d10. When you Help an Ally, you can narrate the moment and roll a d10 as your advantage die.' },
    // Druid - Warden of the Elements
    { name: 'Elemental Incarnation', subclass: 'Warden of the Elements', type: 'Foundation', description: 'Mark a Stress to Channel Fire, Earth, Water, or Air until you take Severe damage or your next rest, gaining a benefit based on the element.' },
    { name: 'Elemental Aura', subclass: 'Warden of the Elements', type: 'Specialization', description: 'Once per rest while Channeling, assume an aura matching your element affecting targets within Close range.' },
    { name: 'Elemental Dominion', subclass: 'Warden of the Elements', type: 'Mastery', description: 'You further embody your element, gaining powerful benefits while Channeling (e.g., +1 Proficiency, damage reduction, flight).' },
     // Druid - Warden of Renewal
    { name: 'Clarity of Nature', subclass: 'Warden of Renewal', type: 'Foundation', description: 'Once per long rest, create a space of natural serenity. When resting there, clear Stress equal to your Instinct.' },
    { name: 'Regeneration', subclass: 'Warden of Renewal', type: 'Foundation', description: 'Touch a creature and spend 3 Hope to clear 1d4 Hit Points.' },
    { name: 'Regenerative Reach', subclass: 'Warden of Renewal', type: 'Specialization', description: 'You can target creatures within Very Close range with your "Regeneration" feature.' },
    { name: 'Warden\'s Protection', subclass: 'Warden of Renewal', type: 'Specialization', description: 'Once per long rest, spend 2 Hope to clear 2 Hit Points on 1d4 allies within Close range.' },
    { name: 'Defender', subclass: 'Warden of Renewal', type: 'Mastery', description: 'In Beastform, when an ally within Close range marks 2+ HP, mark a Stress to reduce HP marked by 1.' },
    // Guardian - Stalwart
    { name: 'Unwavering', subclass: 'Stalwart', type: 'Foundation', description: 'Gain a permanent +1 bonus to your damage thresholds.' },
    { name: 'Iron Will', subclass: 'Stalwart', type: 'Foundation', description: 'When you take physical damage, you can mark an additional Armor Slot to reduce the severity.' },
    { name: 'Unrelenting', subclass: 'Stalwart', type: 'Specialization', description: 'Gain a permanent +2 bonus to your damage thresholds.' },
    { name: 'Partners-in-Arms', subclass: 'Stalwart', type: 'Specialization', description: 'When an ally within Very Close range takes damage, mark an Armor Slot to reduce the severity by one threshold.' },
    { name: 'Undaunted', subclass: 'Stalwart', type: 'Mastery', description: 'Gain a permanent +3 bonus to your damage thresholds.' },
    // Guardian - Vengeance
    { name: 'At Ease', subclass: 'Vengeance', type: 'Foundation', description: 'Gain an additional Stress slot.'},
    { name: 'Revenge', subclass: 'Vengeance', type: 'Foundation', description: 'When an adversary in Melee succeeds on an attack against you, mark 2 Stress to force the attacker to mark a Hit Point.'},
    { name: 'Act of Reprisal', subclass: 'Vengeance', type: 'Specialization', description: 'When an adversary damages an ally in Melee, gain +1 Proficiency for your next successful attack against them.'},
    { name: 'Nemesis', subclass: 'Vengeance', type: 'Mastery', description: 'Spend 2 Hope to Prioritize an adversary. When you attack them, you can swap your Hope and Fear Dice results.'},
    // And so on for all other subclasses...
];