import React, {useEffect} from 'react';
import {StyleSheet, View, Text, ImageBackground} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import useTheme from '../hooks/theme/UseTheme';
import {ScaleHook} from 'react-native-design-to-component';
import AuthCard from '../components/cards/AuthCard';

const background = require('../../assets/images/background.png');

export default function DefaultScreen() {
  // ** ** ** ** ** HOOKS ** ** ** ** **
  const {colors, textStyles} = useTheme();
  const {getHeight, getWidth, fontSize, radius} = ScaleHook();
  const navigation = useNavigation();

  // ** ** ** ** ** LOCAL ** ** ** ** **

  // ** ** ** ** ** EFFECTS ** ** ** ** **
  useEffect(() => {
    navigation.setOptions({
      header: () => null,
    });
  }, []);

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
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
      ...textStyles.bold30_white,
      alignSelf: 'center',
      marginVertical: getHeight(10),
    },
  });

  const title = 'My GraphQL Jobs';

  // ** ** ** ** ** RENDER ** ** ** ** **
  return (
    <View style={styles.screen}>
      <ImageBackground source={background} style={styles.image}>
        <AuthCard>
          <Text style={styles.title}>{title}</Text>
        </AuthCard>
      </ImageBackground>
    </View>
  );
}
