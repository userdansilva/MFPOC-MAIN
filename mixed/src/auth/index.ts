import { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from "next";
import { DefaultSession, NextAuthOptions, getServerSession } from "next-auth";
import AzureADB2CProvider from "next-auth/providers/azure-ad-b2c";
import { cookies } from "next/headers";

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
  callbacks: {
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`;

      // Allow Azure B2C logout URL
      if (new URL(url).origin === `https://${process.env.NEXT_PUBLIC_AZURE_AD_B2C_TENANT_NAME}.b2clogin.com`) {
        return url;
      }

      // Allows callback URLs on the same origin
      if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
    async jwt({ token }) {
      return token;
      // if ((token.expiresAt as number - Date.now()) > (60 * 1000)) {
      // if ((token.expiresAt as number - Date.now()) > (60 * 4 * 1000)) { // 1 min
      //   return token;
      // }

      try {
        const allCookies = cookies().getAll();

        const Cookie = allCookies
          .map((_) => `${_.name}=${_.value}`)
          .toString()
          .replaceAll(",", "; ");

        const response = await fetch(`${process.env.NEXT_PUBLIC_MAIN_MF_URL}/api/mf/tokenRefresh`, {
          method: "POST",
          credentials: "include",
          headers: { Cookie }
        });

        const data = await response.json();
        console.log("data:", data);

        return {
          ...token,
          accessToken: data.accessToken,
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error("Error refreshing access token", error);
        return { ...token, error: "RefreshAccessTokenError" };
      }
    },
    async session({ session, token }) {
      console.log("called session: mixed");

      session.accessToken = token.accessToken;

      if (token.error) {
        session.error = token.error;
      }

      return session;
    },
  },
  session: {
    // maxAge: 15 * 60 // 15 min
    maxAge: 1 * 60 // 1 min
  },
}

// Use it within server contexts
export function auth(...args: [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]] | [NextApiRequest, NextApiResponse] | []) {
  return getServerSession(...args, authOptions)
}

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
