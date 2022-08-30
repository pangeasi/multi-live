/** @type {import('next').NextConfig} */
const { env } = require("./utils/env");

const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  publicRuntimeConfig: {
    NODE_ENV: env.NODE_ENV,
  },
  i18n: {
    locales: ["en", "es"],
    defaultLocale: "es",
  },
};

module.exports = nextConfig;
