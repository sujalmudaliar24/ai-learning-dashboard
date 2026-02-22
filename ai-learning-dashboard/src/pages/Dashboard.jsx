import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCourses } from '../features/courses/coursesSlice';
import { BookOpen } from 'lucide-react';
import AnimatedBackground from '../components/AnimatedBackground';
import CourseCard from '../components/CourseCard';

export default function Dashboard() {
    const dispatch = useDispatch();
    const { items, status, searchQuery } = useSelector((state) => state.courses);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchCourses());
        }
    }, [status, dispatch]);

    const filteredCourses = items.filter(course =>
        course.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="relative">
            <AnimatedBackground />

            <div className="relative z-10 max-w-7xl mx-auto py-8">
                {/* Header */}
                <div className="mb-10">
                    <p className="text-xs font-bold uppercase tracking-widest text-accent mb-2">Your progress</p>
                    <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-2">
                        My Learning Path
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 text-base">
                        Pick up where you left off. Every lesson counts.
                    </p>
                </div>

                {/* Stats row */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-10">
                    {[
                        { label: 'Enrolled Courses', value: items.length },
                        { label: 'Avg. Progress', value: items.length ? `${Math.round(items.reduce((s, c) => s + c.progress, 0) / items.length)}%` : '—' },
                        { label: 'Completed', value: items.filter(c => c.progress === 100).length },
                    ].map(({ label, value }) => (
                        <div
                            key={label}
                            className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl px-5 py-4 border border-gray-100 dark:border-gray-700/60 shadow-sm"
                        >
                            <p className="text-2xl font-extrabold text-gray-900 dark:text-white">{value}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{label}</p>
                        </div>
                    ))}
                </div>

                {/* Course Grid */}
                {status === 'loading' || status === 'idle' ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-700 animate-pulse">
                                <div className="h-44 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600" />
                                <div className="p-5 space-y-3">
                                    <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
                                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
                                    <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full w-full mt-4" />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : filteredCourses.length === 0 ? (
                    <div className="text-center py-16 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl border border-gray-100 dark:border-gray-700">
                        <BookOpen size={48} className="mx-auto text-gray-300 dark:text-gray-600 mb-4" />
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">No courses found</h3>
                        <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm">Try adjusting your search query</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredCourses.map((course) => (
                            <CourseCard key={course.id} course={course} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
