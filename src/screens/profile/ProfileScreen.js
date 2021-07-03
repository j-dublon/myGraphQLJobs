import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
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

export default function ProfileScreen() {
  // ** ** ** ** ** HOOKS ** ** ** ** **
  const {textStyles} = useTheme();
  const {getWidth} = ScaleHook();
  const navigation = useNavigation();

  // ** ** ** ** ** LOCAL ** ** ** ** **
  const [emailText, setEmailText] = useState();
  const [countryText, setCountryText] = useState();
  const [cityText, setCityText] = useState();

  // ** ** ** ** ** EFFECTS ** ** ** ** **
  useEffect(() => {
    const getUserDetails = async () => {
      const {attributes} = await Auth.currentAuthenticatedUser();
      if (attributes) {
        setEmailText(attributes.email);
        setCountryText(attributes['custom:country']);
        setCityText(attributes['custom:city']);
      }
    };
    getUserDetails();
  }, []);
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
  const onPressChangePassword = () => navigation.navigate('ChangePassword');

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
    detailsContainer: {
      width: '100%',
      paddingHorizontal: getWidth(30),
    },
    detailsText: {
      ...textStyles.bold16_white,
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
          <Spacer height={40} />
          <View style={styles.detailsContainer}>
            <Text style={styles.detailsText} numberOfLines={1}>
              {emailText}
            </Text>
            <Spacer height={20} />
            <Text style={styles.detailsText}>{countryText}</Text>
            <Spacer height={20} />
            <Text style={styles.detailsText}>{cityText}</Text>
          </View>
          <Spacer height={100} />
          <DefaultButton
            text="Change password"
            onPress={onPressChangePassword}
          />
          <Spacer height={30} />
          <DefaultButton text="Change location" onPress={onPressPreferences} />
          <Spacer height={30} />
          <TouchableOpacity onPress={onPressLogout} style={styles.logoutTouch}>
            <Text style={styles.logoutText}>Log out</Text>
          </TouchableOpacity>
        </AuthCard>
      </ImageBackground>
    </View>
  );
}
