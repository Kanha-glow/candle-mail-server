import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      // Only allow specific admin email
      const adminEmail = process.env.ADMIN_EMAIL
      return user.email === adminEmail
    },
    async session({ session, token }) {
      return session
    },
  },
  pages: {
    signIn: '/',
    error: '/',
  },
})

export { handler as GET, handler as POST }
