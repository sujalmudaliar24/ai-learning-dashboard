import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Link } from 'react-router-dom';
import { BookOpen, Clock, PlayCircle, CheckCircle } from 'lucide-react';

// SVG course illustrations — vibrant, themed per course
const CourseIllustrations = {
    1: (
        // AI Fundamentals — Neural network
        <svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <defs>
                <radialGradient id="g1" cx="50%" cy="50%" r="60%">
                    <stop offset="0%" stopColor="#6366f1" />
                    <stop offset="100%" stopColor="#1e1b4b" />
                </radialGradient>
                <filter id="glow1">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
            </defs>
            <rect width="400" height="200" fill="url(#g1)" />
            {/* Nodes */}
            {[[60, 100], [140, 40], [140, 100], [140, 160], [230, 60], [230, 140], [310, 100]].map(([x, y], i) => (
                <circle key={i} cx={x} cy={y} r="9" fill="none" stroke="#a5b4fc" strokeWidth="2" filter="url(#glow1)" />
            ))}
            {/* Connections */}
            {[[60, 100, 140, 40], [60, 100, 140, 100], [60, 100, 140, 160], [140, 40, 230, 60], [140, 40, 230, 140], [140, 100, 230, 60], [140, 100, 230, 140], [140, 160, 230, 60], [140, 160, 230, 140], [230, 60, 310, 100], [230, 140, 310, 100]].map(([x1, y1, x2, y2], i) => (
                <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#818cf8" strokeWidth="1.5" strokeOpacity="0.6" />
            ))}
            {/* Glowing center node */}
            <circle cx="310" cy="100" r="14" fill="#6366f1" opacity="0.8" filter="url(#glow1)" />
            <circle cx="310" cy="100" r="7" fill="#c7d2fe" />
            {/* Floating particles */}
            <circle cx="350" cy="30" r="3" fill="#a5b4fc" opacity="0.5" />
            <circle cx="30" cy="150" r="4" fill="#818cf8" opacity="0.4" />
            <circle cx="370" cy="170" r="2" fill="#c7d2fe" opacity="0.6" />
        </svg>
    ),
    2: (
        // Machine Learning — scatter plot / data
        <svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <defs>
                <linearGradient id="g2" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#b45309" />
                    <stop offset="100%" stopColor="#78350f" />
                </linearGradient>
                <filter id="glow2">
                    <feGaussianBlur stdDeviation="2.5" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
            </defs>
            <rect width="400" height="200" fill="url(#g2)" />
            {/* Grid lines */}
            {[40, 80, 120, 160].map(y => <line key={y} x1="30" y1={y} x2="380" y2={y} stroke="#fbbf24" strokeWidth="0.5" strokeOpacity="0.2" />)}
            {[80, 160, 240, 320].map(x => <line key={x} x1={x} y1="20" x2={x} y2="185" stroke="#fbbf24" strokeWidth="0.5" strokeOpacity="0.2" />)}
            {/* Regression line */}
            <line x1="40" y1="160" x2="360" y2="40" stroke="#fde68a" strokeWidth="2" strokeDasharray="6,3" strokeOpacity="0.7" />
            {/* Data points */}
            {[[60, 150], [90, 130], [130, 110], [160, 100], [200, 85], [240, 70], [270, 65], [310, 50], [340, 45]].map(([x, y], i) => (
                <circle key={i} cx={x} cy={y} r="6" fill="#f59e0b" opacity="0.85" filter="url(#glow2)" />
            ))}
            {/* Outliers */}
            {[[100, 60], [200, 150], [290, 100]].map(([x, y], i) => (
                <circle key={i} cx={x} cy={y} r="5" fill="#f43f5e" opacity="0.7" />
            ))}
            {/* Axes */}
            <line x1="30" y1="185" x2="380" y2="185" stroke="#fde68a" strokeWidth="1.5" strokeOpacity="0.5" />
            <line x1="30" y1="20" x2="30" y2="185" stroke="#fde68a" strokeWidth="1.5" strokeOpacity="0.5" />
        </svg>
    ),
    3: (
        // React — atom-style component tree
        <svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <defs>
                <radialGradient id="g3" cx="50%" cy="50%" r="70%">
                    <stop offset="0%" stopColor="#0369a1" />
                    <stop offset="100%" stopColor="#0c1a2e" />
                </radialGradient>
                <filter id="glow3">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
            </defs>
            <rect width="400" height="200" fill="url(#g3)" />
            {/* React atom ellipses */}
            <ellipse cx="200" cy="100" rx="90" ry="35" fill="none" stroke="#38bdf8" strokeWidth="2" strokeOpacity="0.7" />
            <ellipse cx="200" cy="100" rx="90" ry="35" fill="none" stroke="#38bdf8" strokeWidth="2" strokeOpacity="0.7" transform="rotate(60 200 100)" />
            <ellipse cx="200" cy="100" rx="90" ry="35" fill="none" stroke="#38bdf8" strokeWidth="2" strokeOpacity="0.7" transform="rotate(-60 200 100)" />
            {/* Center */}
            <circle cx="200" cy="100" r="12" fill="#0ea5e9" filter="url(#glow3)" />
            <circle cx="200" cy="100" r="6" fill="#e0f2fe" />
            {/* Orbital electrons */}
            <circle cx="290" cy="100" r="5" fill="#7dd3fc" filter="url(#glow3)" />
            <circle cx="155" cy="68" r="5" fill="#38bdf8" filter="url(#glow3)" />
            <circle cx="156" cy="132" r="5" fill="#bae6fd" filter="url(#glow3)" />
            {/* Floating brackets */}
            <text x="50" y="80" fill="#7dd3fc" fontSize="22" opacity="0.5" fontFamily="monospace">{'</'}</text>
            <text x="320" y="140" fill="#7dd3fc" fontSize="22" opacity="0.5" fontFamily="monospace">{'>'}</text>
            <text x="60" y="155" fill="#38bdf8" fontSize="14" opacity="0.3" fontFamily="monospace">{'{ state }'}</text>
        </svg>
    ),
    4: (
        // Advanced CSS & Animations — Abstract floating geometry and keyframes
        <svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <defs>
                <linearGradient id="g4" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#be185d" />
                    <stop offset="100%" stopColor="#4c0519" />
                </linearGradient>
                <filter id="glow4">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
            </defs>
            <rect width="400" height="200" fill="url(#g4)" />
            {/* Keyframe bezier curve */}
            <path d="M 60 140 C 120 140 180 50 250 50 S 320 150 380 150" fill="none" stroke="#f43f5e" strokeWidth="3" opacity="0.6" strokeDasharray="5,5" />
            {/* Geometric interface elements */}
            <rect x="70" y="50" width="80" height="80" rx="16" fill="none" stroke="#fb7185" strokeWidth="2" transform="rotate(15 110 90)" />
            <rect x="90" y="70" width="80" height="80" rx="16" fill="#e11d48" opacity="0.8" filter="url(#glow4)" transform="rotate(-10 130 110)" />
            {/* Glowing circle (color picker / palette) */}
            <circle cx="280" cy="80" r="30" fill="#fb7185" filter="url(#glow4)" opacity="0.8" />
            <circle cx="280" cy="80" r="15" fill="#fff" opacity="0.9" />
            <circle cx="295" cy="70" r="6" fill="#be185d" />
            {/* Timeline handles */}
            <circle cx="60" cy="140" r="5" fill="#fda4af" />
            <circle cx="250" cy="50" r="5" fill="#fda4af" />
            <line x1="250" y1="50" x2="180" y2="50" stroke="#fb7185" strokeWidth="1.5" />
        </svg>
    ),
    5: (
        // Node.js Backend Mastery — Server connections, nodes, database stacks
        <svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <defs>
                <linearGradient id="g5" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#15803d" />
                    <stop offset="100%" stopColor="#052e16" />
                </linearGradient>
                <filter id="glow5">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
            </defs>
            <rect width="400" height="200" fill="url(#g5)" />
            {/* Hexagonal server nodes */}
            <polygon points="120,60 145,45 170,60 170,90 145,105 120,90" fill="#22c55e" opacity="0.7" filter="url(#glow5)" />
            <polygon points="200,90 225,75 250,90 250,120 225,135 200,120" fill="none" stroke="#4ade80" strokeWidth="2" opacity="0.9" />
            <polygon points="270,50 290,40 310,50 310,70 290,80 270,70" fill="#16a34a" opacity="0.8" />

            {/* Node flow connections */}
            <line x1="170" y1="75" x2="200" y2="100" stroke="#86efac" strokeWidth="1.5" strokeDasharray="3,3" opacity="0.6" />
            <line x1="240" y1="85" x2="280" y2="65" stroke="#86efac" strokeWidth="1.5" strokeDasharray="3,3" opacity="0.6" />

            {/* Database Engine stack */}
            <ellipse cx="120" cy="140" rx="35" ry="12" fill="#16a34a" opacity="0.9" />
            <path d="M 85 140 L 85 155 A 35 12 0 0 0 155 155 L 155 140" fill="none" stroke="#4ade80" strokeWidth="1.5" />
            <path d="M 85 155 L 85 170 A 35 12 0 0 0 155 170 L 155 155" fill="none" stroke="#4ade80" strokeWidth="1.5" />

            {/* API calls/data pips */}
            <circle cx="185" cy="87" r="2.5" fill="#fff" filter="url(#glow5)" />
            <circle cx="260" cy="75" r="2" fill="#fff" />
        </svg>
    ),
    6: (
        // Fullstack Web Development — Screen & Server ecosystem
        <svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <defs>
                <linearGradient id="g6" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#6d28d9" />
                    <stop offset="100%" stopColor="#2e1065" />
                </linearGradient>
                <filter id="glow6">
                    <feGaussianBlur stdDeviation="4" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
            </defs>
            <rect width="400" height="200" fill="url(#g6)" />

            {/* Frontend App Window */}
            <rect x="40" y="50" width="130" height="90" rx="6" fill="none" stroke="#a78bfa" strokeWidth="2" opacity="0.7" />
            <line x1="40" y1="70" x2="170" y2="70" stroke="#a78bfa" strokeWidth="2" opacity="0.7" />
            <circle cx="55" cy="60" r="3" fill="#fca5a5" />
            <circle cx="65" cy="60" r="3" fill="#fcd34d" />
            <circle cx="75" cy="60" r="3" fill="#86efac" />

            <rect x="55" y="85" width="40" height="6" rx="3" fill="#8b5cf6" opacity="0.8" />
            <rect x="55" y="100" width="80" height="6" rx="3" fill="#a78bfa" opacity="0.4" />
            <rect x="55" y="115" width="60" height="6" rx="3" fill="#a78bfa" opacity="0.4" />

            {/* API Connection network */}
            <path d="M 170 95 Q 220 70 270 90" fill="none" stroke="#c4b5fd" strokeWidth="2.5" strokeDasharray="6,4" opacity="0.6" />

            {/* Glowing API pipeline packet */}
            <circle cx="220" cy="80" r="4" fill="#ddd6fe" filter="url(#glow6)" />

            {/* Backend Server block */}
            <rect x="270" y="60" width="80" height="100" rx="8" fill="none" stroke="#c4b5fd" strokeWidth="2" />
            <rect x="280" y="75" width="60" height="15" rx="4" fill="#8b5cf6" filter="url(#glow6)" />
            <rect x="280" y="100" width="60" height="15" rx="4" fill="#a78bfa" opacity="0.3" />
            <rect x="280" y="125" width="60" height="15" rx="4" fill="#a78bfa" opacity="0.3" />

            <circle cx="325" cy="82.5" r="3" fill="#fff" />
        </svg>
    ),
};

export default function CourseCard({ course }) {
    const cardRef = useRef(null);
    const imgRef = useRef(null);

    useEffect(() => {
        if (!cardRef.current) return;
        const card = cardRef.current;

        const enterHandler = () => {
            gsap.to(imgRef.current, { scale: 1.06, duration: 0.4, ease: 'power2.out' });
            gsap.to(card, { y: -6, boxShadow: '0 24px 48px rgba(0,0,0,0.22)', duration: 0.3, ease: 'power2.out' });
        };
        const leaveHandler = () => {
            gsap.to(imgRef.current, { scale: 1, duration: 0.4, ease: 'power2.out' });
            gsap.to(card, { y: 0, boxShadow: '0 4px 24px rgba(0,0,0,0.08)', duration: 0.3, ease: 'power2.out' });
        };

        card.addEventListener('mouseenter', enterHandler);
        card.addEventListener('mouseleave', leaveHandler);
        return () => {
            card.removeEventListener('mouseenter', enterHandler);
            card.removeEventListener('mouseleave', leaveHandler);
        };
    }, []);

    return (
        <Link
            to={`/course/${course.id}`}
            ref={cardRef}
            className="group block bg-white dark:bg-gray-800/90 rounded-2xl overflow-hidden shadow-md border border-gray-100 dark:border-gray-700/50 will-change-transform"
            style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.08)' }}
        >
            {/* Image */}
            <div className="h-44 overflow-hidden relative">
                <div ref={imgRef} className="w-full h-full will-change-transform">
                    {CourseIllustrations[course.id]}
                </div>
                {/* Badge & completion */}
                <div className="absolute top-3 left-3">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-black/30 text-white backdrop-blur-sm border border-white/10">
                        Course #{course.id}
                    </span>
                </div>
                {course.progress === 100 && (
                    <div className="absolute top-3 right-3">
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/80 text-white backdrop-blur-sm">
                            <CheckCircle size={12} /> Completed
                        </span>
                    </div>
                )}
                {/* Gradient fade at bottom of image */}
                <div className="absolute bottom-0 inset-x-0 h-10 bg-gradient-to-t from-white dark:from-gray-800 to-transparent" />
            </div>

            {/* Card Body */}
            <div className="p-5 pt-3">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1 group-hover:text-accent transition-colors duration-200 line-clamp-2 leading-snug">
                    {course.title}
                </h3>

                <div className="flex items-center text-xs text-gray-400 dark:text-gray-500 mb-5 gap-3">
                    <span className="flex items-center gap-1">
                        <BookOpen size={13} /> {course.totalLessons} Lessons
                    </span>
                    <span className="flex items-center gap-1">
                        <Clock size={13} /> 2h 30m
                    </span>
                </div>

                {/* Progress */}
                <div className="space-y-1.5">
                    <div className="flex justify-between text-xs">
                        <span className="font-medium text-gray-600 dark:text-gray-400">Progress</span>
                        <span className="font-bold text-accent">{course.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-100 dark:bg-gray-700/70 rounded-full h-2 overflow-hidden">
                        <div
                            className="h-2 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 transition-all duration-1000 ease-out"
                            style={{ width: `${course.progress}%` }}
                        />
                    </div>
                </div>
            </div>

            {/* Card Footer */}
            <div className="px-5 py-3.5 border-t border-gray-100 dark:border-gray-700/50 bg-gray-50/50 dark:bg-gray-900/30 flex items-center gap-1.5 text-accent text-sm font-semibold group-hover:text-orange-400 transition-colors">
                <PlayCircle size={17} />
                {course.progress === 0 ? 'Start Course' : course.progress === 100 ? 'Review Course' : 'Continue Learning'}
            </div>
        </Link>
    );
}
