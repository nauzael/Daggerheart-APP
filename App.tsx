
import React, { useState, useEffect } from 'react';
import { decompressFromEncodedURIComponent } from 'lz-string';
import { Character } from './types';
import CharacterCreator from './components/CharacterCreator';
import CharacterSheet from './components/CharacterSheet';
import CharacterSelection from './components/CharacterSelection';
import { DaggerheartLogo } from './components/DaggerheartLogo';
import { SUBCLASS_FEATURES } from './data/subclassFeatures';
import { ANCESTRIES } from './data/ancestries';
import { DEFAULT_PROFILE_IMAGE } from './data/defaultProfileImage';
import { characterService } from './services/characterService';


type View = 'selection' | 'creator' | 'sheet';

const App: React.FC = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [view, setView] = useState<View>('selection');
  const [installPrompt, setInstallPrompt] = useState<Event | null>(null);
  const [isLoading, setIsLoading] = useState(true);

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
      
      if (char.potions === undefined) {
          char.potions = 0;
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

  // Real-time Subscription Load
  useEffect(() => {
    setIsLoading(true);
    
    // Subscribe to real-time updates
    const unsubscribe = characterService.subscribe((updatedCharacters) => {
        try {
            const migratedChars = updatedCharacters.map(migrateCharacter);
            setCharacters(migratedChars);
            
            // Also update selected character if they are currently open and were updated remotely
            setSelectedCharacter(currentChar => {
                if (!currentChar) return null;
                const updatedCurrent = migratedChars.find(c => c.id === currentChar.id);
                return updatedCurrent || currentChar;
            });

        } catch (e) {
            console.error("Failed to process character updates", e);
        } finally {
            setIsLoading(false);
        }
    });
    
    // Clean up subscription on unmount
    return () => unsubscribe();
  }, []);

  // Import via URL logic
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const characterData = urlParams.get('character');

    if (characterData) {
        try {
            let jsonString = decompressFromEncodedURIComponent(characterData);
            if (!jsonString) {
                try {
                    jsonString = atob(characterData);
                } catch (e) {
                    throw new Error("Invalid character data in URL.");
                }
            }

            const importedChar = JSON.parse(jsonString);

            if (importedChar.id && importedChar.name && importedChar.class) {
                let newChar = migrateCharacter(importedChar);
                // Always assign new ID for imports to avoid collisions
                newChar.id = crypto.randomUUID(); 

                // Save immediately
                characterService.save(newChar).then(() => {
                     alert(`Character snapshot for "${newChar.name}" imported successfully!`);
                });

            } else {
                alert("Could not import character from link: Invalid data format.");
            }
        } catch (error) {
            console.error("Failed to import character from URL:", error);
            alert("Could not import character from link: The data is corrupted.");
        } finally {
            window.history.replaceState({}, document.title, window.location.pathname);
        }
    }
  }, []);


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

  const handleCharacterCreate = async (newCharacter: Character) => {
    // Optimistic UI update (subscription will double confirm this shortly)
    setCharacters(prev => [...prev, newCharacter]);
    setSelectedCharacter(newCharacter);
    setView('sheet');
    
    try {
        await characterService.save(newCharacter);
    } catch (e) {
        console.error("Error saving character", e);
        alert("Failed to save character to the database. Please check your connection.");
    }
  };

  const handleCharacterUpdate = async (updatedCharacter: Character) => {
    // Optimistic update
    setCharacters(prev => prev.map(c => c.id === updatedCharacter.id ? updatedCharacter : c));
    setSelectedCharacter(updatedCharacter);
    // Persist
    await characterService.save(updatedCharacter);
  };

  const handleCharacterSelect = (characterId: string) => {
    const charToSelect = characters.find(c => c.id === characterId);
    if (charToSelect) {
        setSelectedCharacter(charToSelect);
        setView('sheet');
    }
  };

  const handleCharacterDelete = async (characterId: string) => {
    setCharacters(prev => prev.filter(c => c.id !== characterId));
    await characterService.delete(characterId);
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
      fileReader.onload = async e => {
        if (e.target?.result) {
          try {
            const imported = JSON.parse(e.target.result as string);
            if (Array.isArray(imported)) {
              const validImportedCharacters: Character[] = [];
              const existingIds = new Set(characters.map(c => c.id));
              
              for (const char of imported) {
                if (char.id && char.name && char.class) {
                  let newChar = migrateCharacter({ ...char });
                  // Ensure unique ID
                  if (existingIds.has(newChar.id)) {
                    newChar.id = crypto.randomUUID();
                  }
                  
                  await characterService.save(newChar); // Save individually
                  validImportedCharacters.push(newChar);
                  existingIds.add(newChar.id);
                }
              }
              
              // No need to setCharacters manually here as subscribe will catch the updates
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
  
  const handleMigrateToCloud = async () => {
      const confirmMigrate = window.confirm("This will upload all characters found in your browser's LocalStorage to the connected Firebase Database. Continue?");
      if(confirmMigrate) {
          setIsLoading(true);
          try {
              await characterService.syncLocalToCloud();
              alert("Migration complete! Your characters are now in the cloud.");
              // Subscription will auto-update the list
          } catch (e) {
              console.error(e);
              alert("Migration failed. See console for details.");
              setIsLoading(false);
          }
      }
  }

  const getHeaderTitle = () => {
    switch(view) {
        case 'creator':
            return 'New Character';
        case 'sheet':
            return 'Character Sheet'; 
        case 'selection':
        default:
            return 'Character Roster';
    }
  }

  const renderContent = () => {
    if (isLoading) {
        return <div className="flex justify-center items-center h-64 text-teal-400 animate-pulse">Loading Arcane Data...</div>;
    }

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
            return (
                <>
                    <CharacterSelection 
                        characters={characters}
                        onSelectCharacter={handleCharacterSelect}
                        onDeleteCharacter={handleCharacterDelete}
                        onCreateNew={handleShowCreator}
                        onImport={handleImportCharacters}
                        onExport={handleExportCharacters}
                    />
                    
                    {/* Cloud Migration Helper */}
                    <div className="text-center mt-12 p-4 border-t border-slate-800">
                        <p className="text-slate-500 text-xs mb-2">Database Connected: daggerheart-75adc</p>
                        <button onClick={handleMigrateToCloud} className="text-xs text-teal-600 hover:text-teal-400 underline transition-colors">
                            Upload Local Characters to Database
                        </button>
                        <p className="text-[10px] text-slate-600 mt-1">Use this if you created characters before connecting to the database.</p>
                    </div>
                </>
            );
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
      <header className="text-center mb-8 relative z-10">
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
      <main className="container mx-auto max-w-7xl relative z-10">
        {renderContent()}
      </main>
      <footer className="text-center mt-12 text-slate-500 text-xs leading-relaxed relative z-10">
        <p>This product includes materials from the Daggerheart System Reference Document 1.0, © Critical Role, LLC. under the terms of the Darrington Press Community Gaming (DPCGL) License. More information can be found at <a href="https://www.daggerheart.com" target="_blank" rel="noopener noreferrer" className="text-teal-400 hover:underline">https://www.daggerheart.com</a>. There are no previous modifications by others.</p>
        <p className="mt-2">This is an unofficial fan-made tool and is not affiliated with, endorsed, sponsored, or specifically approved by Darrington Press LLC.</p>
      </footer>
    </div>
  );
};

export default App;
