export interface LoginFormData {
  email: string;
  rememberMe: boolean;
}

export interface OTPFormData {
  otp: string;
}

export interface SignupFormData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data?: any;
}

export interface PasswordRequirement {
  label: string;
  regex: RegExp;
  met: boolean;
}
