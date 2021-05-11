/*
 * Jira Ticket:
 * Created Date: Tue, 11th May 2021, 21:11:53 pm
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2021 The Distance
 */

import React, {useEffect, useState} from 'react';
import {StyleSheet, View, TextInput, ImageBackground} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import useTheme from '../../hooks/theme/UseTheme';
import {ScaleHook} from 'react-native-design-to-component';
import AuthCard from '../../components/cards/AuthCard';
import NavigationHeader from '../../components/headers/NavigationHeader';
import Spacer from '../../components/utility/Spacer';

const background = require('../../../assets/images/background.png');

export default function ChangePasswordScreen() {
  // ** ** ** ** ** HOOKS ** ** ** ** **
  const {colors, textStyles} = useTheme();
  const {getHeight, getWidth, fontSize, radius} = ScaleHook();
  const navigation = useNavigation();

  // ** ** ** ** ** LOCAL ** ** ** ** **
  const [oldPassword, setOldPassword] = useState();
  const [newPassword, setNewPassword] = useState();
  const [confirmNewPassword, setConfirmNewPassword] = useState();

  // ** ** ** ** ** EFFECTS ** ** ** ** **

  // ** ** ** ** ** LOGIC ** ** ** ** **
  // e.g. syncing data, e.g. register a user, can be called by an action

  // ** ** ** ** ** ACTIONS ** ** ** ** **
  const onChangeOldPassword = () => {};

  const onChangeNewPassword = () => {};

  const onChangeConfirmNewPassword = () => {};

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
          <NavigationHeader title="Password" back={true} onCard={true} />
          <Spacer height={20} />
          <TextInput
            style={styles.input}
            onChangeText={onChangeOldPassword}
            value={oldPassword}
            placeholderTextColor={colors.white}
          />
          <Spacer height={20} />
          <TextInput
            style={styles.input}
            onChangeText={onChangeNewPassword}
            value={newPassword}
            placeholderTextColor={colors.white}
          />
          <Spacer height={20} />
          <TextInput
            style={styles.input}
            onChangeText={onChangeConfirmNewPassword}
            value={confirmNewPassword}
            placeholderTextColor={colors.white}
          />
        </AuthCard>
      </ImageBackground>
    </View>
  );
}
