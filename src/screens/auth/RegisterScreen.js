import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  TextInput,
  Switch,
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

export default function RegisterScreen() {
  // ** ** ** ** ** HOOKS ** ** ** ** **
  const {colors, textStyles} = useTheme();
  const {getHeight, getWidth} = ScaleHook();
  const navigation = useNavigation();

  // ** ** ** ** ** LOCAL ** ** ** ** **
  const [emailText, setEmailText] = useState('');
  const [passwordText, setPasswordText] = useState('');
  const [receiveEmails, setReceiveEmails] = useState(false);

  // ** ** ** ** ** EFFECTS ** ** ** ** **
  // ** ** ** ** ** LOGIC ** ** ** ** **
  const register = async () => {
    if (!emailRegex.test(emailText)) {
      Alert.alert('', 'Please enter a valid email address');
      return;
    }

    if (!passwordRegex.test(passwordText)) {
      Alert.alert(
        '',
        'Password must contain at least 8 characters, including an upper and lower case character and a special character',
      );
      return;
    }

    await Auth.signUp({
      username: emailText,
      password: passwordText,
    })
      .then(res => {
        console.log(res, '<---sign up res');
        Alert.alert(
          '',
          'Please click the link we have sent to your email address to activate your account',
          [{text: 'Ok', onPress: () => navigation.goBack()}],
        );
        setEmailText('');
        setPasswordText('');
      })
      .catch(err => {
        console.log(err, '<---sign up error');

        if (err.code === 'UsernameExistsException') {
          Alert.alert('', 'An account with that email address already exists');
        }

        setEmailText('');
        setPasswordText('');
      });
  };

  // ** ** ** ** ** ACTIONS ** ** ** ** **
  const onChangeEmail = text => setEmailText(text);

  const onChangePassword = text => setPasswordText(text);

  const toggleSwitch = () => setReceiveEmails(!receiveEmails);

  const onPressRegister = () => register();

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
    buttonContainer: {
      position: 'absolute',
      width: '100%',
      alignItems: 'center',
      bottom: getHeight(60),
    },
  });

  // ** ** ** ** ** RENDER ** ** ** ** **
  return (
    <View style={styles.screen}>
      <ImageBackground source={background} style={styles.image}>
        <AuthCard>
          <NavigationHeader title="Register" back={true} onCard={true} />
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
          <Spacer height={50} />
          <View style={styles.switchContainer}>
            <View style={styles.switchTextContainer}>
              <Text style={styles.switchText}>
                Receive the latest jobs by email?
              </Text>
            </View>
            <Switch
              trackColor={{false: colors.black, true: colors.limeGreen}}
              thumbColor={colors.pink}
              ios_backgroundColor={colors.black}
              onValueChange={toggleSwitch}
              value={receiveEmails}
            />
          </View>
          <Spacer height={50} />
          <View style={styles.buttonContainer}>
            <DefaultButton text="Register" onPress={onPressRegister} />
          </View>
        </AuthCard>
      </ImageBackground>
    </View>
  );
}
