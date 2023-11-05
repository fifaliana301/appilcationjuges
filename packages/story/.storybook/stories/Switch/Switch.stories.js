import React from 'react';
import { View, Text } from 'react-native';
import { MySwitch } from './Switch';

export default {
  title: 'Switch',
  component: MySwitch,
};

export const BasicSwitch = (args) => {
  const [value, setValue] = React.useState(false);
  return <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1, backgroundColor: value ? '#000000' : '#ffffff' }}>
    <MySwitch {...args} value={value} setValue={setValue} />
  </View>
};

BasicSwitch.args = {
  isDark: true,
};
