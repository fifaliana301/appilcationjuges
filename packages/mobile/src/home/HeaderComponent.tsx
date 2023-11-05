import React from "react"
import { View, StyleSheet } from "react-native"
import {
  MyButton,
  MySwitch,
  MyIcon,
  MyAvatar,
} from '@bboy-app/story';
import { useDispatch } from "react-redux";
import AsyncStorage from '@react-native-async-storage/async-storage';

const HeaderComponent: React.FC<any> = ({
  isDark,
  handleBack,
  handleRounds,
  roundsActive,
}) => {
  const dispatch = useDispatch()

  const storeData = async (value: any) => {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem('isDark', jsonValue);
    return value;
  };

  const setDark = () => {
    storeData(!isDark)
      .then((isDarkStorage) => {
        dispatch({ type: 'system/setIsDark', payload: isDarkStorage })
      })
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
        text={roundsActive?.name}
        onPress={handleRounds}
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
      <View style={styles.headerRight({ isDark })}>
        <MySwitch
          value={isDark}
          setValue={setDark}
        />
        <MyButton
          onPress={handleBack}
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
