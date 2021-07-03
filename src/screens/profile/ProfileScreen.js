import React, {useState} from 'react';
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
import NavigationHeader from '../../components/headers/NavigationHeader';
import Spacer from '../../components/utility/Spacer';
import DefaultButton from '../../components/buttons/DefaultButton';
import AuthCard from '../../components/cards/AuthCard';
import {Auth} from 'aws-amplify';

const background = require('../../../assets/images/background.png');

const fakeUserData = {
  name: 'Jodi',
  email: 'jodi@me.com',
  homeCity: 'Leeds',
};

export default function ProfileScreen() {
  // ** ** ** ** ** HOOKS ** ** ** ** **
  const {colors, textStyles} = useTheme();
  const {getHeight, getWidth} = ScaleHook();
  const navigation = useNavigation();

  // ** ** ** ** ** LOCAL ** ** ** ** **
  const [nameText, setNameText] = useState(fakeUserData.name);
  const [emailText, setEmailText] = useState(fakeUserData.email);
  const [cityText, setCityText] = useState(fakeUserData.homeCity);

  // ** ** ** ** ** EFFECTS ** ** ** ** **
  // ** ** ** ** ** LOGIC ** ** ** ** **
  const logout = async () => {
    await Auth.signOut()
      .then(res => {
        navigation.reset({
          index: 0,
          routes: [{name: 'AuthContainer'}],
        });
      })
      .catch(err => console.log(err, '<---log out error'));
  };

  // ** ** ** ** ** ACTIONS ** ** ** ** **
  const onChangeName = text => setNameText(text);

  const onChangeEmail = text => setEmailText(text);

  const onChangeCity = text => setCityText(text);

  const onChangePassword = () => navigation.navigate('ChangePassword');

  const onPressPreferences = () => navigation.navigate('Preferences');

  const onPressLogout = () => logout();

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
    logoutText: {
      ...textStyles.bold20_limeGreen,
      textDecorationLine: 'underline',
    },
  });

  // ** ** ** ** ** RENDER ** ** ** ** **
  return (
    <View style={styles.screen}>
      <ImageBackground source={background} style={styles.image}>
        <AuthCard>
          <NavigationHeader title="Account" back={true} onCard={true} />
          <Spacer height={20} />
          <TextInput
            style={styles.input}
            onChangeText={onChangeName}
            value={nameText}
          />
          <Spacer height={30} />
          <TextInput
            style={styles.input}
            onChangeText={onChangeEmail}
            value={emailText}
          />
          <Spacer height={30} />
          <TextInput
            style={styles.input}
            onChangeText={onChangeCity}
            value={cityText}
          />
          <Spacer height={60} />
          <DefaultButton text="Change password" onPress={onChangePassword} />
          <Spacer height={30} />
          <DefaultButton text="Preferences" onPress={onPressPreferences} />
          <Spacer height={30} />
          <TouchableOpacity onPress={onPressLogout} style={styles.logoutTouch}>
            <Text style={styles.logoutText}>Log out</Text>
          </TouchableOpacity>
        </AuthCard>
      </ImageBackground>
    </View>
  );
}
