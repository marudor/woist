module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: '10',
        },
        loose: true,
        useBuiltIns: 'entry',
      },
    ],
    '@babel/preset-flow',
    ['@babel/stage-1', {
      decoratorsLegacy: true,
    }],
  ],
  plugins: [
    [
      'module-resolver',
      {
        root: './src',
      },
    ],
  ],
};
