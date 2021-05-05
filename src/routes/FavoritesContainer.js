import React from 'react';
import FavoritesStack from '../navigation/FavoritesStack';
import {TransitionPresets} from '@react-navigation/stack';
import MyJobsScreen from '../screens/favorites/MyJobsScreen';

export default function FavoritesContainer(props) {
  return (
    <FavoritesStack.Navigator
      headerMode="screen"
      screenOptions={{
        gestureEnabled: false,
        gestureDirection: 'horizontal',
        ...TransitionPresets.SlideFromRightIOS,
      }}>
      <FavoritesStack.Screen name="MyJobs" component={MyJobsScreen} />
    </FavoritesStack.Navigator>
  );
}
