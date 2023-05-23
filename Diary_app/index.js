import React from 'react';
import {AppRegistry} from 'react-native';
import { name as appName } from './app.json';
import {ThemeProvider} from 'styled-components';
import theme from "./src/styles/theme"
import Navigator from "./src/navigation/Navigator/Navigator";
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
const ProvidedNavigator = () => {
  return (
    <ThemeProvider theme={{...theme}}>
      <SafeAreaProvider>
      <Navigator />
      </SafeAreaProvider>
    </ThemeProvider>
  );
};

AppRegistry.registerComponent(appName, () => ProvidedNavigator);


// import { AppRegistry } from 'react-native';
// import App from './App';
// import { name as appName } from './app.json';

// AppRegistry.registerComponent(appName, () => App);
