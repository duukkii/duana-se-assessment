import { useMutation } from '@tanstack/react-query';

interface LoginData {
  email: string;
  password: string;
}

interface SignupData {
  email: string;
  password: string;
  companyName: string;
}

export function useLogin() {
  return useMutation({
    mutationFn: async (data: LoginData) => {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        throw new Error('Login failed');
      }
      
      return response.json();
    },
  });
}

export function useSignup() {
  return useMutation({
    mutationFn: async (data: SignupData) => {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        throw new Error('Signup failed');
      }
      
      return response.json();
    },
  });
}
