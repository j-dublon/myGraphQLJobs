import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AppContainer from './AppContainer';
import ThemeProvider from './src/hooks/theme/ThemeProvider';
import {ScaleProvider} from 'react-native-design-to-component';
import QuickPicker from 'quick-picker';

const App = () => {
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
