import React from 'react';
import { View } from 'react-native';
import { MyIcon, svgMap } from './Icon';

export default {
  title: 'Icon',
  component: MyIcon,
};

export const ButtonBasicBlock = (args) => {
  return <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1, backgroundColor: args.isDark ? '#000000' : '#ffffff' }}>
    <MyIcon {...args} />
  </View>
};

ButtonBasicBlock.args = {
  isDark: true,
  // name: { control: { type: "select", options: Object.keys(svgMap) } },
  name: "save"
};

