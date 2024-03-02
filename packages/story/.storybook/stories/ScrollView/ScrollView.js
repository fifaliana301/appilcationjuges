import React, { useState, useRef } from 'react';
import { Text, Animated, StyleSheet, View, ScrollView } from 'react-native';
import { PrimaryColor } from '../colors';

export const MyScrollView = (props) => {
  const { children } = props;
  const [completeScrollBarHeight, setCompleteScrollBarHeight] = useState(1);
  const [visibleScrollBarHeight, setVisibleScrollBarHeight] = useState(0);
  const scrollIndicator = useRef(new Animated.Value(0)).current;

  const scrollIndicatorSize =
    completeScrollBarHeight > visibleScrollBarHeight
      ? (visibleScrollBarHeight * visibleScrollBarHeight)
      / completeScrollBarHeight
      : visibleScrollBarHeight;

  const difference =
    visibleScrollBarHeight > scrollIndicatorSize
      ? visibleScrollBarHeight - scrollIndicatorSize
      : 1;

  const scrollIndicatorPosition = Animated.multiply(
    scrollIndicator,
    visibleScrollBarHeight / completeScrollBarHeight,
  ).interpolate({
    extrapolate: 'clamp',
    inputRange: [0, difference],
    outputRange: [0, difference],
  });

  const onContentSizeChange = (_, contentHeight) =>
    setCompleteScrollBarHeight(contentHeight);

  const onLayout = ({
    nativeEvent: {
      layout: { height },
    },
  }) => {
    setVisibleScrollBarHeight(height);
  };

  return (
    <View style={[styles.scrollContainer(props), props.style.contentView]}>
      <ScrollView
        contentContainerStyle={{ paddingRight: 14 }}
        onContentSizeChange={onContentSizeChange}
        onLayout={onLayout}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollIndicator } } }],
          { useNativeDriver: false },
        )}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        style={[styles.scrollViewContainer, props.style.scrollViewContainer]}
      >
        {children}
      </ScrollView>
      <View style={styles.customScrollBarBackground(props)}>
        <Animated.View
          style={[
            styles.customScrollBar(props),
            {
              height: scrollIndicatorSize,
              transform: [{ translateY: scrollIndicatorPosition }],
            },
          ]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollContainer: ({ height }) => ({
    flexDirection: 'row',
    width: '100%',
    height: height || 100,
    justifyContent: 'center',
  }),
  scrollViewContainer: {
    width: '100%',
  },
  customScrollBar: ({ isDark }) => ({
    backgroundColor: isDark ? '#D9D9D9' : PrimaryColor,
    borderRadius: 3,
    width: 6,
    right: 3,
  }),
  customScrollBarBackground: ({ isDark }) => ({
    backgroundColor: isDark ? '#373C40' : '#c9c9c9',
    borderRadius: 3,
    height: '100%',
    width: 1,
  }),
});
