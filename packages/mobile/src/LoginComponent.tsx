import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { add } from '@bboy-app/shared';
import { MyButton } from '@bboy-app/story';

const LoginComponent: React.FC = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Insérez ici la logique d'authentification
    navigation?.navigate('Home')
  };

  return (
    <View testID="login-page">
      <Text>Écran de connexion</Text>
      <TextInput
        placeholder="Nom d'utilisateur"
        value={username}
        onChangeText={(text:any) => setUsername(text)}
        testID="username"
      />
      <TextInput
        placeholder="Mot de passe"
        value={password}
        onChangeText={(text:any) => setPassword(text)}
        secureTextEntry
        testID="password"
      />
      <Button title="Login" onPress={handleLogin} testID="login" />
      <MyButton text="text" onPress={() => console.log("press 1+2=", add(1, 2))} />
    </View>
  );
}

export default LoginComponent;
