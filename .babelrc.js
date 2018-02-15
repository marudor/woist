module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: '8.7',
        },
        loose: true,
        useBuiltIns: 'entry',
      },
    ],
    '@babel/preset-flow',
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
