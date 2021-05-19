import React, {useEffect} from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import AppContainer from './AppContainer';
import ThemeProvider from './src/hooks/theme/ThemeProvider';
import {ScaleProvider} from 'react-native-design-to-component';
import QuickPicker from 'quick-picker';
import Amplify from 'aws-amplify';
import config from './aws-exports';
import {ApolloProvider} from '@apollo/client';
import {ApolloClient, InMemoryCache} from '@apollo/client';

Amplify.configure({
  ...config,
  Analytics: {
    disabled: true,
  },
});

const client = new ApolloClient({
  uri: 'https://api.graphql.jobs',
  cache: new InMemoryCache(),
});

const App = () => {
  useEffect(() => {
    StatusBar.setBarStyle('light-content');
  }, []);

  return (
    <>
      <ApolloProvider client={client}>
        <ScaleProvider config={{height: 667, width: 375}}>
          <NavigationContainer>
            <ThemeProvider>
              <AppContainer />
            </ThemeProvider>
          </NavigationContainer>
        </ScaleProvider>
      </ApolloProvider>
      <QuickPicker />
    </>
  );
};

export default App;
