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
    { id: 'increase_traits_t2', description: 'Aumenta dos rasgos de personaje no marcados en +1 cada uno.', tier: 2, slots: 1, isRepeatable: true },
    { id: 'add_hp_t2', description: 'Añade permanentemente 1 ranura de Punto de Vida.', tier: 2, slots: 1, isRepeatable: true },
    { id: 'add_stress_t2', description: 'Añade permanentemente 1 ranura de Estrés.', tier: 2, slots: 1, isRepeatable: true },
    { id: 'increase_experience_t2', description: 'Aumenta dos Experiencias en +1 cada una.', tier: 2, slots: 1, isRepeatable: true },
    { id: 'add_domain_card_t2', description: 'Toma una carta de dominio adicional.', tier: 2, slots: 1, isRepeatable: true },
    { id: 'increase_evasion_t2', description: 'Gana un bono permanente de +1 a tu Evasión.', tier: 2, slots: 1, isRepeatable: true },
    { id: 'upgrade_subclass_t2', description: 'Toma la carta de Especialización de tu subclase.', tier: 2, slots: 1, isRepeatable: false },

    // Tier 3 (Levels 5-7)
    { id: 'increase_traits_t3', description: 'Aumenta dos rasgos de personaje no marcados en +1 cada uno.', tier: 3, slots: 1, isRepeatable: true },
    { id: 'add_hp_t3', description: 'Añade permanentemente 1 ranura de Punto de Vida.', tier: 3, slots: 1, isRepeatable: true },
    { id: 'add_stress_t3', description: 'Añade permanentemente 1 ranura de Estrés.', tier: 3, slots: 1, isRepeatable: true },
    { id: 'increase_experience_t3', description: 'Aumenta dos Experiencias en +1 cada una.', tier: 3, slots: 1, isRepeatable: true },
    { id: 'add_domain_card_t3', description: 'Toma una carta de dominio adicional.', tier: 3, slots: 1, isRepeatable: true },
    { id: 'increase_evasion_t3', description: 'Gana un bono permanente de +1 a tu Evasión.', tier: 3, slots: 1, isRepeatable: true },
    { id: 'upgrade_subclass_t3', description: 'Toma la carta de Maestría de tu subclase (si tienes Especialización).', tier: 3, slots: 1, isRepeatable: false },
    { id: 'increase_proficiency_t3', description: 'Aumenta tu Soltura en 1.', tier: 3, slots: 2, isRepeatable: false },
    { id: 'multiclass_t3', description: 'Elige una clase adicional y gana su característica de clase.', tier: 3, slots: 2, isRepeatable: false },

    // Tier 4 (Levels 8-10) is similar, adding on top
];