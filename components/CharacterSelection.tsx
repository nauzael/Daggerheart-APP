import React, { useRef, useState } from 'react';
import { Character, TraitName } from '../types';
import Card from './Card';

// -- START: Inline components for Dashboard View --
interface CharacterSummaryCardProps {
    character: Character;
    onSelect: (id: string) => void;
}

const SummaryStat: React.FC<{ label: string; value: number; max?: number; colorClass?: string }> = ({ label, value, max, colorClass = 'text-teal-300' }) => (
    <div className="bg-slate-700 p-2 rounded-lg text-center">
        <p className="text-xs text-slate-400 capitalize">{label}</p>
        <p className={`text-xl font-bold ${colorClass}`}>
            {value}{max !== undefined ? <span className="text-sm text-slate-400">/{max}</span> : ''}
        </p>
    </div>
);

const CharacterSummaryCard: React.FC<CharacterSummaryCardProps> = ({ character, onSelect }) => {
    const TRAITS: TraitName[] = ['strength', 'agility', 'finesse', 'instinct', 'knowledge', 'presence'];

    return (
        <div 
            className="bg-slate-800/90 border border-slate-700 rounded-lg shadow-lg p-4 cursor-pointer hover:border-teal-500 hover:bg-slate-700/50 transition-all transform hover:-translate-y-1"
            onClick={() => onSelect(character.id)}
            role="button"
            aria-label={`Select character ${character.name}`}
        >
            <div className="text-center border-b border-slate-700 pb-2 mb-3">
                <h3 className="text-xl font-bold text-teal-400 truncate">{character.name}</h3>
                <p className="text-sm text-slate-400">{character.ancestry} {character.class} | Level {character.level}</p>
            </div>

            <div className="grid grid-cols-4 gap-2 mb-3">
                <SummaryStat label="HP" value={character.hp.current} max={character.hp.max} colorClass="text-red-400" />
                <SummaryStat label="Stress" value={character.stress.current} max={character.stress.max} colorClass="text-purple-400" />
                <SummaryStat label="Armor" value={character.armor.current} max={character.armor.max} colorClass="text-sky-400" />
                <SummaryStat label="Hope" value={character.hope} max={6} colorClass="text-yellow-400" />
            </div>

            <div className="grid grid-cols-3 gap-2">
                {TRAITS.map(trait => (
                    <SummaryStat key={trait} label={trait.substring(0, 3)} value={character.traits[trait]} />
                ))}
            </div>
        </div>
    );
};
// -- END: Inline components for Dashboard View --


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
    const [isDashboardView, setIsDashboardView] = useState(false);

    const handleImportClick = () => {
        fileInputRef.current?.click();
    };
    
    const cardHeaderContent = (
        characters.length > 0 ? (
            <button
                onClick={() => setIsDashboardView(!isDashboardView)}
                className="bg-slate-600 hover:bg-slate-500 text-white font-bold py-1 px-3 rounded-md text-sm"
                aria-label={isDashboardView ? "Switch to list view" : "Switch to dashboard view"}
            >
                {isDashboardView ? 'List View' : 'Dashboard View'}
            </button>
        ) : null
    );

    return (
        <Card title="Character Roster" headerContent={cardHeaderContent} className="max-w-5xl mx-auto">
            {characters.length > 0 ? (
                isDashboardView ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate-fade-in">
                        {characters.map(char => (
                            <CharacterSummaryCard
                                key={char.id}
                                character={char}
                                onSelect={onSelectCharacter}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="space-y-4 animate-fade-in max-w-3xl mx-auto">
                        {characters.map(char => (
                            <div key={char.id} className="bg-slate-700/50 p-4 rounded-lg flex justify-between items-center">
                                <div>
                                    <h3 className="text-xl font-bold text-slate-100">{char.name}</h3>
                                    <p className="text-slate-400">{char.ancestry} {char.class} - Level {char.level}</p>
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
                )
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