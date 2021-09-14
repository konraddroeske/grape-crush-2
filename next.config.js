module.exports = (phase, { defaultConfig }) => {
  /**
   * @type {import('next').NextConfig}
   */
  const nextConfig = {
    /* config options here */
    images: {
      domains: [
        'ambassador-media-library-assets.s3.amazonaws.com',
        'images.ctfassets.net',
      ],
    },
    webpack: (config) => {
      config.module.rules.push({
        test: /\.svg$/,
        use: [
          {
            loader: '@svgr/webpack',
            options: {
              ref: true,
            },
          },
        ],
      })

      return {
        ...config,
        experiments: {
          topLevelAwait: true,
        },
      }
    },
  }
  return nextConfig
}
