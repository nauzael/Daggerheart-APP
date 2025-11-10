import React, { useRef } from 'react';
import { Character } from '../types';
import Card from './Card';

interface CharacterSelectionProps {
    characters: Character[];
    onSelectCharacter: (id: string) => void;
    onDeleteCharacter: (id: string) => void;
    onCreateNew: () => void;
    onImport: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onExport: () => void;
}

const CharacterSelection: React.FC<CharacterSelectionProps> = ({ characters, onSelectCharacter, onDeleteCharacter, onCreateNew, onImport, onExport }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImportClick = () => {
        fileInputRef.current?.click();
    };
    
    return (
        <Card title="Character Roster" className="max-w-3xl mx-auto">
            {characters.length > 0 ? (
                <div className="space-y-4">
                    {characters.map(char => (
                        <div key={char.id} className="bg-slate-700/50 p-4 rounded-lg flex justify-between items-center">
                            <div>
                                <h3 className="text-xl font-bold text-slate-100">{char.name}</h3>
                                <p className="text-slate-400">{char.class} - Level {char.level}</p>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => onSelectCharacter(char.id)}
                                    className="bg-teal-600 hover:bg-teal-500 text-white font-bold py-2 px-4 rounded-md"
                                >
                                    Select
                                </button>
                                <button
                                    onClick={() => {
                                        if (confirm(`Are you sure you want to delete ${char.name}?`)) {
                                            onDeleteCharacter(char.id);
                                        }
                                    }}
                                    className="bg-red-700 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-md"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-slate-400 text-center">You haven't created any characters yet.</p>
            )}
            <div className="mt-8 max-w-md mx-auto space-y-4">
                <button
                    onClick={onCreateNew}
                    className="bg-sky-600 hover:bg-sky-500 text-white font-bold py-3 px-6 rounded-lg text-lg w-full"
                >
                    + Create New Character
                </button>
                <div className="grid grid-cols-2 gap-4">
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={onImport}
                        className="hidden"
                        accept=".json"
                    />
                    <button
                        onClick={handleImportClick}
                        className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 px-6 rounded-lg text-lg w-full"
                    >
                        Import
                    </button>
                    <button
                        onClick={onExport}
                        disabled={characters.length === 0}
                        className="bg-purple-600 hover:bg-purple-500 text-white font-bold py-3 px-6 rounded-lg text-lg w-full disabled:bg-slate-600 disabled:cursor-not-allowed"
                    >
                        Export
                    </button>
                </div>
            </div>
        </Card>
    );
};

export default CharacterSelection;