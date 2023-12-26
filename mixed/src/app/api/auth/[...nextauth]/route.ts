import { authOptions } from "@/auth";
import NextAuth, { DefaultSession, NextAuthOptions } from "next-auth";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

/** types */
declare module "next-auth" {
  interface Session {
    user: DefaultSession["user"]
    accessToken: string
    error?: "RefreshAccessTokenError"
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken: string
    error?: "RefreshAccessTokenError"
  }
}