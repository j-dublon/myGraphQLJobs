/*
 * Jira Ticket:
 * Created Date: Tue, 11th May 2021, 21:11:53 pm
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2021 The Distance
 */

import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  ImageBackground,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import useTheme from '../../hooks/theme/UseTheme';
import {ScaleHook} from 'react-native-design-to-component';
import AuthCard from '../../components/cards/AuthCard';
import NavigationHeader from '../../components/headers/NavigationHeader';
import Spacer from '../../components/utility/Spacer';
import DefaultButton from '../../components/buttons/DefaultButton';
import {Auth} from 'aws-amplify';
import {passwordRegex} from '../../utils/regex';

const background = require('../../../assets/images/background.png');

export default function ChangePasswordScreen() {
  // ** ** ** ** ** HOOKS ** ** ** ** **
  const {colors, textStyles} = useTheme();
  const {getHeight, getWidth} = ScaleHook();
  const navigation = useNavigation();

  // ** ** ** ** ** LOCAL ** ** ** ** **
  const [oldPassword, setOldPassword] = useState();
  const [newPassword, setNewPassword] = useState();
  const [confirmNewPassword, setConfirmNewPassword] = useState();

  // ** ** ** ** ** EFFECTS ** ** ** ** **

  // ** ** ** ** ** LOGIC ** ** ** ** **
  // e.g. syncing data, e.g. register a user, can be called by an action

  // ** ** ** ** ** ACTIONS ** ** ** ** **
  const onChangeOldPassword = text => setOldPassword(text);

  const onChangeNewPassword = text => setNewPassword(text);

  const onChangeConfirmNewPassword = text => setConfirmNewPassword(text);

  const onPressSave = () => {
    if (newPassword !== confirmNewPassword) {
      Alert.alert('', 'New password does not match');
      setNewPassword('');
      setConfirmNewPassword('');
      return;
    }

    if (!passwordRegex.test(oldPassword)) {
      Alert.alert(
        '',
        'Please ensure you have entered your current password correctly',
      );
      setOldPassword('');
      return;
    }

    if (!passwordRegex.test(newPassword)) {
      Alert.alert(
        '',
        'Password must contain at least 8 characters, including an upper and lower case character and a special character',
      );
      setNewPassword('');
      setConfirmNewPassword('');
      return;
    }

    Auth.currentAuthenticatedUser()
      .then(user => {
        return Auth.changePassword(user, oldPassword, newPassword);
      })
      .then(data => {
        console.log(data, '<----change password res');
        setOldPassword('');
        setNewPassword('');
        setConfirmNewPassword('');
        navigation.goBack();
      })
      .catch(err => {
        console.log(err, '<--- change password error');
        if (err.code === 'NotAuthorizedException') {
          Alert.alert(
            '',
            'Please ensure you have entered your current password correctly',
          );
          setOldPassword('');
        }
      });
  };

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
            placeholder="old password..."
            placeholderTextColor={colors.white}
          />
          <Spacer height={20} />
          <TextInput
            style={styles.input}
            onChangeText={onChangeNewPassword}
            placeholder="new password..."
            placeholderTextColor={colors.white}
          />
          <Spacer height={20} />
          <TextInput
            style={styles.input}
            onChangeText={onChangeConfirmNewPassword}
            placeholder="confirm new password..."
            placeholderTextColor={colors.white}
          />
          <Spacer height={60} />
          <DefaultButton text="Save" onPress={onPressSave} />
        </AuthCard>
      </ImageBackground>
    </View>
  );
}
