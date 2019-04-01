module.exports = {
  plugins: {
    'postcss-preset-env': {
      importFrom: [
        'src/colorScheme.css',
        'src/defaults.css',
      ],
      features: {
        'nesting-rules': true,
        'custom-properties': {
          preserve: false,
        },
      },
    },
  },
};
