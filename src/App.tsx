import { Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';
import HomePage from '@/pages/HomePage';
import LoginPage from '@/pages/LoginPage';
import SignupPage from '@/pages/SignupPage';
import ProfilePage from '@/pages/ProfilePage';
import SubscriptionsPage from '@/pages/SubscriptionsPage';
import BlueprintPage from '@/pages/BlueprintPage';
import WireframesPage from '@/pages/WireframesPage';
import WizardPage from '@/pages/WizardPage';
import NotFoundPage from '@/pages/NotFoundPage';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/subscriptions" element={<SubscriptionsPage />} />
        <Route path="/blueprint" element={<BlueprintPage />} />
        <Route path="/wireframes" element={<WireframesPage />} />
        <Route path="/wizard" element={<WizardPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;