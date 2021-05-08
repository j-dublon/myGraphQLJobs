import React from 'react';
import {StyleSheet} from 'react-native';
import BottomTab from '../navigation/BottomTab';
import {ScaleHook} from 'react-native-design-to-component';
import useTheme from '../hooks/theme/UseTheme';
import HomeContainer from '../routes/HomeContainer';
import FavoritesContainer from '../routes/FavoritesContainer';
import TrendsContainer from '../routes/TrendsContainer';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faHome, faHeart, faChartLine} from '@fortawesome/free-solid-svg-icons';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';

export default function TabContainer(props) {
  // ** ** ** ** ** HOOKS ** ** ** ** **
  const {getHeight, getWidth, fontSize} = ScaleHook();
  const {colors, textStyles} = useTheme();

  // ** ** ** ** ** LOCAL ** ** ** ** **

  // ** ** ** ** ** EFFECTS ** ** ** ** **

  // ** ** ** ** ** LOGIC ** ** ** ** **
  const getVisibility = ({route}) => {
    // const routeName = getFocusedRouteNameFromRoute(route) ?? 'Home';
    // if (routeName === 'Calendar') {
    //   return false;
    // }
    // return true;
  };

  // ** ** ** ** ** ACTIONS ** ** ** ** **

  // ** ** ** ** ** STYLES ** ** ** ** **
  const styles = StyleSheet.create({
    tabBar: {
      height: getHeight(50),
      backgroundColor: colors.pink,
    },
    tabBarItem: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    label: {
      ...textStyles.bold12_black,
    },
  });
  // ** ** ** ** ** RENDER ** ** ** ** **
  const TabBarIcon = ({name}) => {
    const icons = {
      home: faHome,
      heart: faHeart,
      line: faChartLine,
    };

    return <FontAwesomeIcon icon={icons[name]} size={22} />;
  };

  return (
    <BottomTab.Navigator
      // headerMode="screen"
      tabBarOptions={{
        tabStyle: styles.item,
        style: styles.tabBar,
        labelStyle: styles.label,
        activeTintColor: 'red',
        inactiveTintColor: 'black',
      }}>
      <BottomTab.Screen
        name="HomeContainer"
        component={HomeContainer}
        options={({route}) => ({
          // tabBarVisible: getVisibility(route),
          tabBarIcon: () => <TabBarIcon name="home" />,
          tabBarLabel: 'Home',
        })}
      />
      <BottomTab.Screen
        name="FavoritesContainer"
        component={FavoritesContainer}
        options={({route}) => ({
          // tabBarVisible: getVisibility(route),
          tabBarIcon: () => <TabBarIcon name="heart" />,
          tabBarLabel: 'Mine',
        })}
      />
      <BottomTab.Screen
        name="TrendsContainer"
        component={TrendsContainer}
        options={({route}) => ({
          // tabBarVisible: getVisibility(route),
          tabBarIcon: () => <TabBarIcon name="line" />,
          tabBarLabel: 'Trends',
        })}
      />
    </BottomTab.Navigator>
  );
}
