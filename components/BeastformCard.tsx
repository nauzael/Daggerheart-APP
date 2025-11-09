import React from 'react';
import { BeastForm } from '../types';

interface BeastformCardProps {
    form: BeastForm;
    isSelected?: boolean;
    onSelect?: () => void;
}

const BeastformCard: React.FC<BeastformCardProps> = ({ form, isSelected = false, onSelect }) => {
    const baseClasses = "p-4 border rounded-lg transition-all duration-200 flex flex-col h-full";
    const selectedClasses = "bg-teal-800/50 border-teal-500 shadow-lg ring-2 ring-teal-500";
    const unselectedClasses = `bg-slate-700/80 border-slate-600 ${onSelect ? 'cursor-pointer hover:bg-slate-600/80' : ''}`;
    
    const traitBonusString = form.traitBonus ? `${form.traitBonus.trait.charAt(0).toUpperCase() + form.traitBonus.trait.slice(1)} +${form.traitBonus.value}` : 'None';

    return (
        <div className={`${baseClasses} ${isSelected ? selectedClasses : unselectedClasses}`} onClick={onSelect}>
            <div>
                <h4 className="font-bold text-lg text-slate-100">{form.name} <span className="text-xs text-slate-400 font-mono">(Tier {form.tier})</span></h4>
                <p className="text-sm text-slate-300 italic">{form.examples}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-2 text-sm mt-3">
                <div className="bg-slate-800/50 p-2 rounded">
                    <div className="font-bold text-slate-400">Bonuses</div>
                    <p className="font-mono text-slate-100">{traitBonusString} | Evasion +{form.evasionBonus}</p>
                </div>
                <div className="bg-slate-800/50 p-2 rounded">
                    <div className="font-bold text-slate-400">Attack</div>
                    <p className="text-sm text-slate-400 font-mono truncate">
                        {form.attack.trait} | {form.attack.range} | {form.attack.damage}
                    </p>
                </div>
            </div>

            <div className="mt-2">
                <h5 className="font-semibold text-slate-200">Advantages</h5>
                <p className="text-sm text-slate-300">Gain advantage on: {form.advantages.join(', ')}.</p>
            </div>

            <div className="mt-2">
                <h5 className="font-semibold text-slate-200">Features</h5>
                <ul className="list-disc list-inside space-y-1 text-sm text-slate-300">
                    {form.features.map(feature => (
                        <li key={feature.name}>
                            <span className="font-semibold">{feature.name}:</span> {feature.description}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default BeastformCard;