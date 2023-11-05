import React from 'react';
import { View } from 'react-native';
import { MyCompetitors } from './Competitors';

export default {
  title: 'Competitors',
  component: MyCompetitors,
};

export const CompetitorsBasicBlock = (args) => {
  return <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1, backgroundColor: args.isDark ? '#000000' : '#ffffff' }}>
    <MyCompetitors {...args} />
  </View>
};

CompetitorsBasicBlock.args = {
  isDark: true,
  text: 'Hello wold',
  onPress: () => { console.log('pressed the Competitors nate') }
};

