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
import { emailRegex } from '../../utils/regex';

const background = require('../../../assets/images/background.png');

export default function ForgotPassword() {
  // ** ** ** ** ** HOOKS ** ** ** ** **
  const {colors, textStyles} = useTheme();
  const {getHeight, getWidth} = ScaleHook();
  const navigation = useNavigation();

  // ** ** ** ** ** LOCAL ** ** ** ** **
  const [emailText, setEmailText] = useState('');

  // ** ** ** ** ** EFFECTS ** ** ** ** **
  // ** ** ** ** ** LOGIC ** ** ** ** **
  // e.g. syncing data, e.g. register a user, can be called by an action

  // ** ** ** ** ** ACTIONS ** ** ** ** **
  const onChangeEmail = text => setEmailText(text);

  const onPressSend = async () => {
    if (!emailText || !emailRegex.test(emailText)) {
      Alert.alert('', 'Please ensure you enter your email address correctly');
      return;
    }

    await Auth.forgotPassword(emailText)
      .then(data => {
        console.log(data, "<---forgot password res");
        setEmailText('');
        Alert.alert('', 'Please check your emails for the code we have sent you', [{ text: 'Ok', onPress: () => navigation.navigate('ChangePassword', {username: emailText}) }]);
      })
      .catch(err => console.log(err, "<---forgot password error"));
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
          <NavigationHeader title="Email me" back={true} onCard={true} />
          <Spacer height={70} />
          <TextInput
            style={styles.input}
            onChangeText={onChangeEmail}
            value={emailText}
            placeholder="email..."
            placeholderTextColor={colors.white}
          />
          <Spacer height={50} />
          <View style={styles.buttonContainer}>
            <DefaultButton text="Send" onPress={onPressSend} />
          </View>
        </AuthCard>
      </ImageBackground>
    </View>
  );
}
