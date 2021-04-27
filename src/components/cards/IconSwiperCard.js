import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import useTheme from '../../hooks/theme/UseTheme';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faSkullCrossbones, faHeart} from '@fortawesome/free-solid-svg-icons';

export default function IconSwiperCard({onPressLeft, onPressRight}) {
  // ** ** ** ** ** HOOKS ** ** ** ** **
  const {colors} = useTheme();

  // ** ** ** ** ** STYLES ** ** ** ** **
  const styles = StyleSheet.create({
    iconContainer: {
      flexDirection: 'row',
      width: '45%',
      justifyContent: 'space-between',
    },
    icon: {
      color: colors.white,
    },
  });

  // ** ** ** ** ** RENDER ** ** ** ** **
  return (
    <View style={styles.iconContainer}>
      <TouchableOpacity style={styles.touch} onPress={onPressLeft}>
        <FontAwesomeIcon
          icon={faSkullCrossbones}
          style={styles.icon}
          size={40}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.touch} onPress={onPressRight}>
        <FontAwesomeIcon icon={faHeart} style={styles.icon} size={40} />
      </TouchableOpacity>
    </View>
  );
}
