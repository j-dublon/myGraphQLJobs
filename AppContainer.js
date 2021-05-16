import React, {useEffect} from 'react';
import AppStack from './src/navigation/AppStack';
import AuthContainer from './src/routes/AuthContainer';
import HomeContainer from './src/routes/HomeContainer';
// import useLoading from './hooks/loading/useLoading';
// import LoadingView from './components/utility/LoadingView';
import SplashScreen from 'react-native-splash-screen';

export default function AppContainer() {
  // const {loading} = useLoading();
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <>
      <AppStack.Navigator headerMode="screen">
        <AppStack.Screen
          name="AuthContainer"
          component={AuthContainer}
          options={{
            headerShown: false,
          }}
        />
        <AppStack.Screen
          name="HomeContainer"
          component={HomeContainer}
          options={{
            headerShown: false,
          }}
        />
      </AppStack.Navigator>
      {/* {loading && LoadingView()} */}
    </>
  );
}
