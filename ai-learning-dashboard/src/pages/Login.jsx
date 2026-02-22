import { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../features/auth/authSlice';
import { Bot, Mail, Lock, Sparkles } from 'lucide-react';
import { useTheme } from '../ThemeContext';
import gsap from 'gsap';
import AnimatedBackground from '../components/AnimatedBackground';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isDarkMode } = useTheme();
    const cardRef = useRef(null);
    const logoRef = useRef(null);

    useEffect(() => {
        // Entrance animation
        gsap.fromTo(cardRef.current,
            { opacity: 0, y: 40 },
            { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }
        );
        gsap.fromTo(logoRef.current,
            { scale: 0.5, opacity: 0, rotation: -15 },
            { scale: 1, opacity: 1, rotation: 0, duration: 0.7, ease: 'back.out(1.7)', delay: 0.1 }
        );
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Animate card out
        gsap.to(cardRef.current, {
            opacity: 0, y: -20, duration: 0.35, ease: 'power2.in',
            onComplete: () => {
                dispatch(login({ email }));
                navigate('/dashboard');
            }
        });
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center p-4 bg-[var(--color-bg)]">
            <AnimatedBackground />

            <div ref={cardRef} className="relative z-10 w-full max-w-md">
                {/* Logo */}
                <div className="text-center mb-8">
                    <div
                        ref={logoRef}
                        className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 mb-4 shadow-xl shadow-amber-400/30"
                    >
                        <Bot size={30} className="text-white" />
                    </div>
                    <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-1 tracking-tight">
                        AI Learning Hub
                    </h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Sign in to continue your learning journey
                    </p>
                </div>

                {/* Card */}
                <div className="glass-card rounded-2xl p-8">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                                Email Address
                            </label>
                            <div className="relative">
                                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    id="email"
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="input-field pl-10"
                                    placeholder="you@example.com"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                                Password
                            </label>
                            <div className="relative">
                                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    id="password"
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="input-field pl-10"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        <button type="submit" className="btn-primary mt-2">
                            <Sparkles size={16} />
                            Sign In
                        </button>
                    </form>

                    <p className="mt-5 text-center text-xs text-gray-400 dark:text-gray-500">
                        Any email &amp; password works — no real authentication.
                    </p>
                </div>
            </div>
        </div>
    );
}
