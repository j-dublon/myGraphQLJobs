import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import useTheme from '../../hooks/theme/UseTheme';
import {ScaleHook} from 'react-native-design-to-component';

export default function DefaultButton({text, onPress}) {
  // ** ** ** ** ** HOOKS ** ** ** ** **
  const {colors, textStyles} = useTheme();
  const {getWidth, getHeight, radius} = ScaleHook();

  // ** ** ** ** ** STYLES ** ** ** ** **
  const styles = StyleSheet.create({
    container: {
      height: getHeight(40),
      width: '60%',
      backgroundColor: colors.black,
      borderRadius: radius(8),
      borderWidth: getWidth(1),
      borderColor: colors.limeGreen,
    },
    touch: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    text: {
      ...textStyles.regular16_pink,
      textAlign: 'center',
    },
  });

  // ** ** ** ** ** RENDER ** ** ** ** **
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress} style={styles.touch}>
        <Text style={styles.text}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
}
