import React from 'react';
import { View } from 'react-native';
import { MyButton } from './Button';

export default {
  title: 'Button',
  component: MyButton,
};

export const ButtonBasicBlock = (args) => {
  return <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1, backgroundColor: args.isDark ? '#000000' : '#ffffff' }}>
    <MyButton {...args} />
  </View>
};

ButtonBasicBlock.args = {
  isDark: true,
  text: 'Hello wold',
  onPress: () => { console.log('pressed the button nate') }
};

export const IconTextButton = (args) => {
  return <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1, backgroundColor: args.isDark ? '#000000' : '#ffffff' }}>
    <MyButton {...args} />
  </View>
};

IconTextButton.args = {
  iconLeft: <View style={{width: 18, height: 18, backgroundColor: 'red' }}/>,
  isDark: true,
  text: 'Hello wold',
  onPress: () => { console.log('pressed the button nate') }
};

export const IconButton = (args) => {
  return <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1, backgroundColor: args.isDark ? '#000000' : '#ffffff' }}>
    <MyButton {...args} />
  </View>
};

IconButton.args = {
  iconLeft: <View style={{width: 18, height: 18, backgroundColor: 'red' }}/>,
  isDark: true,
  onPress: () => { console.log('pressed the button nate') }
};
