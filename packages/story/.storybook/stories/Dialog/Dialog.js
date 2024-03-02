import React from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import { Dialog } from '@rneui/themed';
import SvgClose from '@bboy-app/story/assets/close.svg'
import { LightColor, PrimaryColor } from "../colors";

export function MyDialog(props) {
  const {
    children,
    visible,
    handleCancel,
    title
  } = props;

  return (
    <Dialog
      isVisible={visible}
      onBackdropPress={handleCancel}
      overlayStyle={styles.contentView(props)}
    >
      <View style={styles.header(props)}>
        <Text style={styles.title(props)}>{title}</Text>
        <TouchableOpacity onPress={handleCancel} activeOpacity={0.8}
          style={styles.button(props)}>
          <SvgClose
            height="12"
            stroke={LightColor}
            strokeWidth={4}
          />
        </TouchableOpacity>
      </View>
      {children}
    </Dialog >
  );
}

const styles = StyleSheet.create({
  contentView: ({ isDark }) => ({
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: isDark ? '#2E343B' : '#e5e5e5',
    borderRadius: 10,
  }),
  header: ({ isDark }) => ({
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  }),
  title: ({ isDark }) => ({
    color: isDark ? LightColor : '#373C40',
    fontSize: 12,
    fontWeight: 'bold',
  }),
  button: ({ isDark }) => ({
    backgroundColor: isDark ? '#373C40' : PrimaryColor,
    width: 24,
    height: 24,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 4
  })
});
