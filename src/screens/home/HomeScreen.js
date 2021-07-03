import React, {useEffect, useState, useRef} from 'react';
import {StyleSheet, View, Text, ImageBackground, Linking} from 'react-native';
import useTheme from '../../hooks/theme/UseTheme';
import {ScaleHook} from 'react-native-design-to-component';
import CardStack from 'react-native-card-stack-swiper';
import NavigationHeader from '../../components/headers/NavigationHeader';
import JobCard from '../../components/cards/JobCard';
import {format} from 'date-fns';
import IconSwiperCard from '../../components/cards/IconSwiperCard';
import BasicModal from '../../components/modals/BasicModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useData from '../../hooks/data/useData';

const background = require('../../../assets/images/background.png');

export default function HomeScreen() {
  // ** ** ** ** ** HOOKS ** ** ** ** **
  const {colors, textStyles} = useTheme();
  const {getWidth, radius} = ScaleHook();
  const swiperRef = useRef();
  const {getJobs, jobs} = useData();

  // ** ** ** ** ** LOCAL ** ** ** ** **
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [currentJobIndex, setCurrentJobIndex] = useState(0);
  const [country, setCountry] = useState();

  // ** ** ** ** ** EFFECTS ** ** ** ** **
  useEffect(() => {
    const getCountry = async () => {
      const result = await AsyncStorage.getItem('@COUNTRY');
      const formatted = result
        .toLowerCase()
        .split(' ')
        .join('-');
      setCountry(formatted);
    };
    getCountry();
  }, []);

  useEffect(() => {
    if (country) {
      getJobs({
        variables: {
          input: {
            slug: country,
          },
        },
      });
    }
  }, []);

  // ** ** ** ** ** LOGIC ** ** ** ** **
  // e.g. syncing data, e.g. register a user, can be called by an action

  // ** ** ** ** ** ACTIONS ** ** ** ** **
  const onPressDetails = index => {
    setCurrentJobIndex(index);
    setShowDetailsModal(true);
  };

  const onPressWebsite = async () => {
    const url = jobs[currentJobIndex].applyUrl;

    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        Alert.alert(`Sorry, we can't open ${url} right now`);
      }
    });
  };

  const onPressRight = () => swiperRef.current.swipeRight();

  const onPressLeft = () => swiperRef.current.swipeLeft();

  const onSwipeRight = async index => {
    const savedJobs = await AsyncStorage.getItem('@SAVED_JOBS');
    const existing = savedJobs ? JSON.parse(savedJobs) : [];
    const updated = [...existing, jobs[index]];

    await AsyncStorage.setItem('@SAVED_JOBS', JSON.stringify(updated));
  };

  const onSwipeLeft = () => console.log('Nope');

  const onEmptyStack = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.outText}>That's it for now...</Text>
    </View>
  );

  // ** ** ** ** ** STYLES ** ** ** ** **
  const styles = StyleSheet.create({
    screen: {
      flex: 1,
    },
    image: {
      flex: 1,
      resizeMode: 'cover',
      alignItems: 'center',
    },
    cardStack: {
      height: '70%',
      width: '80%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    iconContainer: {
      flexDirection: 'row',
      width: '45%',
      justifyContent: 'space-between',
    },
    icon: {
      color: colors.white,
    },
    emptyContainer: {
      backgroundColor: colors.darkPink100,
      height: '30%',
      width: '80%',
      padding: 15,
      borderRadius: radius(20),
      borderColor: colors.white,
      borderWidth: getWidth(0.5),
      alignItems: 'center',
      justifyContent: 'center',
    },
    outText: {
      ...textStyles.bold24_white,
      fontSize: 24,
      textAlign: 'center',
    },
  });

  // ** ** ** ** ** RENDER ** ** ** ** **
  return (
    <View style={styles.screen}>
      <ImageBackground source={background} style={styles.image}>
        <NavigationHeader
          title="Home"
          back={false}
          onCard={false}
          profile={true}
        />
        {jobs.length > 0 && (
          <>
            <CardStack
              style={styles.cardStack}
              ref={swiperRef}
              onSwipedLeft={onSwipeLeft}
              onSwipedRight={onSwipeRight}
              renderNoMoreCards={onEmptyStack}>
              {jobs.map((job, index) => {
                const formattedDate = format(
                  new Date(job.postedAt),
                  'dd/MM/yyyy',
                );
                return (
                  <JobCard
                    title={job.title}
                    company={job.company.name}
                    city={job.cities[0].name}
                    commitment={job.commitment.title}
                    posted={formattedDate}
                    onPressMoreInfo={() => onPressDetails(index)}
                    onPressWebsite={onPressWebsite}
                    key={index}
                  />
                );
              })}
            </CardStack>
            <IconSwiperCard
              onPressLeft={onPressLeft}
              onPressRight={onPressRight}
            />
            <BasicModal
              visibility={showDetailsModal}
              setVisibility={setShowDetailsModal}
              title={jobs[currentJobIndex].title}
              commitment={jobs[currentJobIndex].commitment.title}
              description={jobs[currentJobIndex].description}
              applyUrl={jobs[currentJobIndex].applyUrl}
            />
          </>
        )}
      </ImageBackground>
    </View>
  );
}
