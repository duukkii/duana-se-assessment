import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import AzureADProvider from 'next-auth/providers/azure-ad';
import CredentialsProvider from 'next-auth/providers/credentials';

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
    AzureADProvider({
      clientId: process.env.MICROSOFT_CLIENT_ID || '',
      clientSecret: process.env.MICROSOFT_CLIENT_SECRET || '',
      tenantId: process.env.MICROSOFT_TENANT_ID || 'common',
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        // This is a demo - in production, verify against your database
        if (credentials?.email && credentials?.password) {
          // Mock user for demo purposes
          const user = {
            id: '1',
            name: 'Demo User',
            email: credentials.email,
          };
          return user;
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: '/login',
    signOut: '/login',
    error: '/login',
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
        token.provider = account?.provider;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.provider = token.provider as string;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      // Redirect to onboarding after successful OAuth login
      if (url.startsWith(baseUrl)) {
        return url;
      }
      return `${baseUrl}/onboarding`;
    },
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET || 'your-secret-key-for-development',
});

export { handler as GET, handler as POST };
