import React, {useState, useEffect} from 'react';
import {useLazyQuery} from '@apollo/client';
import Countries from '../../apollo/queries/Countries';
import Country from '../../apollo/queries/Country';
import City from '../../apollo/queries/City';
import DataContext from './DataContext';
import {Auth} from 'aws-amplify';

export default function DataProvider(props) {
  // get country and city data
  const [countryData, setCountryData] = useState([]);
  const [countryList, setCountryList] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState();
  const [selectedCity, setSelectedCity] = useState();
  const [myJobs, setMyJobs] = useState([]);
  const [countrySlug, setCountrySlug] = useState();
  const [citySlug, setCitySlug] = useState();
  const [allJobs, setAllJobs] = useState([]);
  const [totalJobsInCity, setTotalJobsInCity] = useState();
  const [remoteJobsInCity, setRemoteJobsInCity] = useState();

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

  // get country and city slugs
  useEffect(() => {
    const getCountryAndCity = async () => {
      const {attributes} = await Auth.currentAuthenticatedUser();
      const country = attributes['custom:country'];
      if (country) {
        const formattedCountry = country
          .toLowerCase()
          .split(' ')
          .join('-');
        setCountrySlug(formattedCountry);
      }
      const city = attributes['custom:city'];
      if (city) {
        const formattedCity = city
          .toLowerCase()
          .split(' ')
          .join('-');
        setCitySlug(formattedCity);
      }
    };
    getCountryAndCity();
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

  // get remote vs on site jobs by city
  const [getRemotesByCity] = useLazyQuery(City, {
    variables: {
      input: {
        slug: citySlug,
      },
    },
    fetchPolicy: 'no-cache',
    onCompleted: async res => {
      console.log(res.city.jobs, '<---get remotes by city res');
      if (res.city.jobs) {
        // const totalJobs = res.city.jobs.length;
        let totalRemotes = 0;
        res.city.jobs.forEach(job => {
          if (job.remotes.length > 0) totalRemotes++;
        });
        setRemoteJobsInCity(totalRemotes);
        setTotalJobsInCity(res.city.jobs.length);
      }
    },
    onError: error => console.log(error, '<--- getJobs query error'),
  });

  useEffect(() => {
    if (citySlug) {
      getRemotesByCity();
    }
  }, [citySlug]);

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
      setCountrySlug,
      getRemotesByCity,
      totalJobsInCity,
      remoteJobsInCity,
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
      setCountrySlug,
      getRemotesByCity,
      totalJobsInCity,
      remoteJobsInCity,
    ],
  );

  // ** ** ** ** ** Return ** ** ** ** **
  return (
    <DataContext.Provider value={values}>{props.children}</DataContext.Provider>
  );
}
