// eslint-disable-next-line @typescript-eslint/no-var-requires
const { WebpackPnpExternals } = require('webpack-pnp-externals');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { RunScriptWebpackPlugin } = require('run-script-webpack-plugin');

module.exports = function (options, webpack) {
  return {
    ...options,
    entry: ['webpack/hot/poll?100', options.entry],
    externals: [WebpackPnpExternals({ exclude: ['webpack/hot/poll?100'] })],
    plugins: [
      ...options.plugins,
      new webpack.HotModuleReplacementPlugin(),
      new webpack.IgnorePlugin({
        checkResource(resource) {
          const lazyImports = [
            '@nestjs/microservices',
            'cache-manager',
            'class-validator',
            'class-transformer',
            '@nestjs/websockets/socket-module',
            '@nestjs/microservices/microservices-module',
            'fastify-swagger'
          ];
          if (!lazyImports.includes(resource)) {
            return false;
          }
          try {
            require.resolve(resource, {
              paths: [process.cwd()]
            });
          } catch (err) {
            return true;
          }
          return false;
        }
      }),
      new RunScriptWebpackPlugin({ name: options.output.filename })
    ]
  };
};
