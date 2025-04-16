import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Simple hardcoded credentials
        if (credentials?.username === 'admin' && credentials?.password === 'SWN1029') {
          return {
            id: '1',
            name: 'Admin',
            email: 'admin@swisswatchnetwork.com',
          };
        }
        return null;
      }
    })
  ],
  pages: {
    signIn: '/pricing',
  },
  secret: 'your-secret-key-here',
}); 