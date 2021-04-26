import React from 'react';
import AppStack from './src/navigation/AppStack';
import LoginScreen from './src/screens/auth/LoginScreen';
// import TabContainer from './routes/TabContainer';
// import AuthContainer from './routes/AuthContainer';
// import useLoading from './hooks/loading/useLoading';
// import LoadingView from './components/utility/LoadingView';

export default function AppContainer() {
  // const {loading} = useLoading();

  return (
    <>
      <AppStack.Navigator headerMode="screen">
        <AppStack.Screen name="Login" component={LoginScreen} />
      </AppStack.Navigator>
      {/* {loading && LoadingView()} */}
    </>
  );
}
