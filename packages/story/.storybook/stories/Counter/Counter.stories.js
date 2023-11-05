import React from 'react';
import { View } from 'react-native';
import { MyCounter } from './Counter';

export default {
  title: 'Counter',
  component: MyCounter,
};

export const CounterBasicBlock = (args) => {
  return <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1, backgroundColor: args.isDark ? '#000000' : '#ffffff' }}>
    <MyCounter {...args} />
  </View>
};

CounterBasicBlock.args = {
  isDark: true,
  text: 'Hello wold',
  onPress: () => { console.log('pressed the Counter nate') }
};
