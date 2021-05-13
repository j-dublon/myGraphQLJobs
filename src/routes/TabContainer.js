import React from 'react';
import {StyleSheet} from 'react-native';
import BottomTab from '../navigation/BottomTab';
import {ScaleHook} from 'react-native-design-to-component';
import useTheme from '../hooks/theme/UseTheme';
import HomeScreen from '../screens/home/HomeScreen';
import FavoritesContainer from '../routes/FavoritesContainer';
import TrendsContainer from '../routes/TrendsContainer';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faHome, faHeart, faChartLine} from '@fortawesome/free-solid-svg-icons';

export default function TabContainer() {
  // ** ** ** ** ** HOOKS ** ** ** ** **
  const {getHeight} = ScaleHook();
  const {colors, textStyles} = useTheme();

  // ** ** ** ** ** LOCAL ** ** ** ** **
  // ** ** ** ** ** EFFECTS ** ** ** ** **
  // ** ** ** ** ** LOGIC ** ** ** ** **
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
      ...textStyles.bold12_noColor,
    },
  });

  // ** ** ** ** ** RENDER ** ** ** ** **
  const TabBarIcon = ({name}) => {
    const icons = {
      home: faHome,
      heart: faHeart,
      line: faChartLine,
    };

    return (
      <FontAwesomeIcon
        icon={icons[name]}
        size={22}
        style={{color: colors.white}}
      />
    );
  };

  return (
    <BottomTab.Navigator
      tabBarOptions={{
        tabStyle: styles.item,
        style: styles.tabBar,
        labelStyle: styles.label,
        activeTintColor: colors.white,
        inactiveTintColor: colors.white,
        activeBackgroundColor: colors.darkPink70,
      }}>
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={({route}) => ({
          tabBarIcon: () => <TabBarIcon name="home" />,
          tabBarLabel: 'Home',
        })}
      />
      <BottomTab.Screen
        name="FavoritesContainer"
        component={FavoritesContainer}
        options={({route}) => ({
          tabBarIcon: () => <TabBarIcon name="heart" />,
          tabBarLabel: 'Mine',
        })}
      />
      <BottomTab.Screen
        name="TrendsContainer"
        component={TrendsContainer}
        options={({route}) => ({
          tabBarIcon: () => <TabBarIcon name="line" />,
          tabBarLabel: 'Trends',
        })}
      />
    </BottomTab.Navigator>
  );
}
