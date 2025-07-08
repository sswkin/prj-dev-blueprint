import { Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';
import { useAuth } from '@/contexts/useAuth';
import { Navigate } from 'react-router-dom';
import HomePage from '@/pages/HomePage';
import LoginPage from '@/pages/LoginPage';
import SignupPage from '@/pages/SignupPage';
import ProfilePage from '@/pages/ProfilePage';
import SubscriptionsPage from '@/pages/SubscriptionsPage';
import BlueprintPage from '@/pages/BlueprintPage';
import WireframesPage from '@/pages/WireframesPage';
import WizardPage from '@/pages/WizardPage';
import OnboardingPage from '@/pages/OnboardingPage';
import NotFoundPage from '@/pages/NotFoundPage';

function App() {
  const { user, loading } = useAuth();

  // Protected route component
  const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    if (!user) return <Navigate to="/login" />;
    return <>{children}</>;
  };

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
        <Route path="/subscriptions" element={<ProtectedRoute><SubscriptionsPage /></ProtectedRoute>} />
        <Route path="/blueprint" element={<ProtectedRoute><BlueprintPage /></ProtectedRoute>} />
        <Route path="/wireframes" element={<ProtectedRoute><WireframesPage /></ProtectedRoute>} />
        <Route path="/wizard" element={<ProtectedRoute><WizardPage /></ProtectedRoute>} />
        <Route path="/onboarding" element={<ProtectedRoute><OnboardingPage /></ProtectedRoute>} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;