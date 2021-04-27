import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import useTheme from '../../hooks/theme/UseTheme';
import Spacer from '../../components/utility/Spacer';

export default function JobCard({
  title,
  company,
  city,
  commitment,
  posted,
  onPressMoreInfo,
  onPressWebsite,
}) {
  // ** ** ** ** ** HOOKS ** ** ** ** **
  const {colors, textStyles} = useTheme();

  // ** ** ** ** ** STYLES ** ** ** ** **
  const styles = StyleSheet.create({
    card: {
      height: 350,
      width: 250,
      borderRadius: 12,
      backgroundColor: colors.darkPink100,
      padding: 15,
      borderColor: colors.white,
      borderWidth: 0.5,
    },
    jobTitle: {
      ...textStyles.bold20_white,
      fontSize: 20,
      textAlign: 'center',
    },
    websiteLinkText: {
      ...textStyles.bold20_pink,
      fontSize: 20,
      textAlign: 'center',
      textDecorationLine: 'underline',
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
      bottom: 20,
    },
    linkText: {
      ...textStyles.bold20_limeGreen,
      fontSize: 20,
      textAlign: 'center',
      textDecorationLine: 'underline',
    },
  });

  // ** ** ** ** ** RENDER ** ** ** ** **
  return (
    <View style={styles.card}>
      <Text style={styles.jobTitle} numberOfLines={2}>
        {title}
      </Text>
      <Text style={styles.jobTitle}>at</Text>
      <Spacer height={5} />
      <TouchableOpacity onPress={onPressWebsite} style={styles.touch}>
        <Text style={styles.websiteLinkText} numberOfLines={1}>
          {company}
        </Text>
      </TouchableOpacity>
      <Spacer height={20} />
      <Text style={styles.subtitle}>{city}</Text>
      <Spacer height={10} />
      <Text style={styles.subtitle}>{commitment}</Text>
      <Spacer height={10} />
      <Text style={styles.subtitle}>{`Posted: ${posted}`}</Text>
      <View style={styles.linkContainer}>
        <TouchableOpacity onPress={onPressMoreInfo} style={styles.touch}>
          <Text style={styles.linkText}>Details</Text>
        </TouchableOpacity>
        <Spacer height={15} />
      </View>
    </View>
  );
}
