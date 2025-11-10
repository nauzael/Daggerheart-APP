import React, { useState, useMemo, useEffect } from 'react';
import { Armor, Weapon } from '../types';
import { Class } from '../data/classes';
import { ARMORS, PRIMARY_WEAPONS, SECONDARY_WEAPONS } from '../data/equipment';

interface EquipmentSelectorModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (selections: { armor?: Armor, primary?: Weapon, secondary?: Weapon }) => void;
    selectedClass: Class;
    initialSelections: {
        armor?: Armor;
        primary?: Weapon;
        secondary?: Weapon;
    };
}

const EquipmentDetailCard: React.FC<{ item: Weapon | Armor | undefined }> = ({ item }) => {
    if (!item) {
        return (
            <div className="p-3 bg-slate-700/50 rounded-lg border border-slate-700 flex items-center justify-center min-h-[96px]">
                <p className="text-slate-400">Select an item to see details.</p>
            </div>
        );
    }

    const isWeapon = 'damage' in item;

    return (
        <div className="p-3 bg-slate-700/50 rounded-lg border border-slate-700 space-y-1">
            <h4 className="font-bold text-lg text-teal-300">{item.name}</h4>
            <div className="text-sm text-slate-300 grid grid-cols-2 gap-x-4 gap-y-1">
                {isWeapon ? (
                    <>
                        <span className="font-semibold text-slate-400">Trait:</span> <span className="font-mono">{(item as Weapon).trait}</span>
                        <span className="font-semibold text-slate-400">Range:</span> <span className="font-mono">{(item as Weapon).range}</span>
                        <span className="font-semibold text-slate-400">Damage:</span> <span className="font-mono">{(item as Weapon).damage}</span>
                        <span className="font-semibold text-slate-400">Burden:</span> <span className="font-mono">{(item as Weapon).burden}</span>
                    </>
                ) : (
                    <>
                        <span className="font-semibold text-slate-400">Score:</span> <span className="font-mono">{(item as Armor).baseScore}</span>
                        <span className="font-semibold text-slate-400">Thresholds:</span> <span className="font-mono">{(item as Armor).baseThresholds}</span>
                    </>
                )}
                <span className="font-semibold text-slate-400">Tier:</span> <span className="font-mono">{item.tier}</span>
            </div>
            {item.feature && <p className="text-xs text-slate-400 mt-1 pt-1 border-t border-slate-600 italic">{item.feature}</p>}
        </div>
    );
};


const EquipmentSelectorModal: React.FC<EquipmentSelectorModalProps> = ({ isOpen, onClose, onConfirm, selectedClass, initialSelections }) => {
    const [selectedArmorName, setSelectedArmorName] = useState(initialSelections.armor?.name || '');
    const [selectedPrimaryName, setSelectedPrimaryName] = useState(initialSelections.primary?.name || '');
    const [selectedSecondaryName, setSelectedSecondaryName] = useState(initialSelections.secondary?.name || '');

    const selectedPrimaryWeapon = useMemo(() => PRIMARY_WEAPONS.find(w => w.name === selectedPrimaryName), [selectedPrimaryName]);
    const isPrimaryTwoHanded = selectedPrimaryWeapon?.burden === 'Two-Handed';

    useEffect(() => {
        if (isPrimaryTwoHanded) {
            setSelectedSecondaryName('');
        }
    }, [selectedPrimaryName, isPrimaryTwoHanded]);

    const selectedArmor = useMemo(() => ARMORS.find(a => a.name === selectedArmorName), [selectedArmorName]);
    const selectedSecondaryWeapon = useMemo(() => SECONDARY_WEAPONS.find(w => w.name === selectedSecondaryName), [selectedSecondaryName]);


    const handleConfirmClick = () => {
        onConfirm({
            armor: selectedArmor,
            primary: selectedPrimaryWeapon,
            secondary: selectedSecondaryWeapon,
        });
    };

    const handleApplySuggested = () => {
        if (selectedClass.suggestedEquipment) {
            setSelectedArmorName(selectedClass.suggestedEquipment.armor || '');
            setSelectedPrimaryName(selectedClass.suggestedEquipment.primary || '');
            setSelectedSecondaryName(selectedClass.suggestedEquipment.secondary || '');
        }
    };
    
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4" aria-modal="true" role="dialog">
            <div className="bg-slate-800 rounded-lg shadow-xl p-4 sm:p-6 border border-slate-700 w-full max-w-4xl max-h-[90vh] flex flex-col">
                <div className="flex justify-between items-center mb-4 pb-4 border-b border-slate-600 flex-shrink-0">
                    <h2 className="text-3xl font-bold text-teal-400">Select Equipment & Stats</h2>
                    <div className="flex items-center gap-4">
                        <button
                            type="button"
                            onClick={handleApplySuggested}
                            className="bg-sky-600 hover:bg-sky-500 text-white font-bold py-2 px-4 rounded-lg text-sm"
                        >
                            Apply Suggested Equipment
                        </button>
                        <button onClick={onClose} className="text-slate-400 hover:text-white text-3xl leading-none" aria-label="Close">&times;</button>
                    </div>
                </div>

                <div className="overflow-y-auto space-y-6 pr-2">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-center">
                         <div><span className="text-slate-400">HP:</span> <span className="font-bold text-slate-100 text-lg">{selectedClass.startingHP}</span></div>
                         <div><span className="text-slate-400">Evasion:</span> <span className="font-bold text-slate-100 text-lg">{selectedClass.startingEvasion}</span></div>
                         <div><span className="text-slate-400">Stress:</span> <span className="font-bold text-slate-100 text-lg">6</span></div>
                         <div><span className="text-slate-400">Hope:</span> <span className="font-bold text-slate-100 text-lg">2</span></div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold mb-1 text-slate-400">Armor</label>
                                <select value={selectedArmorName} onChange={e => setSelectedArmorName(e.target.value)} className="w-full bg-slate-700 border border-slate-600 rounded-md py-2 px-3 text-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500">
                                    <option value="">Select Armor</option>
                                    {ARMORS.map(a => <option key={a.name} value={a.name}>{a.name}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-bold mb-1 text-slate-400">Primary Weapon</label>
                                <select value={selectedPrimaryName} onChange={e => setSelectedPrimaryName(e.target.value)} className="w-full bg-slate-700 border border-slate-600 rounded-md py-2 px-3 text-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500">
                                    <option value="">Select Primary Weapon</option>
                                    {PRIMARY_WEAPONS.map(w => <option key={w.name} value={w.name}>{w.name}</option>)}
                                </select>
                            </div>
                             <div>
                                <label className="block text-sm font-bold mb-1 text-slate-400">Secondary Weapon</label>
                                <select value={selectedSecondaryName} onChange={e => setSelectedSecondaryName(e.target.value)} className="w-full bg-slate-700 border border-slate-600 rounded-md py-2 px-3 text-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500" disabled={isPrimaryTwoHanded}>
                                    <option value="">Select Secondary Weapon</option>
                                    {SECONDARY_WEAPONS.map(w => <option key={w.name} value={w.name}>{w.name}</option>)}
                                </select>
                                {isPrimaryTwoHanded && <p className="text-xs text-slate-400 mt-1">Primary weapon is Two-Handed.</p>}
                            </div>
                        </div>
                        <div className="space-y-4">
                            <EquipmentDetailCard item={selectedArmor} />
                            <EquipmentDetailCard item={selectedPrimaryWeapon} />
                            <EquipmentDetailCard item={selectedSecondaryWeapon} />
                        </div>
                    </div>
                </div>

                <div className="flex justify-center gap-4 pt-6 mt-auto flex-shrink-0">
                    <button onClick={onClose} className="bg-slate-600 hover:bg-slate-500 text-white font-bold py-3 px-8 rounded-lg">
                       Cancel
                    </button>
                    <button onClick={handleConfirmClick} className="bg-green-600 hover:bg-green-500 text-white font-bold py-3 px-8 rounded-lg">
                       Confirm Selection
                    </button>
               </div>
            </div>
        </div>
    );
};

export default EquipmentSelectorModal;