import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  ImageBackground,
  TextInput,
  Alert
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import useTheme from '../../hooks/theme/UseTheme';
import {ScaleHook} from 'react-native-design-to-component';
import AuthCard from '../../components/cards/AuthCard';
import Spacer from '../../components/utility/Spacer';
import DefaultButton from '../../components/buttons/DefaultButton';
import NavigationHeader from '../../components/headers/NavigationHeader';
import { Auth } from 'aws-amplify';
import { passwordRegex } from '../../utils/regex';

const background = require('../../../assets/images/background.png');

export default function ChangePassword({route}) {
  // ** ** ** ** ** HOOKS ** ** ** ** **
  const {colors, textStyles} = useTheme();
  const { getHeight, getWidth } = ScaleHook();
  const { username } = route.params;
  const navigation = useNavigation();

  // ** ** ** ** ** LOCAL ** ** ** ** **
  const [codeText, setCodeText] = useState('');
  const [passwordText, setPasswordText] = useState('');
  const [confirmPasswordText, setConfirmPasswordText] = useState('');


  // ** ** ** ** ** EFFECTS ** ** ** ** **
  // ** ** ** ** ** LOGIC ** ** ** ** **
  // e.g. syncing data, e.g. register a user, can be called by an action

  // ** ** ** ** ** ACTIONS ** ** ** ** **
  const onChangeCode = text => setCodeText(text);

  const onChangePassword = text => setPasswordText(text);

  const onChangeConfirmPassword = text => setConfirmPasswordText(text);

  const onPressSubmit = async () => {
    if (passwordText !== confirmPasswordText) {
      Alert.alert('', 'Passwords do not match');
      setPasswordText('');
      setConfirmPasswordText('');
      return;
    }

    if (!passwordRegex.test(passwordText)) {
      Alert.alert('', 'Your password must contain at least 8 characters, including an upper and lower case character and a special character');
      setPasswordText('');
      setConfirmPasswordText('');
      return;
    }

    await Auth.forgotPasswordSubmit(username, codeText, passwordText)
      .then(data => {
        setCodeText('');
        setPasswordText('');
        setConfirmPasswordText('');
        navigation.navigate('Login');
      })
      .catch(err => {
        console.log(err, "<---- change password error");

        if (err.code === "CodeMismatchException") {
          Alert.alert('', 'Please ensure you enter the code correctly');
          setCodeText('');
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
          <NavigationHeader title="Password" back={true} onCard={true} />
          <Spacer height={70} />
          <TextInput
            style={styles.input}
            onChangeText={onChangeCode}
            value={codeText}
            placeholder="code..."
            placeholderTextColor={colors.white}
          />
          <Spacer height={ 30 } />
          <TextInput
            style={styles.input}
            onChangeText={onChangePassword}
            value={passwordText}
            placeholder="password..."
            placeholderTextColor={ colors.white }
            secureTextEntry={true}
          />
          <Spacer height={ 30 } />
          <TextInput
            style={styles.input}
            onChangeText={onChangeConfirmPassword}
            value={confirmPasswordText}
            placeholder="confirm password..."
            placeholderTextColor={ colors.white }
            secureTextEntry={true}
          />
          <Spacer height={50} />
          <View style={styles.buttonContainer}>
            <DefaultButton text="Submit" onPress={onPressSubmit} />
          </View>
        </AuthCard>
      </ImageBackground>
    </View>
  );
}
