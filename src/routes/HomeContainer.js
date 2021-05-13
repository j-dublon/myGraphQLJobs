import React from 'react';
import HomeStack from '../navigation/HomeStack';
import {TransitionPresets} from '@react-navigation/stack';
import TabContainer from '../routes/TabContainer';
import ProfileScreen from '../screens/profile/ProfileScreen';
import PreferencesScreen from '../screens/profile/PreferencesScreen';
import ChangePasswordScreen from '../screens/profile/ChangePasswordScreen';

export default function HomeContainer() {
  return (
    <HomeStack.Navigator
      headerMode="screen"
      screenOptions={{
        gestureEnabled: false,
        gestureDirection: 'horizontal',
        ...TransitionPresets.SlideFromRightIOS,
      }}>
      <HomeStack.Screen
        name="HomeTabs"
        component={TabContainer}
        options={{headerShown: false}}
      />
      <HomeStack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{headerShown: false, tabBarVisible: false}}
      />
      <HomeStack.Screen
        name="Preferences"
        component={PreferencesScreen}
        options={{headerShown: false}}
      />
      <HomeStack.Screen
        name="ChangePassword"
        component={ChangePasswordScreen}
        options={{headerShown: false}}
      />
    </HomeStack.Navigator>
  );
}
