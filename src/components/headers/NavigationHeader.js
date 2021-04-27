import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faBackward} from '@fortawesome/free-solid-svg-icons';
import {ScaleHook} from 'react-native-design-to-component';
import useTheme from '../../hooks/theme/UseTheme';

export default function NavigationHeader({title}) {
  // ** ** ** ** ** HOOKS ** ** ** ** **
  const {getHeight, getWidth} = ScaleHook();
  const {colors, textStyles} = useTheme();

  // ** ** ** ** ** STYLES ** ** ** ** **
  const styles = {
    container: {
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    iconContainer: {
      position: 'absolute',
      left: getWidth(15),
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
      <View style={styles.iconContainer}>
        <TouchableOpacity
          style={styles.touch}
          onPress={() => console.log('back')}>
          <FontAwesomeIcon icon={faBackward} style={styles.icon} size={28} />
        </TouchableOpacity>
      </View>
      <Text style={styles.text}>{title}</Text>
    </View>
  );
}
