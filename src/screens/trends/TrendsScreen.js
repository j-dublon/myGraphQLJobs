/*
 * Jira Ticket:
 * Created Date: Wed, 5th May 2021, 22:21:32 pm
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2021 The Distance
 */

import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, ImageBackground} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import useTheme from '../../hooks/theme/UseTheme';
import {ScaleHook} from 'react-native-design-to-component';
import AuthCard from '../../components/cards/AuthCard';
import TopTabs from '../../components/buttons/TopTabs';

const background = require('../../../assets/images/background.png');

export default function TrendsScreen() {
  // ** ** ** ** ** HOOKS ** ** ** ** **
  const {colors, textStyles} = useTheme();
  const {getHeight, getWidth, fontSize, radius} = ScaleHook();
  const navigation = useNavigation();

  // ** ** ** ** ** LOCAL ** ** ** ** **
  const [selected, setSelected] = useState('left');

  // ** ** ** ** ** EFFECTS ** ** ** ** **
  // ** ** ** ** ** LOGIC ** ** ** ** **

  // ** ** ** ** ** ACTIONS ** ** ** ** **

  // ** ** ** ** ** STYLES ** ** ** ** **
  const styles = StyleSheet.create({
    screen: {
      flex: 1,
    },
    image: {
      flex: 1,
      resizeMode: 'cover',
      alignItems: 'center',
      justifyContent: 'center',
    },
    textContainer: {
      position: 'absolute',
      bottom: getHeight(80),
      width: '80%',
    },
    text: {
      ...textStyles.regular16_white,
      textAlign: 'center',
    },
  });

  // ** ** ** ** ** RENDER ** ** ** ** **

  return (
    <View style={styles.screen}>
      <ImageBackground source={background} style={styles.image}>
        <AuthCard>
          <TopTabs
            leftTitle="Cities"
            rightTitle="Hours"
            selected={selected}
            setSelected={setSelected}
          />
          <View style={styles.textContainer}>
            <Text style={styles.text}>
              The best cities for GraphQL jobs in your country
            </Text>
          </View>
        </AuthCard>
      </ImageBackground>
    </View>
  );
}
