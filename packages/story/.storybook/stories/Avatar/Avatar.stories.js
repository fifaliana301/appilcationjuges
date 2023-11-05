import React from 'react';
import { View } from 'react-native';
import { MyAvatar } from './Avatar';

export default {
  title: 'Avatar',
  component: MyAvatar,
};

export const AvatarBasicBlock = (args) => {
  return <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1, backgroundColor: args.isDark ? '#000000' : '#ffffff' }}>
    <MyAvatar {...args} />
  </View>
};

AvatarBasicBlock.args = {
  isDark: true,
  text: 'Hello wold',
  onPress: () => { console.log('pressed the Avatar nate') }
};

