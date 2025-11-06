import React, { useState, useEffect } from 'react';
import { Character } from '../types';
import { ALL_ARMORS, ALL_PRIMARY_WEAPONS, ALL_SECONDARY_WEAPONS } from '../data/equipment';

interface AddEquipmentModalProps {
    character: Character;
    onClose: () => void;
    onUpdateCharacter: (character: Character) => void;
}

const AddEquipmentModal: React.FC<AddEquipmentModalProps> = ({ character, onClose, onUpdateCharacter }) => {
    const [selectedArmor, setSelectedArmor] = useState(character.activeArmor?.name || '');
    const [selectedPrimary, setSelectedPrimary] = useState(character.primaryWeapon?.name || '');
    const [selectedSecondary, setSelectedSecondary] = useState(character.secondaryWeapon?.name || '');

    const primaryWeapon = ALL_PRIMARY_WEAPONS.find(w => w.name === selectedPrimary);
    const isPrimaryTwoHanded = primaryWeapon?.burden === 'Two-Handed';

    useEffect(() => {
        if (isPrimaryTwoHanded) {
            setSelectedSecondary('');
        }
    }, [selectedPrimary, isPrimaryTwoHanded]);

    const handleConfirm = () => {
        const newArmor = ALL_ARMORS.find(a => a.name === selectedArmor) || undefined;
        const newPrimary = ALL_PRIMARY_WEAPONS.find(w => w.name === selectedPrimary) || undefined;
        const newSecondary = isPrimaryTwoHanded ? undefined : ALL_SECONDARY_WEAPONS.find(w => w.name === selectedSecondary) || undefined;

        let armorStat = character.armor;
        if (newArmor && newArmor.baseScore !== character.activeArmor?.baseScore) {
            armorStat = { max: newArmor.baseScore, current: newArmor.baseScore };
        } else if (!newArmor && character.activeArmor) {
            armorStat = { max: 0, current: 0 };
        }

        const updatedCharacter: Character = {
            ...character,
            activeArmor: newArmor,
            primaryWeapon: newPrimary,
            secondaryWeapon: newSecondary,
            armor: armorStat,
        };
        onUpdateCharacter(updatedCharacter);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className="bg-slate-800 rounded-lg shadow-xl p-6 border border-slate-700 w-full max-w-lg">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold text-slate-100">Change Equipment</h2>
                    <button onClick={onClose} className="text-slate-400 hover:text-white text-3xl leading-none">&times;</button>
                </div>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-bold mb-1 text-slate-400">Armor</label>
                        <select value={selectedArmor} onChange={e => setSelectedArmor(e.target.value)} className="w-full bg-slate-700 border border-slate-600 rounded-md py-2 px-3 text-slate-200">
                             <option value="">None</option>
                             {ALL_ARMORS.map(a => <option key={a.name} value={a.name}>{a.name} (T{a.tier})</option>)}
                         </select>
                    </div>
                     <div>
                        <label className="block text-sm font-bold mb-1 text-slate-400">Primary Weapon</label>
                        <select value={selectedPrimary} onChange={e => setSelectedPrimary(e.target.value)} className="w-full bg-slate-700 border border-slate-600 rounded-md py-2 px-3 text-slate-200">
                             <option value="">None</option>
                             {ALL_PRIMARY_WEAPONS.map(w => <option key={w.name} value={w.name}>{w.name} (T{w.tier})</option>)}
                         </select>
                    </div>
                     <div>
                        <label className="block text-sm font-bold mb-1 text-slate-400">Secondary Weapon</label>
                        <select value={selectedSecondary} onChange={e => setSelectedSecondary(e.target.value)} className="w-full bg-slate-700 border border-slate-600 rounded-md py-2 px-3 text-slate-200" disabled={isPrimaryTwoHanded}>
                             <option value="">None</option>
                             {ALL_SECONDARY_WEAPONS.map(w => <option key={w.name} value={w.name}>{w.name} (T{w.tier})</option>)}
                         </select>
                         {isPrimaryTwoHanded && <p className="text-xs text-slate-400 mt-1">Primary weapon is Two-Handed.</p>}
                    </div>
                </div>
                 <div className="flex justify-center gap-4 pt-6">
                     <button onClick={onClose} className="bg-slate-600 hover:bg-slate-500 text-white font-bold py-2 px-6 rounded-lg">
                        Cancel
                     </button>
                     <button onClick={handleConfirm} className="bg-green-600 hover:bg-green-500 text-white font-bold py-2 px-6 rounded-lg">
                        Confirm Changes
                     </button>
                </div>
            </div>
        </div>
    );
};

export default AddEquipmentModal;