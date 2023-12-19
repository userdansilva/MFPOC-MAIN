"use client";

import { signOut } from "next-auth/react";

const callbackUrl = `https://${process.env.NEXT_PUBLIC_AZURE_AD_B2C_TENANT_NAME}.b2clogin.com/${process.env.NEXT_PUBLIC_AZURE_AD_B2C_TENANT_NAME}.onmicrosoft.com/${process.env.NEXT_PUBLIC_AZURE_AD_B2C_PRIMARY_USER_FLOW}/oauth2/v2.0/logout?post_logout_redirect_uri=${process.env.NEXT_PUBLIC_MAIN_MF_URL}`;

export const SignOutButton = () => {
  const handleSignOut = () => {
    signOut({ callbackUrl });
  }

  return (
    <button onClick={handleSignOut}>
      Logout &#187;
    </button>
  )
}