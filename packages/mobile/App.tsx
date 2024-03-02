import React from 'react';
import {
  StatusBar,
  useColorScheme,
  Text
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import { Provider } from 'react-redux';
import { store } from './reducers';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginComponent from './src/LoginComponent';
import HomeComponent from './src/home/HomeComponent';
import CalendarsComponent from './src/CalendarsComponent';
import axios from 'axios';


function App(): JSX.Element {
  axios.defaults.baseURL = 'http://10.42.0.1:4000';
  // axios.defaults.baseURL = 'http://192.168.88.21:4000';

  const backgroundStyle = {
    backgroundColor: Colors.lighter,
  };

  const Stack = createNativeStackNavigator();

  return (
    <Provider store={store}>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{
            headerShown: false
          }}
        >
          <Stack.Screen name="Login" component={LoginComponent} />
            <Stack.Screen name="Calendars" component={CalendarsComponent} />
            <Stack.Screen name="Home" component={HomeComponent} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
