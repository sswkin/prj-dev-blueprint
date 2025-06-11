import { useState, useRef } from 'react';
import { Camera, Trash2, Loader2, Calendar, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { UserProfile } from '@/lib/types/profile';
import { profileService } from '@/lib/services/profile';
import { format } from 'date-fns';

interface ProfileHeaderProps {
  profile: UserProfile;
  userEmail: string;
  isEditing: boolean;
  onAvatarUpdate: (url: string | null) => void;
}

// X (Twitter) Logo Component
const XLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

// GitHub Logo Component
const GitHubLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
);

export function ProfileHeader({ profile, userEmail, isEditing, onAvatarUpdate }: ProfileHeaderProps) {
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
            {(profile.website || profile.twitter_handle || profile.github_handle || profile.linkedin_handle) && (
              <div className="flex flex-wrap gap-2">
                {profile.website && (
                  <Badge variant="secondary" className="cursor-pointer hover:bg-secondary/80 transition-colors" asChild>
                    <a href={profile.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5">
                      <ExternalLink className="h-3 w-3" />
                      Website
                    </a>
                  </Badge>
                )}
                
                {profile.twitter_handle && (
                  <Badge variant="secondary" className="cursor-pointer hover:bg-secondary/80 transition-colors" asChild>
                    <a href={`https://x.com/${profile.twitter_handle}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5">
                      <XLogo className="h-3 w-3" />
                      x.com
                    </a>
                  </Badge>
                )}
                
                {profile.github_handle && (
                  <Badge variant="secondary" className="cursor-pointer hover:bg-secondary/80 transition-colors" asChild>
                    <a href={`https://github.com/${profile.github_handle}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5">
                      <GitHubLogo className="h-3 w-3" />
                      GitHub
                    </a>
                  </Badge>
                )}
                
                {profile.linkedin_handle && (
                  <Badge variant="secondary" className="cursor-pointer hover:bg-secondary/80 transition-colors" asChild>
                    <a href={`https://linkedin.com/in/${profile.linkedin_handle}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5">
                      <span className="text-base">💼</span>
                      LinkedIn
                    </a>
                  </Badge>
                )}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}