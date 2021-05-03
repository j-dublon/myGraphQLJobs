import React from 'react';
import AppStack from './src/navigation/AppStack';
import HomeScreen from './src/screens/home/HomeScreen';
// import TabContainer from './routes/TabContainer';
// import AuthContainer from './routes/AuthContainer';
// import useLoading from './hooks/loading/useLoading';
// import LoadingView from './components/utility/LoadingView';

export default function AppContainer() {
  // const {loading} = useLoading();

  return (
    <>
      <AppStack.Navigator headerMode="screen">
        <AppStack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{headerShown: false}}
        />
      </AppStack.Navigator>
      {/* {loading && LoadingView()} */}
    </>
  );
}
