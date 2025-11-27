
import React, { useState } from 'react';
import { auth } from '../firebaseConfig';
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    setPersistence, 
    browserSessionPersistence, 
    browserLocalPersistence, 
    indexedDBLocalPersistence 
} from 'firebase/auth';
import { DaggerheartLogo } from './DaggerheartLogo';
// @ts-ignore
import { Capacitor } from '@capacitor/core';

interface LoginScreenProps {
    onLoginSuccess: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLoginSuccess }) => {
    const [isRegistering, setIsRegistering] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showBypass, setShowBypass] = useState(false);
    const [rememberMe, setRememberMe] = useState(true);

    const handleEmailAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!auth) return;
        setError('');
        
        try {
            const isNative = Capacitor.isNativePlatform();
            // Selecciona la persistencia basada en el checkbox y la plataforma
            const persistenceMode = rememberMe 
                ? (isNative ? indexedDBLocalPersistence : browserLocalPersistence)
                : browserSessionPersistence;

            // Aplica la persistencia antes de iniciar sesión
            await setPersistence(auth, persistenceMode);

            if (isRegistering) {
                await createUserWithEmailAndPassword(auth, email, password);
            } else {
                await signInWithEmailAndPassword(auth, email, password);
            }
            onLoginSuccess();
        } catch (err: any) {
            console.error(err);
            let msg = "Error de autenticación.";
            if (err.code === 'auth/invalid-credential') msg = "Correo o contraseña inválidos.";
            if (err.code === 'auth/email-already-in-use') msg = "El correo ya está en uso.";
            if (err.code === 'auth/weak-password') msg = "La contraseña debe tener al menos 6 caracteres.";
            if (err.code === 'auth/unauthorized-domain') {
                msg = "Dominio no autorizado.";
                setShowBypass(true);
            }
            setError(msg);
        }
    };

    return (
        <div className="h-full bg-slate-900 flex flex-col items-center justify-center p-4">
             <div className="mb-8">
                <DaggerheartLogo />
            </div>
            <div className="bg-slate-800 p-8 rounded-lg shadow-xl w-full max-w-md border border-slate-700">
                <h2 className="text-3xl font-bold text-teal-400 text-center mb-6">
                    {isRegistering ? 'Crear Cuenta' : 'Bienvenido'}
                </h2>

                <form onSubmit={handleEmailAuth} className="space-y-4">
                    <div>
                        <label className="block text-slate-400 mb-1 text-sm">Correo Electrónico</label>
                        <input 
                            type="email" 
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            className="w-full bg-slate-900 border border-slate-600 rounded p-2 text-white focus:border-teal-500 outline-none"
                            required 
                        />
                    </div>
                    <div>
                        <label className="block text-slate-400 mb-1 text-sm">Contraseña</label>
                        <input 
                            type="password" 
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            className="w-full bg-slate-900 border border-slate-600 rounded p-2 text-white focus:border-teal-500 outline-none"
                            required 
                        />
                    </div>

                    <div className="flex items-center py-2">
                        <input 
                            id="remember-me" 
                            type="checkbox" 
                            checked={rememberMe} 
                            onChange={(e) => setRememberMe(e.target.checked)} 
                            className="w-4 h-4 text-teal-600 bg-slate-700 border-slate-600 rounded focus:ring-teal-500 focus:ring-2 focus:ring-offset-slate-800 cursor-pointer"
                        />
                        <label htmlFor="remember-me" className="ml-2 text-sm font-medium text-slate-400 cursor-pointer select-none">
                            Mantener usuario conectado
                        </label>
                    </div>
                    
                    {error && (
                        <div className="bg-red-900/50 border border-red-700 p-3 rounded text-sm">
                            <p className="text-red-200 font-bold mb-1">Error</p>
                            <p className="text-red-100">{error}</p>
                            {showBypass && (
                                <div className="mt-2 text-slate-300 text-xs">
                                    <p className="mb-2">Para solucionar "Unauthorized Domain", añade este dominio en <strong>Firebase Console &gt; Authentication &gt; Settings &gt; Authorized Domains</strong>:</p>
                                    <code className="block bg-black/50 p-2 rounded select-all text-teal-300 mb-3 break-all">
                                        {window.location.hostname}
                                    </code>
                                </div>
                            )}
                        </div>
                    )}

                    <button type="submit" className="w-full bg-teal-600 hover:bg-teal-500 text-white font-bold py-2 px-4 rounded transition-colors">
                        {isRegistering ? 'Registrarse' : 'Iniciar Sesión'}
                    </button>
                </form>

                <p className="mt-6 text-center text-slate-400 text-sm">
                    {isRegistering ? "¿Ya tienes cuenta?" : "¿No tienes cuenta?"} 
                    <button 
                        onClick={() => { setIsRegistering(!isRegistering); setError(''); setShowBypass(false); }}
                        className="text-teal-400 hover:underline ml-1"
                    >
                        {isRegistering ? 'Iniciar Sesión' : 'Registrarse'}
                    </button>
                </p>
            </div>
        </div>
    );
};

export default LoginScreen;