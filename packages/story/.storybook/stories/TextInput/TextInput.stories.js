import React from 'react';
import { View, Text } from 'react-native';
import { MyTextInput, MyTextInputPassword } from './TextInput';

export default {
  title: 'TextInput',
  component: MyTextInput,
};

export const BasicTextInput = (args) => {
  return <View
    style={{
      alignItems: 'center', justifyContent: 'center', flex: 1,
      backgroundColor: args.isDark ? '#000000' : '#ffffff'
    }}>
    <MyTextInput {...args} />
  </View>
};

BasicTextInput.args = {
  isDark: true,
  title: "Login",
  style: {
    TextInput: {
      width: 250
    }
  }
};


export const BasicTextPasswordInput = (args) => {
  const [password, setPassowrd] = React.useState("")
  return <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1, backgroundColor: args.isDark ? '#000000' : '#ffffff' }}>
    <MyTextInputPassword {...args} value={password} setValue={setPassowrd}/>
  </View>
};

BasicTextPasswordInput.args = {
  isDark: true,
  title: "Login",
  style: {
    TextInput: {
      width: 250
    }
  }
};
