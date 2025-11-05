'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useSignup } from '@/lib/hooks/use-auth';
import { Eye, EyeOff } from 'lucide-react';
import Image from 'next/image';

export default function SignupPage() {
  const router = useRouter();
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const signupMutation = useSignup();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      const result = await signupMutation.mutateAsync({ email, password, companyName });
      if (result.success) {
        // Store user data in localStorage
        localStorage.setItem('user', JSON.stringify(result.user));
        localStorage.setItem('token', result.token);
        
        // Clear chatbot flag for new users
        localStorage.removeItem('hasCreatedChatbots');
        
        // Redirect to onboarding for new users
        router.push('/onboarding');
      }
    } catch (error) {
      console.error('Signup failed:', error);
    }
  };

  return (
    <div className="min-h-screen max-h-screen flex overflow-hidden">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-bg-sidebar via-gray-950 to-bg-sidebar p-8 xl:p-12 flex-col justify-between overflow-hidden">
        <div>
          <div className="flex items-center gap-2 text-white mb-6">
            <Image src="/logo.svg" alt="ChatFlow Logo" width={48} height={48} />
            <span className="text-xl font-bold">ChatFlow</span>
          </div>
          <h1 className="text-4xl xl:text-5xl 2xl:text-6xl font-bold text-white mb-4 leading-tight">
            Manage and<br />create chatbots,<br />effortlessly.
          </h1>
          <p className="text-slate-300 text-base xl:text-lg max-w-md">
            Deploy in minutes, monitor performance, and engage customers with our intuitive platform.
          </p>
        </div>
        
        {/* 3D Robot Illustration */}
        <div className="rounded-2xl flex items-center justify-center">
          <Image 
            src="/robot.svg" 
            alt="ChatFlow Robot" 
            width={240} 
            height={240}
            className="object-contain"
          />
        </div>
      </div>

      {/* Right Side - Signup Form */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-black overflow-y-auto">
        <div className="w-full max-w-md space-y-6">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center gap-2 text-foreground">
            <Image src="/logo.svg" alt="ChatFlow Logo" width={32} height={32} />
            <span className="text-xl font-bold">ChatFlow</span>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 p-1 bg-card rounded-lg">
            <Link href="/login" className="flex-1">
              <Button variant="ghost" className="w-full text-muted-foreground hover:text-foreground">
                Log In
              </Button>
            </Link>
            <Link href="/signup" className="flex-1">
              <Button variant="default" className="w-full">
                Sign Up
              </Button>
            </Link>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Create Your Account</h2>
            <p className="text-muted-foreground">
              Already have an account?{' '}
              <Link href="/login" className="text-primary hover:underline">
                Sign in
              </Link>
            </p>
            
            <form onSubmit={handleSubmit} className="space-y-4 mt-6">
              <div className="space-y-2">
                <Label htmlFor="companyName">Company Name</Label>
                <Input
                  id="companyName"
                  type="text"
                  placeholder="Your company name"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  required
                  className="bg-secondary border-border"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Work Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-secondary border-border"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="bg-secondary border-border pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="bg-secondary border-border pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={signupMutation.isPending}
              >
                {signupMutation.isPending ? 'Creating Account...' : 'Create Account'}
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="px-2 text-muted-foreground">
                    Or sign up with
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Button 
                  variant="outline" 
                  type="button" 
                  className="w-full"
                  onClick={() => signIn('google', { callbackUrl: '/onboarding' })}
                >
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Google
                </Button>
                <Button 
                  variant="outline" 
                  type="button" 
                  className="w-full"
                  onClick={() => signIn('azure-ad', { callbackUrl: '/onboarding' })}
                >
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M11.4 24H0V12.6h11.4V24zM24 24H12.6V12.6H24V24zM11.4 11.4H0V0h11.4v11.4zm12.6 0H12.6V0H24v11.4z" />
                  </svg>
                  Microsoft
                </Button>
              </div>

              <p className="text-center text-sm text-muted-foreground">
                By continuing, you agree to our{' '}
                <Link href="#" className="text-primary hover:underline">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link href="#" className="text-primary hover:underline">
                  Privacy Policy
                </Link>
                .
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
