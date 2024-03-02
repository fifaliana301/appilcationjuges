import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
} from 'react-native';
// import { add } from '@bboy-app/shared';
import {
  MyButton,
  MyTextInput,
  MyTextInputPassword,
  MyBlock,
  MySwitch,
} from '@bboy-app/story';
import { useDispatch, useSelector } from 'react-redux';
import { changeJudgesActiveFetch } from '../reducers/actions/judges.action';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { resetError, setIsDark } from '../reducers/slices';

function LoginComponent({ navigation }: any) {
  const dispatch = useDispatch()
  const isDark = useSelector((state: any) => state.system?.isDark)
  const judgesStatus = useSelector((state: any) => state.judges?.judgesStatus)
  const registerError = useSelector((state: any) => state.judges?.registerError)

  const [email, setEmail] = useState('example@gmail.com');
  const [password, setPassword] = useState('password');

  const handleLogin = () => {
    console.log("handleLogin")
    dispatch(changeJudgesActiveFetch({ email, password }))
  };


  const firstUpdateReward = React.useRef(true);
  React.useEffect(() => {
    if (firstUpdateReward.current) {
      firstUpdateReward.current = false;
      return;
    }
    if (judgesStatus === 'success') {
      navigation?.navigate('Calendars')
    }
  }, [judgesStatus])

  const getData = async () => {
    const jsonValue = await AsyncStorage.getItem('isDark');
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  };

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

  React.useEffect(() => {
    getData()
      .then((isDarkStorage) => {
        if (isDarkStorage) {
          dispatch(setIsDark(!!isDarkStorage))
        }
      })
  }, [])


  const firstUpdateError = React.useRef(true);
  React.useEffect(() => {
    if (firstUpdateError.current) {
      firstUpdateError.current = false;
      return;
    }
    dispatch(resetError({}))
  }, [email, password])

  return (
    <View testID="login-page" style={styles.container({ isDark })}>
      <MySwitch
        value={isDark}
        setValue={setDark}
        style={{
          position: 'absolute',
          right: 8,
          top: 8
        }}
      />
      <MyBlock
        isDark={isDark}
        style={{
          contentView: {
            marginHorizontal: 26,
            marginVertical: 8,
            width: '60%',
            // bottom: 32,
          }
        }}
      >
        <Text style={{ fontSize: 10, color: "red", textAlign: "center" }}>{registerError}</Text>
        <MyTextInput
          title="Login"
          value={email}
          setValue={setEmail}
          testID="email"
          isDark={isDark}
          style={{
            contentView: {
              marginTop: 8,
            }
          }}
        />
        <MyTextInputPassword
          title="Password"
          value={password}
          setValue={setPassword}
          testID="password"
          isDark={isDark}
          style={{
            contentView: {
              marginTop: 8,
            }
          }}
        />
        <MyButton
          text="Login"
          onPress={handleLogin}
          testID="login"
          style={{
            contentView: {
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 16,
              marginBottom: 8
            }
          }}
          isDark={isDark}
        />
      </MyBlock>
    </View>
  );
}

const styles = StyleSheet.create<any>({
  container: ({ isDark }) => ({
    backgroundColor: isDark ? '#22272C' : '#F4F4F4',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }),
})

export default LoginComponent;
