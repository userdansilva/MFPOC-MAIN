import NextAuth, { DefaultSession, NextAuthOptions } from "next-auth";
import AzureADB2CProvider from "next-auth/providers/azure-ad-b2c";
import { cookies } from 'next/headers'

export const authOptions: NextAuthOptions = {
  providers: [
    AzureADB2CProvider({
      tenantId: process.env.NEXT_PUBLIC_AZURE_AD_B2C_TENANT_NAME,
      clientId: process.env.NEXT_PUBLIC_AZURE_AD_B2C_CLIENT_ID as string,
      clientSecret: process.env.AZURE_AD_B2C_CLIENT_SECRET as string,
      primaryUserFlow: process.env.NEXT_PUBLIC_AZURE_AD_B2C_PRIMARY_USER_FLOW,
      authorization: { params: { scope: "offline_access openid" } },
    })
  ],
  events: {
    signOut() {
      cookies().delete("expiresAt");
    },
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`;

      // Allows Azure B2C logout URL
      if (new URL(url).origin === `https://${process.env.NEXT_PUBLIC_AZURE_AD_B2C_TENANT_NAME}.b2clogin.com`) {
        return url;
      }

      // Allows callback URLs on the same origin
      if (new URL(url).origin === baseUrl) {
        return url;
      }

      return baseUrl;
    },
    async jwt({ token, account }) {
      console.log("called jwt: main");
      // called when login
      if (account) {
        console.log("called jwt -> account: main");

        const expiresAt = Date.now()
          + (account.id_token_expires_in as number * 1000)

        // --
        cookies().set("expiresAt", expiresAt.toString());

        return {
          ...token,
          accessToken: account.id_token,
          expiresAt: Date.now()
            + (account.id_token_expires_in as number * 1000),
          refreshToken: account.refresh_token,
        };
      }

      // O if e try abaixo só é necessário caso o main MF precise acessar algum dado
      // do usuário autenticado, que não seria recomendado
      if ((token.expiresAt as number - Date.now()) > (60 * 1000)) {
        console.log("called jwt -> if: main");
        return token;
      }

      try {
        console.log("called jwt -> try: main");

        const response = await fetch(`https://${process.env.NEXT_PUBLIC_AZURE_AD_B2C_TENANT_NAME}.b2clogin.com/${process.env.NEXT_PUBLIC_AZURE_AD_B2C_TENANT_NAME}.onmicrosoft.com/${process.env.NEXT_PUBLIC_AZURE_AD_B2C_PRIMARY_USER_FLOW}/oauth2/v2.0/token`, {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            grant_type: "refresh_token",
            client_id: process.env.NEXT_PUBLIC_AZURE_AD_B2C_CLIENT_ID as string,
            client_secret: process.env.AZURE_AD_B2C_CLIENT_SECRET as string,
            refresh_token: token.refreshToken as string,
          }),
        });

        const tokens = await response.json();

        if (tokens.error) {
          throw tokens;
        }

        return {
          ...token,
          accessToken: tokens.id_token,
          expiresAt: Date.now() + (tokens.id_token_expires_in * 1000),
          refreshToken: tokens.refresh_token,
        };
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error("Error refreshing access token", error);
        return { ...token, error: "RefreshAccessTokenError" };
      }
    },
    // O session abaixo só é necessário caso o main MF precise acessar algum dado
    // do usuário autenticado, que não seria recomendado
    async session({ session, token }) {
      console.log("called session: main");

      session.accessToken = token.accessToken;

      if (token.error) {
        session.error = token.error;
      }

      return session;
    },
  },
  session: {
    // maxAge: 60 * 59, // 59 minutes
    maxAge: 15 * 60 // 1 min
  },
}

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