import React from 'react';
import {StyleSheet, View, TouchableOpacity, Text} from 'react-native';
import useTheme from '../../hooks/theme/UseTheme';
import {ScaleHook} from 'react-native-design-to-component';

export default function TopTabs({
  leftTitle,
  rightTitle,
  selected,
  setSelected,
}) {
  // ** ** ** ** ** HOOKS ** ** ** ** **
  const {colors, textStyles} = useTheme();
  const {radius, getHeight} = ScaleHook();

  // ** ** ** ** ** LOCAL ** ** ** ** **

  // ** ** ** ** ** EFFECTS ** ** ** ** **
  // ** ** ** ** ** LOGIC ** ** ** ** **

  // ** ** ** ** ** ACTIONS ** ** ** ** **
  // ** ** ** ** ** STYLES ** ** ** ** **
  const styles = StyleSheet.create({
    card: {
      height: getHeight(40),
      marginTop: getHeight(20),
      width: '85%',
      flexDirection: 'row',
    },
    box: {
      flex: 0.5,
      alignItems: 'center',
      justifyContent: 'flex-end',
      paddingBottom: getHeight(7),
      backgroundColor: 'transparent',
      borderBottomColor: colors.limeGreen,
      borderBottomWidth: 1,
      borderTopLeftRadius: radius(8),
      borderTopRightRadius: radius(8),
    },
    selectedBox: {
      backgroundColor: colors.midPink,
      borderBottomWidth: 3,
    },
    text: {
      ...textStyles.regular16_limeGreen,
    },
    selectedText: {
      ...textStyles.bold16_limeGreen,
    },
  });

  // ** ** ** ** ** RENDER ** ** ** ** **
  return (
    <View style={styles.card}>
      <TouchableOpacity
        onPress={() => setSelected('left')}
        style={
          selected === 'left'
            ? {...styles.box, ...styles.selectedBox}
            : styles.box
        }>
        <Text style={selected === 'left' ? styles.selectedText : styles.text}>
          {leftTitle}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setSelected('right')}
        style={
          selected === 'right'
            ? {...styles.box, ...styles.selectedBox}
            : styles.box
        }>
        <Text style={selected === 'right' ? styles.selectedText : styles.text}>
          {rightTitle}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
