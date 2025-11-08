export interface DowntimeMove {
    id: 'tend_wounds' | 'take_breather' | 'repair_armor' | 'rummage_pack';
    name: string;
    description: string;
    cost?: string;
}

export const DOWNTIME_MOVES: DowntimeMove[] = [
    {
        id: 'tend_wounds',
        name: 'Tend to Wounds',
        description: 'Clear 2 Hit Points.',
    },
    {
        id: 'take_breather',
        name: 'Take a Breather',
        description: 'Clear 2 Stress.',
    },
    {
        id: 'repair_armor',
        name: 'Repair Armor',
        description: 'Clear 2 Armor Slots.',
    },
    {
        id: 'rummage_pack',
        name: 'Rummage Through Your Pack',
        description: 'Find a mundane item that would be useful in your current situation.',
        cost: '1 Hope'
    }
];