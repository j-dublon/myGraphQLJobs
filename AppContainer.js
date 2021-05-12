import React from 'react';
import AppStack from './src/navigation/AppStack';
import AuthContainer from './src/routes/AuthContainer';
import TabContainer from './src/routes/TabContainer';
// import useLoading from './hooks/loading/useLoading';
// import LoadingView from './components/utility/LoadingView';

export default function AppContainer() {
  // const {loading} = useLoading();

  return (
    <>
      <AppStack.Navigator headerMode="screen">
        {/* <AppStack.Screen
          name="AuthContainer"
          component={AuthContainer}
          options={{
            headerShown: false,
          }}
        /> */}
        <AppStack.Screen
          name="TabContainer"
          component={TabContainer}
          options={{
            headerShown: false,
          }}
        />
      </AppStack.Navigator>
      {/* {loading && LoadingView()} */}
    </>
  );
}
