import { Text } from '@rneui/base';
import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';

export const MyCompetitors = (props) => {
  const {
    onPress,
    style,
    testID,
    source,
    name,
    isActive,
  } = props
  return (
    <TouchableOpacity
      style={{
        alignItems: 'center',
        opacity: isActive ? 1 : 0.7,
        justifyContent: 'center',
      }}
      onPress={onPress}
      activeOpacity={0.8}
      testID={testID}
    >
      <View
        style={[styles.container(props), style?.contentView]}
      >
        <Image
          style={[styles.image(props), style?.image]}
          source={{
            uri: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnN8ZW58MHx8MHx8fDA%3D',
          }}
        />
      </View>
      {name && <Text style={{ fontSize: 10 }}>{name}</Text>}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: ({ isActive, size }) => ({
    borderRadius: size || 60,
    justifyContent: 'center',
    alignItems: 'center',
    width: size || 60,
    height: size || 60,
    borderWidth: 2,
    borderColor: isActive ? '#35DE19' : 'transparent',
  }),
  image: ({ isDark, size }) => ({
    height: (size || 60) - 4,
    width: (size || 60) - 4,
    resizeMode: 'stretch',
    borderRadius: (size || 60) - 4,
  }),
});
