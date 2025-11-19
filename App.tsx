
import React, { useState, useEffect } from 'react';
import CharacterCreator from './components/CharacterCreator';
import CharacterSheet from './components/CharacterSheet';
import CharacterSelection from './components/CharacterSelection';
import LoginScreen from './components/LoginScreen';
import GMPanel from './components/GMPanel';
import { DaggerheartLogo } from './components/DaggerheartLogo';
import { Character } from './types';
import { characterService } from './services/characterService';
import { campaignService } from './services/campaignService';
import { auth } from './firebaseConfig';
import { onAuthStateChanged, User } from 'firebase/auth';
import { App as CapacitorApp } from '@capacitor/app';
import { Share } from '@capacitor/share';
import { Capacitor } from '@capacitor/core';

const App: React.FC = () => {
  const [view, setView] = useState<'login' | 'selection' | 'creator' | 'sheet' | 'gm_panel'>('selection');
  const [selectedCharacterId, setSelectedCharacterId] = useState<string | null>(null);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [installPrompt, setInstallPrompt] = useState<any>(null);
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault();
      setInstallPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  // Handle Android Hardware Back Button
  useEffect(() => {
      if (Capacitor.isNativePlatform()) {
          const backListener = CapacitorApp.addListener('backButton', ({ canGoBack }) => {
              if (view === 'selection' || view === 'login') {
                  CapacitorApp.exitApp();
              } else {
                  // If in a sub-view, return to selection
                  if (view === 'sheet') {
                       setSelectedCharacterId(null);
                  }
                  setView('selection');
              }
          });
          return () => {
              backListener.then(h => h.remove());
          };
      }
  }, [view]);

  const handleInstallClick = () => {
    if (installPrompt) {
      installPrompt.prompt();
      installPrompt.userChoice.then((choiceResult: any) => {
        setInstallPrompt(null);
      });
    }
  };

  useEffect(() => {
    if (!auth) return;
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        if (view === 'login') setView('selection');
      }
    });
    return () => unsubscribe();
  }, [view]);

  useEffect(() => {
    const unsubscribe = characterService.subscribe((chars) => {
      setCharacters(chars);
    }, 'user');

    return () => unsubscribe();
  }, [user]);

  const handleCharacterCreate = async (newCharacter: Character) => {
    await characterService.save(newCharacter);
    setView('selection');
  };

  const handleCharacterUpdate = async (updatedCharacter: Character) => {
    await characterService.save(updatedCharacter);
  };

  const handleCharacterDelete = async (id: string) => {
    await characterService.delete(id);
    if (selectedCharacterId === id) {
      setSelectedCharacterId(null);
      setView('selection');
    }
  };
  
  const handleSelectCharacter = (id: string) => {
      setSelectedCharacterId(id);
      setView('sheet');
  };

  const handleImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = async (e) => {
          try {
              const importedData = JSON.parse(e.target?.result as string);
              const charsToImport = Array.isArray(importedData) ? importedData : [importedData];
              
              for (const char of charsToImport) {
                   const newChar = { ...char, id: crypto.randomUUID(), userId: user?.uid };
                   await characterService.save(newChar);
              }
              alert('Import successful!');
          } catch (error) {
              console.error('Import failed:', error);
              alert('Failed to import character(s). Invalid JSON.');
          }
      };
      reader.readAsText(file);
      event.target.value = ''; 
  };

  const handleExport = async () => {
      const dataStr = JSON.stringify(characters, null, 2);
      
      if (Capacitor.isNativePlatform()) {
          try {
              await Share.share({
                  title: 'Daggerheart Characters',
                  text: dataStr,
                  dialogTitle: 'Export Characters JSON',
              });
          } catch (err) {
              console.error('Share failed:', err);
              alert('Failed to share characters. Please try again.');
          }
      } else {
          const dataUri = "data:text/json;charset=utf-8," + encodeURIComponent(dataStr);
          const downloadAnchorNode = document.createElement('a');
          downloadAnchorNode.setAttribute("href", dataUri);
          downloadAnchorNode.setAttribute("download", "daggerheart_characters.json");
          document.body.appendChild(downloadAnchorNode);
          downloadAnchorNode.click();
          downloadAnchorNode.remove();
      }
  };

  const handleJoinCampaign = async () => {
      if (!user) {
          alert("Please log in to join a campaign.");
          return;
      }
      const code = prompt("Enter Campaign Invite Code:");
      if (!code) return;
      
      try {
          const campaign = await campaignService.findCampaignByCode(code);
          if (!campaign) {
              alert("Campaign not found.");
              return;
          }

          const myChars = characters;
          if (myChars.length === 0) {
              alert("You need to create a character first.");
              return;
          }
          
          const charNames = myChars.map((c, i) => `${i + 1}. ${c.name} (Lvl ${c.level})`).join('\n');
          const selectionIndex = prompt(`Enter number of character to join "${campaign.name}":\n${charNames}`);
          
          if (selectionIndex) {
              const index = parseInt(selectionIndex) - 1;
              if (index >= 0 && index < myChars.length) {
                  const char = myChars[index];
                  if (char.campaignId) {
                      if(!confirm(`${char.name} is already in a campaign. Switch to ${campaign.name}?`)) return;
                  }
                  await characterService.joinCampaign(char.id, campaign.id);
                  alert(`${char.name} successfully joined ${campaign.name}!`);
              } else {
                  alert("Invalid selection.");
              }
          }
      } catch (error) {
          console.error("Error joining campaign:", error);
          alert("An error occurred while joining the campaign.");
      }
  };

  const getHeaderTitle = () => {
    switch (view) {
      case 'creator': return 'Create Character';
      case 'sheet': return '';
      case 'selection': return '';
      case 'login': return '';
      case 'gm_panel': return '';
      default: return 'Daggerheart Companion';
    }
  };

  const renderContent = () => {
    switch (view) {
      case 'login':
        return <LoginScreen onLoginSuccess={() => setView('selection')} />;
      case 'creator':
        return <CharacterCreator onCharacterCreate={handleCharacterCreate} onCancel={() => setView('selection')} />;
      case 'sheet':
        const character = characters.find(c => c.id === selectedCharacterId);
        if (!character) return <div className="text-center text-slate-400 mt-10">Character not found</div>;
        return (
          <CharacterSheet
            character={character}
            onUpdateCharacter={handleCharacterUpdate}
            onReturnToSelection={() => {
                setSelectedCharacterId(null);
                setView('selection');
            }}
          />
        );
      case 'gm_panel':
          return <GMPanel onExit={() => setView('selection')} />;
      case 'selection':
      default:
        return (
          <CharacterSelection 
            characters={characters}
            onSelectCharacter={handleSelectCharacter}
            onDeleteCharacter={handleCharacterDelete}
            onCreateNew={() => setView('creator')}
            onImport={handleImport}
            onExport={handleExport}
            user={user}
            onJoinCampaign={handleJoinCampaign}
            onSignOut={() => {
                if (user) {
                    auth.signOut();
                } else {
                    setView('login');
                }
            }}
            onGMPanel={() => setView('gm_panel')}
            onMigrateToCloud={characterService.syncLocalToCloud}
            onLeaveCampaign={(id) => characterService.leaveCampaign(id)}
          />
        );
    }
  };

  useEffect(() => {
      setIsLogin(view === 'login');
  }, [view]);

  return (
    <div className="flex flex-col h-screen bg-slate-900 text-slate-200 font-sans overflow-hidden relative selection:bg-teal-500 selection:text-white">
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80rem] h-[50rem] blur-3xl pointer-events-none"
        style={{
            background: 'radial-gradient(ellipse at 50% 40%, rgba(20, 184, 166, 0.15) 0%, transparent 70%)'
        }}
        aria-hidden="true"
      />
      <header className={`text-center mb-4 flex-shrink-0 relative z-10 ${view === 'login' || view === 'selection' || view === 'gm_panel' || view === 'sheet' || view === 'creator' ? 'hidden' : 'pt-8'}`}>
        {view !== 'sheet' && view !== 'gm_panel' && view !== 'creator' && (
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
      <main className={`relative z-10 flex-1 overflow-hidden ${isLogin ? 'w-full' : 'w-full'} ${view !== 'login' && view !== 'selection' && view !== 'gm_panel' && view !== 'sheet' ? 'overflow-y-auto' : ''} ${view !== 'login' && view !== 'gm_panel' && view !== 'selection' && view !== 'sheet' ? 'container mx-auto max-w-7xl p-4' : ''}`}>
        {renderContent()}
      </main>
    </div>
  );
};

export default App;
