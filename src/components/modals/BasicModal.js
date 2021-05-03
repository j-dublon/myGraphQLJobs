import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Linking,
  Alert,
} from 'react-native';
import {ScaleHook} from 'react-native-design-to-component';
import useTheme from '../../hooks/theme/UseTheme';
import Modal from 'react-native-modal';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faTimes} from '@fortawesome/free-solid-svg-icons';
import Spacer from '../utility/Spacer';

export default function BasicModal({
  visibility,
  setVisibility,
  title,
  commitment,
  description,
  applyUrl,
}) {
  // ** ** ** ** ** HOOKS ** ** ** ** **
  const {getHeight, radius} = ScaleHook();
  const {colors, textStyles} = useTheme();

  // ** ** ** ** ** STYLES ** ** ** ** **
  const styles = StyleSheet.create({
    modal: {
      flex: 1,
      margin: 0,
      marginTop: getHeight(100),
    },
    modalCard: {
      flex: 1,
      width: '100%',
      height: '100%',
      alignSelf: 'center',
      backgroundColor: colors.midPink,
      borderTopLeftRadius: radius(20),
      borderTopRightRadius: radius(20),
    },
    titleContainer: {
      zIndex: 1,
      alignSelf: 'center',
      marginVertical: getHeight(15),
      width: '90%',
    },
    title: {
      ...textStyles.bold20_white,
    },
    touch: {
      flex: 1,
      alignSelf: 'flex-end',
      marginBottom: getHeight(15),
    },
    icon: {
      color: colors.white,
    },
    descriptionContainer: {
      marginTop: getHeight(15),
      zIndex: 1,
      alignSelf: 'center',
      width: '90%',
    },
    description: {
      ...textStyles.regular16_white,
    },
    linkTouch: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    applyText: {
      ...textStyles.bold20_limeGreen,
      textDecorationLine: 'underline',
    },
    closeText: {
      ...textStyles.bold20_white,
      textDecorationLine: 'underline',
    },
  });

  // ** ** ** ** ** ACTIONS ** ** ** ** **
  const onPressClose = () => setVisibility(false);

  const onPressApply = async () => {
    Linking.canOpenURL(applyUrl).then(supported => {
      if (supported) {
        Linking.openURL(applyUrl);
      } else {
        Alert.alert(`Sorry, we can't open ${applyUrl} right now`);
      }
    });
  };

  // ** ** ** ** ** RENDER ** ** ** ** **
  return (
    <Modal isVisible={visibility} style={styles.modal}>
      <ScrollView style={styles.modalCard} showsVerticalScrollIndicator={false}>
        <View style={styles.titleContainer}>
          <TouchableOpacity style={styles.touch} onPress={onPressClose}>
            <FontAwesomeIcon icon={faTimes} style={styles.icon} size={40} />
          </TouchableOpacity>
          <Text style={styles.title}>{title}</Text>
          <Spacer height={10} />
          <Text style={styles.title}>{commitment}</Text>
        </View>
        <View style={styles.descriptionContainer}>
          <Text style={styles.description}>{description}</Text>
        </View>
        <Spacer height={20} />
        <TouchableOpacity onPress={onPressApply} style={styles.linkTouch}>
          <Text style={styles.applyText}>Apply now</Text>
        </TouchableOpacity>
        <Spacer height={20} />
        <TouchableOpacity onPress={onPressClose} style={styles.linkTouch}>
          <Text style={styles.closeText}>Close</Text>
        </TouchableOpacity>
        <Spacer height={20} />
      </ScrollView>
    </Modal>
  );
}
