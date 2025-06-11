import { supabase } from '@/lib/supabase';
import { UserProfile, ProfileFormData, ProfileResponse } from '@/lib/types/profile';

export const profileService = {
  async getProfile(userId: string): Promise<ProfileResponse> {
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', userId);

      if (error) {
        return {
          success: false,
          message: error.message,
        };
      }

      // Check if no profile was found
      if (!data || data.length === 0) {
        return {
          success: true,
          message: 'No profile found',
          data: undefined,
        };
      }

      return {
        success: true,
        message: 'Profile fetched successfully',
        data: data[0] as UserProfile,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to fetch profile',
      };
    }
  },

  async createProfile(userId: string, userEmail: string, fullName?: string): Promise<ProfileResponse> {
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .insert({
          id: userId,
          full_name: fullName || userEmail.split('@')[0], // Use email prefix as fallback
        })
        .select()
        .single();

      if (error) {
        return {
          success: false,
          message: error.message,
        };
      }

      return {
        success: true,
        message: 'Profile created successfully',
        data: data as UserProfile,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to create profile',
      };
    }
  },

  async getOrCreateProfile(userId: string, userEmail: string, fullName?: string): Promise<ProfileResponse> {
    // First try to get existing profile
    const getResponse = await this.getProfile(userId);
    
    if (getResponse.success && getResponse.data) {
      return getResponse;
    }

    // If no profile exists, create one
    if (getResponse.success && !getResponse.data) {
      return await this.createProfile(userId, userEmail, fullName);
    }

    // Return the error from getProfile
    return getResponse;
  },

  async updateProfile(userId: string, profileData: ProfileFormData): Promise<ProfileResponse> {
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .update({
          ...profileData,
          updated_at: new Date().toISOString(),
        })
        .eq('id', userId)
        .select()
        .single();

      if (error) {
        return {
          success: false,
          message: error.message,
        };
      }

      return {
        success: true,
        message: 'Profile updated successfully',
        data: data as UserProfile,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to update profile',
      };
    }
  },

  async uploadAvatar(userId: string, file: File): Promise<{ success: boolean; message: string; url?: string }> {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${userId}-${Math.random()}.${fileExt}`;
      const filePath = `avatars/${fileName}`;

      // Upload file to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true,
        });

      if (uploadError) {
        return {
          success: false,
          message: uploadError.message,
        };
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      // Update user profile with new avatar URL
      const { error: updateError } = await supabase
        .from('user_profiles')
        .update({ avatar_url: publicUrl })
        .eq('id', userId);

      if (updateError) {
        return {
          success: false,
          message: updateError.message,
        };
      }

      return {
        success: true,
        message: 'Avatar uploaded successfully',
        url: publicUrl,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to upload avatar',
      };
    }
  },

  async deleteAvatar(userId: string, avatarUrl: string): Promise<{ success: boolean; message: string }> {
    try {
      // Extract file path from URL
      const urlParts = avatarUrl.split('/');
      const fileName = urlParts[urlParts.length - 1];
      const filePath = `avatars/${fileName}`;

      // Delete file from storage
      const { error: deleteError } = await supabase.storage
        .from('avatars')
        .remove([filePath]);

      if (deleteError) {
        return {
          success: false,
          message: deleteError.message,
        };
      }

      // Update user profile to remove avatar URL
      const { error: updateError } = await supabase
        .from('user_profiles')
        .update({ avatar_url: null })
        .eq('id', userId);

      if (updateError) {
        return {
          success: false,
          message: updateError.message,
        };
      }

      return {
        success: true,
        message: 'Avatar deleted successfully',
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to delete avatar',
      };
    }
  },
};