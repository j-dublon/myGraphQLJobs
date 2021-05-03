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
  TextInput,
  Switch,
} from 'react-native';
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

export default function PreferencesScreen() {
  // ** ** ** ** ** HOOKS ** ** ** ** **
  const {colors, textStyles} = useTheme();
  const {getHeight, getWidth, fontSize, radius} = ScaleHook();
  const navigation = useNavigation();

  // ** ** ** ** ** LOCAL ** ** ** ** **
  const [nameText, setNameText] = useState(fakeUserData.name);
  const [emailText, setEmailText] = useState(fakeUserData.email);
  const [remoteOnly, setRemoteOnly] = useState(false);

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

  const toggleSwitch = () => setRemoteOnly(!remoteOnly);

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
    input: {
      height: getHeight(50),
      width: '80%',
      borderColor: colors.white,
      borderWidth: getWidth(1),
      paddingHorizontal: getWidth(7),
      ...textStyles.regular16_white,
      backgroundColor: colors.darkPink,
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
          <View style={styles.switchContainer}>
            <View style={styles.switchTextContainer}>
              <Text style={styles.switchText}>Remote only?</Text>
            </View>
            <Switch
              trackColor={{false: colors.black, true: colors.limeGreen}}
              thumbColor={colors.pink}
              ios_backgroundColor={colors.black}
              onValueChange={toggleSwitch}
              value={remoteOnly}
            />
          </View>
          <Spacer height={60} />
          <DefaultButton text="View" />
        </AuthCard>
      </ImageBackground>
    </View>
  );
}
