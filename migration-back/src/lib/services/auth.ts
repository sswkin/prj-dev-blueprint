import { supabase } from "@/lib/supabase";
import { AuthResponse, SignupFormData } from "@/lib/types/auth";

export const authService = {
  async signIn(email: string, password: string): Promise<AuthResponse> {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        return {
          success: false,
          message: error.message,
        };
      }

      return {
        success: true,
        message: "Login successful!",
        data: {
          user: data.user,
          session: data.session,
        },
      };
    } catch (error) {
      return {
        success: false,
        message: "Failed to sign in. Please try again.",
      };
    }
  },

  async sendPasswordReset(email: string): Promise<AuthResponse> {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) {
        return {
          success: false,
          message: error.message,
        };
      }

      return {
        success: true,
        message: `Password reset email sent to ${email}. Please check your email.`,
      };
    } catch (error) {
      return {
        success: false,
        message: "Failed to send password reset email. Please try again.",
      };
    }
  },

  async signup(data: SignupFormData): Promise<AuthResponse> {
    try {
      const { data: authData, error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            full_name: data.fullName,
          },
        },
      });

      if (error) {
        return {
          success: false,
          message: error.message,
        };
      }

      return {
        success: true,
        message:
          "Account created successfully! Please check your email to verify your account.",
        data: { user: authData.user },
      };
    } catch (error) {
      return {
        success: false,
        message: "Failed to create account. Please try again.",
      };
    }
  },

  async checkEmailExists(email: string): Promise<boolean> {
    try {
      // Try to send a password reset to check if email exists
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: "http://localhost:3000/reset-password",
      });

      // If no error, email exists
      return !error;
    } catch (error) {
      return false;
    }
  },

  async signOut(): Promise<AuthResponse> {
    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        return {
          success: false,
          message: error.message,
        };
      }

      return {
        success: true,
        message: "Signed out successfully",
      };
    } catch (error) {
      return {
        success: false,
        message: "Failed to sign out",
      };
    }
  },

  async getCurrentUser() {
    try {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error) {
        return null;
      }

      return user;
    } catch (error) {
      return null;
    }
  },

  async getCurrentSession() {
    try {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (error) {
        return null;
      }

      return session;
    } catch (error) {
      return null;
    }
  },
};
