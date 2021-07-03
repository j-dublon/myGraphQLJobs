import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import useTheme from '../../hooks/theme/UseTheme';
import {ScaleHook} from 'react-native-design-to-component';
import NavigationHeader from '../../components/headers/NavigationHeader';
import BasicModal from '../../components/modals/BasicModal';
import AsyncStorage from '@react-native-async-storage/async-storage';

const background = require('../../../assets/images/background.png');

export default function MyJobsScreen() {
  // ** ** ** ** ** HOOKS ** ** ** ** **
  const {colors, textStyles} = useTheme();
  const {getHeight, getWidth, radius} = ScaleHook();

  // ** ** ** ** ** LOCAL ** ** ** ** **
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [currentJobIndex, setCurrentJobIndex] = useState(0);
  const [myJobs, setMyJobs] = useState([]);

  // ** ** ** ** ** EFFECTS ** ** ** ** **
  useEffect(() => {
    const getSavedJobs = async () => {
      const savedJobs = await AsyncStorage.getItem('@SAVED_JOBS');
      const parsedJobs = JSON.parse(savedJobs);
      setMyJobs(parsedJobs);
    };
    getSavedJobs();
  }, []);

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
    <View style={styles.jobCard} key={index}>
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
        {myJobs.length > 0 && (
          <>
            <FlatList
              data={myJobs}
              renderItem={({item, index}) => renderCard(item, index)}
              keyExtractor={item => item.id}
              style={styles.scroll}
              showsVerticalScrollIndicator={false}
            />
            <BasicModal
              visibility={showDetailsModal}
              setVisibility={setShowDetailsModal}
              title={myJobs[currentJobIndex].title}
              commitment={myJobs[currentJobIndex].commitment.title}
              description={myJobs[currentJobIndex].description}
              applyUrl={myJobs[currentJobIndex].applyUrl}
              favorites={true}
            />
          </>
        )}
      </ImageBackground>
    </View>
  );
}
