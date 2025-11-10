export interface LongRestDowntimeMove {
    id: 'tend_all_wounds' | 'clear_all_stress' | 'repair_all_armor' | 'prepare' | 'work_on_project' | 'tithe_to_patron';
    name: string;
    description: string;
}

export const LONG_REST_DOWNTIME_MOVES: LongRestDowntimeMove[] = [
    {
        id: 'tend_all_wounds',
        name: 'Tend to All Wounds',
        description: 'Clear all of your marked Hit Points.',
    },
    {
        id: 'clear_all_stress',
        name: 'Clear All Stress',
        description: 'Clear all of your marked Stress.',
    },
    {
        id: 'repair_all_armor',
        name: 'Repair All Armor',
        description: 'Clear all of your marked Armor Slots.',
    },
    {
        id: 'prepare',
        name: 'Prepare',
        description: 'Gain 1 Hope. (If you prepare with your party, you each gain 2 instead).',
    },
    {
        id: 'work_on_project',
        name: 'Work on a Project',
        description: 'Advance a long-term project. Describe your progress to the GM.',
    },
    {
        id: 'tithe_to_patron',
        name: 'Tithe to Patron (Warlock)',
        description: 'Pay one of your downtime actions as a tithe to your patron to gain 1d4 Favor.',
    }
];
