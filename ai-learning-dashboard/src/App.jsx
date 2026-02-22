import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';

const Login = lazy(() => import('./pages/Login'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const CourseDetail = lazy(() => import('./pages/CourseDetail'));
const MobilePreview = lazy(() => import('./pages/MobilePreview'));
const Profile = lazy(() => import('./pages/Profile'));



const DashboardSkeleton = () => (
  <div className="max-w-7xl mx-auto py-6 animate-pulse">
    <div className="mb-8">
      <div className="h-8 w-64 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
      <div className="h-5 w-48 bg-gray-200 dark:bg-gray-700 rounded"></div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3].map((i) => (
        <div key={i} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 animate-pulse">
          <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded-xl mb-4"></div>
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-3"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-6"></div>
          <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full w-full mb-1"></div>
        </div>
      ))}
    </div>
  </div>
);

const LoginSkeleton = () => (
  <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
    <div className="w-full max-w-md animate-pulse">
      <div className="flex flex-col items-center mb-8">
        <div className="w-16 h-16 rounded-2xl bg-gray-200 dark:bg-gray-700 mb-4"></div>
        <div className="h-8 w-48 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
        <div className="h-4 w-64 bg-gray-200 dark:bg-gray-700 rounded"></div>
      </div>
      <div className="h-72 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700"></div>
    </div>
  </div>
);

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={
            <Suspense fallback={<LoginSkeleton />}>
              <Login />
            </Suspense>
          } />
          <Route
            path="/*"
            element={
              <div className="flex flex-col min-h-screen">
                <Navbar />
                <main className="flex-1 p-4 md:p-6 lg:p-8">
                  <Suspense fallback={<DashboardSkeleton />}>
                    <Routes>
                      <Route path="/dashboard" element={<Dashboard />} />
                      <Route path="/course/:id" element={<CourseDetail />} />
                      <Route path="/mobile-preview" element={<MobilePreview />} />
                      <Route path="/profile" element={<Profile />} />
                      <Route path="*" element={<Navigate to="/dashboard" replace />} />
                    </Routes>
                  </Suspense>
                </main>
              </div>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
