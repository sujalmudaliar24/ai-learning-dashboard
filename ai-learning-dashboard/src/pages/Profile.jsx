import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { COURSES } from '../data/courses';
import { LESSONS } from '../data/lessons';
import gsap from 'gsap';
import { User, UserCircle, Mail, BookOpen, Award, Flame } from 'lucide-react';
import AnimatedBackground from '../components/AnimatedBackground';

const totalLessons = Object.values(LESSONS).flat().length;

// Circular SVG progress ring
function CircularProgress({ pct, size = 140, strokeW = 10, color = "#F59E0B", label }) {
    const r = (size - strokeW) / 2;
    const circ = 2 * Math.PI * r;
    const offset = circ - (pct / 100) * circ;
    const ringRef = useRef(null);

    useEffect(() => {
        if (!ringRef.current) return;
        gsap.fromTo(ringRef.current,
            { strokeDashoffset: circ },
            { strokeDashoffset: offset, duration: 1.4, ease: "power3.out", delay: 0.3 }
        );
    }, [pct, circ, offset]);

    return (
        <div className="relative inline-flex items-center justify-center">
            <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
                <circle
                    cx={size / 2} cy={size / 2} r={r}
                    fill="none" stroke="currentColor"
                    className="text-gray-200 dark:text-gray-700"
                    strokeWidth={strokeW}
                />
                <circle
                    ref={ringRef}
                    cx={size / 2} cy={size / 2} r={r}
                    fill="none" stroke={color}
                    strokeWidth={strokeW}
                    strokeLinecap="round"
                    strokeDasharray={circ}
                    strokeDashoffset={circ}
                />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-extrabold text-gray-900 dark:text-white">{pct}%</span>
                {label && <span className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{label}</span>}
            </div>
        </div>
    );
}

export default function Profile() {
    const user = useSelector((state) => state.auth.user);
    const headerRef = useRef(null);
    const cardsRef = useRef(null);

    const email = user?.email || "guest@example.com";
    const name = email.split("@")[0].replace(/[._]/g, " ").replace(/\b\w/g, c => c.toUpperCase());
    const initials = name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();

    const avgProgress = Math.round(COURSES.reduce((s, c) => s + c.progress, 0) / COURSES.length);
    const completed = COURSES.filter(c => c.progress === 100).length;

    useEffect(() => {
        gsap.fromTo(headerRef.current,
            { opacity: 0, y: -30 },
            { opacity: 1, y: 0, duration: 0.55, ease: "power3.out" }
        );
        const children = cardsRef.current?.children;
        if (children) {
            gsap.fromTo(Array.from(children),
                { opacity: 0, y: 24 },
                { opacity: 1, y: 0, stagger: 0.1, duration: 0.45, ease: "power2.out", delay: 0.3 }
            );
        }
    }, []);

    const stats = [
        { label: "Enrolled", value: COURSES.length, icon: BookOpen },
        { label: "Completed", value: completed, icon: Award },
        { label: "Avg. Score", value: `${avgProgress}%`, icon: Flame },
        { label: "Lessons", value: totalLessons, icon: BookOpen },
    ];

    return (
        <div className="relative min-h-screen">
            <AnimatedBackground />
            <div className="relative z-10 max-w-3xl mx-auto py-8 px-4">
                {/* Profile Header */}
                <div ref={headerRef} className="glass-card rounded-3xl p-8 mb-6 relative overflow-hidden">
                    <div className="absolute -top-12 -right-12 w-56 h-56 rounded-full bg-amber-400/10 blur-3xl pointer-events-none" />
                    <div className="relative flex flex-col sm:flex-row items-center sm:items-start gap-6">
                        <div className="shrink-0 w-20 h-20 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-xl shadow-amber-400/30">
                            <UserCircle size={44} className="text-white" />
                        </div>
                        <div className="text-center sm:text-left">
                            <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight">{name}</h1>
                            <div className="flex items-center justify-center sm:justify-start gap-2 mt-2 text-sm text-gray-500 dark:text-gray-400">
                                <Mail size={14} className="text-amber-400" />
                                {email}
                            </div>
                            <div className="flex items-center justify-center sm:justify-start gap-2 mt-1.5 text-sm text-gray-500 dark:text-gray-400">
                                <User size={14} className="text-amber-400" />
                                AI Learning Hub Member
                            </div>
                        </div>
                    </div>
                </div>

                <div ref={cardsRef} className="space-y-6">
                    {/* Overall Progress Ring */}
                    <div className="glass-card rounded-3xl p-8 flex flex-col sm:flex-row items-center gap-8">
                        <CircularProgress pct={avgProgress} color="#F59E0B" label="Overall" />
                        <div className="flex-1 space-y-4 w-full">
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                <Award size={20} className="text-amber-400" />
                                Learning Progress
                            </h2>
                            <div className="grid grid-cols-2 gap-3">
                                {stats.map(({ label, value, icon: Icon }) => (
                                    <div
                                        key={label}
                                        className="bg-gray-50 dark:bg-gray-800/60 rounded-2xl p-3 border border-gray-100 dark:border-gray-700/50 flex items-center gap-3"
                                    >
                                        <div className="w-8 h-8 rounded-xl bg-amber-50 dark:bg-amber-900/20 flex items-center justify-center shrink-0">
                                            <Icon size={15} className="text-amber-500" />
                                        </div>
                                        <div>
                                            <p className="text-lg font-extrabold text-gray-900 dark:text-white leading-none">{value}</p>
                                            <p className="text-[10px] text-gray-400 mt-0.5">{label}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Per-Course Breakdown */}
                    <div className="glass-card rounded-3xl p-6">
                        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-5 flex items-center gap-2">
                            <BookOpen size={18} className="text-amber-400" />
                            Course Breakdown
                        </h2>
                        <div className="space-y-5">
                            {COURSES.map((course) => (
                                <div key={course.id}>
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className="text-xl shrink-0">{course.icon}</span>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center justify-between mb-1.5">
                                                <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">{course.title}</p>
                                                <span className="ml-2 shrink-0 text-sm font-bold" style={{ color: course.color }}>
                                                    {course.progress}%
                                                </span>
                                            </div>
                                            <div className="w-full bg-gray-100 dark:bg-gray-700/60 rounded-full h-2.5 overflow-hidden">
                                                <div
                                                    className="h-2.5 rounded-full transition-all duration-1000"
                                                    style={{ width: `${course.progress}%`, background: course.color }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
