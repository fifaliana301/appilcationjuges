import React from 'react';
import { View } from 'react-native';
import { MySlider } from './Slider';

export default {
  title: 'Slider',
  component: MySlider,
};

export const BasicSlider = (args) => {
  const [value, setValue] = React.useState(0);

  return <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1, backgroundColor: args.isDark ? '#000000' : '#ffffff' }}>
    <MySlider {...args} {...{value, setValue}}/>
  </View>
};

BasicSlider.args = {
  title: 'Hello World',
  min: 0,
  max: 1.3,
  isDark: true
};
