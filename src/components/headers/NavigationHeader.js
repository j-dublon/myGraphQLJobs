import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faUser, faBackward} from '@fortawesome/free-solid-svg-icons';
import {ScaleHook} from 'react-native-design-to-component';
import useTheme from '../../hooks/theme/UseTheme';

export default function NavigationHeader({
  title,
  back,
  onCard,
  profile = false,
}) {
  // ** ** ** ** ** HOOKS ** ** ** ** **
  const {getHeight, getWidth} = ScaleHook();
  const {colors, textStyles} = useTheme();

  // ** ** ** ** ** STYLES ** ** ** ** **
  const styles = {
    container: {
      flexDirection: 'row',
      width: '100%',
      height: onCard ? undefined : getHeight(80),
      justifyContent: 'center',
      alignItems: 'flex-end',
      backgroundColor: colors.black,
    },
    iconContainer: {
      position: 'absolute',
      top: getHeight(33),
      left: profile ? undefined : getWidth(15),
      right: profile ? getWidth(15) : undefined,
    },
    touch: {
      flex: 1,
    },
    icon: {
      color: colors.white,
    },
    text: {
      ...textStyles.bold30_white,
      marginVertical: getHeight(10),
    },
  };

  // ** ** ** ** ** RENDER ** ** ** ** **
  return (
    <View style={styles.container}>
      {back && (
        <View style={styles.iconContainer}>
          <TouchableOpacity
            style={styles.touch}
            onPress={() => console.log('back')}>
            <FontAwesomeIcon icon={faBackward} style={styles.icon} size={28} />
          </TouchableOpacity>
        </View>
      )}
      <Text style={styles.text}>{title}</Text>
      {profile && (
        <View style={styles.iconContainer}>
          <TouchableOpacity
            style={styles.touch}
            onPress={() => console.log('profile')}>
            <FontAwesomeIcon icon={faUser} style={styles.icon} size={28} />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
