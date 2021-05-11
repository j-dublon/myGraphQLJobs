import React from 'react';
import TrendsStack from '../navigation/TrendsStack';
import {TransitionPresets} from '@react-navigation/stack';
import TrendsScreen from '../screens/trends/TrendsScreen';

export default function FavoritesContainer(props) {
  return (
    <TrendsStack.Navigator
      headerMode="screen"
      screenOptions={{
        gestureEnabled: false,
        gestureDirection: 'horizontal',
        ...TransitionPresets.SlideFromRightIOS,
      }}>
      <TrendsStack.Screen
        name="Trends"
        component={TrendsScreen}
        options={{headerShown: false}}
      />
    </TrendsStack.Navigator>
  );
}
