import React from 'react';
import { Character } from '../types';
import Card from './Card';

interface CharacterSelectionProps {
  characters: Character[];
  onSelectCharacter: (id: string) => void;
  onCreateCharacter: () => void;
  onDeleteCharacter: (id: string) => void;
}

const CharacterSelection: React.FC<CharacterSelectionProps> = ({
  characters,
  onSelectCharacter,
  onCreateCharacter,
  onDeleteCharacter
}) => {
    
  const handleDelete = (e: React.MouseEvent, id: string) => {
      e.stopPropagation(); // Prevent selection when deleting
      onDeleteCharacter(id);
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Card title="Your Characters">
        {characters.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {characters.map(char => (
              <div
                key={char.id}
                onClick={() => onSelectCharacter(char.id)}
                className="bg-slate-700 rounded-lg p-4 cursor-pointer hover:bg-slate-600 hover:ring-2 hover:ring-teal-500 transition-all group"
              >
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className="text-xl font-bold text-slate-100">{char.name}</h3>
                        <p className="text-sm text-slate-400">Level {char.level} {char.class}</p>
                        <p className="text-xs text-slate-500">{char.ancestry} {char.subclass}</p>
                    </div>
                    <button 
                        onClick={(e) => handleDelete(e, char.id)}
                        className="text-slate-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity text-xl"
                        title="Delete Character"
                    >
                       &times;
                    </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-slate-400 py-8">
            You don't have any characters yet. Time to create one!
          </p>
        )}
        <div className="mt-8 text-center">
          <button
            onClick={onCreateCharacter}
            className="bg-teal-600 hover:bg-teal-500 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition duration-300 transform hover:scale-105"
          >
            Create New Character
          </button>
        </div>
      </Card>
    </div>
  );
};

export default CharacterSelection;
