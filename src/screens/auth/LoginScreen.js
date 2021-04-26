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
  useEffect(() => {
    navigation.setOptions({
      header: () => null,
    });
  }, []);

  // ** ** ** ** ** LOGIC ** ** ** ** **
  // e.g. syncing data, e.g. register a user, can be called by an action

  // ** ** ** ** ** ACTIONS ** ** ** ** **
  const onChangeEmail = text => setEmailText(text);

  const onChangePassword = text => setPasswordText(text);

  const onPressLogin = () => console.log('LOGIN');

  const onPressRegister = () => console.log('REGISTER');

  const onPressForgotPassword = () => console.log('FORGOT');

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
          <Text style={styles.title}>My GraphQL Jobs</Text>
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
          <DefaultButton text="Login" onPress={onPressLogin} />
          <Spacer height={20} />
          <DefaultButton text="Register" onPress={onPressRegister} />
          <Spacer height={40} />
          <TouchableOpacity onPress={onPressForgotPassword}>
            <Text style={styles.forgot}>Forgot password?</Text>
          </TouchableOpacity>
        </AuthCard>
      </ImageBackground>
    </View>
  );
}
