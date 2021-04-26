import React from 'react';
import {StyleSheet, View, Text, ImageBackground} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const background = require('../../assets/images/background.png');

export default function DefaultScreen() {
  // ** ** ** ** ** HOOKS ** ** ** ** **
  const navigation = useNavigation();
  navigation.setOptions({
    header: () => null,
    // header: () => (
    //   <NavigationHeader
    //     iconLeft="back"
    //     variant="white"
    //     title={AuthDict.ForgotPasswordTitle}
    //     onPressLeft={() => navigation.goBack()}
    //   />
    // ),
  });

  // ** ** ** ** ** LOCAL ** ** ** ** **

  // ** ** ** ** ** EFFECTS ** ** ** ** **

  // ** ** ** ** ** LOGIC ** ** ** ** **
  // e.g. syncing data, e.g. register a user, can be called by an action

  // ** ** ** ** ** ACTIONS ** ** ** ** **
  // e.g. button pressed

  // ** ** ** ** ** STYLES ** ** ** ** **
  const styles = StyleSheet.create({
    screen: {
      flex: 1,
    },
    image: {
      flex: 1,
      resizeMode: 'cover',
    },
  });

  // ** ** ** ** ** RENDER ** ** ** ** **
  return (
    <View style={styles.screen}>
      <ImageBackground source={background} style={styles.image}>
        <Text style={{color: 'white'}}>Screen</Text>
      </ImageBackground>
    </View>
  );
}
