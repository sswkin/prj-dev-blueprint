import { AuthResponse } from '@/lib/types/auth';
import { LoginFormData, SignupFormData } from '@/lib/validations/auth';

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock OTP storage (in real app, this would be server-side)
let mockOTPStore: { [email: string]: string } = {};

export const authService = {
  async sendOTP(email: string): Promise<AuthResponse> {
    await delay(1500); // Simulate network delay
    
    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    
    // Store OTP (in real app, send via email service)
    mockOTPStore[email] = otp;
    
    // Log OTP for demo purposes (remove in production)
    console.log(`OTP for ${email}: ${otp}`);
    
    return {
      success: true,
      message: `OTP sent to ${email}. Check console for demo OTP.`,
    };
  },

  async verifyOTP(email: string, otp: string): Promise<AuthResponse> {
    await delay(1000);
    
    const storedOTP = mockOTPStore[email];
    
    if (!storedOTP) {
      return {
        success: false,
        message: 'No OTP found. Please request a new one.',
      };
    }
    
    if (storedOTP !== otp) {
      return {
        success: false,
        message: 'Invalid OTP. Please try again.',
      };
    }
    
    // Clear OTP after successful verification
    delete mockOTPStore[email];
    
    return {
      success: true,
      message: 'Login successful!',
      data: { token: 'mock-jwt-token', user: { email } },
    };
  },

  async signup(data: SignupFormData): Promise<AuthResponse> {
    await delay(2000);
    
    // Simulate email already exists check
    if (data.email === 'test@example.com') {
      return {
        success: false,
        message: 'An account with this email already exists.',
      };
    }
    
    return {
      success: true,
      message: 'Account created successfully! Please check your email to verify your account.',
      data: { user: { email: data.email, fullName: data.fullName } },
    };
  },

  async checkEmailExists(email: string): Promise<boolean> {
    await delay(500);
    // Simulate some emails already existing
    const existingEmails = ['test@example.com', 'admin@devblueprint.ai'];
    return existingEmails.includes(email);
  },
};