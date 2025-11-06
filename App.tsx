import React, { useState, useEffect } from 'react';
import { Character } from './types';
import CharacterCreator from './components/CharacterCreator';
import CharacterSheet from './components/CharacterSheet';
import { DaggerheartLogo } from './components/DaggerheartLogo';

const App: React.FC = () => {
  const [character, setCharacter] = useState<Character | null>(null);
  const [installPrompt, setInstallPrompt] = useState<Event | null>(null);

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
    if (character) {
      document.title = `${character.name} - Hoja de Personaje`;
    } else {
      document.title = 'Crear Personaje - Daggerheart';
    }
  }, [character]);

  const handleCharacterCreate = (newCharacter: Character) => {
    setCharacter(newCharacter);
  };

  const handleCharacterUpdate = (updatedCharacter: Character) => {
    setCharacter(updatedCharacter);
  };
  
  const handleReset = () => {
      setCharacter(null);
  }

  const handleInstallClick = () => {
    if (!installPrompt) return;
    (installPrompt as any).prompt();
    (installPrompt as any).userChoice.then(() => {
        setInstallPrompt(null);
    });
  };

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
        {character ? (
          <CharacterSheet 
            character={character} 
            onUpdateCharacter={handleCharacterUpdate} 
            onReset={handleReset}
          />
        ) : (
          <CharacterCreator onCharacterCreate={handleCharacterCreate} />
        )}
      </main>
      <footer className="text-center mt-12 text-slate-500 text-sm">
        <p>Daggerheart es una marca registrada de Darrington Press. Esta es una herramienta no oficial hecha por fans.</p>
      </footer>
    </div>
  );
};

export default App;