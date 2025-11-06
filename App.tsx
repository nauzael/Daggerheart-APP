import React, { useState, useEffect } from 'react';
import { Character } from './types';
import CharacterCreator from './components/CharacterCreator';
import CharacterSheet from './components/CharacterSheet';
import CharacterSelection from './components/CharacterSelection';
import { DaggerheartLogo } from './components/DaggerheartLogo';

const App: React.FC = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [selectedCharacterId, setSelectedCharacterId] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const savedCharacters = localStorage.getItem('daggerheart-characters');
      if (savedCharacters) {
        setCharacters(JSON.parse(savedCharacters));
      }
    } catch (error) {
      console.error("Failed to load characters from localStorage", error);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      try {
        localStorage.setItem('daggerheart-characters', JSON.stringify(characters));
      } catch (error) {
        console.error("Failed to save characters to localStorage", error);
      }
    }
  }, [characters, isLoading]);

  const handleCharacterCreate = (character: Character) => {
    setCharacters(prev => [...prev, character]);
    setSelectedCharacterId(character.id);
    setIsCreating(false);
  };

  const handleCharacterUpdate = (updatedCharacter: Character) => {
    setCharacters(prev => prev.map(c => c.id === updatedCharacter.id ? updatedCharacter : c));
  };
  
  const handleCharacterDelete = (id: string) => {
      if (window.confirm('Are you sure you want to delete this character? This cannot be undone.')) {
        setCharacters(prev => prev.filter(c => c.id !== id));
        if (selectedCharacterId === id) {
            setSelectedCharacterId(null);
        }
      }
  };

  const selectedCharacter = characters.find(c => c.id === selectedCharacterId);

  const renderContent = () => {
    if (isLoading) {
      return <div className="text-center text-slate-400">Loading Characters...</div>;
    }

    if (selectedCharacter) {
      return (
        <CharacterSheet
          character={selectedCharacter}
          onCharacterUpdate={handleCharacterUpdate}
          onBack={() => setSelectedCharacterId(null)}
        />
      );
    }

    if (isCreating) {
      return (
        <CharacterCreator
          onCharacterCreate={handleCharacterCreate}
          onCancel={() => setIsCreating(false)}
        />
      );
    }

    return (
      <CharacterSelection
        characters={characters}
        onSelectCharacter={setSelectedCharacterId}
        onCreateCharacter={() => setIsCreating(true)}
        onDeleteCharacter={handleCharacterDelete}
      />
    );
  };

  return (
    <div className="bg-slate-900 text-slate-300 min-h-screen font-sans">
      <header className="bg-slate-800 p-4 border-b-2 border-slate-700 shadow-lg">
          <div className="container mx-auto flex justify-between items-center">
              <div className="flex items-center gap-3">
                  <DaggerheartLogo />
                  <h1 className="text-3xl font-bold text-slate-100">Daggerheart Character Manager</h1>
              </div>
          </div>
      </header>
      <main className="container mx-auto p-4 md:p-8">
        {renderContent()}
      </main>
      <footer className="text-center p-4 text-xs text-slate-500 border-t border-slate-800 mt-8">
        <p>This is an unofficial fan-made tool for the Daggerheart TTRPG by Darrington Press. Not affiliated with or endorsed by Darrington Press.</p>
      </footer>
    </div>
  );
};

export default App;
