import React, {useState, useRef, useEffect, useCallback} from 'react';
import {StyleSheet, View, Text, ImageBackground, Linking} from 'react-native';
import useTheme from '../../hooks/theme/UseTheme';
import {ScaleHook} from 'react-native-design-to-component';
import CardStack from 'react-native-card-stack-swiper';
import NavigationHeader from '../../components/headers/NavigationHeader';
import JobCard from '../../components/cards/JobCard';
import {format} from 'date-fns';
import IconSwiperCard from '../../components/cards/IconSwiperCard';
import BasicModal from '../../components/modals/BasicModal';
import useData from '../../hooks/data/useData';
import {useFocusEffect} from '@react-navigation/native';
import {Auth} from 'aws-amplify';

const background = require('../../../assets/images/background.png');

export default function HomeScreen() {
  // ** ** ** ** ** HOOKS ** ** ** ** **
  const {colors, textStyles} = useTheme();
  const {getWidth, radius} = ScaleHook();
  const swiperRef = useRef();
  const {
    allJobs,
    myJobs,
    setMyJobs,
    getCountries,
    getJobs,
    getCountryAndCity,
    citySlug,
    getTopCitiesByCountry,
    countrySlug,
  } = useData();

  // ** ** ** ** ** LOCAL ** ** ** ** **
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [currentJobIndex, setCurrentJobIndex] = useState(0);

  // ** ** ** ** ** EFFECTS ** ** ** ** **
  useEffect(() => {
    getCountries();
    getCountryAndCity();
  }, []);

  useEffect(() => {
    if (citySlug) {
      getRemotesByCity({
        variables: {
          input: {
            slug: citySlug,
          },
        },
      });
    }
  }, [citySlug]);

  useEffect(() => {
    getTopCitiesByCountry({
      variables: {
        input: {
          slug: countrySlug,
        },
      },
    });
  }, [countrySlug]);

  // get all jobs on first app load, and when home tab focused (countrySlug not available from login)
  useFocusEffect(
    useCallback(() => {
      const getJobsFromCountry = async () => {
        const {attributes} = await Auth.currentAuthenticatedUser();
        const country = attributes['custom:country'];
        const slug = country
          .toLowerCase()
          .split(' ')
          .join('-');

        getJobs({
          variables: {
            input: {
              slug: slug,
            },
          },
        });
      };
      getJobsFromCountry();
    }, []),
  );

  // ** ** ** ** ** LOGIC ** ** ** ** **
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

  const onSwipeRight = cardIndex => {
    const selected = allJobs.filter((job, index) => index === cardIndex);
    setMyJobs([...myJobs, ...selected]);
  };

  const onSwipeLeft = () => console.log('Nope!');

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
        {allJobs.length > 0 && (
          <>
            <CardStack
              style={styles.cardStack}
              ref={swiperRef}
              onSwipedLeft={onSwipeLeft}
              onSwipedRight={onSwipeRight}
              renderNoMoreCards={onEmptyStack}>
              {allJobs.map((job, index) => {
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
              title={allJobs[currentJobIndex].title}
              commitment={allJobs[currentJobIndex].commitment.title}
              description={allJobs[currentJobIndex].description}
              applyUrl={allJobs[currentJobIndex].applyUrl}
            />
          </>
        )}
      </ImageBackground>
    </View>
  );
}
