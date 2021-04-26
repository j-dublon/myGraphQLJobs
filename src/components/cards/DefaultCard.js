import React from 'react';
import {StyleSheet, View} from 'react-native';
import useTheme from '../../hooks/theme/UseTheme';
import {ScaleHook} from 'react-native-design-to-component';

export default function DefaultComponent({children}) {
  // ** ** ** ** ** HOOKS ** ** ** ** **
  const {colors, textStyles} = useTheme();
  const {getHeight, getWidth, fontSize, radius} = ScaleHook();

  // ** ** ** ** ** STYLES ** ** ** ** **
  const styles = StyleSheet.create({
    card: {
      backgroundColor: colors.darkPink,
      height: '90%',
      width: '90%',
      borderRadius: radius(20),
      borderColor: colors.white,
      borderWidth: getWidth(0.5),
    },
  });

  // ** ** ** ** ** RENDER ** ** ** ** **
  return <View style={styles.card}>{children}</View>;
}
