import React, {useEffect} from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import AppContainer from './AppContainer';
import ThemeProvider from './src/hooks/theme/ThemeProvider';
import {ScaleProvider} from 'react-native-design-to-component';
import QuickPicker from 'quick-picker';
import Amplify from 'aws-amplify';
import config from './aws-exports';

Amplify.configure({
  ...config,
  Analytics: {
    disabled: true,
  },
});

const App = () => {
  useEffect(() => {
    StatusBar.setBarStyle('light-content');
  }, []);

  return (
    <>
      <ScaleProvider config={{height: 667, width: 375}}>
        <NavigationContainer>
          <ThemeProvider>
            <AppContainer />
          </ThemeProvider>
        </NavigationContainer>
      </ScaleProvider>
      <QuickPicker />
    </>
  );
};

export default App;
