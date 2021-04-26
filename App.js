import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AppContainer from './AppContainer';
import ThemeProvider from './src/hooks/theme/ThemeProvider';
import {ScaleProvider} from 'react-native-design-to-component';

const App = () => {
  return (
    <ScaleProvider config={{height: 667, width: 375}}>
      <NavigationContainer>
        <ThemeProvider>
          <AppContainer />
        </ThemeProvider>
      </NavigationContainer>
    </ScaleProvider>
  );
};

export default App;
