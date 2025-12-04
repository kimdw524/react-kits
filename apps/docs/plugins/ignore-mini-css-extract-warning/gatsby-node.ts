import type { GatsbyNode } from 'gatsby';

export const onCreateWebpackConfig: GatsbyNode['onCreateWebpackConfig'] = ({
  stage,
  actions,
  getConfig,
  plugins,
}) => {
  const config = getConfig();
  const miniCssExtractPluginIndex = config.plugins.findIndex(
    (plugin: any) => plugin.constructor.name === 'MiniCssExtractPlugin',
  );

  if (miniCssExtractPluginIndex > -1) {
    config.plugins.splice(miniCssExtractPluginIndex, 1);

    if (stage === 'build-javascript') {
      config.plugins.push(
        plugins.extractText({
          filename: `[name].[contenthash].css`,
          chunkFilename: `[name].[contenthash].css`,
          ignoreOrder: true,
        }),
      );
    } else {
      config.plugins.push(
        plugins.extractText({
          filename: `[name].css`,
          chunkFilename: `[id].css`,
          ignoreOrder: true,
        }),
      );
    }
  }
  actions.replaceWebpackConfig(config);
};
