
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async session({ session, token }: any) {
      if (token) {
        session.user.id = token.sub;
      }
      return session;
    },
    async jwt({ token, user }: any) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
  },
  pages: {
    signIn: "/sign-in",
    error: "/sign-in?error=OAuthSignin",
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
  trustHost: true,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
