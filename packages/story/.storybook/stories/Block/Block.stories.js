import React from 'react';
import { View, Text } from 'react-native';
import { MyBlock } from './Block';

export default {
  title: 'Block',
  component: MyBlock,
};

export const BasicBlock = (args) => {
  return <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1, backgroundColor: args.isDark ? '#000000' : '#ffffff' }}>
    <MyBlock {...args} >
      <Text>test</Text>
      <Text>test</Text>
      <Text>test</Text>
      <Text>test</Text>
    </MyBlock>
  </View>
};

BasicBlock.args = {
  isDark: true
};
