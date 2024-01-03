export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/auth-only/:path*",
    // "/api/mf/tokenRefresh",
  ]
};