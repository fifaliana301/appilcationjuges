import React from 'react';
import { TouchableOpacity, StyleSheet, Image } from 'react-native';
// import SvgUri from 'react-native-svg-uri';
import SvgUser from '@bboy-app/story/assets/user.svg';
import {LightColor} from '../colors';

export const MyAvatar = ({
  onPress,
  isDark,
  style,
  size = 24,
  testID,
  source
}) => {
  return (
    <TouchableOpacity
      style={[styles.container({ isDark, size }), style?.contentView]}
      onPress={onPress}
      activeOpacity={.8}
      testID={testID}>
      {source ?
        <Image
          style={[styles.image({ isDark, size }), style?.image]}
          source={{
            uri: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnN8ZW58MHx8MHx8fDA%3D',
          }}
        />
        :
        <SvgUser
          height="16"
          stroke={isDark ? LightColor : '#373C40'}
          strokeWidth={2}
          key={`${isDark}-user`}
        />
      }
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: ({ isDark, size }) => ({
    borderRadius: size,
    justifyContent: 'center',
    alignItems: 'center',
    height: size,
    width: size,
    borderWidth: 1,
    borderColor: isDark ? LightColor : '#373C40',
    overFlow: 'hidden'
  }),
  image: ({ isDark, size }) => ({
    width: size,
    height: size,
    resizeMode: 'stretch',
    borderRadius: size,
  }),
});
