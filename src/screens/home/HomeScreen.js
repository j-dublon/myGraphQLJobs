import React, {useEffect, useState, useRef} from 'react';
import {StyleSheet, View, Text, ImageBackground, Linking} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import useTheme from '../../hooks/theme/UseTheme';
import {ScaleHook} from 'react-native-design-to-component';
import Spacer from '../../components/utility/Spacer';
import CardStack from 'react-native-card-stack-swiper';
import NavigationHeader from '../../components/headers/NavigationHeader';
import JobCard from '../../components/cards/JobCard';
import {format} from 'date-fns';
import IconSwiperCard from '../../components/cards/IconSwiperCard';
import BasicModal from '../../components/modals/BasicModal';

const background = require('../../../assets/images/background.png');

const fakeData = [
  {
    title: 'Senior Fullstack Developer',
    commitment: {
      title: 'Full-time',
    },
    cities: [
      {
        name: 'San Francisco',
      },
    ],
    remotes: {
      type: 'remote',
    },
    description:
      'We are looking for a strong (Midlevel to Senior) Javascript Developer with to join our team. You will be working on extending and maintaining frontend code and serverless backend.\n\nFull-time or part-time. In Berlin or remote.\n\n​\n\n**Job Description**\n\n- Proven knowledge in JavaScript related to design, analysis, development and maintenance\n- Understanding the nature of asynchronous programming and its quirks and workarounds\n- Fundamental knowledge about design principles behind a scalable application\n- Good understanding of security and data protection concepts\n- Well rounded knowledge of application architecture\n- Ability to form and communicate architecture decisions\n- Focus on code quality and deliver projects with high business impact\n\n',
    company: {
      name: 'Segment',
      websiteUrl: 'http://segment.com',
    },
    applyUrl: 'https://grnh.se/2d8f45d71',
    postedAt: '2019-08-12T20:19:52.000Z',
  },
  {
    title: 'Junior Frontend Developer',
    commitment: {
      title: 'Full-time',
    },
    cities: [
      {
        name: 'San Francisco',
      },
    ],
    remotes: {
      type: 'remote',
    },
    description:
      'We are looking for a strong (Midlevel to Senior) Javascript Developer with to join our team. You will be working on extending and maintaining frontend code and serverless backend.\n\nFull-time or part-time. In Berlin or remote.\n\n​\n\n**Job Description**\n\n- Proven knowledge in JavaScript related to design, analysis, development and maintenance\n- Understanding the nature of asynchronous programming and its quirks and workarounds\n- Fundamental knowledge about design principles behind a scalable application\n- Good understanding of security and data protection concepts\n- Well rounded knowledge of application architecture\n- Ability to form and communicate architecture decisions\n- Focus on code quality and deliver projects with high business impact\n\n',
    company: {
      name: 'Segment',
      websiteUrl: 'http://segment.com',
    },
    applyUrl: 'https://grnh.se/2d8f45d71',
    postedAt: '2019-08-12T20:19:52.000Z',
  },
  {
    title: 'Javascript Engineer',
    commitment: {
      title: 'Full-time',
    },
    cities: [
      {
        name: 'San Francisco',
      },
    ],
    remotes: {
      type: 'remote',
    },
    description:
      'We are looking for a strong (Midlevel to Senior) Javascript Developer with to join our team. You will be working on extending and maintaining frontend code and serverless backend.\n\nFull-time or part-time. In Berlin or remote.\n\n​\n\n**Job Description**\n\n- Proven knowledge in JavaScript related to design, analysis, development and maintenance\n- Understanding the nature of asynchronous programming and its quirks and workarounds\n- Fundamental knowledge about design principles behind a scalable application\n- Good understanding of security and data protection concepts\n- Well rounded knowledge of application architecture\n- Ability to form and communicate architecture decisions\n- Focus on code quality and deliver projects with high business impact\n\n',
    company: {
      name: 'Segment',
      websiteUrl: 'http://segment.com',
    },
    applyUrl: 'https://grnh.se/2d8f45d71',
    postedAt: '2019-08-12T20:19:52.000Z',
  },
];

export default function HomeScreen() {
  // ** ** ** ** ** HOOKS ** ** ** ** **
  const {colors, textStyles} = useTheme();
  const {getHeight, getWidth, fontSize, radius} = ScaleHook();
  const navigation = useNavigation();
  const swiperRef = useRef();

  // ** ** ** ** ** LOCAL ** ** ** ** **
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [currentJobIndex, setCurrentJobIndex] = useState(0);

  // ** ** ** ** ** EFFECTS ** ** ** ** **

  // ** ** ** ** ** LOGIC ** ** ** ** **
  // e.g. syncing data, e.g. register a user, can be called by an action

  // ** ** ** ** ** ACTIONS ** ** ** ** **
  const onPressDetails = index => {
    setCurrentJobIndex(index);
    setShowDetailsModal(true);
  };

  const onPressWebsite = async () => {
    const url = fakeData[currentJobIndex].applyUrl;

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

  const onSwipeRight = () => console.log('RIGHT');

  const onSwipeLeft = () => console.log('LEFT');

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
        <NavigationHeader title="Home" back={false} onCard={false} />
        <CardStack
          style={styles.cardStack}
          ref={swiperRef}
          onSwipedLeft={onSwipeLeft}
          onSwipedRight={onSwipeRight}
          renderNoMoreCards={onEmptyStack}>
          {fakeData.map((job, index) => {
            const formattedDate = format(new Date(job.postedAt), 'dd/MM/yyyy');
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
        <IconSwiperCard onPressLeft={onPressLeft} onPressRight={onPressRight} />
        <BasicModal
          visibility={showDetailsModal}
          setVisibility={setShowDetailsModal}
          title={fakeData[currentJobIndex].title}
          commitment={fakeData[currentJobIndex].commitment.title}
          description={fakeData[currentJobIndex].description}
          applyUrl={fakeData[currentJobIndex].applyUrl}
        />
      </ImageBackground>
    </View>
  );
}
