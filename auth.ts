import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/lib/db";
import authConfig from "./auth.config";
import { getUserById } from "@/data/user";
import { getAccountByUserId } from "@/data/account";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
  // update,
} = NextAuth({
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  // events: {
  //   async linkAccount({ user }) {
  //     await db.user.update({
  //       where: { id: user.id },
  //       data: { emailVerified: new Date() },
  //     });
  //   },
  // },
  callbacks: {
    async signIn({ user, account }) {
      // Allow OAuth without email verification
      if (account?.provider !== "credentials") return true;

      // const existingUser= await getUserById(user.id);

      // Prevent sign in without email verification
      // if (!existingUser?.emailVerified) return false;

      return true;
    },

    async session({ token, session }) {
      // console.log("Session:", session);
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      console.log(session.user.id);
      // if (session.user) {
      //   session.user.name = token.name;
      //   session.user.email = token.email as string;
      //   session.user.isOAuth = token.isOAuth as boolean;
      // }
      return session;
    },

    // async jwt({ token }) {
    //   console.log("Token:", token);
    //   if (!token.sub) return token;

    //   const existingUser = await getUserById(token.sub);

    //   if (!existingUser) return token;

    //   const existingAccount = await getAccountByUserId(existingUser.id);

    //   token.isOAuth = !!existingAccount;
    //   token.name = existingUser.name;
    //   token.email = existingUser.email;

    //   return token;
    // },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});
