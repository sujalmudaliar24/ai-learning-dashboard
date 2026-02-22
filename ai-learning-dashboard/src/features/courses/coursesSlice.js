import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Mock Data
export const MOCK_COURSES = [
    { id: 1, title: 'AI Fundamentals', progress: 60, completedLessons: [1, 2, 3], totalLessons: 5 },
    { id: 2, title: 'Machine Learning Basics', progress: 20, completedLessons: [1], totalLessons: 5 },
    { id: 3, title: 'React for Beginners', progress: 90, completedLessons: [1, 2, 3, 4], totalLessons: 5 },
];

export const MOCK_LESSONS = {
    1: [
        { id: 1, title: 'Introduction to AI' },
        { id: 2, title: 'History of AI' },
        { id: 3, title: 'Types of AI' },
        { id: 4, title: 'AI Ethics' },
        { id: 5, title: 'Future of AI' },
    ],
    2: [
        { id: 1, title: 'What is Machine Learning?' },
        { id: 2, title: 'Supervised Learning' },
        { id: 3, title: 'Unsupervised Learning' },
        { id: 4, title: 'Reinforcement Learning' },
        { id: 5, title: 'ML Algorithms' },
    ],
    3: [
        { id: 1, title: 'React Basics' },
        { id: 2, title: 'Components and Props' },
        { id: 3, title: 'State and Lifecycle' },
        { id: 4, title: 'Hooks' },
        { id: 5, title: 'Routing' },
    ]
};

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
