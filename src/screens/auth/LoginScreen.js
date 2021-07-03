import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import useTheme from '../../hooks/theme/UseTheme';
import {ScaleHook} from 'react-native-design-to-component';
import AuthCard from '../../components/cards/AuthCard';
import Spacer from '../../components/utility/Spacer';
import DefaultButton from '../../components/buttons/DefaultButton';
import NavigationHeader from '../../components/headers/NavigationHeader';
import {Auth} from 'aws-amplify';
import {emailRegex, passwordRegex} from '../../utils/regex';

const background = require('../../../assets/images/background.png');

export default function LoginScreen() {
  // ** ** ** ** ** HOOKS ** ** ** ** **
  const {colors, textStyles} = useTheme();
  const {getHeight, getWidth} = ScaleHook();
  const navigation = useNavigation();

  // ** ** ** ** ** LOCAL ** ** ** ** **
  const [emailText, setEmailText] = useState('');
  const [passwordText, setPasswordText] = useState('');

  // ** ** ** ** ** EFFECTS ** ** ** ** **
  // ** ** ** ** ** LOGIC ** ** ** ** **
  const login = async () => {
    if (
      !emailText ||
      !emailRegex.test(emailText) ||
      !passwordText ||
      !passwordRegex.test(passwordText)
    ) {
      Alert.alert(
        '',
        'Please ensure you enter your email address and password correctly',
      );
      return;
    }

    await Auth.signIn(emailText, passwordText)
      .then(res => {
        console.log(res, '<----sign in res');
        setEmailText('');
        setPasswordText('');
        navigation.navigate('HomeContainer');
      })
      .catch(err => {
        console.log(err, '<----sign in error');

        if (err.code === 'UserNotConfirmedException') {
          Alert.alert(
            '',
            'Please follow the link we have sent to your email address',
            [{text: 'Ok'}, {text: 'Resend', onPress: requestNewLink}],
          );
        }

        if (err.code === 'UserNotFoundException') {
          Alert.alert(
            '',
            'No account found for that email address, please register to continue',
          );
        }

        if (err.code === 'NotAuthorizedException') {
          Alert.alert('', 'Incorrect password');
        }

        setEmailText('');
        setPasswordText('');
      });
  };

  const requestNewLink = async () => {
    await Auth.resendSignUp(emailText)
      .then(res => console.log(res, '<---resend res'))
      .catch(err => '<----resend err');
  };

  // ** ** ** ** ** ACTIONS ** ** ** ** **
  const onChangeEmail = text => setEmailText(text);

  const onChangePassword = text => setPasswordText(text);

  const onPressLogin = () => login();

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
            title="My GraphQL jobs"
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
