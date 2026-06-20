import type { NextConfig } from "next";

let apiBase = process.env.BACKEND_API_URL || "http://localhost:8081/api";

let apiHost = "localhost";
let apiProtocol: "http" | "https" = "http";
let apiPort = "8081";

try {
  const url = new URL(apiBase);
  apiHost = url.hostname;
  apiProtocol = url.protocol.replace(":", "") as "http" | "https";
  apiPort = url.port || (apiProtocol === "https" ? "443" : "80");
} catch (e) {
  // Use fallbacks
}

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: apiProtocol,
        hostname: apiHost,
        port: apiPort || undefined,
      },
    ],
  },
  async rewrites() {
    const backendBase = apiBase.replace(/\/api$/, "");
    return [
      {
        source: "/api/:path*",
        destination: `${apiBase}/:path*`,
      },
      {
        source: "/uploads/:path*",
        destination: `${backendBase}/uploads/:path*`,
      },
    ];
  },
};

export default nextConfig;
