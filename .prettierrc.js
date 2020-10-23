module.exports = {
  semi: true,
  trailingComma: 'all',
  singleQuote: true,
  printWidth: 120,
  tabWidth: 2,
  overrides: [
    //   js
    {
      files: ['*.js', '*.jsx'],
      options: {
        tabWidth: 2,
      },
    },
    //   css
    {
      files: ['*.scss', '*.css'],
      options: {
        tabWidth: 2,
      },
    },
    // html
    {
      files: '*.html',
      options: {
        tabWidth: 2,
        singleQuote: false,
      },
    },
    {
      files: ['*.yml'],
      options: {
        tabWidth: 2,
      },
    },
  ],
};
