import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useLazyQuery} from '@apollo/client';
import Countries from '../../apollo/queries/Countries';
import Country from '../../apollo/queries/Country';
import DataContext from './DataContext';

export default function DataProvider(props) {
  // get country and city data
  const [countryData, setCountryData] = useState([]);
  const [countryList, setCountryList] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('Germany');
  const [selectedCity, setSelectedCity] = useState();
  const [myJobs, setMyJobs] = useState([]);
  const [countrySlug, setCountrySlug] = useState();
  const [allJobs, setAllJobs] = useState([]);

  // get all countries
  const [getCountries] = useLazyQuery(Countries, {
    fetchPolicy: 'no-cache',
    onCompleted: res => {
      // console.log(res, '<---countries query res');
      setCountryData(res.countries);
      if (res.countries.length > 0) {
        let list = [''];
        res.countries.forEach(country => list.push(country.name));
        setCountryList(list);
      }
    },
    onError: error => console.log(error, '<---countries query error'),
  });

  // get cities in selected country
  useEffect(() => {
    if (countryData.length > 0 && selectedCountry) {
      let list = [''];
      countryData.map(country => {
        if (country.name === selectedCountry) {
          country.cities.forEach(city => list.push(city.name));
        }
      });
      setCityList(list);
    }
  }, [countryData, selectedCountry]);

  // get country slug
  useEffect(() => {
    const getCountry = async () => {
      const result = await AsyncStorage.getItem('@COUNTRY');
      if (result) {
        const formatted = result
          .toLowerCase()
          .split(' ')
          .join('-');
        setCountrySlug(formatted);
      }
    };
    getCountry();
  }, []);

  // get all jobs in selected country
  const [getJobs] = useLazyQuery(Country, {
    variables: {
      input: {
        slug: countrySlug,
      },
    },
    fetchPolicy: 'no-cache',
    onCompleted: async res => {
      if (res.country.jobs) {
        setAllJobs(res.country.jobs);
      }
    },
    onError: error => console.log(error, '<--- getJobs query error'),
  });

  useEffect(() => {
    if (countrySlug) {
      getJobs();
    }
  }, [countrySlug]);

  // ** ** ** ** ** Memoize ** ** ** ** **
  const values = React.useMemo(
    () => ({
      getCountries,
      countryList,
      cityList,
      selectedCountry,
      setSelectedCountry,
      selectedCity,
      setSelectedCity,
      myJobs,
      setMyJobs,
      getJobs,
      allJobs,
      setAllJobs,
    }),
    [
      getCountries,
      countryList,
      cityList,
      selectedCountry,
      setSelectedCountry,
      selectedCity,
      setSelectedCity,
      myJobs,
      setMyJobs,
      getJobs,
      allJobs,
      setAllJobs,
    ],
  );

  // ** ** ** ** ** Return ** ** ** ** **
  return (
    <DataContext.Provider value={values}>{props.children}</DataContext.Provider>
  );
}
