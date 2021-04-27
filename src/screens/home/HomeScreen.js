import React, {useEffect, useState, useRef} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import useTheme from '../../hooks/theme/UseTheme';
import {ScaleHook} from 'react-native-design-to-component';
import Spacer from '../../components/utility/Spacer';
import DefaultButton from '../../components/buttons/DefaultButton';
import CardStack from 'react-native-card-stack-swiper';
import NavigationHeader from '../../components/headers/NavigationHeader';
import JobCard from '../../components/cards/JobCard';

const background = require('../../../assets/images/background.png');

export default function HomeScreen() {
  // ** ** ** ** ** HOOKS ** ** ** ** **
  const {colors, textStyles} = useTheme();
  const {getHeight, getWidth, fontSize, radius} = ScaleHook();
  const navigation = useNavigation();
  const swiperRef = useRef();

  // ** ** ** ** ** LOCAL ** ** ** ** **

  // ** ** ** ** ** EFFECTS ** ** ** ** **

  // ** ** ** ** ** LOGIC ** ** ** ** **
  // e.g. syncing data, e.g. register a user, can be called by an action

  // ** ** ** ** ** ACTIONS ** ** ** ** **
  const onPressMoreInfo = () => console.log('more info');

  // ** ** ** ** ** STYLES ** ** ** ** **
  const styles = StyleSheet.create({
    screen: {
      flex: 1,
    },
    image: {
      flex: 1,
      resizeMode: 'cover',
      alignItems: 'center',
    },
    cardStack: {
      height: '70%',
      width: '80%',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

  // ** ** ** ** ** RENDER ** ** ** ** **
  return (
    <View style={styles.screen}>
      <ImageBackground source={background} style={styles.image}>
        <NavigationHeader title="Home" back={false} onCard={false} />
        <CardStack style={styles.cardStack} ref={swiperRef}>
          <JobCard
            title="Senior Fullstack Developer at Important Company"
            city="San Francisco"
            country="US"
            commitment="Full time"
            posted="25/05/2021"
            onPressMoreInfo={onPressMoreInfo}
          />
        </CardStack>
      </ImageBackground>
    </View>
  );
}
