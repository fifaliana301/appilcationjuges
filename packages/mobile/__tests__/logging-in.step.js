import React from 'react';
import { defineFeature, loadFeature } from 'jest-cucumber';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { expect } from 'chai';
import { Provider } from 'react-redux';
import { store } from '../reducers';
import { NavigationContainer } from '@react-navigation/native';
import LoginComponent from '../src/LoginComponent';
import sinon from 'sinon';

const feature = loadFeature('./features/LoggingIn.feature', { loadRelativePath: true });

defineFeature(feature, test => {

  test('Connexion réussie', ({ given, when, and, then }) => {
    const navigation = {
      navigate: sinon.fake()
    }
    const { getByTestId, getByText } = render(
      <Provider store={store}>
        <NavigationContainer>
          <LoginComponent navigation={navigation}/>
        </NavigationContainer>
      </Provider>
    );

    given('l\'utilisateur se trouve sur la page de connexion', () => {
      const pageLogin = getByTestId('login-page');
      expect(pageLogin).to.exist;
    });

    when('l\'utilisateur saisit un nom d\'utilisateur et un mot de passe valides', () => {
      const usernameInput = getByTestId('username');
      const passwordInput = getByTestId('password');

      fireEvent.changeText(usernameInput, 'your-username');
      fireEvent.changeText(passwordInput, 'your-password');
    });

    and(/^clique sur le bouton "(.*)"$/, async (arg0) => {
      const loginButton = getByText(arg0);
      fireEvent.press(loginButton);
      await waitFor(() => {
        // Implement a check to make sure the login has finished
        // You might check for a success message or redirection to the dashboard
      });
    });

    then('l\'utilisateur devrait être connecté', () => {
      sinon.assert.calledOnce(navigation.navigate)
    });

    and('devrait être redirigé vers le tableau de bord', () => {
      console.log(store.getState())

    });
  });
});
