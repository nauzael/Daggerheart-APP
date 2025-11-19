
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
  const [isFullscreen, setIsFullscreen] = useState(false);

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

  // Full Screen Logic
  useEffect(() => {
    const handleFullscreenChange = () => {
        setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

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
    if (isAuthLoading) return <div className="flex h-screen items-center justify-center text-teal-400 animate-pulse">Loading Application...</div>;

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
                <>
                    <div className="flex flex-col sm:flex-row justify-between items-center mb-4 px-4 sm:px-0 max-w-5xl mx-auto gap-2">
                        <div className="text-slate-400 text-sm">
                            {user ? (
                                <span>Logged in as: <span className="text-teal-300 font-bold">{user.email}</span></span>
                            ) : (
                                <span className="text-amber-400 font-bold">Guest Mode (Offline)</span>
                            )}
                        </div>
                        <div className="flex gap-2">
                             <button onClick={() => setView('gm_panel')} className="text-xs bg-indigo-800 hover:bg-indigo-700 text-indigo-200 py-1 px-3 rounded transition-colors border border-indigo-600">
                                GM Panel
                            </button>
                            <button onClick={handleSignOut} className="text-xs bg-slate-700 hover:bg-slate-600 text-white py-1 px-3 rounded transition-colors">
                                {user ? 'Sign Out' : 'Log In'}
                            </button>
                        </div>
                    </div>
                    <CharacterSelection 
                        characters={characters}
                        onSelectCharacter={handleCharacterSelect}
                        onDeleteCharacter={handleCharacterDelete}
                        onCreateNew={handleShowCreator}
                        onImport={handleImportCharacters}
                        onExport={handleExportCharacters}
                    />
                    
                    <div className="flex flex-col items-center gap-4 mt-8 pb-12">
                         <button 
                            onClick={handleJoinCampaign}
                            className="bg-gradient-to-r from-teal-700 to-cyan-700 hover:from-teal-600 hover:to-cyan-600 text-white font-bold py-3 px-8 rounded-full shadow-lg transform transition hover:scale-105"
                        >
                            Join a Campaign
                        </button>
                        {!user && <p className="text-xs text-slate-500">Log in to access campaign features.</p>}
                        
                        {/* Leave Campaign Helper List */}
                        {characters.some(c => c.campaignId) && (
                            <div className="mt-4 w-full max-w-md">
                                <p className="text-center text-slate-500 text-xs mb-2">Active Campaigns:</p>
                                {characters.filter(c => c.campaignId).map(c => (
                                    <div key={c.id} className="flex justify-between items-center bg-slate-800/50 p-2 rounded mb-1">
                                        <span className="text-sm text-slate-300">{c.name}</span>
                                        <button onClick={() => handleLeaveCampaign(c.id)} className="text-xs text-red-400 hover:text-red-300 hover:underline">Leave Campaign</button>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Cloud Migration Helper - Only show if logged in */}
                        {user && (
                            <div className="text-center mt-8 p-4 border-t border-slate-800 w-full max-w-2xl">
                                <button onClick={handleMigrateToCloud} className="text-xs text-slate-500 hover:text-teal-400 underline transition-colors">
                                    Find & Upload Local Storage Characters
                                </button>
                                <p className="text-[10px] text-slate-600 mt-1">Use this if you created characters on this device before logging in.</p>
                            </div>
                        )}
                    </div>
                </>
            );
    }
  }

  return (
    <div className="relative min-h-screen bg-slate-900 text-slate-200 font-sans p-2 sm:p-4 md:p-6 lg:p-8 overflow-hidden">
       {/* Full Screen Button */}
      <button
        onClick={toggleFullScreen}
        className="fixed top-3 right-3 z-50 p-2 bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white rounded-full border border-slate-600 transition-colors backdrop-blur-sm shadow-lg"
        title={isFullscreen ? "Exit Full Screen" : "Enter Full Screen"}
      >
        {isFullscreen ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 9h4m0 0V5m0 4L4 4m11 5h-4m0 0V5m0 4l5-5M5 15h4m0 0v4m0-4l-5 5m15-5h-4m0 0v4m0-4l5 5" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
          </svg>
        )}
      </button>

      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80rem] h-[50rem] blur-3xl pointer-events-none"
        style={{
            background: 'radial-gradient(ellipse at 50% 40%, rgba(20, 184, 166, 0.15) 0%, transparent 70%)'
        }}
        aria-hidden="true"
      />
      <header className={`text-center mb-8 relative z-10 ${view === 'login' ? 'hidden' : ''}`}>
        {view !== 'sheet' && view !== 'gm_panel' && (
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
      {view !== 'login' && (
          <footer className="text-center mt-12 text-slate-500 text-xs leading-relaxed relative z-10 pb-4">
            <p>This product includes materials from the Daggerheart System Reference Document 1.0, © Critical Role, LLC. under the terms of the Darrington Press Community Gaming (DPCGL) License. More information can be found at <a href="https://www.daggerheart.com" target="_blank" rel="noopener noreferrer" className="text-teal-400 hover:underline">https://www.daggerheart.com</a>. There are no previous modifications by others.</p>
            <p className="mt-2">This is an unofficial fan-made tool and is not affiliated with, endorsed, sponsored, or specifically approved by Darrington Press LLC.</p>
          </footer>
      )}
    </div>
  );
};

export default App;
