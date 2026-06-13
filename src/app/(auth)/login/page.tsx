'use client';
import { authClient } from '@/lib/auth-client';
import { useState } from 'react';
import Link from 'next/link';
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Handle email/password sign-in logic
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMessage('');
    
    try {
      setIsLoading(true);
      await authClient.signIn.email(
        {
          email,
          password,
          callbackURL: '/',
        },
        {
          onSuccess: () => {
            window.location.href = "/"; 
          },
          onError: (ctx) => {
            setIsLoading(false);
            const errorMsg = ctx.error.message?.toLowerCase() || '';
            if (errorMsg.includes('email') && errorMsg.includes('password')) {
              setErrorMessage('Invalid email or password!');
            } else {
              setErrorMessage(ctx.error.message || 'Something went wrong during signing in.');
            }
          },
        }
      );
    } catch (err) {
      console.error(err);
      setIsLoading(false);
    }
  }

  // Handle Google provider social authentication
  const handleGoogleSignIn = async () => {
    await authClient.signIn.social({ provider: "google", callbackURL: '/' });
  };

  return (
    <div className="space-y-6">
      {/* Header Typography */}
      <div className="space-y-2 text-center lg:text-left">
        <h2 className="text-3xl font-bold tracking-tight text-foreground">Welcome back</h2>
      </div>

      {/* Dynamic Native Error Alert Box */}
      {errorMessage && (
        <div className="bg-red-500/10 dark:bg-red-500/20 text-red-500 text-xs p-3.5 rounded-2xl border border-red-500/20 font-medium transition-colors">
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email Input Field */}
        <div className="space-y-1">
          <div className="relative flex items-center">
            <Mail className="absolute left-4 w-5 h-5 text-muted-foreground" />
            <input
              className="w-full bg-background dark:bg-muted/30 border border-border pl-12 pr-4 py-3.5 text-sm text-foreground rounded-2xl focus:outline-none focus:border-primary focus:bg-card transition-all disabled:opacity-50"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              required
              disabled={isLoading}
            />
          </div>
        </div>

        {/* Password Input Field with Forgot Password Redirect */}
        <div className="space-y-1">
          <div className="relative flex items-center">
            <Lock className="absolute left-4 w-5 h-5 text-muted-foreground" />
            <input
              className="w-full bg-background dark:bg-muted/30 border border-border pl-12 pr-12 py-3.5 text-sm text-foreground rounded-2xl focus:outline-none focus:border-primary focus:bg-card transition-all disabled:opacity-50"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          <div className="text-right pt-1">
            <Link href="/forgot-password" className="text-xs font-semibold text-primary hover:underline underline-offset-4">
              Forgot password?
            </Link>
          </div>
        </div>

        {/* Platform Sign In Submit Action */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3.5 px-4 rounded-2xl font-semibold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
        >
          <span>{isLoading ? "Signing In..." : "Sign In"}</span>
          {!isLoading && <ArrowRight className="w-4 h-4" />}
        </button>
      </form>

      {/* Visual Component Divider */}
      <div className="relative flex py-2 items-center text-xs text-muted-foreground/70 font-medium">
        <div className="flex flex-grow border-t border-border"></div>
        <span className="flex-shrink mx-4">or</span>
        <div className="flex-grow border-t border-border"></div>
      </div>

      {/* Google Provider Authentication Button */}
      <button
        type="button"
        onClick={handleGoogleSignIn}
        disabled={isLoading}
        className="w-full border border-border bg-card hover:bg-muted text-foreground py-3.5 px-4 rounded-2xl font-semibold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
      >
        <svg className="w-4 h-4 mr-1 flex-shrink-0" viewBox="0 0 24 24">
          <path fill="#EA4335" d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82z"/>
          <path fill="#4285F4" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96H1.42v3.09C3.4 22.21 7.42 24 12 24z"/>
          <path fill="#FBBC05" d="M5.27 14.29c-.25-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29V6.62H1.42A11.93 11.93 0 0 0 0 12c0 1.92.45 3.74 1.42 5.38l3.85-3.09z"/>
          <path fill="#34A853" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.42 0 3.4 1.79 1.42 4.62l3.85 3.09c.95-2.85 3.6-4.96 6.73-4.96z"/>
        </svg>
        Continue with Google
      </button>

      {/* Navigation Redirect Link */}
      <div className="text-center text-sm text-muted-foreground pt-2">
        Don't have an account?{' '}
        <Link href="/singup" className="font-bold text-primary hover:underline underline-offset-4">
          Sign up
        </Link>
      </div>
    </div>
  );
}