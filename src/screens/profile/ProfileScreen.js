/*
 * Jira Ticket:
 * Created Date: Mon, 3rd May 2021, 21:18:44 pm
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2021 The Distance
 */

import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, ImageBackground, TextInput} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import useTheme from '../../hooks/theme/UseTheme';
import {ScaleHook} from 'react-native-design-to-component';
import NavigationHeader from '../../components/headers/NavigationHeader';
import Spacer from '../../components/utility/Spacer';
import DefaultButton from '../../components/buttons/DefaultButton';
import AuthCard from '../../components/cards/AuthCard';

const background = require('../../../assets/images/background.png');

const fakeUserData = {
  name: 'Jodi',
  email: 'jodi@me.com',
  homeCity: 'Leeds',
};

export default function ProfileScreen() {
  // ** ** ** ** ** HOOKS ** ** ** ** **
  const {colors, textStyles} = useTheme();
  const {getHeight, getWidth, fontSize, radius} = ScaleHook();
  const navigation = useNavigation();

  // ** ** ** ** ** LOCAL ** ** ** ** **
  const [nameText, setNameText] = useState(fakeUserData.name);
  const [emailText, setEmailText] = useState(fakeUserData.email);
  const [cityText, setCityText] = useState(fakeUserData.homeCity);

  // ** ** ** ** ** EFFECTS ** ** ** ** **
  useEffect(() => {
    navigation.setOptions({
      header: () => null,
    });
  }, []);

  // ** ** ** ** ** LOGIC ** ** ** ** **
  // e.g. syncing data, e.g. register a user, can be called by an action

  // ** ** ** ** ** ACTIONS ** ** ** ** **
  const onChangeName = text => setNameText(text);

  const onChangeEmail = text => setEmailText(text);

  const onChangeCity = text => setCityText(text);

  const onPressPreferences = () => navigation.navigate('Preferences');

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
    input: {
      height: getHeight(50),
      width: '80%',
      borderColor: colors.white,
      borderWidth: getWidth(1),
      paddingHorizontal: getWidth(7),
      ...textStyles.regular16_white,
      backgroundColor: colors.darkPink,
    },
  });

  // ** ** ** ** ** RENDER ** ** ** ** **
  return (
    <View style={styles.screen}>
      <ImageBackground source={background} style={styles.image}>
        <AuthCard>
          <NavigationHeader title="Account" back={true} onCard={true} />
          <Spacer height={20} />
          <TextInput
            style={styles.input}
            onChangeText={onChangeName}
            value={nameText}
            placeholderTextColor={colors.white}
          />
          <Spacer height={30} />
          <TextInput
            style={styles.input}
            onChangeText={onChangeEmail}
            value={emailText}
            placeholderTextColor={colors.white}
          />
          <Spacer height={30} />
          <TextInput
            style={styles.input}
            onChangeText={onChangeCity}
            value={cityText}
            placeholder="email..."
            placeholderTextColor={colors.white}
          />
          <Spacer height={60} />
          <DefaultButton text="Change password" />
          <Spacer height={30} />
          <DefaultButton text="Preferences" onPress={onPressPreferences} />
        </AuthCard>
      </ImageBackground>
    </View>
  );
}
