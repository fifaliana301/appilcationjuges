import React from "react"
import { Text, View, StyleSheet, TouchableOpacity } from "react-native"
import {
  MyBlock,
  MyCounter,
  MyButton,
  MyIcon
} from '@bboy-app/story';

const CenterComponent: React.FC<any> = ({
  isDark,
  execution,
  setExecution,
  form,
  setForm,
  confidence,
  setConfidence,
  spontaneity,
  setSpontaneity,
  crash,
  setCrash,
  misbehavior,
  setMisbehavior,
  repeat,
  setRepeat,
  beat,
  setBeat,
  actionsDatas,
  setUndo,
  competitorsActive,
}) => {

  return (
    <View style={{ justifyContent: 'flex-start', top: -16 }}>
      <View style={styles.blockCenters({ isDark })}>
        <MyBlock
          isDark={isDark}
          style={{
            contentView: {
              paddingTop: 4,
              minWidth: 90,
              paddingHorizontal: 0,
            }
          }}
        >
          <View style={styles.leftHeader({ isDark })}>
            <Text style={styles.leftTitle({ isDark })}>Record</Text>
            <TouchableOpacity onPress={setUndo}>
              <Text style={styles.undo({ isDark })}>Undo</Text>
            </TouchableOpacity>
          </View>
          {
            [0, 1, 2].map((i) => {
              const actionData = actionsDatas[i]
              return <View
                key={i}
                style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 12, marginVertical: 2 }}
              >
                {actionData &&
                  <MyIcon
                    name="play"
                    size={8}
                    color={isDark ? '#ffffff' : '#373C40'}
                    key={`action-${i}`}
                    strokeWidth={2}
                  />
                }
                <Text style={{ fontSize: 9, color: isDark ? '#ffffff' : '#373C40', marginLeft: 4 }}>{actionData && actionData.latestAction}</Text>
              </View>
            })
          }
        </MyBlock>


        <MyBlock
          isDark={isDark}
          style={{
            contentView: {
              flex: 1,
              marginHorizontal: 4,
              paddingTop: 4,
            }
          }}
        >
          <MyCounter
            isDark={isDark}
            title="Execution"
            value={execution}
            setValue={setExecution}
            step={0.1}
            style={{
              contentView: {
                marginBottom: 8
              }
            }}
          />
          <MyCounter
            isDark={isDark}
            title="Form"
            value={form}
            setValue={setForm}
            step={0.1}
          />
        </MyBlock>


        <View style={styles.buttonCenters({ isDark })} >
          <MyButton
            text="Repeat"
            testID="login"
            style={{
              contentView: {
                paddingHorizontal: 8,
                alignItems: 'center',
                justifyContent: 'center',
                height: 24,
              },
              text: {
                fontSize: 10,
              }
            }}
            isDark={isDark}
            isSecondary
            iconLeft={
              <View style={{ right: 2 }}>
                <MyIcon
                  name="minus_square"
                  size={10}
                />
              </View>
            }
            onPress={() => setRepeat(repeat - 0.1)}
          />
          <MyButton
            text="Beat"
            testID="login"
            style={{
              contentView: {
                paddingHorizontal: 8,
                alignItems: 'center',
                justifyContent: 'center',
                height: 24,
                marginTop: 8
              },
              text: {
                fontSize: 10,
              }
            }}
            isDark={isDark}
            isSecondary
            iconLeft={
              <View style={{ right: 2 }}>
                <MyIcon
                  name="minus_square"
                  size={10}
                />
              </View>
            }
            onPress={() => setBeat(beat - 0.1)}
          />
        </View>


        <MyBlock
          isDark={isDark}
          style={{
            contentView: {
              flex: 1,
              marginHorizontal: 4,
              paddingTop: 4,
            }
          }}
        >
          <MyCounter
            isDark={isDark}
            title="Confidence"
            value={confidence}
            setValue={setConfidence}
            step={0.1}
            style={{
              contentView: {
                marginBottom: 8
              }
            }}
          />
          <MyCounter
            isDark={isDark}
            title="Spontaneity"
            value={spontaneity}
            setValue={setSpontaneity}
            step={0.1}
          />
        </MyBlock>


        <MyBlock
          isDark={isDark}
          style={{
            contentView: {
              paddingTop: 4,
              paddingHorizontal: 4,
              justifyContent: 'flex-start',
            }
          }}
        >
          {
            [1, 2, 3].map((i) => {
              return (
                <MyButton
                  key={i}
                  text={`Crach${i}`}
                  testID="login"
                  style={{
                    contentView: {
                      paddingHorizontal: 8,
                      alignItems: 'center',
                      justifyContent: 'center',
                      height: 16,
                      width: 50,
                      marginTop: 4,
                      padding: 0,
                    },
                    text: {
                      fontSize: 9,
                    }
                  }}
                  isDark={isDark}
                  isSecondary
                  onPress={() => setCrash(crash - (0.1 * i))}
                />
              )
            })
          }
          <MyButton
            text="Misbehavior"
            testID="login"
            style={{
              contentView: {
                paddingHorizontal: 8,
                alignItems: 'center',
                justifyContent: 'center',
                height: 20,
                marginTop: 6,
                padding: 0,
                borderRadius: 5,
              },
              text: {
                fontSize: 9,
              }
            }}
            isDark={isDark}
            isSecondary
            iconLeft={
              <View style={{ right: 2 }}>
                <MyIcon
                  name="minus_square"
                  size={10}
                />
              </View>
            }
            onPress={() => setMisbehavior(misbehavior + 1)}
          />
        </MyBlock>
      </View>
    </View>
  )
}

const styles = StyleSheet.create<any>({
  blockCenters: ({ isDark }) => ({
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginBottom: 8,
  }),
  buttonCenters: ({ isDark }) => ({
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  }),
  leftHeader: ({ isDark }) => ({
    flexDirection: 'row',
    backgroundColor: isDark ? '#22272C' : '#22272C22',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 8,
    marginHorizontal: 2,
    marginBottom: 4,
  }),
  leftTitle: ({ isDark }) => ({
    fontSize: 10,
    color: isDark ? "#FFFFFF" : '#373C40',
  }),
  undo: ({ isDark }) => ({
    fontSize: 9,
    color: '#F06A73',
  }),
})

export default CenterComponent
