import type { NextConfig } from "next";

const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/football-data/:path*",
        destination: `https://api.football-data.org/v4/:path*`,
      },
    ];
  },
  headers() {
    return [
      {
        source: "/api/football-data/:path*",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "http://localhost:3000",
          }, // Asegúrate de que este sea el puerto correcto de tu aplicación
          { key: "Access-Control-Allow-Methods", value: "GET" },
          {
            key: "Access-Control-Allow-Headers",
            value: "X-Auth-Token, Content-Type",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
