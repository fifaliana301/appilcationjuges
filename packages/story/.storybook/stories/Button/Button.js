import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export const MyButton = (props) => {
  const {
    onPress,
    text,
    iconLeft,
    style,
    testID,
  } = props
  return (
    <TouchableOpacity
      style={[styles.container(props), style?.contentView]}
      onPress={onPress}
      activeOpacity={0.8}
      testID={testID}
    >
      {iconLeft && iconLeft}
      <Text style={[styles.text, style?.text]}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: ({ isDark, text, isSecondary }) => ({
    paddingHorizontal: text ? 16 : 8,
    borderRadius: 8,
    backgroundColor: isSecondary? '#F06A73': (isDark ? '#22272c' : '#1C4874'),
    flexDirection: 'row',
    alignItems: 'center',
    height: 32,
  }),
  text: { color: 'white', fontSize: 12 },
});
