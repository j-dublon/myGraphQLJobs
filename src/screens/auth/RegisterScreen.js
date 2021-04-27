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
import AuthCard from '../../components/cards/AuthCard';
import Spacer from '../../components/utility/Spacer';
import DefaultButton from '../../components/buttons/DefaultButton';
import NavigationHeader from '../../components/headers/NavigationHeader';

const background = require('../../../assets/images/background.png');

export default function RegisterScreen() {
  // ** ** ** ** ** HOOKS ** ** ** ** **
  const {colors, textStyles} = useTheme();
  const {getHeight, getWidth} = ScaleHook();
  const navigation = useNavigation();

  // ** ** ** ** ** LOCAL ** ** ** ** **
  const [nameText, setNameText] = useState('');
  const [emailText, setEmailText] = useState('');
  const [passwordText, setPasswordText] = useState('');
  const [receiveEmails, setReceiveEmails] = useState(false);

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

  const onChangePassword = text => setPasswordText(text);

  const toggleSwitch = () => setReceiveEmails(!receiveEmails);

  const onPressRegister = () => console.log('REGISTER');

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
          <NavigationHeader title="Register" />
          <Spacer height={70} />
          <TextInput
            style={styles.input}
            onChangeText={onChangeName}
            value={nameText}
            placeholder="name..."
            placeholderTextColor={colors.white}
          />
          <Spacer height={30} />
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
          <Spacer height={30} />
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
