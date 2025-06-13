// React & Hooks
import { useState, useRef, useMemo } from 'react';

// External Libraries
import { Camera, Trash2, Loader2, Calendar } from 'lucide-react';
import { toast } from 'sonner';
import { format } from 'date-fns';

// UI Components
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

// Types & Services
import { UserProfile } from '@/lib/types/profile';
import { profileService } from '@/lib/services/profile';

// Local Components
import { XLogo } from '@/components/profile/XLogo';
import { GitHubLogo } from '@/components/profile/GitHubLogo';

interface ProfileHeaderProps {
  profile: UserProfile;
  userEmail: string;
  isEditing: boolean;
  onAvatarUpdate: (url: string | null) => void;
}

type SocialLink = {
  type: 'website' | 'twitter' | 'github' | 'linkedin';
  handle: string;
  label: string;
  icon: React.ReactNode;
  baseUrl: string;
};

export function ProfileHeader({ profile, userEmail, isEditing, onAvatarUpdate }: ProfileHeaderProps) {
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const socialLinks = useMemo<SocialLink[]>(() => {
    const links: SocialLink[] = [];
    
    if (profile.website) {
      links.push({
        type: 'website',
        handle: profile.website,
        label: 'Website',
        icon: <span className="text-base" role="img" aria-hidden="true">🌐</span>,
        baseUrl: '',
      });
    }
    
    if (profile.twitter_handle) {
      links.push({
        type: 'twitter',
        handle: profile.twitter_handle,
        label: 'X (Twitter)',
        icon: <XLogo className="h-3 w-3" />,
        baseUrl: 'https://x.com/',
      });
    }
    
    if (profile.github_handle) {
      links.push({
        type: 'github',
        handle: profile.github_handle,
        label: 'GitHub',
        icon: <GitHubLogo className="h-3 w-3" />,
        baseUrl: 'https://github.com/',
      });
    }
    
    if (profile.linkedin_handle) {
      links.push({
        type: 'linkedin',
        handle: profile.linkedin_handle,
        label: 'LinkedIn',
        icon: <span className="text-base" role="img" aria-label="LinkedIn">💼</span>,
        baseUrl: 'https://linkedin.com/in/',
      });
    }
    
    return links;
  }, [profile.website, profile.twitter_handle, profile.github_handle, profile.linkedin_handle]);

  const handleAvatarUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image must be less than 5MB');
      return;
    }

    setIsUploading(true);
    try {
      const response = await profileService.uploadAvatar(profile.id, file);
      
      if (response.success && response.url) {
        onAvatarUpdate(response.url);
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error('Failed to upload avatar');
    } finally {
      setIsUploading(false);
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleAvatarDelete = async () => {
    if (!profile.avatar_url) return;

    setIsUploading(true);
    try {
      const response = await profileService.deleteAvatar(profile.id, profile.avatar_url);
      
      if (response.success) {
        onAvatarUpdate(null);
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error('Failed to delete avatar');
    } finally {
      setIsUploading(false);
    }
  };

  const getUserInitials = (name: string | null, email: string) => {
    if (name) {
      return name
        .split(' ')
        .map(word => word.charAt(0))
        .join('')
        .toUpperCase()
        .slice(0, 2);
    }
    return email.charAt(0).toUpperCase();
  };

  return (
    <Card className="border-2">
      <CardContent className="p-8">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          {/* Avatar Section */}
          <div className="relative">
            <Avatar className="h-32 w-32 border-4 border-background shadow-lg">
              <AvatarImage src={profile.avatar_url || undefined} alt={profile.full_name || 'User'} />
              <AvatarFallback className="text-2xl font-semibold">
                {getUserInitials(profile.full_name, userEmail)}
              </AvatarFallback>
            </Avatar>
            
            {isEditing && (
              <div className="absolute -bottom-2 -right-2 flex gap-1">
                <Button
                  size="sm"
                  variant="secondary"
                  className="h-8 w-8 rounded-full p-0"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploading}
                >
                  {isUploading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Camera className="h-4 w-4" />
                  )}
                </Button>
                
                {profile.avatar_url && (
                  <Button
                    size="sm"
                    variant="destructive"
                    className="h-8 w-8 rounded-full p-0"
                    onClick={handleAvatarDelete}
                    disabled={isUploading}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            )}
            
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleAvatarUpload}
              className="hidden"
            />
          </div>

          {/* Profile Info */}
          <div className="flex-1 space-y-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                {profile.full_name || 'Anonymous User'}
              </h1>
              <p className="text-muted-foreground text-lg">{userEmail}</p>
            </div>

            {profile.bio && (
              <p className="text-foreground leading-relaxed max-w-2xl">
                {profile.bio}
              </p>
            )}

            <div className="flex flex-wrap gap-4 text-sm">
              {profile.location && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <span className="text-base">📍</span>
                  <span className="font-medium">{profile.location}</span>
                </div>
              )}
              
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="h-4 w-4 text-primary" />
                <span className="font-medium">
                  Member since{' '}
                  <span className="text-foreground font-semibold">
                    {format(new Date(profile.created_at), 'MMMM yyyy')}
                  </span>
                </span>
              </div>
            </div>

            {/* Social Links */}
            {socialLinks.length > 0 && (
              <div className="flex flex-wrap gap-2" data-testid="social-links">
                {socialLinks.map(({ type, handle, label, icon, baseUrl }) => (
                  <Badge
                    key={type}
                    variant="secondary"
                    className="cursor-pointer hover:bg-secondary/80 transition-colors"
                    asChild
                  >
                    <a
                      href={`${baseUrl}${handle}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5"
                      aria-label={`Visit ${label} profile`}
                    >
                      {icon}
                      {label}
                    </a>
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}