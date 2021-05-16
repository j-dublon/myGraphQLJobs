import React from 'react';
import AuthStack from '../navigation/AuthStack';
import {TransitionPresets} from '@react-navigation/stack';
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import ForgotPasswordScreen from '../screens/auth/ForgotPasswordScreen';
import ChangePasswordScreen from '../screens/auth/ChangePasswordScreen';

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
      <AuthStack.Screen
        name="Register"
        component={RegisterScreen}
        options={{headerShown: false}}
      />
      <AuthStack.Screen
        name="ForgotPassword"
        component={ForgotPasswordScreen}
        options={{headerShown: false}}
      />
      <AuthStack.Screen
        name="ChangePassword"
        component={ChangePasswordScreen}
        options={{headerShown: false}}
      />
    </AuthStack.Navigator>
  );
}
