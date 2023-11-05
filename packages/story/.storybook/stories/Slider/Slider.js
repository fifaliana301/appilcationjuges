import React from 'react'; 
import { View, StyleSheet, Text } from 'react-native'; 
import { Slider } from '@rneui/themed';
export const MySlider = ({
  max,
  value,
  setValue,
  isDark,
  title,
  style
}) => {

  const [lv, setlv]= React.useState(0)

  React.useEffect(() => {
    setlv(value)
  }, [value])

  const round = (nb, after) => {
    return parseFloat(nb.toFixed(after))
  }

  const sliderHeight = 14

  return (
    <View style={[styles.contentView, style?.contentView]}>
      <Text
        style={{
          color: isDark ? "#FCFBF8" : "#373C40",
          left: 4,
          fontSize: sliderHeight - 4,
          // backgroundColor: 'green',
        }}
      >{title}</Text>
      <Slider
        style={{
          // backgroundColor: 'yellow',
          height: sliderHeight
        }}
        value={(value * 10) / max}
        onSlidingComplete={(e) => setValue(round(((e * max) / 10), 2))}
        onValueChange={(e) => setlv(round(((e * max) / 10), 2))}
        maximumValue={10}
        minimumValue={0}
        maximumTrackTintColor={isDark ? "#373C40" : "#FCFBF8"}
        minimumTrackTintColor={lv ? (isDark ? "#FCFBF8" : "#1C4874") : 'transparent'}
        step={1}
        allowTouchTrack
        trackStyle={{ height: sliderHeight, borderRadius: sliderHeight / 2 }}
        thumbStyle={{ height: sliderHeight, width: sliderHeight, backgroundColor: 'transparent' }}
        thumbProps={{
          children: (
            <View
              style={{
                height: sliderHeight,
                width: sliderHeight,
                backgroundColor: isDark ? "#FCFBF8" : "#1C4874",
                justifyContent: 'center',
                alignItems: 'center',
                borderTopRightRadius: 9,
                borderBottomRightRadius: 9,
                borderTopLeftRadius: lv ? 0 : 9,
                borderBottomLeftRadius: lv ? 0 : 9,
                // left: value ? 0 : -2
              }}
            >
              <View
                style={{
                  height: sliderHeight - 4,
                  width: sliderHeight - 4,
                  borderRadius: sliderHeight - 4,
                  backgroundColor: isDark ? "#373C40" : "#FCFBF8",
                }}
              />
            </View>
          ),
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  contentView: {
    minWidth: 100,
    justifyContent: 'center',
    alignItems: 'stretch',
  },
});
