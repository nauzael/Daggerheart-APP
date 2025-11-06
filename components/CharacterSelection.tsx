import React from 'react';
import { Character } from '../types';
import Card from './Card';

interface CharacterSelectionProps {
    characters: Character[];
    onSelectCharacter: (id: string) => void;
    onDeleteCharacter: (id: string) => void;
    onCreateNew: () => void;
}

const CharacterSelection: React.FC<CharacterSelectionProps> = ({ characters, onSelectCharacter, onDeleteCharacter, onCreateNew }) => {
    return (
        <Card title="Selección de Personaje">
            {characters.length > 0 ? (
                <div className="space-y-4">
                    {characters.map(char => (
                        <div key={char.id} className="bg-slate-700/50 p-4 rounded-lg flex justify-between items-center">
                            <div>
                                <h3 className="text-xl font-bold text-slate-100">{char.name}</h3>
                                <p className="text-slate-400">{char.class} - Nivel {char.level}</p>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => onSelectCharacter(char.id)}
                                    className="bg-teal-600 hover:bg-teal-500 text-white font-bold py-2 px-4 rounded-md"
                                >
                                    Seleccionar
                                </button>
                                <button
                                    onClick={() => {
                                        if (confirm(`¿Estás seguro de que quieres eliminar a ${char.name}?`)) {
                                            onDeleteCharacter(char.id);
                                        }
                                    }}
                                    className="bg-red-700 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-md"
                                >
                                    Eliminar
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-slate-400 text-center">No has creado ningún personaje todavía.</p>
            )}
            <div className="mt-8 text-center">
                <button
                    onClick={onCreateNew}
                    className="bg-sky-600 hover:bg-sky-500 text-white font-bold py-3 px-6 rounded-lg text-lg"
                >
                    + Crear Nuevo Personaje
                </button>
            </div>
        </Card>
    );
};

export default CharacterSelection;