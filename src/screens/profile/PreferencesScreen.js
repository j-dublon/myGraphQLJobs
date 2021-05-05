/*
 * Jira Ticket:
 * Created Date: Mon, 3rd May 2021, 21:35:35 pm
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
  Switch,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import useTheme from '../../hooks/theme/UseTheme';
import {ScaleHook} from 'react-native-design-to-component';
import NavigationHeader from '../../components/headers/NavigationHeader';
import Spacer from '../../components/utility/Spacer';
import DefaultButton from '../../components/buttons/DefaultButton';
import AuthCard from '../../components/cards/AuthCard';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faChevronDown} from '@fortawesome/free-solid-svg-icons';
import QuickPicker from 'quick-picker';

const background = require('../../../assets/images/background.png');

export default function PreferencesScreen() {
  // ** ** ** ** ** HOOKS ** ** ** ** **
  const {colors, textStyles} = useTheme();
  const {getHeight, getWidth} = ScaleHook();
  const navigation = useNavigation();

  // ** ** ** ** ** LOCAL ** ** ** ** **
  const [remoteOnly, setRemoteOnly] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState();
  const [selectedCity, setSelectedCity] = useState();

  const countryData = ['', 'Germany', 'USA', 'UK'];
  const cityData = ['', 'London', 'Berlin', 'Amsterdam'];

  // ** ** ** ** ** EFFECTS ** ** ** ** **
  useEffect(() => {
    navigation.setOptions({
      header: () => null,
    });
  }, []);

  // ** ** ** ** ** LOGIC ** ** ** ** **
  // e.g. syncing data, e.g. register a user, can be called by an action

  // ** ** ** ** ** ACTIONS ** ** ** ** **
  const onPressCountry = () => {
    QuickPicker.open({
      items: countryData,
      selectedValue: '',
      onPressDone: value => {
        setSelectedCountry(value);
        QuickPicker.close();
      },
    });
  };

  const onPressCity = () => {
    QuickPicker.open({
      items: cityData,
      selectedValue: '',
      onPressDone: value => {
        setSelectedCity(value);
        QuickPicker.close();
      },
    });
  };

  const onToggleSwitch = () => setRemoteOnly(!remoteOnly);

  const onPressView = () => {};

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
    title: {
      ...textStyles.bold20_white,
      alignSelf: 'flex-start',
      marginVertical: getHeight(10),
      marginHorizontal: '10%',
    },
    switchContainer: {
      flexDirection: 'row',
      width: '80%',
      justifyContent: 'space-between',
    },
    switchTextContainer: {
      width: getWidth(200),
    },
    switchText: {
      ...textStyles.regular16_white,
    },
    box: {
      height: getHeight(50),
      width: '80%',
      borderColor: colors.white,
      borderWidth: getWidth(1),
      paddingHorizontal: getWidth(7),
      backgroundColor: colors.darkPink,
    },
    touch: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'space-between',
      flexDirection: 'row',
    },
    boxText: {
      ...textStyles.bold16_white,
    },
    icon: {
      color: colors.white,
    },
  });

  // ** ** ** ** ** RENDER ** ** ** ** **
  return (
    <View style={styles.screen}>
      <ImageBackground source={background} style={styles.image}>
        <AuthCard>
          <NavigationHeader title="Preferences" back={true} onCard={true} />
          <Spacer height={20} />
          <Text style={styles.title}>Show me:</Text>
          <Spacer height={20} />
          <View style={styles.box}>
            <TouchableOpacity style={styles.touch} onPress={onPressCountry}>
              <Text style={styles.boxText}>
                {selectedCountry ? selectedCountry : 'Country...'}
              </Text>
              <FontAwesomeIcon
                icon={faChevronDown}
                style={styles.icon}
                size={20}
              />
            </TouchableOpacity>
          </View>
          <Spacer height={30} />
          <View style={styles.box}>
            <TouchableOpacity style={styles.touch} onPress={onPressCity}>
              <Text style={styles.boxText}>
                {selectedCity ? selectedCity : 'City...'}
              </Text>
              <FontAwesomeIcon
                icon={faChevronDown}
                style={styles.icon}
                size={20}
              />
            </TouchableOpacity>
          </View>
          <Spacer height={30} />
          <View style={styles.switchContainer}>
            <View style={styles.switchTextContainer}>
              <Text style={styles.switchText}>Remote only?</Text>
            </View>
            <Switch
              trackColor={{false: colors.black, true: colors.limeGreen}}
              thumbColor={colors.pink}
              ios_backgroundColor={colors.black}
              onValueChange={onToggleSwitch}
              value={remoteOnly}
            />
          </View>
          <Spacer height={60} />
          <DefaultButton text="View" onPress={onPressView} />
        </AuthCard>
      </ImageBackground>
    </View>
  );
}
