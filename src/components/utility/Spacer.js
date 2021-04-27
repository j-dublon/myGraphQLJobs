import React from 'react';
import {View} from 'react-native';
import {ScaleHook} from 'react-native-design-to-component';

export default function ({height}) {
  const {getHeight} = ScaleHook();

  if (!height) {
    throw new Error('Please add a height');
  }

  const styles = {
    spacer: {
      height: getHeight(height),
    },
  };

  return <View style={styles.spacer} />;
}
