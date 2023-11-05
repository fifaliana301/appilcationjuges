import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { add } from '@bboy-app/shared';
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

const LoginComponent: React.FC<any> = ({ navigation }) => {
  const dispatch = useDispatch()
  const isDark = useSelector((state: any) => state.system?.isDark)
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    console.log("press 1+2=", add(1, 2))
    dispatch(changeJudgesActiveFetch({ username, password }))
    // Insérez ici la logique d'authentification
    navigation?.navigate('Calendars')
  };

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
        dispatch({ type: 'system/setIsDark', payload: isDarkStorage })
      })
  }

  React.useEffect(() => {
    getData()
      .then((isDarkStorage) => {
        if (isDarkStorage) {
          dispatch({ type: 'system/setIsDark', payload: !!isDarkStorage })
        }
      })
  }, [])

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
        <MyTextInput
          title="Login"
          value={username}
          setValue={setUsername}
          testID="username"
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
