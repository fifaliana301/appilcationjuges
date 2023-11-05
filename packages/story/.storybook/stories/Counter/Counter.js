import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import SvgUri from 'react-native-svg-uri';
import SvgPlus from '@bboy-app/story/assets/plus.svg'
import SvgMinus from '@bboy-app/story/assets/minus.svg'

export const MyCounter = ({
  value = 0,
  setValue = () => { },
  title,
  isDark,
  style,
  testID,
  step=0.1
}) => {
  return (<View style={[styles.container({ isDark }), style?.contentView]} testID={testID}>
    <Text style={[styles.title({ isDark })]}>{title}</Text>
    <TouchableOpacity onPress={() => setValue(value + step)} activeOpacity={0.8} style={[styles.button({ isDark }), style?.button]}>
      <SvgPlus
        height="12"
      />
    </TouchableOpacity>
    <TouchableOpacity onPress={() => setValue(value - step)} activeOpacity={0.8}
      style={[styles.button({ isDark }), { backgroundColor: '#F06A73' }, style?.button]}>
      <SvgMinus
        height="12"
      />
    </TouchableOpacity>
  </View>
  );
};

const styles = StyleSheet.create({
  container: ({ isDark }) => ({
    flexDirection: 'row',
    alignItems: 'center',
  }),
  title: ({ isDark }) => ({
    color: isDark ? '#ffffff' : '#373C40',
    fontSize: 10,
    flex: 1,
  }),
  button: ({ isDark }) => ({
    backgroundColor: isDark ? '#373C40' : '#1C4874',
    width: 24,
    height: 24,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 4
  })
});
