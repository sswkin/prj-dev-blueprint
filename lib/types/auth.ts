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