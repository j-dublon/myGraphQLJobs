import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  TextInput,
  Switch,
  Alert,
  TouchableOpacity,
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
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faChevronDown} from '@fortawesome/free-solid-svg-icons';
import QuickPicker from 'quick-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useData from '../../hooks/data/useData';

const background = require('../../../assets/images/background.png');

export default function RegisterScreen() {
  // ** ** ** ** ** HOOKS ** ** ** ** **
  const {colors, textStyles} = useTheme();
  const {getHeight, getWidth} = ScaleHook();
  const navigation = useNavigation();
  const {
    getCountries,
    countryList,
    cityList,
    selectedCountry,
    setSelectedCountry,
    selectedCity,
    setSelectedCity,
  } = useData();

  // ** ** ** ** ** LOCAL ** ** ** ** **
  const [emailText, setEmailText] = useState('');
  const [passwordText, setPasswordText] = useState('');
  const [receiveEmails, setReceiveEmails] = useState(false);

  // ** ** ** ** ** EFFECTS ** ** ** ** **
  useEffect(() => {
    getCountries();
  }, []);

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

    if (!selectedCountry || selectedCountry === '') {
      Alert.alert('', 'Please select a country');
      return;
    }

    if (!selectedCity || selectedCity === '') {
      Alert.alert('', 'Please select a city');
      return;
    }

    await Auth.signUp({
      username: emailText,
      password: passwordText,
    })
      .then(async res => {
        console.log(res, '<---sign up res');

        await AsyncStorage.setItem('@COUNTRY', selectedCountry);
        await AsyncStorage.setItem('@CITY', selectedCity);

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

  const onPressCountry = () => {
    QuickPicker.open({
      items: countryList,
      selectedValue: '',
      onPressDone: value => {
        setSelectedCity();
        setSelectedCountry(value);
        QuickPicker.close();
      },
    });
  };

  const onPressCity = () => {
    QuickPicker.open({
      items: cityList,
      selectedValue: '',
      onPressDone: value => {
        setSelectedCity(value);
        QuickPicker.close();
      },
    });
  };

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
    touch: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'space-between',
      flexDirection: 'row',
    },
    boxText: {
      ...textStyles.regular16_white,
    },
    icon: {
      color: colors.white,
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
      bottom: getHeight(40),
    },
  });

  // ** ** ** ** ** RENDER ** ** ** ** **
  return (
    <View style={styles.screen}>
      <ImageBackground source={background} style={styles.image}>
        <AuthCard>
          <NavigationHeader title="Register" back={true} onCard={true} />
          <Spacer height={40} />
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
          <View style={styles.input}>
            <TouchableOpacity style={styles.touch} onPress={onPressCountry}>
              <Text style={styles.boxText}>
                {selectedCountry ? selectedCountry : 'country...'}
              </Text>
              <FontAwesomeIcon
                icon={faChevronDown}
                style={styles.icon}
                size={20}
              />
            </TouchableOpacity>
          </View>
          <Spacer height={30} />
          <View style={styles.input}>
            <TouchableOpacity style={styles.touch} onPress={onPressCity}>
              <Text style={styles.boxText}>
                {selectedCity ? selectedCity : 'city...'}
              </Text>
              <FontAwesomeIcon
                icon={faChevronDown}
                style={styles.icon}
                size={20}
              />
            </TouchableOpacity>
          </View>
          <Spacer height={25} />
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
          <View style={styles.buttonContainer}>
            <DefaultButton text="Register" onPress={onPressRegister} />
          </View>
        </AuthCard>
      </ImageBackground>
    </View>
  );
}
