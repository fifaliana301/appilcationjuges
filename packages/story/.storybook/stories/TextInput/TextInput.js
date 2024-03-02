import React from 'react';
import { View, StyleSheet, TextInput, Text, TouchableOpacity } from 'react-native';

import SvgUri from 'react-native-svg-uri';
import SvgEyeOff from '@bboy-app/story/assets/eye_off.svg';
import SvgEye from '@bboy-app/story/assets/eye.svg';

export const MyTextInput = ({ testID, isDark, title, style, value, setValue, placeholder }) => {

  return (
    <View style={[styles.contentView({ isDark }), style?.contentView]}>
      <Text style={{ fontSize: 12, color: isDark ? "#FCFBF8" : "#373C40", top: 0, left: 4 }}>{title}</Text>
      <TextInput
        style={[styles.TextInput({ isDark }), style?.TextInput]}
        testID={testID}
        placeholder={placeholder}
        value={value}
        onChangeText={setValue}
      />
    </View>
  );
};

export const MyTextInputPassword = ({ testID, isDark, title, style, value, setValue, placeholder }) => {
  const [show, setShow] = React.useState(false)

  return (
    <View style={[styles.contentView({ isDark }), style?.contentView]}>
      <Text style={{ fontSize: 12, color: isDark ? "#FCFBF8" : "#373C40", top: 0, left: 4 }}>{title}</Text>
      <View style={[styles.TextInput({ isDark }), { padding: 0 }]}>
        <TextInput
          style={[styles.TextInput({ isDark }), {backgroundColor: 'transparent'}, style?.TextInput]}
          secureTextEntry={!show}
          value={value}
          onChangeText={setValue}
          testID={testID}
          placeholder={placeholder}
        />
        {
          value &&
          <TouchableOpacity style={styles.eye({ show })} onPress={() => { setShow(!show) }}>
            {show ?
              <SvgEyeOff
                height="22"
              /> :
              <SvgEye
                height="16"
              />
            }
          </TouchableOpacity>
        }
      </View>

      </View>
  );
};

const styles = StyleSheet.create({
  contentView: ({ isDark }) => ({
    minWidth: 100,
    height: 64,
  }),
  TextInput: ({ isDark }) => ({
    // backgroundColor: isDark ? '#373C40' : '#f4f4f4',
    backgroundColor: '#f4f4f4',
    borderRadius: 10,
    height: 32,
    paddingHorizontal: 8,
    justifyContent: 'center',
    // color: !isDark ? '#373C40' : '#f4f4f4',
    color: '#373C40',
    marginTop: 4,
    fontSize: 10,
  }),
  eye: ({ show }) => ({
    position: 'absolute',
    right: show ? 12 : 8,
  }),
});
