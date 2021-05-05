import React from 'react';
import FavoritesStack from '../navigation/FavoritesStack';
import {TransitionPresets} from '@react-navigation/stack';
import MyJobsScreen from '../screens/favorites/MyJobsScreen';

export default function TabContainer(props) {
  return (
    <AuthStack.Navigator
      headerMode="screen"
      screenOptions={{
        gestureEnabled: false,
        gestureDirection: 'horizontal',
        ...TransitionPresets.SlideFromRightIOS,
      }}>
      <AuthStack.Screen name="MyJobs" component={MyJobsScreen} />
    </AuthStack.Navigator>
  );
}
