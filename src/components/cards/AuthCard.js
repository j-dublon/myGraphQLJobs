import React from 'react';
import {StyleSheet, View} from 'react-native';
import useTheme from '../../hooks/theme/UseTheme';
import {ScaleHook} from 'react-native-design-to-component';

export default function AuthCard({children}) {
  // ** ** ** ** ** HOOKS ** ** ** ** **
  const {colors} = useTheme();
  const {getWidth, radius} = ScaleHook();

  // ** ** ** ** ** STYLES ** ** ** ** **
  const styles = StyleSheet.create({
    card: {
      backgroundColor: colors.darkPink,
      height: '90%',
      width: '90%',
      borderRadius: radius(20),
      borderColor: colors.white,
      borderWidth: getWidth(0.5),
      alignItems: 'center',
    },
  });

  // ** ** ** ** ** RENDER ** ** ** ** **
  return <View style={styles.card}>{children}</View>;
}
