
import React from 'react';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';

const App = () => {
  return (
    <NavigationContainer theme={DarkTheme}>
      <AppNavigator />
    </NavigationContainer>
  );
};

export default App;
