/*
 * Jira Ticket:
 * Created Date: Mon, 3rd May 2021, 20:47:20 pm
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2021 The Distance
 */

import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import useTheme from '../../hooks/theme/UseTheme';
import {ScaleHook} from 'react-native-design-to-component';
import NavigationHeader from '../../components/headers/NavigationHeader';
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

export default function MyJobsScreen() {
  // ** ** ** ** ** HOOKS ** ** ** ** **
  const {colors, textStyles} = useTheme();
  const {getHeight, getWidth, fontSize, radius} = ScaleHook();
  const navigation = useNavigation();

  // ** ** ** ** ** LOCAL ** ** ** ** **
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [currentJobIndex, setCurrentJobIndex] = useState(0);

  // ** ** ** ** ** EFFECTS ** ** ** ** **
  // ** ** ** ** ** LOGIC ** ** ** ** **
  // e.g. syncing data, e.g. register a user, can be called by an action

  // ** ** ** ** ** ACTIONS ** ** ** ** **
  const onPressJob = index => {
    setCurrentJobIndex(index);
    setShowDetailsModal(true);
  };

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
    scroll: {
      width: '100%',
    },
    jobCard: {
      backgroundColor: colors.darkPink,
      width: '92%',
      alignSelf: 'center',
      marginVertical: getHeight(10),
      borderRadius: radius(8),
      borderColor: colors.white,
      borderWidth: getWidth(0.5),
      padding: getHeight(10),
    },
    title: {
      ...textStyles.bold16_white,
    },
    text: {
      ...textStyles.regular16_white,
    },
  });

  // ** ** ** ** ** RENDER ** ** ** ** **
  const renderCard = (job, index) => (
    <View style={styles.jobCard}>
      <TouchableOpacity onPress={() => onPressJob(index)}>
        <Text style={styles.title}>{job.title}</Text>
        <Text style={styles.text}>{job.company.name}</Text>
        <Text style={styles.text}>{job.commitment.title}</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.screen}>
      <ImageBackground source={background} style={styles.image}>
        <NavigationHeader title="My Jobs" onCard={false} />
        <FlatList
          data={fakeData}
          renderItem={({item, index}) => renderCard(item, index)}
          keyExtractor={item => item.id}
          style={styles.scroll}
          // onEndReached={reachedEnd}
          showsVerticalScrollIndicator={false}
        />
        <BasicModal
          visibility={showDetailsModal}
          setVisibility={setShowDetailsModal}
          title={fakeData[currentJobIndex].title}
          commitment={fakeData[currentJobIndex].commitment.title}
          description={fakeData[currentJobIndex].description}
          applyUrl={fakeData[currentJobIndex].applyUrl}
          favorites={true}
        />
      </ImageBackground>
    </View>
  );
}
