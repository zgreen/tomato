module.exports = {
  target: "serverless",
  webpack(config) {
    return {
      ...config,
      module: {
        ...config.module,
        rules: [
          ...config.module.rules,
          {
            test: /\.md$/,
            use: "raw-loader"
          }
        ]
      }
    };
  }
};
