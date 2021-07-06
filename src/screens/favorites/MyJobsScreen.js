import React, {useState} from 'react';
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
import useData from '../../hooks/data/useData';

const background = require('../../../assets/images/background.png');

export default function MyJobsScreen() {
  // ** ** ** ** ** HOOKS ** ** ** ** **
  const {colors, textStyles} = useTheme();
  const {getHeight, getWidth, radius} = ScaleHook();
  const {myJobs, setMyJobs} = useData();

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

  const removeJob = () => {
    const remainingJobs = myJobs.filter(
      (job, index) => index !== currentJobIndex,
    );
    setMyJobs(remainingJobs);
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
    emptyContainer: {
      backgroundColor: colors.darkPink100,
      height: '50%',
      width: '80%',
      padding: 23,
      borderRadius: radius(20),
      borderColor: colors.white,
      borderWidth: getWidth(0.5),
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: getHeight(50),
    },
    emptyText: {
      ...textStyles.bold24_white,
      fontSize: 22,
      textAlign: 'center',
    },
  });

  // ** ** ** ** ** RENDER ** ** ** ** **
  const renderCard = (job, index) => {
    return (
      <View style={styles.jobCard}>
        <TouchableOpacity onPress={() => onPressJob(index)}>
          <Text style={styles.title}>{job.title}</Text>
          <Text style={styles.text}>{job.company.name}</Text>
          <Text style={styles.text}>{job.commitment.title}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.screen}>
      <ImageBackground source={background} style={styles.image}>
        <NavigationHeader title="My Jobs" onCard={false} />
        {myJobs.length > 0 ? (
          <>
            <FlatList
              data={myJobs}
              renderItem={({item, index}) => renderCard(item, index)}
              keyExtractor={(item, index) => index}
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
              onPressRemove={removeJob}
            />
          </>
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              You haven't saved any jobs yet! Swipe right on the home screen to
              see them here.
            </Text>
          </View>
        )}
      </ImageBackground>
    </View>
  );
}
