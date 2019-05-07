module.exports = {
  plugins: {
    'postcss-mixins': {
      mixinsFiles: 'src/gridMixin.css',
    },
    'postcss-preset-env': {
      importFrom: [
        'src/colorScheme.css',
        'src/defaults.css',
        'src/customMedia.css',
      ],
      features: {
        'nesting-rules': true,
        'custom-properties': {
          preserve: false,
        },
        'custom-media-queries': true,
      },
    },
  },
};
