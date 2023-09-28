/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  //basePath: "/me",
  //assetPrefix: "/me",
  trailingSlash: true,
  images: { unoptimized: true },
};

module.exports = nextConfig;
