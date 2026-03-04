import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { COURSES } from '../../data/courses';
import { LESSONS } from '../../data/lessons';

// Merge Data
export const MOCK_COURSES = COURSES.map(course => {
    const lessons = LESSONS[course.id] || [];
    const completedCount = Math.floor((course.progress / 100) * lessons.length);
    return {
        ...course,
        completedLessons: lessons.slice(0, completedCount).map(l => l.id),
        totalLessons: lessons.length
    };
});

export const MOCK_LESSONS = LESSONS;

// Simulate API call
export const fetchCourses = createAsyncThunk('courses/fetchCourses', async () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(MOCK_COURSES);
        }, 1000); // 1s delay to show skeletons
    });
});

export const fetchCourseDetails = createAsyncThunk('courses/fetchCourseDetails', async (courseId) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const course = MOCK_COURSES.find(c => c.id === parseInt(courseId));
            if (course) {
                resolve({ course, lessons: MOCK_LESSONS[courseId] });
            } else {
                reject(new Error('Course not found'));
            }
        }, 800);
    });
});

const coursesSlice = createSlice({
    name: 'courses',
    initialState: {
        items: [],
        searchQuery: '',
        status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
        error: null,

        currentCourse: null,
        currentCourseLessons: [],
        courseDetailsStatus: 'idle',
    },
    reducers: {
        setSearchQuery: (state, action) => {
            state.searchQuery = action.payload;
        },
        toggleLessonCompletion: (state, action) => {
            if (state.currentCourse) {
                const lessonId = action.payload;
                const index = state.currentCourse.completedLessons.indexOf(lessonId);
                if (index > -1) {
                    state.currentCourse.completedLessons.splice(index, 1);
                } else {
                    state.currentCourse.completedLessons.push(lessonId);
                }

                // Update progress
                state.currentCourse.progress = Math.round(
                    (state.currentCourse.completedLessons.length / state.currentCourse.totalLessons) * 100
                );

                // Update item in list as well if it exists
                const itemIndex = state.items.findIndex(c => c.id === state.currentCourse.id);
                if (itemIndex > -1) {
                    state.items[itemIndex] = { ...state.currentCourse };
                }
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCourses.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCourses.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(fetchCourses.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(fetchCourseDetails.pending, (state) => {
                state.courseDetailsStatus = 'loading';
            })
            .addCase(fetchCourseDetails.fulfilled, (state, action) => {
                state.courseDetailsStatus = 'succeeded';
                state.currentCourse = action.payload.course;
                state.currentCourseLessons = action.payload.lessons;
            })
            .addCase(fetchCourseDetails.rejected, (state, action) => {
                state.courseDetailsStatus = 'failed';
                state.error = action.error.message;
            });
    },
});

export const { setSearchQuery, toggleLessonCompletion } = coursesSlice.actions;
export default coursesSlice.reducer;
