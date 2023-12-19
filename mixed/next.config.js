const { NEXT_PUBLIC_BASE_URL, NEXT_PUBLIC_MAIN_MF_URL } = process.env;

/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: "/mixed",
  assetPrefix: `${NEXT_PUBLIC_BASE_URL}/mixed`,


  async headers() {
    return [
      {
        source: "/mixed/:path*",
        headers: [
          { key: "Access-Control-Allow-Origin", value: NEXT_PUBLIC_MAIN_MF_URL }
        ]
      },
    ]
  }
}

module.exports = nextConfig
