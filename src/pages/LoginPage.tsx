'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, Mail, Lock, Loader2, Eye, EyeOff } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { toast } from 'sonner';

import { loginSchema, LoginFormData } from '@/lib/validations/auth';
import { authService } from '@/lib/services/auth';

interface LoginFormDataWithPassword extends LoginFormData {
  password: string;
}

const loginWithPasswordSchema = loginSchema.extend({
  password: loginSchema.shape.password || loginSchema.shape.email.min(1, 'Password is required'),
});

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const navigate = useNavigate();

  const loginForm = useForm<LoginFormDataWithPassword>({
    resolver: zodResolver(loginWithPasswordSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  const forgotPasswordForm = useForm<{ email: string }>({
    defaultValues: {
      email: '',
    },
  });

  const onLogin = async (data: LoginFormDataWithPassword) => {
    setIsLoading(true);
    setError('');

    try {
      const response = await authService.signIn(data.email, data.password);
      
      if (response.success) {
        toast.success(response.message);
        navigate('/');
      } else {
        setError(response.message);
      }
    } catch (error) {
      setError('Failed to sign in. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const onForgotPassword = async (data: { email: string }) => {
    setIsLoading(true);
    setError('');

    try {
      const response = await authService.sendPasswordReset(data.email);
      
      if (response.success) {
        toast.success(response.message);
        setShowForgotPassword(false);
      } else {
        setError(response.message);
      }
    } catch (error) {
      setError('Failed to send password reset email. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Login - DevBlueprint AI</title>
        <meta name="description" content="Sign in to your DevBlueprint AI account to continue building amazing projects." />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center space-x-2 text-primary hover:text-primary/80 transition-colors mb-6">
              <ArrowLeft className="h-4 w-4" />
              <span>Back to home</span>
            </Link>
            
            <div className="flex items-center justify-center space-x-2 mb-4">
              <img src="/logo.svg" alt="DevBlueprint AI" className="h-8" />
            </div>
            
            <h1 className="text-3xl font-bold mb-2">Welcome back</h1>
            <p className="text-muted-foreground">
              Sign in to your account to continue building amazing projects
            </p>
          </div>

          <Card className="border-2">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl text-center">
                {showForgotPassword ? 'Reset password' : 'Sign in'}
              </CardTitle>
              <CardDescription className="text-center">
                {showForgotPassword 
                  ? 'Enter your email to receive a password reset link'
                  : 'Enter your email and password to sign in'
                }
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {showForgotPassword ? (
                <form onSubmit={forgotPasswordForm.handleSubmit(onForgotPassword)} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="reset-email">Email address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="reset-email"
                        type="email"
                        placeholder="Enter your email"
                        className="pl-10"
                        {...forgotPasswordForm.register('email')}
                      />
                    </div>
                  </div>

                  {error && (
                    <Alert variant="destructive">
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}

                  <div className="space-y-3">
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        'Send reset link'
                      )}
                    </Button>
                    
                    <Button
                      type="button"
                      variant="ghost"
                      className="w-full"
                      onClick={() => {
                        setShowForgotPassword(false);
                        setError('');
                        forgotPasswordForm.reset();
                      }}
                    >
                      Back to sign in
                    </Button>
                  </div>
                </form>
              ) : (
                <form onSubmit={loginForm.handleSubmit(onLogin)} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        className="pl-10"
                        {...loginForm.register('email')}
                      />
                    </div>
                    {loginForm.formState.errors.email && (
                      <p className="text-sm text-red-500">
                        {loginForm.formState.errors.email.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Enter your password"
                        className="pl-10 pr-10"
                        {...loginForm.register('password')}
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                    {loginForm.formState.errors.password && (
                      <p className="text-sm text-red-500">
                        {loginForm.formState.errors.password.message}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="rememberMe"
                        checked={loginForm.watch('rememberMe')}
                        onCheckedChange={(checked) => 
                          loginForm.setValue('rememberMe', checked as boolean)
                        }
                      />
                      <Label htmlFor="rememberMe" className="text-sm">
                        Remember me
                      </Label>
                    </div>
                    
                    <button
                      type="button"
                      className="text-sm text-primary hover:text-primary/80"
                      onClick={() => {
                        setShowForgotPassword(true);
                        setError('');
                      }}
                    >
                      Forgot password?
                    </button>
                  </div>

                  {error && (
                    <Alert variant="destructive">
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}

                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Signing in...
                      </>
                    ) : (
                      'Sign in'
                    )}
                  </Button>
                </form>
              )}

              <div className="text-center">
                <p className="text-sm text-muted-foreground">
                  Don't have an account?{' '}
                  <Link to="/signup" className="text-primary hover:text-primary/80 font-medium">
                    Sign up instead
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}