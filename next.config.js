/** @type {import('next').NextConfig} */
const withCSS = require('@zeit/next-css');
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
const nextConfig = {
  reactStrictMode: true,  
  output: "standalone",
  trailingSlash: true,
  images: { unoptimized: true },
  env:{
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXTAUTH_SECRET : process.env.NEXTAUTH_SECRET,
    NEXT_PUBLIC_SECRET: process.env.NEXT_PUBLIC_SECRET,
    SECRET_KEY:process.env.SECRET_KEY
  }
}

module.exports=withCSS({
  webpack(config, options) {
    config.plugins.push(new MonacoWebpackPlugin());
    return config;
  },
  cssLoaderOptions: { url: false }
})
module.exports = nextConfig
