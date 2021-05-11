import React from 'react';
import AuthStack from '../navigation/AuthStack';
import {TransitionPresets} from '@react-navigation/stack';
import LoginScreen from '../screens/auth/LoginScreen';

export default function AuthContainer(props) {
  return (
    <AuthStack.Navigator
      headerMode="screen"
      screenOptions={{
        gestureEnabled: false,
        gestureDirection: 'horizontal',
        ...TransitionPresets.SlideFromRightIOS,
      }}>
      <AuthStack.Screen
        name="Login"
        component={LoginScreen}
        options={{headerShown: false}}
      />
    </AuthStack.Navigator>
  );
}
