module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }], // Для Node.js
    '@babel/preset-react', // Для JSX
    '@babel/preset-typescript', // Для TypeScript
  ],
};