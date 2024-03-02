import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { DangerColor, LightColor, PrimaryColor } from '../colors'

export const MyButton = (props) => {
  const {
    onPress,
    text,
    iconLeft,
    style,
    testID,
    loading,
  } = props
  return (
    <TouchableOpacity
      style={[styles.container(props), style?.contentView]}
      onPress={loading ? () => { } : onPress}
      activeOpacity={0.8}
      testID={testID}
    >
      {iconLeft && iconLeft}
      {loading && <ActivityIndicator color={LightColor} size={10} style={{ marginRight: 4 }} />}
      <Text style={[styles.text, style?.text]}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: ({ isDark, text, isSecondary }) => ({
    paddingHorizontal: text ? 16 : 8,
    borderRadius: 8,
    backgroundColor: isSecondary ? DangerColor : (isDark ? '#373C40' : PrimaryColor),
    flexDirection: 'row',
    alignItems: 'center',
    height: 32,
  }),
  text: { color: LightColor, fontSize: 12 },
});
