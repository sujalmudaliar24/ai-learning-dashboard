import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Link } from 'react-router-dom';
import { BookOpen, Clock, PlayCircle, CheckCircle } from 'lucide-react';
import { CourseIllustrations } from './CourseIllustrations';

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
                    {CourseIllustrations[course.id] || <div style={{ width: '100%', height: '100%', backgroundColor: course.color }} />}
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
