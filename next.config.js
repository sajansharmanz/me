/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: "/me",
  trailingSlash: true,
  images: { unoptimized: true },
};

module.exports = nextConfig;
