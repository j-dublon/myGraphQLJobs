import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import useTheme from '../../hooks/theme/UseTheme';
import {ScaleHook} from 'react-native-design-to-component';
import AuthCard from '../../components/cards/AuthCard';
import Spacer from '../../components/utility/Spacer';
import DefaultButton from '../../components/buttons/DefaultButton';
import NavigationHeader from '../../components/headers/NavigationHeader';

const background = require('../../../assets/images/background.png');

export default function LoginScreen() {
  // ** ** ** ** ** HOOKS ** ** ** ** **
  const {colors, textStyles} = useTheme();
  const {getHeight, getWidth, fontSize, radius} = ScaleHook();
  const navigation = useNavigation();

  // ** ** ** ** ** LOCAL ** ** ** ** **
  const [emailText, setEmailText] = useState('');
  const [passwordText, setPasswordText] = useState('');

  // ** ** ** ** ** EFFECTS ** ** ** ** **
  // ** ** ** ** ** LOGIC ** ** ** ** **
  // e.g. syncing data, e.g. register a user, can be called by an action

  // ** ** ** ** ** ACTIONS ** ** ** ** **
  const onChangeEmail = text => setEmailText(text);

  const onChangePassword = text => setPasswordText(text);

  const onPressLogin = () => console.log('LOGIN');

  const onPressRegister = () => navigation.navigate('Register');

  const onPressForgotPassword = () => navigation.navigate('ForgotPassword');

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
      ...textStyles.bold30_white,
      marginVertical: getHeight(10),
    },
    input: {
      height: getHeight(50),
      width: '80%',
      borderColor: colors.white,
      borderWidth: getWidth(1),
      paddingHorizontal: getWidth(7),
      ...textStyles.regular16_white,
    },
    buttonContainer: {
      width: '100%',
      alignItems: 'center',
      position: 'absolute',
      bottom: getHeight(80),
    },
    forgot: {
      ...textStyles.bold16_limeGreen,
      textAlign: 'center',
    },
  });

  // ** ** ** ** ** RENDER ** ** ** ** **
  return (
    <View style={styles.screen}>
      <ImageBackground source={background} style={styles.image}>
        <AuthCard>
          <NavigationHeader
            title="MY GraphQL jobs"
            back={false}
            onCard={true}
          />
          <Spacer height={70} />
          <TextInput
            style={styles.input}
            onChangeText={onChangeEmail}
            value={emailText}
            placeholder="email..."
            placeholderTextColor={colors.white}
          />
          <Spacer height={30} />
          <TextInput
            style={styles.input}
            onChangeText={onChangePassword}
            value={passwordText}
            placeholder="password..."
            placeholderTextColor={colors.white}
            secureTextEntry={true}
          />
          <Spacer height={60} />
          <View style={styles.buttonContainer}>
            <DefaultButton text="Login" onPress={onPressLogin} />
            <Spacer height={20} />
            <DefaultButton text="Register" onPress={onPressRegister} />
            <Spacer height={40} />
            <TouchableOpacity onPress={onPressForgotPassword}>
              <Text style={styles.forgot}>Forgot password?</Text>
            </TouchableOpacity>
          </View>
        </AuthCard>
      </ImageBackground>
    </View>
  );
}
