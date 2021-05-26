const withTM = require("next-transpile-modules")(["gsap"])

module.exports = withTM({
  future: {
    webpack5: true,
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    })

    return {
      ...config,
      experiments: {
        topLevelAwait: true,
      },
    }
  },
})
