import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      new URL("https://lh3.googleusercontent.com/a/**"),
      new URL("https://droymbluhvgldbjqmafh.supabase.co/**"),
    ],
  },
};

export default nextConfig;
