import React from 'react';
import { defineFeature, loadFeature } from 'jest-cucumber';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { expect } from 'chai';
import { Provider } from 'react-redux';
import { store } from '../reducers';
import { NavigationContainer } from '@react-navigation/native';
import sinon from 'sinon';
import HomeComponent from '../src/HomeComponent';

const feature = loadFeature('./features/Home.feature', { loadRelativePath: true });

defineFeature(feature, test => {
  test('Annuler la dernière action effectuée', ({ given, when, and, then }) => {
    // const { getByTestId } = render(<HomeComponent />);

    given('l\'appareil portatif Trivium est activé', () => {
    });

    and('le casseur du côté rouge est en train de jouer', () => {
    });

    given('il y a au moin une action enregistrer', () => {
    });

    when(/^l'utilisateur appuie sur le bouton \((\d+)\)$/, (arg0) => {
    });

    then('la dernière action effectuée est annulée', () => {
    });
  });

  test('Augmenter la performativité', ({ given, and, when, then }) => {
    let component;
    given('l\'appareil portatif Trivium est activé', async () => {
      const navigation = {
        navigate: sinon.fake()
      }
        component = render(
        <Provider store={store}>
          <NavigationContainer>
            <HomeComponent navigation={navigation} />
          </NavigationContainer>
        </Provider>
      );
      const pageHome = component?.getByTestId('home-page');
      expect(pageHome).to.exist;
    });

    and('le casseur du côté rouge est en train de jouer', () => {
      // console.log(component?.toJSON())
    });

    when(/^l'utilisateur augmente la performativité avec la glissière \((\d+)\) "(.*)"$/, (arg0, arg1) => {
      // const slider = getByTestId('slider'); 
      // fireEvent.change(slider, { nativeEvent: { value: 6 } }); 
    });

    then('la performativité est ajustée positivement', () => {
    });
  });
});
