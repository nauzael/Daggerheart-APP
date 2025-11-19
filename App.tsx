
import React, { useState, useEffect } from 'react';
import { decompressFromEncodedURIComponent } from 'lz-string';
import { Character } from './types';
import CharacterCreator from './components/CharacterCreator';
import CharacterSheet from './components/CharacterSheet';
import CharacterSelection from './components/CharacterSelection';
import LoginScreen from './components/LoginScreen';
import GMPanel from './components/GMPanel';
import { DaggerheartLogo } from './components/DaggerheartLogo';
import { SUBCLASS_FEATURES } from './data/subclassFeatures';
import { ANCESTRIES } from './data/ancestries';
import { DEFAULT_PROFILE_IMAGE } from './data/defaultProfileImage';
import { characterService } from './services/characterService';
import { campaignService } from './services/campaignService';
import { auth } from './firebaseConfig';
import { onAuthStateChanged, signOut } from 'firebase/auth';


type View = 'login' | 'selection' | 'creator' | 'sheet' | 'gm_panel';

const App: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  
  const [characters, setCharacters] = useState<Character[]>([]);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [view, setView] = useState<View>('login');
  const [installPrompt, setInstallPrompt] = useState<Event | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Auth Listener
  useEffect(() => {
    if (!auth) {
        // If auth isn't initialized (e.g. missing config), bypass login for dev/fallback
        setIsAuthLoading(false);
        setView('selection'); 
        return;
    }
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
        setIsAuthLoading(false);
        // If user is logged in, go to selection. If not, go to login.
        // If user manually selected Guest mode, we handle that in LoginScreen callback.
        if (currentUser) {
             setView(prev => prev === 'login' ? 'selection' : prev);
        } else if (view !== 'login' && !localStorage.getItem('daggerheart-characters')) {
             // Optional: Could force back to login if not guest, but keeping it simple.
        }
    });
    return () => unsubscribe();
  }, []);

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
    // Always subscribe, service handles auth/guest logic internally
    setIsLoading(true);
    
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
    }, 'user'); // Explicitly user mode
    
    // Clean up subscription on unmount
    return () => unsubscribe();
  }, [user]); // Re-subscribe if user state changes (e.g. login/logout)

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
                // Assign to current user if logged in
                if (user) {
                    newChar.userId = user.uid;
                }

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
  }, [user]);


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
    // Assign owner
    if (user) {
        newCharacter.userId = user.uid;
    }
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
  
  const handleSignOut = () => {
      if (auth) {
          signOut(auth);
          // View will switch via useEffect listener
      }
  }

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
              let count = 0;
              
              for (const char of imported) {
                if (char.id && char.name && char.class) {
                  let newChar = migrateCharacter({ ...char });
                  newChar.id = crypto.randomUUID();
                  if (user) newChar.userId = user.uid; // Claim ownership
                  
                  await characterService.save(newChar); // Save individually (triggers subscription update)
                  count++;
                }
              }
              
              // No need to setCharacters manually here as subscribe will catch the updates
              if (count > 0) {
                  alert(`${count} character(s) imported successfully.`);
              } else {
                   alert("No valid characters found in file.");
              }
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
      const confirmMigrate = window.confirm("This will upload all characters found in your browser's LocalStorage to your account. Continue?");
      if(confirmMigrate) {
          setIsLoading(true);
          try {
              await characterService.syncLocalToCloud();
              alert("Migration complete! Your local characters are now saved to your account.");
              // Subscription will auto-update the list
          } catch (e) {
              console.error(e);
              alert("Migration failed. See console for details.");
              setIsLoading(false);
          }
      }
  }

  const handleJoinCampaign = async () => {
      if (!user) {
          alert("You must be logged in to join a campaign. Guest users cannot join online campaigns.");
          return;
      }

      const code = prompt("Enter the Campaign Invite Code provided by your GM:");
      if (!code) return;
      
      try {
          const campaign = await campaignService.findCampaignByCode(code.toUpperCase().trim());
          if (!campaign) {
              alert("Invalid invite code. Please check with your GM.");
              return;
          }
          
          // Filter for unassigned chars:
          const availableChars = characters;
          if (availableChars.length === 0) {
              alert("You need to create a character first.");
              return;
          }
          
          const charName = prompt(`Found campaign: "${campaign.name}".\n\nType the EXACT name of the character you want to join with:\n` + availableChars.map(c => `- ${c.name} ${c.campaignId ? '(Already in a campaign)' : ''}`).join('\n'));
          
          if (!charName) return;
          
          const targetChar = availableChars.find(c => c.name.toLowerCase() === charName.toLowerCase());
          
          if (!targetChar) {
              alert("Character not found.");
              return;
          }
          
          if (confirm(`Join "${campaign.name}" with ${targetChar.name}?`)) {
             await characterService.joinCampaign(targetChar.id, campaign.id);
             alert(`Success! ${targetChar.name} has joined the campaign. Your GM can now see your sheet.`);
          }

      } catch (e: any) {
          console.error(e);
          alert("Error joining campaign: " + e.message);
      }
  }
  
  const handleLeaveCampaign = async (charId: string) => {
      if (confirm("Are you sure you want to leave the campaign? The GM will no longer see this character.")) {
          await characterService.leaveCampaign(charId);
      }
  }

  const getHeaderTitle = () => {
    switch(view) {
        case 'creator':
            return 'New Character';
        case 'sheet':
            return 'Character Sheet'; 
        case 'gm_panel':
            return 'Game Master';
        case 'selection':
        default:
            return 'Character Roster';
    }
  }

  const renderContent = () => {
    if (isAuthLoading) return <div className="flex h-full items-center justify-center text-teal-400 animate-pulse">Loading Application...</div>;

    if (view === 'login') {
        return <LoginScreen onLoginSuccess={() => setView('selection')} />;
    }
    
    if (view === 'gm_panel') {
        return <GMPanel onExit={() => setView('selection')} />;
    }

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
            return null; 
        case 'selection':
        default:
            return (
                <CharacterSelection 
                    characters={characters}
                    onSelectCharacter={handleCharacterSelect}
                    onDeleteCharacter={handleCharacterDelete}
                    onCreateNew={handleShowCreator}
                    onImport={handleImportCharacters}
                    onExport={handleExportCharacters}
                    user={user}
                    onJoinCampaign={handleJoinCampaign}
                    onSignOut={handleSignOut}
                    onGMPanel={() => setView('gm_panel')}
                    onMigrateToCloud={handleMigrateToCloud}
                    onLeaveCampaign={handleLeaveCampaign}
                />
            );
    }
  }

  const isLogin = view === 'login';
  const isSelection = view === 'selection';

  return (
    <div className={`relative bg-slate-900 text-slate-200 font-sans flex flex-col overflow-hidden ${isLogin || isSelection ? 'h-full' : 'h-full'}`}>
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80rem] h-[50rem] blur-3xl pointer-events-none"
        style={{
            background: 'radial-gradient(ellipse at 50% 40%, rgba(20, 184, 166, 0.15) 0%, transparent 70%)'
        }}
        aria-hidden="true"
      />
      {/* Hide Header in GM Panel explicitly, otherwise add top padding for safe areas */}
      <header className={`text-center mb-4 flex-shrink-0 relative z-10 ${view === 'login' || view === 'selection' || view === 'gm_panel' ? 'hidden' : 'pt-8'}`}>
        {view !== 'sheet' && view !== 'gm_panel' && (
          <>
            <div className="inline-block mx-auto mb-2">
                <DaggerheartLogo />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-100 tracking-tight">
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
      <main className={`relative z-10 flex-1 overflow-hidden ${isLogin ? 'w-full' : 'w-full'} ${view !== 'login' && view !== 'selection' && view !== 'gm_panel' ? 'overflow-y-auto' : ''} ${view !== 'login' && view !== 'gm_panel' && view !== 'selection' ? 'container mx-auto max-w-7xl p-4' : ''}`}>
        {renderContent()}
      </main>
    </div>
  );
};

export default App;
