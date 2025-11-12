

import React, { useState, useEffect } from 'react';
import { Character, BeastForm } from './types';
import CharacterCreator from './components/CharacterCreator';
import CharacterSheet from './components/CharacterSheet';
import CharacterSelection from './components/CharacterSelection';
import { DaggerheartLogo } from './components/DaggerheartLogo';
import { SUBCLASS_FEATURES } from './data/subclassFeatures';
import { ANCESTRIES } from './data/ancestries';
import { ALL_BEASTFORMS } from './data/beastforms';
import { DEFAULT_PROFILE_IMAGE } from './data/defaultProfileImage';


type View = 'selection' | 'creator' | 'sheet';

const App: React.FC = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [view, setView] = useState<View>('selection');
  const [installPrompt, setInstallPrompt] = useState<Event | null>(null);

  const migrateCharacter = (char: any): Character => {
      // Ensure subclassFeatures exists and has foundation if it should.
      if (!char.subclassFeatures || (Array.isArray(char.subclassFeatures) && char.subclassFeatures.length === 0)) {
          const foundationFeature = SUBCLASS_FEATURES.find(f => f.subclass === char.subclass && f.type === 'Foundation');
          char.subclassFeatures = foundationFeature ? [foundationFeature] : [];
      }
      
      // Add default for 'bolsa' if missing
      if (char.bolsa === undefined) {
          char.bolsa = 0;
      }
      
      // Migrate notes from string to string[]
      if (typeof char.notes === 'string' || char.notes === undefined || char.notes === null) {
          char.notes = typeof char.notes === 'string' && char.notes.trim() !== '' ? char.notes.split('\n') : [];
      }

      // Migrate to include ancestryFeatures for older characters
      if (!char.ancestryFeatures) {
          const ancestryData = ANCESTRIES.find(a => a.name === char.ancestry);
          char.ancestryFeatures = ancestryData ? ancestryData.features : [];
      }
      
      // Add vault if it's missing
      if (char.vault === undefined) {
          char.vault = [];
      }

      // Add abilityUsage if it's missing
      if (char.abilityUsage === undefined) {
          char.abilityUsage = {};
      }
      
      // Handle Beastform data structure change
      if (char.class === 'Druid') {
          if (char.beastForms && Array.isArray(char.beastForms) && char.beastForms.length > 0) {
              // If the first beastform has an old property (like hpBonus), it's the old structure.
              // Clear the list to prevent crashes. The user will need to re-select forms on level up.
              if (char.beastForms[0].hpBonus !== undefined) {
                  char.beastForms = [];
                  char.activeBeastFormName = undefined; 
              }
          } else {
             char.beastForms = [];
          }
      }

      if (char.activeBeastFormName === undefined) {
          char.activeBeastFormName = undefined;
      }
      
      if (char.activeBeastformTraitBonus === undefined) {
          char.activeBeastformTraitBonus = undefined;
      }

      if (char.isWolfFormActive === undefined) {
          char.isWolfFormActive = false;
      }
      
      if (char.profileImage === undefined) {
          char.profileImage = DEFAULT_PROFILE_IMAGE;
      }
      
      // Warlock migration
      if (char.class === 'Warlock') {
          if (char.patronName === undefined) {
              char.patronName = '';
          }
          if (char.boons === undefined || !Array.isArray(char.boons) || char.boons.length !== 2) {
              char.boons = [{ name: '', value: 3 }, { name: '', value: 3 }];
          }
          if (char.favor === undefined) {
              char.favor = 2;
          }
      }

      // Brawler (Martial Artist) migration
      if (char.class === 'Brawler' && char.subclass === 'Martial Artist') {
          if (char.martialStances === undefined) {
              char.martialStances = [];
          }
          if (char.activeMartialStance === undefined) {
              char.activeMartialStance = undefined;
          }
          if (char.focus === undefined) {
              char.focus = { current: 0, max: 0 };
          }
      }

      // Seraph migration
      if (char.class === 'Seraph') {
          if (char.prayerDice === undefined) {
              char.prayerDice = { current: 0, max: 0 };
          } else if (Array.isArray(char.prayerDice)) {
              // It's the old array format, either number[] or {value, used}[]
              const usedCount = char.prayerDice.filter((d: any) => d.used === true).length;
              const max = char.prayerDice.length;
              char.prayerDice = { current: max - usedCount, max: max };
          }
      }

      return char as Character;
  };

  useEffect(() => {
    const savedCharactersJSON = localStorage.getItem('daggerheart-characters');
    if (savedCharactersJSON) {
        const parsedCharacters: any[] = JSON.parse(savedCharactersJSON);
        const migratedCharacters = parsedCharacters.map(migrateCharacter);
        setCharacters(migratedCharacters);
    }
}, []);


  useEffect(() => {
    localStorage.setItem('daggerheart-characters', JSON.stringify(characters));
  }, [characters]);

  useEffect(() => {
    const handleInstallPrompt = (e: Event) => {
      e.preventDefault();
      setInstallPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handleInstallPrompt);

    const handleAppInstalled = () => {
      setInstallPrompt(null);
    };
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  useEffect(() => {
    if (view === 'sheet' && selectedCharacter) {
      document.title = `${selectedCharacter.name} - Community Sheet for Daggerheart`;
    } else if (view === 'creator') {
      document.title = 'New Character - Community Sheet for Daggerheart';
    } else {
      document.title = 'Character Roster - Community Sheet for Daggerheart';
    }
  }, [view, selectedCharacter]);

  const handleCharacterCreate = (newCharacter: Character) => {
    setCharacters(prev => [...prev, newCharacter]);
    setSelectedCharacter(newCharacter);
    setView('sheet');
  };

  const handleCharacterUpdate = (updatedCharacter: Character) => {
    setCharacters(prev => prev.map(c => c.id === updatedCharacter.id ? updatedCharacter : c));
    setSelectedCharacter(updatedCharacter);
  };

  const handleCharacterSelect = (characterId: string) => {
    const charToSelect = characters.find(c => c.id === characterId);
    if (charToSelect) {
        setSelectedCharacter(charToSelect);
        setView('sheet');
    }
  };

  const handleCharacterDelete = (characterId: string) => {
    setCharacters(prev => prev.filter(c => c.id !== characterId));
  };
  
  const handleReturnToSelection = () => {
    setSelectedCharacter(null);
    setView('selection');
  }

  const handleShowCreator = () => {
    setView('creator');
  }

  const handleInstallClick = () => {
    if (!installPrompt) return;
    (installPrompt as any).prompt();
    (installPrompt as any).userChoice.then(() => {
        setInstallPrompt(null);
    });
  };

  const handleExportCharacters = () => {
    const dataStr = JSON.stringify(characters, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = 'daggerheart-characters.json';
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const handleImportCharacters = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    if (event.target.files && event.target.files[0]) {
      fileReader.readAsText(event.target.files[0], "UTF-8");
      fileReader.onload = e => {
        if (e.target?.result) {
          try {
            const imported = JSON.parse(e.target.result as string);
            if (Array.isArray(imported)) {
              const validImportedCharacters: Character[] = [];
              const existingIds = new Set(characters.map(c => c.id));
              
              imported.forEach((char: any) => {
                // Basic validation
                if (char.id && char.name && char.class) {
                  let newChar = migrateCharacter({ ...char });
                  // Ensure unique ID
                  if (existingIds.has(newChar.id)) {
                    newChar.id = crypto.randomUUID();
                  }
                  validImportedCharacters.push(newChar);
                  existingIds.add(newChar.id);
                }
              });
              
              setCharacters(prev => [...prev, ...validImportedCharacters]);
              alert(`${validImportedCharacters.length} character(s) imported successfully.`);
            } else {
              alert("Error: JSON file is not a valid character array.");
            }
          } catch (error) {
            console.error("Import error:", error);
            alert("Error reading file. Please ensure it's valid JSON.");
          }
        }
      };
      // Allow re-importing the same file
      event.target.value = '';
    }
  };

  const getHeaderTitle = () => {
    switch(view) {
        case 'creator':
            return 'New Character';
        case 'sheet':
            // The sheet itself has a prominent H1 with the character name, 
            // so keep the main header generic for this view.
            return 'Character Sheet'; 
        case 'selection':
        default:
            return 'Character Roster';
    }
  }

  const renderContent = () => {
    switch(view) {
        case 'creator':
            return <CharacterCreator onCharacterCreate={handleCharacterCreate} onCancel={handleReturnToSelection} />;
        case 'sheet':
            if (selectedCharacter) {
                return <CharacterSheet 
                         character={selectedCharacter} 
                         onUpdateCharacter={handleCharacterUpdate} 
                         onReturnToSelection={handleReturnToSelection}
                       />;
            }
            return null; // Should not happen
        case 'selection':
        default:
            return <CharacterSelection 
                      characters={characters}
                      onSelectCharacter={handleCharacterSelect}
                      // Fix: Corrected typo from handleDeleteCharacter to handleCharacterDelete.
                      onDeleteCharacter={handleCharacterDelete}
                      onCreateNew={handleShowCreator}
                      onImport={handleImportCharacters}
                      onExport={handleExportCharacters}
                   />;
    }
  }

  return (
    <div className="relative min-h-screen bg-slate-900 text-slate-200 font-sans p-2 sm:p-4 md:p-6 lg:p-8 overflow-hidden">
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80rem] h-[50rem] blur-3xl pointer-events-none"
        style={{
            background: 'radial-gradient(ellipse at 50% 40%, rgba(20, 184, 166, 0.15) 0%, transparent 70%)'
        }}
        aria-hidden="true"
      />
      <header className="text-center mb-8">
        {view !== 'sheet' && (
          <>
            <div className="inline-block mx-auto mb-2">
                <DaggerheartLogo />
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-100 tracking-tight">
              {getHeaderTitle()}
            </h1>
          </>
        )}
        {installPrompt && (
          <div className="mt-4">
            <button 
                onClick={handleInstallClick}
                className="bg-teal-600 hover:bg-teal-500 text-white font-bold py-2 px-4 rounded-lg shadow-lg transition duration-300 transform hover:scale-105"
                aria-label="Install App on your device"
            >
                Install App
            </button>
          </div>
        )}
      </header>
      <main className="container mx-auto max-w-7xl">
        {renderContent()}
      </main>
      <footer className="text-center mt-12 text-slate-500 text-xs leading-relaxed">
        <p>This product includes materials from the Daggerheart System Reference Document 1.0, © Critical Role, LLC. under the terms of the Darrington Press Community Gaming (DPCGL) License. More information can be found at <a href="https://www.daggerheart.com" target="_blank" rel="noopener noreferrer" className="text-teal-400 hover:underline">https://www.daggerheart.com</a>. There are no previous modifications by others.</p>
        <p className="mt-2">This is an unofficial fan-made tool and is not affiliated with, endorsed, sponsored, or specifically approved by Darrington Press LLC.</p>
      </footer>
    </div>
  );
};

export default App;