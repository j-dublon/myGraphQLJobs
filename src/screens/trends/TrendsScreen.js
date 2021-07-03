import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import useTheme from '../../hooks/theme/UseTheme';
import {ScaleHook} from 'react-native-design-to-component';
import AuthCard from '../../components/cards/AuthCard';
import TopTabs from '../../components/buttons/TopTabs';
import Pie from 'react-native-pie';
import Spacer from '../../components/utility/Spacer';
import {BarChart} from 'react-native-chart-kit';
import useData from '../../hooks/data/useData';
import {Auth} from 'aws-amplify';

const background = require('../../../assets/images/background.png');

export default function TrendsScreen() {
  // ** ** ** ** ** HOOKS ** ** ** ** **
  const {colors, textStyles} = useTheme();
  const {getHeight, getWidth, radius} = ScaleHook();
  const {getRemotesByCity, totalJobsInCity, remoteJobsInCity} = useData();

  // ** ** ** ** ** LOCAL ** ** ** ** **
  const [selected, setSelected] = useState('left');
  const [leftText, setLeftText] = useState('');
  const [rightText, setRightText] = useState('');
  const location = selected === 'left' ? 'country' : 'city';
  const [percentageRemote, setPercentageRemote] = useState();

  const pieData = [
    {
      percentage: percentageRemote,
      color: colors.midPink,
    },
    {
      percentage: 100 - percentageRemote,
      color: colors.limeGreen,
    },
  ];

  const barData = {
    labels: ['San Francisco', 'Detroit', 'New York', 'Los Angeles'],
    datasets: [
      {
        data: [20, 45, 28, 80],
      },
    ],
  };

  const chartConfig = {
    color: (opacity = 1) => `rgba(0, 200, 0, ${opacity})`,
    decimalPlaces: 0,
    barPercentage: 0.5,
    useShadowColorFromDataset: false,
    fillShadowGradient: 'rgba(0, 200, 0, 1)',
    fillShadowGradientOpacity: 1,
    propsForVerticalLabels: {
      ...textStyles.regular10_limeGreen,
    },
    propsForHorizontalLabels: {
      ...textStyles.regular10_limeGreen,
    },
  };

  // ** ** ** ** ** EFFECTS ** ** ** ** **
  useEffect(() => {
    const getAttributes = async () => {
      const {attributes} = await Auth.currentAuthenticatedUser();
      setLeftText(
        `The best cities for GraphQL jobs in ${attributes['custom:country']}`,
      );
      setRightText(`On site vs. remote in ${attributes['custom:city']}`);
    };
    getAttributes();
  }, []);

  useEffect(() => {
    getRemotesByCity();
  }, []);

  useEffect(() => {
    if (totalJobsInCity && remoteJobsInCity) {
      setPercentageRemote((remoteJobsInCity / totalJobsInCity) * 100);
    }
  }, []);

  // ** ** ** ** ** LOGIC ** ** ** ** **

  // ** ** ** ** ** ACTIONS ** ** ** ** **

  // ** ** ** ** ** STYLES ** ** ** ** **
  const styles = StyleSheet.create({
    screen: {
      flex: 1,
    },
    image: {
      flex: 1,
      resizeMode: 'cover',
      alignItems: 'center',
      justifyContent: 'center',
    },
    remoteContainer: {
      position: 'absolute',
      top: getHeight(110),
      right: getWidth(40),
    },
    remoteLabel: {
      ...textStyles.bold16_midPink,
    },
    onSiteContainer: {
      position: 'absolute',
      top: getHeight(310),
      left: getWidth(20),
    },
    onSiteLabel: {
      ...textStyles.regular16_limeGreen,
    },
    graphStyle: {
      borderRadius: radius(10),
    },
    textContainer: {
      marginTop: getHeight(40),
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '80%',
      height: getHeight(100),
    },
    text: {
      ...textStyles.regular16_white,
      textAlign: 'center',
    },
    link: {
      ...textStyles.regular16_limeGreen,
      textDecorationLine: 'underline',
      textAlign: 'center',
    },
  });

  // ** ** ** ** ** RENDER ** ** ** ** **

  return (
    <View style={styles.screen}>
      <ImageBackground source={background} style={styles.image}>
        <AuthCard>
          <TopTabs
            leftTitle="Cities"
            rightTitle="Remotes"
            selected={selected}
            setSelected={setSelected}
          />
          <Spacer height={70} />
          {selected === 'right' ? (
            <>
              <Pie radius={100} sections={pieData} strokeCap={'butt'} />
              <View style={styles.remoteContainer}>
                <Text style={styles.remoteLabel}>remote</Text>
              </View>
              <View style={styles.onSiteContainer}>
                <Text style={styles.onSiteLabel}>on site</Text>
              </View>
            </>
          ) : (
            <BarChart
              style={styles.graphStyle}
              data={barData}
              width={280}
              height={200}
              chartConfig={chartConfig}
              verticalLabelRotation={20}
              fromZero={true}
            />
          )}
          <View style={styles.textContainer}>
            <Text style={styles.text}>
              {selected === 'left' ? leftText : rightText}
            </Text>
            <TouchableOpacity>
              <Text style={styles.link}>{`Change ${location}`}</Text>
            </TouchableOpacity>
          </View>
        </AuthCard>
      </ImageBackground>
    </View>
  );
}
