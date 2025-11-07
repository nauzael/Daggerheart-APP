import React, { useState, useMemo, useEffect } from 'react';
import { Character, Armor, Weapon } from '../types';
import { ALL_ARMORS, ALL_PRIMARY_WEAPONS, ALL_SECONDARY_WEAPONS } from '../data/equipment';

interface AddEquipmentModalProps {
    character: Character;
    onClose: () => void;
    onUpdateCharacter: (character: Character) => void;
}

const EquipmentDetailCard: React.FC<{ item: Weapon | Armor | undefined }> = ({ item }) => {
    if (!item) {
        return (
            <div className="p-2 bg-slate-700/50 rounded-lg border border-slate-700 flex items-center justify-center min-h-[80px]">
                <p className="text-slate-400 text-sm">Selecciona un objeto para ver sus detalles.</p>
            </div>
        );
    }

    const isWeapon = 'damage' in item;

    return (
        <div className="p-2 bg-slate-700/50 rounded-lg border border-slate-700 space-y-0.5">
            <h4 className="font-bold text-md text-teal-300">{item.name}</h4>
            <div className="text-xs text-slate-300 grid grid-cols-2 gap-x-2 gap-y-0.5">
                {isWeapon ? (
                    <>
                        <span className="font-semibold text-slate-400">Rasgo:</span> <span className="font-mono">{(item as Weapon).trait}</span>
                        <span className="font-semibold text-slate-400">Rango:</span> <span className="font-mono">{(item as Weapon).range}</span>
                        <span className="font-semibold text-slate-400">Daño:</span> <span className="font-mono">{(item as Weapon).damage}</span>
                        <span className="font-semibold text-slate-400">Carga:</span> <span className="font-mono">{(item as Weapon).burden}</span>
                    </>
                ) : (
                    <>
                        <span className="font-semibold text-slate-400">Puntuación:</span> <span className="font-mono">{(item as Armor).baseScore}</span>
                        <span className="font-semibold text-slate-400">Umbrales:</span> <span className="font-mono">{(item as Armor).baseThresholds}</span>
                    </>
                )}
                <span className="font-semibold text-slate-400">Tier:</span> <span className="font-mono">{item.tier}</span>
            </div>
            {item.feature && <p className="text-xs text-slate-400 mt-1 pt-1 border-t border-slate-600 italic">{item.feature}</p>}
        </div>
    );
};

const AddEquipmentModal: React.FC<AddEquipmentModalProps> = ({ character, onClose, onUpdateCharacter }) => {
    const [selectedArmorName, setSelectedArmorName] = useState(character.activeArmor?.name || '');
    const [selectedPrimaryName, setSelectedPrimaryName] = useState(character.primaryWeapon?.name || '');
    const [selectedSecondaryName, setSelectedSecondaryName] = useState(character.secondaryWeapon?.name || '');

    const selectedArmor = useMemo(() => ALL_ARMORS.find(a => a.name === selectedArmorName), [selectedArmorName]);
    const selectedPrimary = useMemo(() => ALL_PRIMARY_WEAPONS.find(w => w.name === selectedPrimaryName), [selectedPrimaryName]);
    const selectedSecondary = useMemo(() => ALL_SECONDARY_WEAPONS.find(w => w.name === selectedSecondaryName), [selectedSecondaryName]);
    
    const isPrimaryTwoHanded = selectedPrimary?.burden === 'Two-Handed';

    useEffect(() => {
        if (isPrimaryTwoHanded) {
            setSelectedSecondaryName('');
        }
    }, [selectedPrimaryName, isPrimaryTwoHanded]);

    const handleConfirm = () => {
        const newArmor = selectedArmor || undefined;
        const newPrimary = selectedPrimary || undefined;
        const newSecondary = isPrimaryTwoHanded ? undefined : selectedSecondary || undefined;

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
            <div className="bg-slate-800 rounded-lg shadow-xl p-6 border border-slate-700 w-full max-w-4xl max-h-[90vh] flex flex-col">
                <div className="flex justify-between items-center mb-4 pb-4 border-b border-slate-600 flex-shrink-0">
                    <h2 className="text-2xl font-bold text-teal-400">Cambiar Equipo</h2>
                    <button onClick={onClose} className="text-slate-400 hover:text-white text-3xl leading-none">&times;</button>
                </div>
                
                <div className="overflow-y-auto pr-2 space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold mb-1 text-slate-400">Armadura</label>
                                <select value={selectedArmorName} onChange={e => setSelectedArmorName(e.target.value)} className="w-full bg-slate-700 border border-slate-600 rounded-md py-2 px-3 text-slate-200">
                                     <option value="">Ninguna</option>
                                     {ALL_ARMORS.sort((a, b) => a.tier - b.tier || a.name.localeCompare(b.name)).map(a => <option key={a.name} value={a.name}>{a.name} (T{a.tier})</option>)}
                                 </select>
                            </div>
                             <div>
                                <label className="block text-sm font-bold mb-1 text-slate-400">Arma Primaria</label>
                                <select value={selectedPrimaryName} onChange={e => setSelectedPrimaryName(e.target.value)} className="w-full bg-slate-700 border border-slate-600 rounded-md py-2 px-3 text-slate-200">
                                     <option value="">Ninguna</option>
                                     {ALL_PRIMARY_WEAPONS.sort((a, b) => a.tier - b.tier || a.name.localeCompare(b.name)).map(w => <option key={w.name} value={w.name}>{w.name} (T{w.tier})</option>)}
                                 </select>
                            </div>
                             <div>
                                <label className="block text-sm font-bold mb-1 text-slate-400">Arma Secundaria</label>
                                <select value={selectedSecondaryName} onChange={e => setSelectedSecondaryName(e.target.value)} className="w-full bg-slate-700 border border-slate-600 rounded-md py-2 px-3 text-slate-200" disabled={isPrimaryTwoHanded}>
                                     <option value="">Ninguna</option>
                                     {ALL_SECONDARY_WEAPONS.sort((a, b) => a.tier - b.tier || a.name.localeCompare(b.name)).map(w => <option key={w.name} value={w.name}>{w.name} (T{w.tier})</option>)}
                                 </select>
                                 {isPrimaryTwoHanded && <p className="text-xs text-slate-400 mt-1">El arma primaria es a dos manos.</p>}
                            </div>
                        </div>
                        <div className="space-y-4">
                            <EquipmentDetailCard item={selectedArmor} />
                            <EquipmentDetailCard item={selectedPrimary} />
                            <EquipmentDetailCard item={selectedSecondary} />
                        </div>
                    </div>
                </div>

                 <div className="flex justify-center gap-4 pt-6 mt-auto flex-shrink-0">
                     <button onClick={onClose} className="bg-slate-600 hover:bg-slate-500 text-white font-bold py-2 px-6 rounded-lg">
                        Cancelar
                     </button>
                     <button onClick={handleConfirm} className="bg-green-600 hover:bg-green-500 text-white font-bold py-2 px-6 rounded-lg">
                        Confirmar Cambios
                     </button>
                </div>
            </div>
        </div>
    );
};

export default AddEquipmentModal;