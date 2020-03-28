const withSass = require('@zeit/next-sass');
const withLess = require('@zeit/next-less');
const withMdx = require('@next/mdx');

const sassConfig = withSass({
  cssModules: true,
  cssLoaderOptions: {
    importLoaders: 1,
    localIdentName: '[local]___[hash:base64:5]'
  },
  sassLoaderOptions: {
    implementation: require('sass'),
    sassOptions: {
      fiber: require('fibers')
    }
  }
});

const lessConfig = withLess({
  lessLoaderOptions: {
    javascriptEnabled: true,
    modifyVars: {} // make your antd custom effective
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      const antStyles = /antd\/.*?\/style.*?/;
      const origExternals = [...config.externals];
      config.externals = [
        (context, request, callback) => {
          if (request.match(antStyles)) return callback();
          if (typeof origExternals[0] === 'function') {
            origExternals[0](context, request, callback);
          } else {
            callback();
          }
        },
        ...(typeof origExternals[0] === 'function' ? [] : origExternals)
      ];

      config.module.rules.unshift({
        test: antStyles,
        use: 'null-loader'
      });
    }
    return config;
  }
});

const mdxConfig = withMdx({ extension: /\.mdx?$/ })();

module.exports = {
  webpack(config, options) {
    let temp = mdxConfig.webpack(config, options);
    temp = lessConfig.webpack(config, options);
    return sassConfig.webpack(temp, options);
  },
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx']
};
