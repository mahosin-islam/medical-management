'use client';
import { authClient } from '@/lib/auth-client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Link from 'next/link';
import { User, Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';

// 🌟 1. Zod Validation Schema Setup
const signupSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    password: z
        .string()
        .min(8, "Password must be at least 8 characters")
        .regex(/[A-Z]/, "Must contain at least one uppercase letter")
        .regex(/[0-9]/, "Must contain at least one number"),
});

type SignupInput = z.infer<typeof signupSchema>;

const SignupPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [serverError, setServerError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    // 🌟 2. React Hook Form Initialization
    const { register, handleSubmit, formState: { errors } } = useForm<SignupInput>({
        resolver: zodResolver(signupSchema),
        defaultValues: { name: '', email: '', password: '' }
    });

    // 🌟 3. Form Submit Handler with BetterAuth Integration
    const onSubmit = async (formData: SignupInput) => {
        setServerError('');
        try {
            setIsLoading(true);
            await authClient.signUp.email(
                {
                    name: formData.name,
                    email: formData.email,
                    password: formData.password,
                    role: "patient", // Default platform role configuration
                    callbackURL: '/',
                },
                {
                    onSuccess: () => {
                        window.location.href = "/"; 
                    },
                    onError: (ctx) => {
                        setIsLoading(false);
                        setServerError(ctx.error.message || "Signup failed!");
                    },
                }
            );
        } catch (err) {
            console.error(err);
            setIsLoading(false);
        }
    };

    // Google Social Authentication Handler
    const handleGoogleSignIn = async () => {
        await authClient.signIn.social({ provider: "google", callbackURL: '/' });
    };

    return (
        <div className="space-y-6">
            {/* Header Typography */}
            <div className="space-y-2 text-center lg:text-left">
                <h2 className="text-3xl font-bold tracking-tight text-foreground">Get started</h2>
            </div>

            {/* Global Server Error Alert Box */}
            {serverError && (
                <div className="bg-red-500/10 dark:bg-red-500/20 text-red-500 text-xs p-3.5 rounded-2xl border border-red-500/20 font-medium transition-colors">
                    {serverError}
                </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                
                {/* Name Input Field */}
                <div className="space-y-1">
                    <div className="relative flex items-center">
                        <User className="absolute left-4 w-5 h-5 text-muted-foreground" />
                        <input
                            {...register('name')}
                            className="w-full bg-background dark:bg-muted/30 border border-border pl-12 pr-4 py-3.5 text-sm text-foreground rounded-2xl focus:outline-none focus:border-primary focus:bg-card transition-all disabled:opacity-50"
                            placeholder="Full name"
                            disabled={isLoading}
                        />
                    </div>
                    {errors.name && <span className="text-red-500 dark:text-red-400 text-xs pl-2 font-medium">{errors.name.message}</span>}
                </div>

                {/* Email Input Field */}
                <div className="space-y-1">
                    <div className="relative flex items-center">
                        <Mail className="absolute left-4 w-5 h-5 text-muted-foreground" />
                        <input
                            {...register('email')}
                            className="w-full bg-background dark:bg-muted/30 border border-border pl-12 pr-4 py-3.5 text-sm text-foreground rounded-2xl focus:outline-none focus:border-primary focus:bg-card transition-all disabled:opacity-50"
                            type="email"
                            placeholder="Email address"
                            disabled={isLoading}
                        />
                    </div>
                    {errors.email && <span className="text-red-500 dark:text-red-400 text-xs pl-2 font-medium">{errors.email.message}</span>}
                </div>
                
                {/* Password Input Field with Toggle Action */}
                <div className="space-y-1">
                    <div className="relative flex items-center">
                        <Lock className="absolute left-4 w-5 h-5 text-muted-foreground" />
                        <input
                            {...register('password')}
                            className="w-full bg-background dark:bg-muted/30 border border-border pl-12 pr-12 py-3.5 text-sm text-foreground rounded-2xl focus:outline-none focus:border-primary focus:bg-card transition-all disabled:opacity-50"
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
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
                    {errors.password && <span className="text-red-500 dark:text-red-400 text-xs pl-2 font-medium">{errors.password.message}</span>}
                </div>
                
                {/* Platform Sign Up Submit Button */}
                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3.5 px-4 rounded-2xl font-semibold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed pt-3 shadow-md"
                >
                    <span>{isLoading ? "Registering..." : "Sign Up"}</span>
                    {!isLoading && <ArrowRight className="w-4 h-4" />}
                </button>
            </form>

            {/* Visual Section Divider */}
            <div className="relative flex py-1 items-center text-xs text-muted-foreground/70 font-medium">
                <div className="flex-grow border-t border-border"></div>
                <span className="flex-shrink mx-4">or</span>
                <div className="flex-grow border-t border-border"></div>
            </div>

            {/* Google OAuth Provider Action Button */}
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
            <div className="text-center text-sm text-muted-foreground pt-1">
                Already have an account?{' '}
                <Link href="/login" className="font-bold text-primary hover:underline underline-offset-4">
                    Sign in
                </Link>
            </div>
        </div>
    );
};

export default SignupPage;