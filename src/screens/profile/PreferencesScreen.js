import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Alert,
} from 'react-native';
import useTheme from '../../hooks/theme/UseTheme';
import {ScaleHook} from 'react-native-design-to-component';
import NavigationHeader from '../../components/headers/NavigationHeader';
import Spacer from '../../components/utility/Spacer';
import DefaultButton from '../../components/buttons/DefaultButton';
import AuthCard from '../../components/cards/AuthCard';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faChevronDown} from '@fortawesome/free-solid-svg-icons';
import QuickPicker from 'quick-picker';
import useData from '../../hooks/data/useData';
import {useNavigation} from '@react-navigation/native';
import {Auth} from 'aws-amplify';

const background = require('../../../assets/images/background.png');

export default function PreferencesScreen() {
  // ** ** ** ** ** HOOKS ** ** ** ** **
  const {colors, textStyles} = useTheme();
  const {getHeight, getWidth} = ScaleHook();
  const {
    countryList,
    cityList,
    selectedCountry,
    setSelectedCountry,
    selectedCity,
    setSelectedCity,
    setCountrySlug,
    setCitySlug,
    getRemotesByCity,
    getJobs,
  } = useData();
  const navigation = useNavigation();

  // ** ** ** ** ** LOCAL ** ** ** ** **
  // ** ** ** ** ** EFFECTS ** ** ** ** **
  // ** ** ** ** ** LOGIC ** ** ** ** **
  // ** ** ** ** ** ACTIONS ** ** ** ** **
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

  const onPressView = async () => {
    if (!selectedCity || !selectedCountry) {
      Alert.alert('', 'Please select a country and city');
      return;
    }

    let user = await Auth.currentAuthenticatedUser();
    await Auth.updateUserAttributes(user, {
      'custom:country': selectedCountry,
      'custom:city': selectedCity,
    });

    const slug = selectedCountry
      .toLowerCase()
      .split(' ')
      .join('-');

    setCountrySlug(slug);

    const city = selectedCity
      .toLowerCase()
      .split(' ')
      .join('-');

    setCitySlug(city);

    getJobs({
      variables: {
        input: {
          slug: slug,
        },
      },
    });

    getRemotesByCity({
      variables: {
        input: {
          slug: city,
        },
      },
    });
    navigation.navigate('HomeTabs');
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
      ...textStyles.bold20_white,
      alignSelf: 'flex-start',
      marginVertical: getHeight(10),
      marginHorizontal: '10%',
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
    box: {
      height: getHeight(50),
      width: '80%',
      borderColor: colors.white,
      borderWidth: getWidth(1),
      paddingHorizontal: getWidth(7),
      backgroundColor: colors.darkPink,
    },
    touch: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'space-between',
      flexDirection: 'row',
    },
    boxText: {
      ...textStyles.bold16_white,
    },
    icon: {
      color: colors.white,
    },
  });

  // ** ** ** ** ** RENDER ** ** ** ** **
  return (
    <View style={styles.screen}>
      <ImageBackground source={background} style={styles.image}>
        <AuthCard>
          <NavigationHeader title="Location" back={true} onCard={true} />
          <Spacer height={20} />
          <Text style={styles.title}>Show me:</Text>
          <Spacer height={30} />
          <View style={styles.box}>
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
          <View style={styles.box}>
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
          <Spacer height={150} />
          <DefaultButton text="View" onPress={onPressView} />
        </AuthCard>
      </ImageBackground>
    </View>
  );
}
