import React from 'react';
import HomeStack from '../navigation/HomeStack';
import {TransitionPresets} from '@react-navigation/stack';
import HomeScreen from '../screens/home/HomeScreen';

export default function HomeContainer(props) {
  return (
    <HomeStack.Navigator
      headerMode="screen"
      screenOptions={{
        gestureEnabled: false,
        gestureDirection: 'horizontal',
        ...TransitionPresets.SlideFromRightIOS,
      }}>
      <HomeStack.Screen
        name="Home"
        component={HomeScreen}
        options={{headerShown: false}}
      />
    </HomeStack.Navigator>
  );
}
