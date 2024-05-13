import { Text } from '@rneui/base';
import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { DangerColor, SuccessColor } from '../colors'

export const MyCompetitors = (props) => {
  const {
    onPress,
    style,
    testID,
    source,
    name,
    isActive,
  } = props
  const uri = source?.photos?.length ?
    `http://10.42.0.1:4000/${source?.photos[source?.photos?.length - 1]?.name}` :
    'https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnN8ZW58MHx8MHx8fDA%3D';
  return (
    <TouchableOpacity
      style={[{
        alignItems: 'center',
        opacity: isActive ? 1 : 0.7,
        justifyContent: 'center',
      }, style?.contentView]}
      onPress={onPress}
      activeOpacity={0.8}
      testID={testID}
    >
      <View
        style={[styles.container(props), style?.containerImage]}
      >
        <Image
          style={[styles.image(props), style?.image]}
          source={{
            uri
          }}
        />
      </View>
      {name && <Text style={styles.name(props)}>{name}</Text>}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: ({ isActive, size, isDark }) => ({
    borderRadius: size || 60,
    justifyContent: 'center',
    alignItems: 'center',
    width: size || 60,
    height: size || 60,
    borderWidth: 2,
    borderColor: isActive ? SuccessColor : 'transparent',
    backgroundColor: isDark ? '#2E343B' : '#e5e5e5',
  }),
  image: ({ isDark, size }) => ({
    height: (size || 60) - 4,
    width: (size || 60) - 4,
    resizeMode: 'stretch',
    borderRadius: (size || 60) - 4,
  }),
  name: ({ isDark }) => ({
    color: isDark ? DangerColor : '#373C40',
    fontSize: 10,
  }),
});
