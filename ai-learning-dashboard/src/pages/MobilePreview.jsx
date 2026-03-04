import { useState, useEffect, useRef } from "react";
import { useTheme } from "../ThemeContext";
import { useSelector } from "react-redux";
import { COURSES } from "../data/courses";
import { LESSONS } from "../data/lessons";
import { CourseIllustrations } from "../components/CourseIllustrations";
import gsap from "gsap";
import AnimatedBackground from "../components/AnimatedBackground";

// ─────────────────────────────────────────────
// Inline styles helpers
// ─────────────────────────────────────────────
function usePhoneTheme() {
    const { isDarkMode } = useTheme();
    return {
        mBg: isDarkMode ? "#0F172A" : "#F3F4F6",
        mCard: isDarkMode ? "#1E293B" : "#FFFFFF",
        mText: isDarkMode ? "#F1F5F9" : "#1E293B",
        mMuted: isDarkMode ? "#94A3B8" : "#64748B",
        mBorder: isDarkMode ? "#334155" : "#E2E8F0",
        mNavBg: isDarkMode ? "#0F172A" : "#1F2937",
        isDark: isDarkMode,
    };
}

// ─────────────────────────────────────────────
// Screens
// ─────────────────────────────────────────────

function HomeScreen({ t, onCourseClick }) {
    const avg = Math.round(COURSES.reduce((s, c) => s + c.progress, 0) / COURSES.length);

    return (
        <div style={{ padding: "14px 14px 0" }}>
            <p style={{ color: t.mText, fontWeight: 700, fontSize: 15, marginBottom: 2 }}>Welcome back 👋</p>
            <p style={{ color: t.mMuted, fontSize: 11, marginBottom: 14 }}>Continue your learning journey</p>

            {/* Search */}
            <div style={{
                background: t.mCard, borderRadius: 10, padding: "8px 12px",
                display: "flex", alignItems: "center", gap: 8, marginBottom: 15,
                border: `1px solid ${t.mBorder}`,
            }}>
                <span style={{ color: t.mMuted, fontSize: 13 }}>🔍</span>
                <span style={{ color: t.mMuted, fontSize: 12 }}>Search courses...</span>
            </div>

            {/* Stats row */}
            <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
                {[
                    { icon: "📚", value: COURSES.length, label: "Courses" },
                    { icon: "📈", value: `${avg}%`, label: "Avg Progress" },
                ].map((s, i) => (
                    <div key={i} style={{
                        flex: 1, background: t.mCard, borderRadius: 12,
                        padding: "10px 12px", border: `1px solid ${t.mBorder}`,
                    }}>
                        <span style={{ fontSize: 16 }}>{s.icon}</span>
                        <p style={{ color: t.mText, fontSize: 15, fontWeight: 800, margin: "4px 0 2px" }}>{s.value}</p>
                        <p style={{ color: t.mMuted, fontSize: 9 }}>{s.label}</p>
                    </div>
                ))}
            </div>

            <p style={{ color: t.mText, fontWeight: 700, fontSize: 13, marginBottom: 10 }}>Your Courses</p>

            {COURSES.map((course) => (
                <div
                    key={course.id}
                    onClick={() => onCourseClick(course)}
                    style={{
                        background: t.mCard, borderRadius: 14, padding: "12px 14px",
                        marginBottom: 10, border: `1px solid ${t.mBorder}`,
                        cursor: "pointer", transition: "transform 0.15s, box-shadow 0.15s",
                    }}
                    onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.15)"; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
                >
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                        <div style={{
                            width: 36, height: 36, borderRadius: 10, overflow: "hidden",
                            background: `${course.color}20`,
                            display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18,
                        }}>
                            {CourseIllustrations[course.id] || course.icon}
                        </div>
                        <div style={{ flex: 1 }}>
                            <p style={{ color: t.mText, fontSize: 12, fontWeight: 700, marginBottom: 2 }}>{course.title}</p>
                            <p style={{ color: t.mMuted, fontSize: 10 }}>{LESSONS[course.id]?.length} lessons</p>
                        </div>
                        <span style={{
                            background: `${course.color}20`, borderRadius: 99,
                            padding: "3px 8px", color: course.color, fontSize: 11, fontWeight: 800,
                        }}>{course.progress}%</span>
                    </div>
                    {/* Progress bar */}
                    <div style={{ background: t.isDark ? "#334155" : "#E2E8F0", borderRadius: 99, height: 5, overflow: "hidden" }}>
                        <div style={{ width: `${course.progress}%`, height: "100%", background: course.color, borderRadius: 99 }} />
                    </div>
                    <p style={{ color: course.color, fontSize: 11, marginTop: 8, fontWeight: 600 }}>
                        {course.progress === 100 ? "✅ Completed" : "▶ Continue →"}
                    </p>
                </div>
            ))}
        </div>
    );
}

function CourseDetailScreen({ t, course, onBack }) {
    const lessons = LESSONS[course.id] || [];
    const [done, setDone] = useState(new Set(
        Array.from({ length: Math.round(lessons.length * course.progress / 100) }, (_, i) => i)
    ));

    const toggle = (i) => {
        setDone(prev => {
            const next = new Set(prev);
            next.has(i) ? next.delete(i) : next.add(i);
            return next;
        });
    };

    const progress = lessons.length ? Math.round((done.size / lessons.length) * 100) : 0;

    return (
        <div style={{ padding: "14px 14px 0" }}>
            {/* Back button */}
            <button
                onClick={onBack}
                style={{
                    background: t.mCard, border: `1px solid ${t.mBorder}`,
                    borderRadius: 8, padding: "5px 10px 5px 6px",
                    display: "flex", alignItems: "center", gap: 6,
                    cursor: "pointer", marginBottom: 14,
                    color: t.mMuted, fontSize: 11, fontWeight: 600,
                }}
            >
                ← Back
            </button>

            {/* Course header */}
            <div style={{
                background: t.mCard, borderRadius: 14, padding: "14px",
                border: `1px solid ${t.mBorder}`, marginBottom: 12,
            }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                    <div style={{ width: 56, height: 56, borderRadius: 12, overflow: 'hidden' }}>
                        {CourseIllustrations[course.id] || <span style={{ fontSize: 28 }}>{course.icon}</span>}
                    </div>
                    <div>
                        <p style={{ color: t.mText, fontWeight: 700, fontSize: 13 }}>{course.title}</p>
                        <p style={{ color: t.mMuted, fontSize: 10 }}>{lessons.length} lessons</p>
                    </div>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                    <span style={{ color: t.mMuted, fontSize: 10 }}>Progress</span>
                    <span style={{ color: course.color, fontSize: 10, fontWeight: 700 }}>{progress}%</span>
                </div>
                <div style={{ background: t.isDark ? "#334155" : "#E2E8F0", borderRadius: 99, height: 5, overflow: "hidden" }}>
                    <div style={{ width: `${progress}%`, height: "100%", background: course.color, borderRadius: 99, transition: "width 0.4s ease" }} />
                </div>
            </div>

            {/* Lessons list */}
            <p style={{ color: t.mText, fontWeight: 700, fontSize: 12, marginBottom: 8 }}>Lessons</p>
            {lessons.map((lesson, i) => (
                <div
                    key={lesson.id}
                    onClick={() => toggle(i)}
                    style={{
                        background: done.has(i) ? `${course.color}15` : t.mCard,
                        borderRadius: 10, padding: "10px 12px", marginBottom: 7,
                        border: `1px solid ${done.has(i) ? course.color + "40" : t.mBorder}`,
                        display: "flex", alignItems: "center", gap: 10,
                        cursor: "pointer", transition: "all 0.2s",
                    }}
                >
                    {/* Custom tick */}
                    <div style={{
                        width: 22, height: 22, borderRadius: "50%", flexShrink: 0,
                        background: done.has(i) ? course.color : "transparent",
                        border: `2px solid ${done.has(i) ? course.color : t.mBorder}`,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        transition: "all 0.2s",
                    }}>
                        {done.has(i) && (
                            <svg viewBox="0 0 10 8" style={{ width: 11, height: 11 }}>
                                <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" fill="none" />
                            </svg>
                        )}
                    </div>
                    <div style={{ flex: 1 }}>
                        <p style={{
                            color: done.has(i) ? t.mMuted : t.mText,
                            fontSize: 11, fontWeight: 600,
                            textDecoration: done.has(i) ? "line-through" : "none",
                        }}>
                            {lesson.title}
                        </p>
                        <p style={{ color: t.mMuted, fontSize: 9 }}>Lesson {i + 1}</p>
                    </div>
                    <span style={{ color: done.has(i) ? course.color : t.mMuted, fontSize: 10 }}>
                        {done.has(i) ? "✓" : "▶"}
                    </span>
                </div>
            ))}
        </div>
    );
}

function CoursesScreen({ t, onCourseClick }) {
    return (
        <div style={{ padding: "14px 14px 0" }}>
            <p style={{ color: t.mText, fontWeight: 700, fontSize: 15, marginBottom: 14 }}>📖 All Courses</p>
            {COURSES.map(course => (
                <div
                    key={course.id}
                    onClick={() => onCourseClick(course)}
                    style={{
                        background: t.mCard, borderRadius: 14, padding: "14px",
                        marginBottom: 12, border: `1px solid ${t.mBorder}`,
                        cursor: "pointer",
                    }}
                    onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.01)"; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; }}
                >
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <div style={{
                            width: 44, height: 44, borderRadius: 12, overflow: "hidden",
                            background: `${course.color}20`,
                            display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22,
                        }}>
                            {CourseIllustrations[course.id] || course.icon}
                        </div>
                        <div style={{ flex: 1 }}>
                            <p style={{ color: t.mText, fontSize: 13, fontWeight: 700 }}>{course.title}</p>
                            <p style={{ color: t.mMuted, fontSize: 10, marginTop: 2 }}>
                                {LESSONS[course.id]?.length} lessons • {course.progress}% done
                            </p>
                            <div style={{ marginTop: 8, background: t.isDark ? "#334155" : "#E2E8F0", borderRadius: 99, height: 4, overflow: "hidden" }}>
                                <div style={{ width: `${course.progress}%`, height: "100%", background: course.color, borderRadius: 99 }} />
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

function ProfileScreen({ t }) {
    const user = useSelector(s => s.auth.user);
    const email = user?.email || "guest@example.com";
    const avg = Math.round(COURSES.reduce((s, c) => s + c.progress, 0) / COURSES.length);
    const r = 34, circ = 2 * Math.PI * r;
    const offset = circ - (avg / 100) * circ;

    return (
        <div style={{ padding: "16px 14px 0" }}>
            {/* Avatar */}
            <div style={{ textAlign: "center", marginBottom: 16 }}>
                <div style={{
                    width: 64, height: 64, borderRadius: 18,
                    background: "linear-gradient(135deg,#F59E0B,#F97316)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    margin: "0 auto 10px",
                    boxShadow: "0 8px 20px rgba(245,158,11,0.35)",
                }}>
                    {/* User icon SVG */}
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                        style={{ width: 34, height: 34, stroke: "white", strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round" }}>
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                    </svg>
                </div>
                <p style={{ color: t.mText, fontWeight: 700, fontSize: 14 }}>
                    {email.split("@")[0].replace(/[._]/g, " ").replace(/\b\w/g, c => c.toUpperCase())}
                </p>
                <p style={{ color: t.mMuted, fontSize: 11, marginTop: 2 }}>{email}</p>
            </div>

            {/* Circular progress */}
            <div style={{
                background: t.mCard, borderRadius: 16, padding: "16px",
                border: `1px solid ${t.mBorder}`, marginBottom: 12,
                display: "flex", alignItems: "center", gap: 16,
            }}>
                <div style={{ position: "relative", flexShrink: 0 }}>
                    <svg width={80} height={80} style={{ transform: "rotate(-90deg)" }}>
                        <circle cx={40} cy={40} r={r} fill="none" stroke={t.isDark ? "#334155" : "#E2E8F0"} strokeWidth={7} />
                        <circle cx={40} cy={40} r={r} fill="none" stroke="#F59E0B" strokeWidth={7}
                            strokeLinecap="round" strokeDasharray={circ} strokeDashoffset={offset}
                            style={{ transition: "stroke-dashoffset 1s ease" }} />
                    </svg>
                    <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                        <span style={{ color: t.mText, fontWeight: 800, fontSize: 15 }}>{avg}%</span>
                    </div>
                </div>
                <div>
                    <p style={{ color: t.mText, fontWeight: 700, fontSize: 13 }}>Overall Progress</p>
                    <p style={{ color: t.mMuted, fontSize: 10, marginTop: 3 }}>{COURSES.length} courses enrolled</p>
                    <p style={{ color: "#10B981", fontSize: 10, marginTop: 3, fontWeight: 600 }}>
                        {COURSES.filter(c => c.progress === 100).length} completed ✓
                    </p>
                </div>
            </div>

            {/* Per-course */}
            {COURSES.map(course => (
                <div key={course.id} style={{
                    background: t.mCard, borderRadius: 12, padding: "10px 12px",
                    border: `1px solid ${t.mBorder}`, marginBottom: 8,
                    display: "flex", alignItems: "center", gap: 10,
                }}>
                    <span style={{ fontSize: 18 }}>{course.icon}</span>
                    <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                            <p style={{ color: t.mText, fontSize: 11, fontWeight: 600 }}>{course.title}</p>
                            <span style={{ color: course.color, fontSize: 10, fontWeight: 700 }}>{course.progress}%</span>
                        </div>
                        <div style={{ background: t.isDark ? "#334155" : "#E2E8F0", borderRadius: 99, height: 4, overflow: "hidden" }}>
                            <div style={{ width: `${course.progress}%`, height: "100%", background: course.color, borderRadius: 99 }} />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

// ─────────────────────────────────────────────
// Main Component
// ─────────────────────────────────────────────
const TABS = [
    { id: "home", label: "Home", emoji: "🏠" },
    { id: "courses", label: "Courses", emoji: "📖" },
    { id: "profile", label: "Profile", emoji: "👤" },
];

export default function MobilePreview() {
    const { isDarkMode } = useTheme();
    const t = usePhoneTheme();
    const [activeTab, setActiveTab] = useState("home");
    const [detailCourse, setDetailCourse] = useState(null);
    const phoneRef = useRef(null);
    const screenRef = useRef(null);

    // Phone entrance animation
    useEffect(() => {
        gsap.fromTo(phoneRef.current,
            { y: 60, opacity: 0, scale: 0.93 },
            { y: 0, opacity: 1, scale: 1, duration: 0.7, ease: "back.out(1.4)" }
        );
    }, []);

    // Screen transition on tab/screen change
    const switchScreen = (fn) => {
        gsap.to(screenRef.current, {
            opacity: 0, y: 10, duration: 0.15, ease: "power2.in",
            onComplete: () => {
                fn();
                gsap.fromTo(screenRef.current,
                    { opacity: 0, y: 12 },
                    { opacity: 1, y: 0, duration: 0.25, ease: "power2.out" }
                );
            },
        });
    };

    const handleTabClick = (tabId) => {
        if (tabId === activeTab && !detailCourse) return;
        switchScreen(() => { setDetailCourse(null); setActiveTab(tabId); });
    };

    const handleCourseClick = (course) => {
        switchScreen(() => setDetailCourse(course));
    };

    const handleBack = () => {
        switchScreen(() => setDetailCourse(null));
    };

    const renderScreen = () => {
        if (detailCourse) return <CourseDetailScreen t={t} course={detailCourse} onBack={handleBack} />;
        if (activeTab === "home") return <HomeScreen t={t} onCourseClick={handleCourseClick} />;
        if (activeTab === "courses") return <CoursesScreen t={t} onCourseClick={handleCourseClick} />;
        if (activeTab === "profile") return <ProfileScreen t={t} />;
    };

    return (
        <div className="relative min-h-screen">
            <AnimatedBackground />
            <div className="relative z-10" style={{ padding: "28px 32px", animation: "fadeIn 0.4s ease" }}>
                <h2 style={{ color: isDarkMode ? "#F9FAFB" : "#111827", fontSize: 22, fontWeight: 800, marginBottom: 6 }}>
                    📱 React Native Preview
                </h2>
                <p style={{ color: t.mMuted, fontSize: 13, marginBottom: 32 }}>
                    Tap the bottom tabs and course cards — it's interactive!
                </p>

                <div style={{ display: "flex", justifyContent: "center" }}>
                    <div
                        ref={phoneRef}
                        style={{
                            width: 320,
                            background: "#1F2937",
                            borderRadius: 44,
                            padding: "16px 4px 12px",
                            boxShadow: "0 32px 80px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.05)",
                            border: "8px solid #374151",
                        }}
                    >
                        {/* Notch */}
                        <div style={{ display: "flex", justifyContent: "center", marginBottom: 8 }}>
                            <div style={{ width: 100, height: 22, background: "#374151", borderRadius: 11 }} />
                        </div>

                        {/* Screen */}
                        <div style={{ background: t.mBg, borderRadius: 32, overflow: "hidden" }}>
                            {/* App bar */}
                            <div style={{
                                background: "#1F2937", padding: "13px 18px",
                                display: "flex", justifyContent: "space-between", alignItems: "center",
                                borderBottom: "1px solid #374151",
                            }}>
                                <span style={{ color: "#F59E0B", fontWeight: 800, fontSize: 15 }}>🎓 AILearn</span>
                                <div style={{ display: "flex", gap: 6 }}>
                                    {[1, 2, 3].map(i => <div key={i} style={{ width: 5, height: 5, borderRadius: "50%", background: "#4B5563" }} />)}
                                </div>
                            </div>

                            {/* Scrollable screen area */}
                            <div
                                ref={screenRef}
                                style={{ minHeight: 500, maxHeight: 520, overflowY: "auto", overflowX: "hidden" }}
                            >
                                {renderScreen()}
                                <div style={{ height: 16 }} />
                            </div>

                            {/* Bottom tab bar */}
                            <div style={{
                                background: isDarkMode ? "#0F172A" : "#1F2937",
                                display: "flex", justifyContent: "space-around",
                                padding: "10px 0 14px",
                                borderTop: "1px solid #334155",
                            }}>
                                {TABS.map(tab => {
                                    const isActive = activeTab === tab.id && !detailCourse;
                                    return (
                                        <button
                                            key={tab.id}
                                            onClick={() => handleTabClick(tab.id)}
                                            style={{
                                                background: "none", border: "none",
                                                cursor: "pointer", textAlign: "center",
                                                padding: "4px 12px", borderRadius: 8,
                                                transition: "background 0.2s",
                                            }}
                                        >
                                            <p style={{ fontSize: 20, marginBottom: 3 }}>{tab.emoji}</p>
                                            <p style={{ color: isActive ? "#F59E0B" : "#6B7280", fontSize: 9, fontWeight: isActive ? 700 : 400 }}>
                                                {tab.label}
                                            </p>
                                            {isActive && (
                                                <div style={{ width: 4, height: 4, borderRadius: "50%", background: "#F59E0B", margin: "3px auto 0" }} />
                                            )}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Home indicator */}
                        <div style={{ display: "flex", justifyContent: "center", marginTop: 12 }}>
                            <div style={{ width: 80, height: 4, background: "#4B5563", borderRadius: 2 }} />
                        </div>
                    </div>
                </div>

                <p style={{ color: t.mMuted, fontSize: 12, textAlign: "center", marginTop: 24 }}>
                    Simulates a React Native StyleSheet layout • Tap lessons to mark them complete
                </p>
            </div>
        </div>
    );
}
