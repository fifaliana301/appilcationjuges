import React from "react"
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native"
import {
  MyButton,
  MySwitch,
  MyIcon,
  MyAvatar,
  MyDialog,
  MyScrollView,
} from '@bboy-app/story';
import { useDispatch } from "react-redux";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setIsDark } from "../../reducers/slices";
import io from 'socket.io-client';
const socket = io('http://10.42.0.1:4001');

const HeaderComponent: React.FC<any> = ({
  isDark,
  handleBack,
  handleRounds,
  reloadRounds,
  roundsActive,
  rounds,
  loadingRound,
}) => {
  const [isConfirm, setIsConfirm] = React.useState(false)

  React.useEffect(() => {
    socket.on('roundAdded', (message) => {
      reloadRounds()
    });
    return () => {
      socket.off('message');
    };
  }, []);
  const dispatch = useDispatch()
  const [visible, setVisible] = React.useState(false);

  const storeData = async (value: any) => {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem('isDark', jsonValue);
    return value;
  };

  const setDark = () => {
    storeData(!isDark)
      .then((isDarkStorage) => {
        dispatch(setIsDark(isDarkStorage))
      })
  }


  const showDialog = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleNextRounds = () => {
    const nextRound = rounds.find((round: any) => !round.active)
    if (nextRound) {
      handleRounds(nextRound)
    }
  }


  const handleSave = () => {
    console.log("handleSave");
    socket.emit("saveAll", "")
  }

  return (
    <View style={styles.header({ isDark })}>
      <View style={{ flex: 1 }}>
        <MyButton
          iconLeft={
            <View style={{ right: 2 }}>
              <MyIcon
                name="back"
                size={10}
              />
            </View>
          }
          onPress={handleBack}
          testID="login"
          style={{
            contentView: {
              alignItems: 'center',
              justifyContent: 'center',
              height: 24,
              width: 24,
            },
            text: {
              fontSize: 10,
            }
          }}
          isDark={isDark}
        />
      </View>
      <MyButton
        text={roundsActive?.name || "Reload"}
        onPress={roundsActive?.name ? showDialog : reloadRounds}
        testID="login"
        style={{
          contentView: {
            alignItems: 'center',
            justifyContent: 'center',
            height: 24,
          },
          text: {
            fontSize: 10,
          }
        }}
        isDark={isDark}
      />

      <MyDialog isDark={isDark} visible={visible} handleCancel={handleCancel}>
        <MyScrollView
          isDark={isDark}
          height={100}
          style={{
            contentView: {
              paddingHorizontal: 32,
            },
            scrollViewContainer: {
              paddingLeft: 16,
            }
          }}
        >
          {
            rounds?.map((round: any) => {
              return <TouchableOpacity
                key={round?.id}
                style={{
                  opacity: round?.id === roundsActive?.id ? 1 : 0.3,
                  padding: 8,
                  borderRadius: 2,
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                }}
                onPress={() => {
                  // handleRounds(round)
                }}
              >
                <MyIcon
                  name="play"
                  size={8}
                  color={round?.id === roundsActive?.id ? (isDark ? '#ffffff' : '#373C40') : 'transparent'}
                  strokeWidth={2}
                />
                <Text style={{ color: isDark ? '#ffffff' : '#373C40', marginLeft: 8, }}>{round?.name}</Text>
              </TouchableOpacity>
            })
          }
        </MyScrollView>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          {isConfirm ?
            <>
              <MyButton
                text="Next"
                onPress={() => {
                  handleNextRounds()
                  setIsConfirm(true)
                }}
                style={{
                  contentView: {
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: 24,
                    marginTop: 16,
                    width: '45%'
                  },
                  text: {
                    fontSize: 10,
                  }
                }}
                isDark={isDark}
                loading={loadingRound}
              />
              <MyButton
                text="Cancel"
                onPress={() => {
                  setIsConfirm(false)
                }}
                style={{
                  contentView: {
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: 24,
                    marginTop: 16,
                    width: '45%'
                  },
                  text: {
                    fontSize: 10,
                  }
                }}
                isDark={isDark}
                loading={loadingRound}
              />
            </> :
            <MyButton
              text="Next"
              onPress={() => {
                setIsConfirm(true)
              }}
              style={{
                contentView: {
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 24,
                  marginTop: 16,
                  width: '90%'
                },
                text: {
                  fontSize: 10,
                }
              }}
              isDark={isDark}
              loading={loadingRound}
            />
          }
        </View>
      </MyDialog>

      <View style={styles.headerRight({ isDark })}>
        <MySwitch
          value={isDark}
          setValue={setDark}
        />
        <MyButton
          onPress={handleSave}
          testID="login"
          iconLeft={
            <MyIcon
              name="save"
              size={20}
              color={isDark ? '#ffffff' : '#373C40'}
            />
          }
          style={{
            contentView: {
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'transparent',
              paddingHorizontal: 0,
              marginLeft: 8
            }
          }}
          isDark={isDark}
        />
        <MyAvatar
          isDark={isDark}
          style={{
            contentView: {
              marginLeft: 16,
              borderRadius: 8,
            },
            image: {
              borderRadius: 8,
            }
          }}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create<any>({
  header: ({ isDark }) => ({
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // padding: 8
  }),
  headerRight: ({ isDark }) => ({
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flex: 1
  }),
})

export default HeaderComponent
