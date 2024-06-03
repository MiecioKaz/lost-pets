import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/db";
import authConfig from "./auth.config";

export const { auth, signIn, signOut, handlers } = NextAuth({
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  secret: process.env.AUTH_SECRET,

  callbacks: {
    async signIn({ account }) {
      // Allow OAuth without email verification
      if (account?.provider !== "credentials") return true;

      return true;
    },
    async jwt({ token, account }) {
      // Persist the OAuth access_token after signin
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },

    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig,
});
