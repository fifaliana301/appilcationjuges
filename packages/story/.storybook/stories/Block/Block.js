import React from 'react';
import { View, StyleSheet } from 'react-native';

export const MyBlock = ({ children, isDark, style }) => {

  return (
    <View style={[styles.contentView({isDark}), style?.contentView]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  contentView: ({isDark}) => ({
    width: 80,
    padding: 8,
    backgroundColor: isDark? '#2E343B': '#e5e5e5',
    borderRadius: 10,
  }),
});
