
import React, { useState, useEffect } from 'react';
import { auth, googleProvider } from '../firebaseConfig';
import { signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
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
    const [isNative, setIsNative] = useState(false);

    useEffect(() => {
        // Check if running on native platform (Android/iOS)
        const nativeCheck = Capacitor.isNativePlatform();
        setIsNative(nativeCheck);
    }, []);

    const handleGoogleLogin = async () => {
        if (isNative) {
            const proceed = window.confirm(
                "Google Sign-In may not work in this APK without specific advanced configuration (SHA-1 keys). If you see a blank screen, please restart and use Email/Password. Try anyway?"
            );
            if (!proceed) return;
        }

        if (!auth || !googleProvider) {
            setError("Firebase Auth not configured properly.");
            return;
        }
        setError('');
        try {
            await signInWithPopup(auth, googleProvider);
            onLoginSuccess();
        } catch (err: any) {
            console.error("Google Login Error:", err);
            if (err.code === 'auth/unauthorized-domain') {
                setError(`Domain Unauthorized: Firebase is blocking this URL.`);
                setShowBypass(true);
            } else if (err.code === 'auth/popup-closed-by-user') {
                setError("Sign-in cancelled.");
            } else if (err.code === 'auth/popup-blocked') {
                setError("Popup blocked. Please allow popups for this site.");
            } else {
                setError(err.message || "Failed to sign in with Google.");
            }
        }
    };

    const handleEmailAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!auth) return;
        setError('');
        
        try {
            if (isRegistering) {
                await createUserWithEmailAndPassword(auth, email, password);
            } else {
                await signInWithEmailAndPassword(auth, email, password);
            }
            onLoginSuccess();
        } catch (err: any) {
            console.error(err);
            let msg = "Authentication failed.";
            if (err.code === 'auth/invalid-credential') msg = "Invalid email or password.";
            if (err.code === 'auth/email-already-in-use') msg = "Email already in use.";
            if (err.code === 'auth/weak-password') msg = "Password should be at least 6 characters.";
            if (err.code === 'auth/unauthorized-domain') {
                msg = "Domain unauthorized.";
                setShowBypass(true);
            }
            setError(msg);
        }
    };

    return (
        <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-4">
             <div className="mb-8">
                <DaggerheartLogo />
            </div>
            <div className="bg-slate-800 p-8 rounded-lg shadow-xl w-full max-w-md border border-slate-700">
                <h2 className="text-3xl font-bold text-teal-400 text-center mb-6">
                    {isRegistering ? 'Create Account' : 'Welcome Back'}
                </h2>

                <form onSubmit={handleEmailAuth} className="space-y-4">
                    <div>
                        <label className="block text-slate-400 mb-1 text-sm">Email</label>
                        <input 
                            type="email" 
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            className="w-full bg-slate-900 border border-slate-600 rounded p-2 text-white focus:border-teal-500 outline-none"
                            required 
                        />
                    </div>
                    <div>
                        <label className="block text-slate-400 mb-1 text-sm">Password</label>
                        <input 
                            type="password" 
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            className="w-full bg-slate-900 border border-slate-600 rounded p-2 text-white focus:border-teal-500 outline-none"
                            required 
                        />
                    </div>
                    
                    {error && (
                        <div className="bg-red-900/50 border border-red-700 p-3 rounded text-sm">
                            <p className="text-red-200 font-bold mb-1">Error: {error}</p>
                            {showBypass && (
                                <div className="mt-2 text-slate-300 text-xs">
                                    <p className="mb-2">To fix "Unauthorized Domain", add this domain to <strong>Firebase Console &gt; Authentication &gt; Settings &gt; Authorized Domains</strong>:</p>
                                    <code className="block bg-black/50 p-2 rounded select-all text-teal-300 mb-3 break-all">
                                        {window.location.hostname}
                                    </code>
                                </div>
                            )}
                        </div>
                    )}

                    <button type="submit" className="w-full bg-teal-600 hover:bg-teal-500 text-white font-bold py-2 px-4 rounded transition-colors">
                        {isRegistering ? 'Sign Up' : 'Log In'}
                    </button>
                </form>

                <div className="my-6 flex items-center">
                    <div className="flex-grow h-px bg-slate-600"></div>
                    <span className="px-3 text-slate-500 text-sm">OR</span>
                    <div className="flex-grow h-px bg-slate-600"></div>
                </div>

                <button 
                    onClick={handleGoogleLogin}
                    className="w-full bg-white hover:bg-gray-100 text-slate-900 font-bold py-2 px-4 rounded transition-colors flex items-center justify-center gap-2"
                >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                    Continue with Google
                </button>
                
                {isNative && (
                    <div className="mt-4 p-3 bg-amber-900/30 border border-amber-700/50 rounded text-xs text-amber-200 text-center">
                        <strong>APK Note:</strong> If Google Login shows a blank screen, it is due to Google security restrictions in standard APKs. Please use <strong>Email/Password</strong> for guaranteed access.
                    </div>
                )}

                <p className="mt-6 text-center text-slate-400 text-sm">
                    {isRegistering ? "Already have an account?" : "Don't have an account?"} 
                    <button 
                        onClick={() => { setIsRegistering(!isRegistering); setError(''); setShowBypass(false); }}
                        className="text-teal-400 hover:underline ml-1"
                    >
                        {isRegistering ? 'Log In' : 'Sign Up'}
                    </button>
                </p>
            </div>
        </div>
    );
};

export default LoginScreen;
