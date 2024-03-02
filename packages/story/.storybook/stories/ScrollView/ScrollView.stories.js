import React from 'react';
import { View, Text } from 'react-native';
import { MyScrollView } from './ScrollView';

export default {
  title: 'ScrollView',
  component: MyScrollView,
};

export const BasicScrollView = (args) => {
  return <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1, backgroundColor: args.isDark ? '#000000' : '#ffffff', padding: 16 }}>
    <MyScrollView {...args} >
      <Text style={{ color: args.isDark ? '#ffffff' : '#000000' }}>test</Text>
      <Text style={{ color: args.isDark ? '#ffffff' : '#000000' }}>test</Text>
      <Text style={{ color: args.isDark ? '#ffffff' : '#000000' }}>test</Text>
      <Text style={{ color: args.isDark ? '#ffffff' : '#000000' }}>test</Text>
    </MyScrollView>
  </View>
};

BasicScrollView.args = {
  isDark: true,
  height: 50
};
