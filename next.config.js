const withTM = require('next-transpile-modules')(['gsap'])

module.exports = withTM({
  future: {
    webpack5: true,
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: [{ loader: '@svgr/webpack', options: { ref: true } }],
    })

    return {
      ...config,
      experiments: {
        topLevelAwait: true,
      },
    }
  },
})
