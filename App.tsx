import React, { useState, useEffect } from 'react';
import { Character } from './types';
import CharacterCreator from './components/CharacterCreator';
import CharacterSheet from './components/CharacterSheet';
import CharacterSelection from './components/CharacterSelection';
import { DaggerheartLogo } from './components/DaggerheartLogo';

type View = 'selection' | 'creator' | 'sheet';

const App: React.FC = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [view, setView] = useState<View>('selection');
  const [installPrompt, setInstallPrompt] = useState<Event | null>(null);

  useEffect(() => {
    const savedCharacters = localStorage.getItem('daggerheart-characters');
    if (savedCharacters) {
      setCharacters(JSON.parse(savedCharacters));
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
      document.title = `${selectedCharacter.name} - Hoja de Personaje`;
    } else if (view === 'creator') {
      document.title = 'Crear Personaje - Daggerheart';
    } else {
      document.title = 'Selección de Personaje - Daggerheart';
    }
  }, [view, selectedCharacter]);

  const handleCharacterCreate = (newCharacter: Character) => {
    const newCharacters = [...characters, newCharacter];
    setCharacters(newCharacters);
    setSelectedCharacter(newCharacter);
    setView('sheet');
  };

  const handleCharacterUpdate = (updatedCharacter: Character) => {
    const newCharacters = characters.map(c => c.id === updatedCharacter.id ? updatedCharacter : c);
    setCharacters(newCharacters);
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
    setCharacters(characters.filter(c => c.id !== characterId));
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
                  let newChar = { ...char };
                  // Ensure unique ID
                  if (existingIds.has(newChar.id)) {
                    newChar.id = crypto.randomUUID();
                  }
                  validImportedCharacters.push(newChar);
                  existingIds.add(newChar.id);
                }
              });
              
              setCharacters(prev => [...prev, ...validImportedCharacters]);
              alert(`${validImportedCharacters.length} personaje(s) importado(s) con éxito.`);
            } else {
              alert("Error: El archivo JSON no es un array de personajes válido.");
            }
          } catch (error) {
            alert("Error al leer el archivo. Asegúrate de que es un JSON válido.");
          }
        }
      };
    }
  };


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
                      onDeleteCharacter={handleCharacterDelete}
                      onCreateNew={handleShowCreator}
                      onImport={handleImportCharacters}
                      onExport={handleExportCharacters}
                   />;
    }
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 font-sans p-4 sm:p-6 lg:p-8">
      <header className="text-center mb-8">
        <div className="inline-block mx-auto mb-2">
            <DaggerheartLogo />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-slate-100 tracking-tight">
          Hoja de Personaje
        </h1>
        {installPrompt && (
          <div className="mt-4">
            <button 
                onClick={handleInstallClick}
                className="bg-teal-600 hover:bg-teal-500 text-white font-bold py-2 px-4 rounded-lg shadow-lg transition duration-300 transform hover:scale-105"
                aria-label="Instalar la aplicación en tu dispositivo"
            >
                Instalar Aplicación
            </button>
          </div>
        )}
      </header>
      <main className="container mx-auto max-w-7xl">
        {renderContent()}
      </main>
      <footer className="text-center mt-12 text-slate-500 text-sm">
        <p>Daggerheart es una marca registrada de Darrington Press. Esta es una herramienta no oficial hecha por fans.</p>
      </footer>
    </div>
  );
};

export default App;