import { useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCourseDetails, toggleLessonCompletion } from '../features/courses/coursesSlice';
import { ArrowLeft, PlayCircle, BookOpen, Clock, Award, Flame } from 'lucide-react';
import gsap from 'gsap';
import AnimatedBackground from '../components/AnimatedBackground';

// Custom visible tick/circle component
function LessonToggle({ done, onClick }) {
    return (
        <button
            onClick={onClick}
            className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-200 group-hover:scale-110 focus:outline-none"
            style={{
                background: done ? '#10b981' : 'transparent',
                border: done ? '2px solid #10b981' : '2px solid #d1d5db',
            }}
            aria-label={done ? 'Mark incomplete' : 'Mark complete'}
        >
            {done && (
                <svg
                    viewBox="0 0 12 10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-3.5 h-3.5"
                >
                    <path
                        d="M1 5L4.5 8.5L11 1.5"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            )}
        </button>
    );
}

export default function CourseDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const pageRef = useRef(null);

    const { currentCourse: course, currentCourseLessons: lessons, courseDetailsStatus: status } =
        useSelector((state) => state.courses);

    useEffect(() => {
        dispatch(fetchCourseDetails(id));
    }, [dispatch, id]);

    useEffect(() => {
        if (status === 'succeeded' && pageRef.current) {
            gsap.fromTo(
                pageRef.current.querySelectorAll('.lesson-row'),
                { opacity: 0, x: -24 },
                { opacity: 1, x: 0, stagger: 0.07, duration: 0.4, ease: 'power2.out', delay: 0.1 }
            );
        }
    }, [status]);

    if (status === 'loading' || status === 'idle') {
        return (
            <div className="relative">
                <AnimatedBackground />
                <div className="relative z-10 max-w-4xl mx-auto py-8 animate-pulse">
                    <div className="h-5 w-20 bg-gray-200 dark:bg-gray-700 rounded mb-8"></div>
                    <div className="glass-card rounded-3xl p-8 mb-8">
                        <div className="h-8 w-2/3 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
                        <div className="h-4 w-1/3 bg-gray-200 dark:bg-gray-700 rounded mb-8"></div>
                        <div className="h-10 bg-gray-100 dark:bg-gray-700 rounded-2xl"></div>
                    </div>
                    <div className="space-y-3">
                        {[1, 2, 3, 4, 5].map(i => (
                            <div key={i} className="h-20 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700"></div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (status === 'failed' || !course) {
        return (
            <div className="relative">
                <AnimatedBackground />
                <div className="relative z-10 max-w-4xl mx-auto py-20 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/30 text-red-500 mb-4">
                        <BookOpen size={28} />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Course not found</h2>
                    <p className="text-gray-500 dark:text-gray-400 mb-6 text-sm">The course doesn't exist or an error occurred.</p>
                    <button onClick={() => navigate('/dashboard')} className="btn-primary mx-auto w-auto inline-flex px-5">
                        <ArrowLeft size={16} /> Back to Dashboard
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="relative" ref={pageRef}>
            <AnimatedBackground />

            <div className="relative z-10 max-w-4xl mx-auto py-8">
                {/* Back */}
                <button
                    onClick={() => navigate('/dashboard')}
                    className="group flex items-center gap-2 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-8 transition-colors"
                >
                    <span className="p-1.5 rounded-full bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700 group-hover:scale-110 transition-transform">
                        <ArrowLeft size={14} />
                    </span>
                    Back to Dashboard
                </button>

                {/* Course Header */}
                <div className="glass-card rounded-3xl p-8 mb-8 overflow-hidden relative">
                    <div className="absolute -top-10 -right-10 w-52 h-52 bg-amber-400/10 dark:bg-amber-400/5 rounded-full blur-3xl pointer-events-none" />
                    <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-indigo-500/10 dark:bg-indigo-500/5 rounded-full blur-2xl pointer-events-none" />

                    <div className="relative">
                        <div className="flex items-center gap-3 mb-3">
                            <span className="px-3 py-1 text-xs font-bold uppercase tracking-widest rounded-full bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 border border-amber-100 dark:border-amber-800/30">
                                Technology
                            </span>
                            <span className="flex items-center gap-1 text-xs text-gray-400 dark:text-gray-500">
                                <Clock size={12} /> 2h 30m
                            </span>
                        </div>

                        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white mb-6 leading-tight tracking-tight">
                            {course.title}
                        </h1>

                        <div className="bg-gray-50/80 dark:bg-gray-900/50 rounded-2xl p-5 border border-gray-100 dark:border-gray-700/50 flex flex-col sm:flex-row items-start sm:items-center gap-5">
                            <div className="flex-1 w-full">
                                <div className="flex justify-between text-sm mb-2">
                                    <span className="font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-1.5">
                                        <Award size={15} className="text-amber-400" /> Your Progress
                                    </span>
                                    <span className="text-xl font-extrabold text-amber-400">{course.progress}%</span>
                                </div>
                                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                                    <div
                                        className="h-3 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 transition-all duration-700"
                                        style={{ width: `${course.progress}%` }}
                                    />
                                </div>
                            </div>
                            <div className="flex items-center gap-2 shrink-0">
                                <Flame size={18} className="text-orange-400" />
                                <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                                    <span className="text-gray-900 dark:text-white font-extrabold">{course.completedLessons.length}</span>
                                    <span className="text-gray-400"> / {course.totalLessons}</span>
                                    <span className="ml-1 text-xs text-gray-400">lessons</span>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Lessons */}
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <BookOpen size={20} className="text-amber-400" />
                    Course Content
                </h2>

                <div className="space-y-3">
                    {lessons.map((lesson, index) => {
                        const done = course.completedLessons.includes(lesson.id);
                        return (
                            <div
                                key={lesson.id}
                                className={`lesson-row group flex items-center gap-4 p-4 sm:p-5 rounded-2xl border transition-all duration-200 cursor-pointer ${done
                                        ? 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800/40'
                                        : 'bg-white dark:bg-gray-800/80 border-gray-100 dark:border-gray-700 hover:shadow-md hover:border-gray-200 dark:hover:border-gray-600'
                                    }`}
                                onClick={() => dispatch(toggleLessonCompletion(lesson.id))}
                            >
                                {/* Custom tick button */}
                                <LessonToggle
                                    done={done}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        dispatch(toggleLessonCompletion(lesson.id));
                                    }}
                                />

                                {/* Label */}
                                <div className="flex-1 min-w-0">
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">
                                        Lesson {index + 1}
                                    </span>
                                    <p className={`font-semibold mt-0.5 truncate transition-colors ${done
                                            ? 'line-through text-gray-400 dark:text-gray-500'
                                            : 'text-gray-900 dark:text-white group-hover:text-amber-500'
                                        }`}>
                                        {lesson.title}
                                    </p>
                                </div>

                                {/* Status badge */}
                                <div className={`shrink-0 hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${done
                                        ? 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400'
                                        : 'bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400'
                                    }`}>
                                    <PlayCircle size={13} />
                                    {done ? 'Completed' : 'Start'}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
