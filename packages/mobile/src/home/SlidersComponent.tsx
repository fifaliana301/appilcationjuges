import React from "react"
import { View, StyleSheet } from "react-native"
import {
  MyBlock,
  MySlider,
} from '@bboy-app/story';

const SlidersComponent:React.FC<any> = ({
  isDark,
  technique,
  setTechnique,
  variete,
  setVariete,
  performativity,
  setPerformativity,
  musicality,
  setMusicality,
  creativity,
  setCreativity,
  personality,
  setPersonality
}) => {
  return (
    <View style={styles.sliders({ isDark })}>
      <MyBlock
        isDark={isDark}
        style={{
          contentView: {
            flex: 1,
            marginRight: 16,
            paddingTop: 4,
          }
        }}
      >
        <MySlider
          isDark={isDark}
          title="Technique" 
          value={technique}
          setValue={setTechnique}
          min={0}
          max={2}
          style={{
            contentView: {
              marginBottom: 4
            }
          }}
        />
        <MySlider
          isDark={isDark}
          title="Variete"
          value={variete}
          setValue={setVariete}
          min={0}
          max={1.3}
        />
      </MyBlock>
      <MyBlock
        isDark={isDark}
        style={{
          contentView: {
            flex: 1,
            paddingTop: 4,
          }
        }}
      >
        <MySlider
          isDark={isDark}
          title="Performativity"
          value={performativity}
          setValue={setPerformativity}
          min={0}
          max={2}
          style={{
            contentView: {
              marginBottom: 4
            }
          }}
        />
        <MySlider
          isDark={isDark}
          title="Musicality"
          value={musicality}
          setValue={setMusicality}
          min={0}
          max={1.3}
        />
      </MyBlock>
      <MyBlock
        isDark={isDark}
        style={{
          contentView: {
            flex: 1,
            marginLeft: 16,
            paddingTop: 4,
          }
        }}
      >
        <MySlider
          isDark={isDark}
          title="Creativity"
          value={creativity}
          setValue={setCreativity}
          min={0}
          max={2}
          style={{
            contentView: {
              marginBottom: 4
            }
          }}
        />
        <MySlider
          isDark={isDark}
          title="Personality"
          value={personality}
          setValue={setPersonality}
          min={0}
          max={1.3}
        />
      </MyBlock>
    </View>
  )
}

const styles = StyleSheet.create<any>({
  sliders: ({ isDark }) => ({
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    top: -16
  }),
})

export default SlidersComponent
