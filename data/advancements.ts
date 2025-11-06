export interface Advancement {
    id: string;
    description: string;
    tier: number;
    slots: number;
    isRepeatable: boolean;
}

export const ADVANCEMENTS: Advancement[] = [
    // Tier 1 (Level 1) - initial character creation
    // Tier 2 (Levels 2-4)
    { id: 'increase_traits_t2', description: 'Increase two unmarked character traits by +1 each.', tier: 2, slots: 1, isRepeatable: true },
    { id: 'add_hp_t2', description: 'Permanently add 1 Hit Point slot.', tier: 2, slots: 1, isRepeatable: true },
    { id: 'add_stress_t2', description: 'Permanently add 1 Stress slot.', tier: 2, slots: 1, isRepeatable: true },
    { id: 'increase_experience_t2', description: 'Increase two Experiences by +1 each.', tier: 2, slots: 1, isRepeatable: true },
    { id: 'add_domain_card_t2', description: 'Take an additional domain card.', tier: 2, slots: 1, isRepeatable: true },
    { id: 'increase_evasion_t2', description: 'Gain a permanent +1 bonus to your Evasion.', tier: 2, slots: 1, isRepeatable: true },
    { id: 'upgrade_subclass_t2', description: 'Take your subclass\'s Specialization card.', tier: 2, slots: 1, isRepeatable: false },

    // Tier 3 (Levels 5-7)
    { id: 'increase_traits_t3', description: 'Increase two unmarked character traits by +1 each.', tier: 3, slots: 1, isRepeatable: true },
    { id: 'add_hp_t3', description: 'Permanently add 1 Hit Point slot.', tier: 3, slots: 1, isRepeatable: true },
    { id: 'add_stress_t3', description: 'Permanently add 1 Stress slot.', tier: 3, slots: 1, isRepeatable: true },
    { id: 'increase_experience_t3', description: 'Increase two Experiences by +1 each.', tier: 3, slots: 1, isRepeatable: true },
    { id: 'add_domain_card_t3', description: 'Take an additional domain card.', tier: 3, slots: 1, isRepeatable: true },
    { id: 'increase_evasion_t3', description: 'Gain a permanent +1 bonus to your Evasion.', tier: 3, slots: 1, isRepeatable: true },
    { id: 'upgrade_subclass_t3', description: 'Take your subclass\'s Mastery card (if you have Specialization).', tier: 3, slots: 1, isRepeatable: false },
    { id: 'increase_proficiency_t3', description: 'Increase your Proficiency by 1.', tier: 3, slots: 2, isRepeatable: false },
    { id: 'multiclass_t3', description: 'Choose an additional class and gain its class feature.', tier: 3, slots: 2, isRepeatable: false },

    // Tier 4 (Levels 8-10) is similar, adding on top
];