module.exports = {
  stories: [
    './stories/Button/Button.stories.js',
    './stories/**/*.stories.?(ts|tsx|js|jsx)',
  ],
  addons: [
     {
      name: '@storybook/addon-react-native-web',
      options: {
        modulesToTranspile: ['react-native-vector-icons'],
      },
    },
    '@storybook/addon-ondevice-controls', 
    '@storybook/addon-ondevice-actions'
  ],
};
