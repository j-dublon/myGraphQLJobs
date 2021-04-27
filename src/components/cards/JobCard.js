import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import useTheme from '../../hooks/theme/UseTheme';
import {ScaleHook} from 'react-native-design-to-component';
import Spacer from '../../components/utility/Spacer';

export default function JobCard({
  title,
  city,
  country,
  commitment,
  posted,
  onPressMoreInfo,
}) {
  // ** ** ** ** ** HOOKS ** ** ** ** **
  const {colors, textStyles} = useTheme();
  const {getWidth, radius} = ScaleHook();

  // ** ** ** ** ** STYLES ** ** ** ** **
  const styles = StyleSheet.create({
    card: {
      height: 350,
      width: 250,
      borderRadius: 12,
      backgroundColor: colors.darkPink,
      padding: 15,
    },
    jobTitle: {
      ...textStyles.bold20_white,
      fontSize: 20,
      textAlign: 'center',
    },
    subtitle: {
      ...textStyles.bold16_white,
      fontSize: 16,
      textAlign: 'center',
    },
    linkContainer: {
      position: 'absolute',
      width: '100%',
      alignSelf: 'center',
      alignItems: 'center',
      bottom: 28,
    },
    linkText: {
      ...textStyles.bold20_limeGreen,
      fontSize: 20,
      textAlign: 'center',
    },
  });

  // ** ** ** ** ** RENDER ** ** ** ** **
  return (
    <View style={styles.card}>
      <Text style={styles.jobTitle} numberOfLines={3}>
        {title}
      </Text>
      <Spacer height={25} />
      <Text style={styles.subtitle}>{city}</Text>
      <Text style={styles.subtitle}>{country}</Text>
      <Spacer height={15} />
      <Text style={styles.subtitle}>{commitment}</Text>
      <Spacer height={15} />
      <Text style={styles.subtitle}>{`Posted: ${posted}`}</Text>
      <View style={styles.linkContainer}>
        <TouchableOpacity onPress={onPressMoreInfo} style={styles.touch}>
          <Text style={styles.linkText}>More info...</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
