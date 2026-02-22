import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Bot, LogOut, Moon, Sun, Search, Menu, X, LayoutDashboard, Smartphone, UserCircle } from 'lucide-react';
import { useTheme } from '../ThemeContext';
import { logout } from '../features/auth/authSlice';
import { setSearchQuery } from '../features/courses/coursesSlice';
import gsap from 'gsap';

const NAV_LINKS = [
    { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/mobile-preview', label: 'Mobile Preview', icon: Smartphone },
    { to: '/profile', label: 'Profile', icon: UserCircle },
];

export default function Navbar() {
    const { isDarkMode, toggleTheme } = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const searchQuery = useSelector((state) => state.courses.searchQuery);
    const user = useSelector((state) => state.auth.user);
    const [menuOpen, setMenuOpen] = useState(false);
    const drawerRef = useRef(null);
    const overlayRef = useRef(null);
    const linksRef = useRef([]);

    // GSAP drawer open/close
    useEffect(() => {
        if (!drawerRef.current) return;
        if (menuOpen) {
            // Slide drawer in
            gsap.fromTo(drawerRef.current,
                { x: '100%' },
                { x: '0%', duration: 0.32, ease: 'power3.out' }
            );
            // Fade overlay in
            gsap.fromTo(overlayRef.current,
                { opacity: 0 },
                { opacity: 1, duration: 0.25, ease: 'power2.out' }
            );
            // Stagger nav links
            gsap.fromTo(linksRef.current.filter(Boolean),
                { opacity: 0, x: 20 },
                { opacity: 1, x: 0, stagger: 0.07, duration: 0.3, ease: 'power2.out', delay: 0.15 }
            );
        } else {
            gsap.to(drawerRef.current, { x: '100%', duration: 0.22, ease: 'power2.in' });
            gsap.to(overlayRef.current, { opacity: 0, duration: 0.18, ease: 'power2.in' });
        }
    }, [menuOpen]);

    const handleLogout = () => {
        dispatch(logout());
        setMenuOpen(false);
        navigate('/login');
    };

    const isActive = (path) => location.pathname === path;
    const initials = user?.email
        ? user.email.split("@")[0].slice(0, 2).toUpperCase()
        : "?";

    return (
        <>
            <nav className="sticky top-0 z-50 w-full bg-white/75 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200/70 dark:border-gray-700/50 transition-colors duration-300">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between gap-4">

                        {/* Logo */}
                        <Link to="/dashboard" className="group flex items-center gap-2.5 shrink-0">
                            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
                                <Bot size={20} className="text-white" />
                            </div>
                            <span className="hidden sm:block font-extrabold text-lg tracking-tight text-gray-900 dark:text-white">
                                AI<span className="text-accent"> Hub</span>
                            </span>
                        </Link>

                        {/* Desktop Search */}
                        <div className="flex-1 max-w-lg hidden md:block">
                            <div className="relative">
                                <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                <input
                                    type="text"
                                    placeholder="Search courses..."
                                    value={searchQuery}
                                    onChange={(e) => dispatch(setSearchQuery(e.target.value))}
                                    className="block w-full pl-9 pr-4 py-2 rounded-full border border-gray-200 dark:border-gray-600 bg-gray-100/50 dark:bg-gray-800/60 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 focus:bg-white dark:focus:bg-gray-800 transition-all"
                                />
                            </div>
                        </div>

                        {/* Desktop Nav */}
                        <div className="hidden md:flex items-center gap-1">
                            {NAV_LINKS.map(({ to, label, icon: Icon }) => (
                                <Link
                                    key={to}
                                    to={to}
                                    className={`flex items-center gap-1.5 px-3 py-2 rounded-full text-sm font-medium transition-all ${isActive(to)
                                            ? 'bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400'
                                            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
                                        }`}
                                >
                                    <Icon size={15} />
                                    {label}
                                </Link>
                            ))}
                        </div>

                        {/* Desktop Actions */}
                        <div className="hidden md:flex items-center gap-1">
                            <button onClick={toggleTheme} aria-label="Toggle theme"
                                className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-amber-500 transition-all"
                            >
                                {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
                            </button>
                            <div className="w-px h-5 bg-gray-200 dark:bg-gray-700 mx-1" />
                            <button onClick={handleLogout}
                                className="flex items-center gap-1.5 px-3 py-2 rounded-full text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all"
                            >
                                <LogOut size={16} />
                                Logout
                            </button>
                        </div>

                        {/* Mobile buttons */}
                        <div className="flex md:hidden items-center gap-2">
                            <button onClick={toggleTheme} aria-label="Toggle theme"
                                className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
                            >
                                {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
                            </button>
                            <button onClick={() => setMenuOpen(o => !o)} aria-label="Toggle menu"
                                className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
                            >
                                {menuOpen ? <X size={22} /> : <Menu size={22} />}
                            </button>
                        </div>

                    </div>

                    {/* Mobile search */}
                    <div className="md:hidden pb-3">
                        <div className="relative">
                            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                            <input
                                type="text"
                                placeholder="Search courses..."
                                value={searchQuery}
                                onChange={(e) => dispatch(setSearchQuery(e.target.value))}
                                className="block w-full pl-9 pr-4 py-2 rounded-full border border-gray-200 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400"
                            />
                        </div>
                    </div>
                </div>
            </nav>

            {/* Overlay */}
            <div
                ref={overlayRef}
                onClick={() => setMenuOpen(false)}
                className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden pointer-events-none"
                style={{ opacity: 0, pointerEvents: menuOpen ? 'auto' : 'none' }}
            />

            {/* Drawer */}
            <div
                ref={drawerRef}
                className="fixed top-0 right-0 z-50 h-full w-72 bg-white dark:bg-gray-900 shadow-2xl md:hidden flex flex-col"
                style={{ transform: 'translateX(100%)' }}
            >
                {/* Drawer header with user info */}
                <div className="px-5 py-5 border-b border-gray-100 dark:border-gray-800">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2.5">
                            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-md">
                                <Bot size={20} className="text-white" />
                            </div>
                            <span className="font-extrabold text-lg text-gray-900 dark:text-white">AI <span className="text-accent">Hub</span></span>
                        </div>
                        <button onClick={() => setMenuOpen(false)}
                            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-all text-gray-400"
                        >
                            <X size={18} />
                        </button>
                    </div>

                    {/* User avatar strip */}
                    <div className="flex items-center gap-3 p-3 rounded-2xl bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-sm font-bold text-white shrink-0">
                            {initials}
                        </div>
                        <div className="min-w-0">
                            <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">{user?.email || "Guest"}</p>
                            <p className="text-xs text-gray-400">Member</p>
                        </div>
                    </div>
                </div>

                {/* Nav links */}
                <div className="flex-1 px-4 py-5 space-y-1 overflow-y-auto">
                    {NAV_LINKS.map(({ to, label, icon: Icon }, i) => (
                        <Link
                            key={to}
                            to={to}
                            ref={el => linksRef.current[i] = el}
                            onClick={() => setMenuOpen(false)}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${isActive(to)
                                    ? 'bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 border border-amber-100 dark:border-amber-800/30'
                                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                                }`}
                            style={{ opacity: 0 }} // GSAP will animate in
                        >
                            <Icon size={18} />
                            {label}
                            {isActive(to) && (
                                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-amber-400" />
                            )}
                        </Link>
                    ))}
                </div>

                {/* Logout */}
                <div className="px-4 pb-6 pt-3 border-t border-gray-100 dark:border-gray-800">
                    <button onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all"
                    >
                        <LogOut size={18} />
                        Logout
                    </button>
                </div>
            </div>
        </>
    );
}
