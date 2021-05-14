/*
 * Jira Ticket:
 * Created Date: Wed, 5th May 2021, 22:21:32 pm
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2021 The Distance
 */

import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import useTheme from '../../hooks/theme/UseTheme';
import {ScaleHook} from 'react-native-design-to-component';
import AuthCard from '../../components/cards/AuthCard';
import TopTabs from '../../components/buttons/TopTabs';
import Pie from 'react-native-pie';
import Spacer from '../../components/utility/Spacer';

const background = require('../../../assets/images/background.png');

export default function TrendsScreen() {
  // ** ** ** ** ** HOOKS ** ** ** ** **
  const {colors, textStyles} = useTheme();
  const {getHeight, getWidth, fontSize, radius} = ScaleHook();

  // ** ** ** ** ** LOCAL ** ** ** ** **
  const [selected, setSelected] = useState('left');
  const leftText = 'The best cities for GraphQL jobs in your country';
  const rightText = 'On site vs. remote in your city';
  const location = selected === 'left' ? 'country' : 'city';

  const data = [
    {
      percentage: 30,
      color: colors.midPink,
    },
    {
      percentage: 70,
      color: colors.limeGreen,
    },
  ];

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
    remoteContainer: {
      position: 'absolute',
      top: getHeight(190),
      right: getWidth(90),
    },
    remoteLabel: {
      ...textStyles.regular16_limeGreen,
    },
    onSiteContainer: {
      position: 'absolute',
      top: getHeight(250),
      left: getWidth(90),
    },
    onSiteLabel: {
      ...textStyles.regular16_midPink,
    },
    textContainer: {
      marginTop: getHeight(40),
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '80%',
      height: getHeight(100),
    },
    text: {
      ...textStyles.regular16_white,
      textAlign: 'center',
    },
    link: {
      ...textStyles.regular16_limeGreen,
      textDecorationLine: 'underline',
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
            rightTitle="Remotes"
            selected={selected}
            setSelected={setSelected}
          />
          <Spacer height={70} />
          <Pie radius={100} sections={data} strokeCap={'butt'} />
          <View style={styles.remoteContainer}>
            <Text style={styles.remoteLabel}>remote</Text>
          </View>
          <View style={styles.onSiteContainer}>
            <Text style={styles.onSiteLabel}>on site</Text>
          </View>
          <View>
            <Text>Remote</Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.text}>
              {selected === 'left' ? leftText : rightText}
            </Text>
            <TouchableOpacity>
              <Text style={styles.link}>{`Change ${location}`}</Text>
            </TouchableOpacity>
          </View>
        </AuthCard>
      </ImageBackground>
    </View>
  );
}
