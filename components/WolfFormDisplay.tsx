import React from 'react';
import { Character } from '../types';
import Card from './Card';
import { WOLF_FORM_DATA } from '../data/wolfForm';

interface WolfFormDisplayProps {
    character: Character;
    onUpdateCharacter: (character: Character) => void;
}

const WolfFormDisplay: React.FC<WolfFormDisplayProps> = ({ character, onUpdateCharacter }) => {
    
    const handleTransform = () => {
        onUpdateCharacter({ ...character, isWolfFormActive: true });
    };

    const handleRevert = () => {
        onUpdateCharacter({ ...character, isWolfFormActive: false });
    };

    const characterTier = character.level >= 8 ? 4 : character.level >= 5 ? 3 : character.level >= 2 ? 2 : 1;

    return (
        <Card title="Werewolf Transformation">
            {character.isWolfFormActive ? (
                <div className="space-y-4">
                    <div className="space-y-3">
                        <div>
                            <h4 className="font-bold text-lg text-slate-100">{WOLF_FORM_DATA.name}</h4>
                            <p className="text-sm text-slate-300 italic">{WOLF_FORM_DATA.description}</p>
                        </div>

                        <div className="bg-slate-700 p-3 rounded-lg border border-slate-600">
                            <h5 className="font-semibold text-slate-200">Unarmed Strike</h5>
                            <p className="text-sm text-slate-400 font-mono truncate">
                                Trait: {WOLF_FORM_DATA.unarmedStrike.trait} | Range: {WOLF_FORM_DATA.unarmedStrike.range} | Damage: {WOLF_FORM_DATA.unarmedStrike.damage}
                            </p>
                            {WOLF_FORM_DATA.unarmedStrike.feature && <p className="text-xs text-slate-400 mt-1 italic">{WOLF_FORM_DATA.unarmedStrike.feature}</p>}
                        </div>
                        
                        <div>
                            <h5 className="font-semibold text-slate-200">Bonus Die</h5>
                            <p className="text-sm text-slate-300">Your bonus die is currently <span className="font-bold text-teal-300 font-mono">{WOLF_FORM_DATA.bonusDie(characterTier)}</span>.</p>
                            <p className="text-sm text-slate-400 italic">{WOLF_FORM_DATA.controlTheBeast}</p>
                        </div>
                        
                        <div>
                            <h5 className="font-semibold text-slate-200">Advantages</h5>
                            <ul className="list-disc list-inside space-y-1 text-sm text-slate-300">
                                {WOLF_FORM_DATA.advantages.map((adv, i) => <li key={i}>{adv}</li>)}
                            </ul>
                        </div>

                        <div>
                            <h5 className="font-semibold text-slate-200">Frenzy</h5>
                            <p className="text-sm text-slate-300">{WOLF_FORM_DATA.frenzy}</p>
                        </div>
                    </div>
                    <button onClick={handleRevert} className="w-full bg-red-600 hover:bg-red-500 text-white font-bold py-2 px-4 rounded-lg">
                        Revert Form
                    </button>
                </div>
            ) : (
                <div className="space-y-3">
                    <p className="text-slate-400 text-sm text-center">You are in your normal form.</p>
                    <button 
                        onClick={handleTransform} 
                        className="w-full bg-green-600 hover:bg-green-500 text-white font-bold py-2 px-4 rounded-lg"
                    >
                        Transform
                    </button>
                </div>
            )}
        </Card>
    );
};

export default WolfFormDisplay;
