import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import ToggleButton from "react-native-toggle-element";
import SvgUri from 'react-native-svg-uri';
import SvgMoon from '@bboy-app/story/assets/moon.svg';
import SvgSun from '@bboy-app/story/assets/sun.svg';

const thumbSize = 28

const Thumb = ({ children, value }) => {
  return (<View
    style={{
      height: thumbSize,
      width: thumbSize,
      borderRadius: thumbSize,
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <View
      style={{
        height: thumbSize - 8,
        width: thumbSize - 8,
        borderRadius: thumbSize - 8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: value ? '#FCFBF8' : "#373c4033",
      }}
    >
      {children}
    </View>
  </View>)
}
export const MySwitch = ({ style, value, setValue }) => {
  return (
    <ToggleButton
      containerStyle={style}
      value={value}
      onPress={(newState) => setValue(newState)}
      leftComponent={
        value &&
        <SvgSun
          height={thumbSize / 2}
          stroke="#373c40"
          strokeWidth={2}
        />
      }
      rightComponent={
        !value &&
        <SvgMoon
          height={thumbSize / 2}
          stroke="#373c40"
          strokeWidth={2}
        />
      }
      thumbInActiveComponent={
        <Thumb value={value}>
          <SvgSun
            height={thumbSize / 2}
            stroke="#373c40"
            strokeWidth={2}
          />
        </Thumb>
      }
      thumbActiveComponent={
        <Thumb value={value}>
          <SvgMoon
            height={thumbSize / 2}
            stroke="#373c40"
            strokeWidth={2}
          />
        </Thumb>
      }
      trackBar={{
        activeBackgroundColor: value ? "#373c4094" : "#e5e5e5",
        inActiveBackgroundColor: value ? "#373c4094" : "#e5e5e5",
        width: thumbSize * 2,
        height: thumbSize,
      }}
      thumbStyle={{
        justifyContent: 'center',
        alignItems: 'center',
      }}
      thumbButton={{
        height: thumbSize,
        width: thumbSize,
        activeBackgroundColor: "transparent",
        inActiveBackgroundColor: "transparent",
      }}
    />
  );
};
