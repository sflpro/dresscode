module.exports = {
    plugins: {
        'postcss-preset-env': {
            importFrom: 'src/defaults.css',
            features: {
                'nesting-rules': true,
                'custom-properties': {
                    preserve: false
                },
            },
        },
    },
};
