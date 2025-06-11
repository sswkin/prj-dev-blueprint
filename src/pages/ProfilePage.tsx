import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Edit, 
  Loader2, 
  AlertCircle,
  RefreshCw
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';

import { useAuth } from '@/contexts/AuthContext';
import { profileService } from '@/lib/services/profile';
import { UserProfile } from '@/lib/types/profile';
import { ProfileFormData } from '@/lib/validations/profile';
import { ProfileHeader } from '@/components/profile/ProfileHeader';
import { ProfileForm } from '@/components/profile/ProfileForm';

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  // Redirect if not authenticated
  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login');
    }
  }, [user, authLoading, navigate]);

  // Fetch profile data
  const fetchProfile = async () => {
    if (!user) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await profileService.getProfile(user.id);
      
      if (response.success && response.data) {
        setProfile(response.data);
      } else {
        setError(response.message);
      }
    } catch (error) {
      setError('Failed to load profile');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  const handleProfileUpdate = async (data: ProfileFormData) => {
    if (!user || !profile) return;

    setIsSaving(true);
    try {
      const response = await profileService.updateProfile(user.id, data);
      
      if (response.success && response.data) {
        setProfile(response.data);
        setIsEditing(false);
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error('Failed to update profile');
    } finally {
      setIsSaving(false);
    }
  };

  const handleAvatarUpdate = (url: string | null) => {
    if (profile) {
      setProfile({
        ...profile,
        avatar_url: url,
      });
    }
  };

  const handleRetry = () => {
    fetchProfile();
  };

  // Loading state
  if (authLoading || isLoading) {
    return (
      <>
        <Helmet>
          <title>Profile - DevBlueprint AI</title>
          <meta name="description" content="Manage your DevBlueprint AI profile and account settings." />
        </Helmet>

        <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
          <div className="max-w-4xl mx-auto px-4 py-8">
            {/* Header Skeleton */}
            <div className="flex items-center gap-4 mb-8">
              <Skeleton className="h-10 w-10 rounded-md" />
              <Skeleton className="h-8 w-32" />
            </div>

            {/* Profile Header Skeleton */}
            <Card className="border-2 mb-8">
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                  <Skeleton className="h-32 w-32 rounded-full" />
                  <div className="flex-1 space-y-4">
                    <div>
                      <Skeleton className="h-8 w-48 mb-2" />
                      <Skeleton className="h-5 w-64" />
                    </div>
                    <Skeleton className="h-16 w-full max-w-2xl" />
                    <div className="flex gap-4">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-4 w-32" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Loading indicator */}
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
                <p className="text-muted-foreground">Loading your profile...</p>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  // Error state
  if (error) {
    return (
      <>
        <Helmet>
          <title>Profile - DevBlueprint AI</title>
          <meta name="description" content="Manage your DevBlueprint AI profile and account settings." />
        </Helmet>

        <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
          <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="flex items-center gap-4 mb-8">
              <Button variant="ghost" size="sm" onClick={() => navigate('/')}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </div>

            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="flex items-center justify-between">
                <span>{error}</span>
                <Button variant="outline" size="sm" onClick={handleRetry}>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Retry
                </Button>
              </AlertDescription>
            </Alert>
          </div>
        </div>
      </>
    );
  }

  // No profile found
  if (!profile) {
    return (
      <>
        <Helmet>
          <title>Profile - DevBlueprint AI</title>
          <meta name="description" content="Manage your DevBlueprint AI profile and account settings." />
        </Helmet>

        <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
          <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="flex items-center gap-4 mb-8">
              <Button variant="ghost" size="sm" onClick={() => navigate('/')}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </div>

            <Card className="border-2">
              <CardContent className="p-8 text-center">
                <h2 className="text-2xl font-bold mb-4">Profile Not Found</h2>
                <p className="text-muted-foreground mb-6">
                  We couldn't find your profile. This might be a temporary issue.
                </p>
                <Button onClick={handleRetry}>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Try Again
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>{profile.full_name ? `${profile.full_name} - Profile` : 'Profile'} - DevBlueprint AI</title>
        <meta name="description" content="Manage your DevBlueprint AI profile and account settings." />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
        <div className="max-w-4xl mx-auto px-4 py-8">
          {/* Header */}
          <motion.div
            className="flex items-center justify-between mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Button variant="ghost" size="sm" onClick={() => navigate('/')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>

            {!isEditing && (
              <Button onClick={() => setIsEditing(true)}>
                <Edit className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            )}
          </motion.div>

          {/* Profile Content */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            {/* Profile Header */}
            <ProfileHeader
              profile={profile}
              userEmail={user?.email || ''}
              isEditing={isEditing}
              onAvatarUpdate={handleAvatarUpdate}
            />

            {/* Edit Form */}
            {isEditing && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <ProfileForm
                  profile={profile}
                  isLoading={isSaving}
                  onSubmit={handleProfileUpdate}
                  onCancel={() => setIsEditing(false)}
                />
              </motion.div>
            )}

            {/* Account Information */}
            {!isEditing && (
              <Card className="border-2">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Account Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Email:</span>
                      <p className="font-medium">{user?.email}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Member since:</span>
                      <p className="font-medium">
                        {new Date(profile.created_at).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Last updated:</span>
                      <p className="font-medium">
                        {new Date(profile.updated_at).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">User ID:</span>
                      <p className="font-mono text-xs">{profile.id}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </motion.div>
        </div>
      </div>
    </>
  );
}