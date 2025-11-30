import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'utfs.io',
        port: '',
      },
    ],
  },

  // webpack: (config, { isServer, buildId, dev, webpack }) => {
  //   if (!isServer) {
  //     // More comprehensive fallbacks for MongoDB dependencies
  //     config.resolve.fallback = {
  //       ...config.resolve.fallback,
  //       fs: false,
  //       net: false,
  //       tls: false,
  //       child_process: false,
  //       dns: false,
  //       'fs/promises': false,
  //       'timers/promises': false,
  //       'mongodb-client-encryption': false,
  //       snappy: false,
  //       kerberos: false,
  //       '@mongodb-js/zstd': false,
  //       aws4: false,
  //       os: false,
  //       path: false,
  //       crypto: false,
  //       stream: false,
  //       util: false,
  //       buffer: false,
  //       url: false,
  //       http: false,
  //       https: false,
  //       zlib: false,
  //     }

  //     // Ignore MongoDB packages entirely in client bundles
  //     config.plugins.push(
  //       new webpack.IgnorePlugin({
  //         resourceRegExp: /^(mongodb|mongoose|bson)$/,
  //       })
  //     )

  //     // Add rule to exclude MongoDB from being processed
  //     config.module.rules.push({
  //       test: /[\\/]node_modules[\\/](mongodb|mongoose|bson)[\\/]/,
  //       use: 'null-loader',
  //     })
  //   }

  //   return config
  // },

  // Experimental feature to help with module resolution
  // experimental: {
  //   serverComponentsExternalPackages: ['mongodb', 'mongoose', 'bson'],
  // },
}

export default nextConfig