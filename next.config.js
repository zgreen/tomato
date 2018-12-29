module.exports = {
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
