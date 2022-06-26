/** @type {import('next').NextConfig} */

const removeImports = require('next-remove-imports')();

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['node.deso.org', 'images.deso.org']
  }
}

module.exports = removeImports(nextConfig)
