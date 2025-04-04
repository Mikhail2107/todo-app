module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }], // Для Node.js
    ['@babel/preset-react', { runtime: 'automatic' }], // Для JSX
    '@babel/preset-typescript', // Для TypeScript
  ],
};