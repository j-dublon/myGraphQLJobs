import React, {useState, useEffect} from 'react';
import {useLazyQuery} from '@apollo/client';
import Countries from '../../apollo/queries/Countries';
import TopCities from '../../apollo/queries/TopCities';
import Country from '../../apollo/queries/Country';
import City from '../../apollo/queries/City';
import DataContext from './DataContext';
import {Auth} from 'aws-amplify';

export default function DataProvider(props) {
  // store values generated elsewhere in the app
  const [selectedCountry, setSelectedCountry] = useState();
  const [selectedCity, setSelectedCity] = useState();
  const [myJobs, setMyJobs] = useState([]);

  // get all countries for country list
  const [countryData, setCountryData] = useState([]);
  const [countryList, setCountryList] = useState([]);

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

  // get cities in selected country for cities list
  const [cityList, setCityList] = useState([]);

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

  // get country and city slugs when app first loads
  const [countrySlug, setCountrySlug] = useState();
  const [citySlug, setCitySlug] = useState();

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

  // get all jobs in selected country when app first loads
  const [allJobs, setAllJobs] = useState([]);

  const [getJobs] = useLazyQuery(Country, {
    fetchPolicy: 'no-cache',
    onCompleted: async res => {
      // console.log(res, '<---getJobs query res');
      if (res.country.jobs) {
        setAllJobs(res.country.jobs);
      }
    },
    onError: error => console.log(error, '<--- getJobs query error'),
  });

  // get all jobs in selected country
  useEffect(() => {
    if (countrySlug) {
      getJobs({
        variables: {
          input: {
            slug: countrySlug,
          },
        },
      });
      // getTopCitiesByCountry();
    }
  }, [countrySlug]);

  // get remote vs on site jobs by city for pie chart
  const [remoteJobsInCity, setRemoteJobsInCity] = useState();
  const [totalJobsInCity, setTotalJobsInCity] = useState();
  const [percentageRemote, setPercentageRemote] = useState();
  const [percentageOnSite, setPercentageOnSite] = useState();

  const [getRemotesByCity] = useLazyQuery(City, {
    fetchPolicy: 'no-cache',
    onCompleted: async res => {
      // console.log(res.city.jobs, '<---get remotes by city res');
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

  // calculate percentages when remotes by city are fetched
  useEffect(() => {
    if ((remoteJobsInCity, totalJobsInCity)) {
      const remotes = (remoteJobsInCity / totalJobsInCity) * 100;
      setPercentageRemote(remotes);

      const onSites = 100 - remotes;
      setPercentageOnSite(onSites);
    }
  }, [remoteJobsInCity, totalJobsInCity]);

  // get remote job data for user's city when app first loads and when location changed
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

  // get top 3 cities for jobs by country for graph
  const [topCities, setTopCities] = useState([]);

  const [getTopCitiesByCountry] = useLazyQuery(TopCities, {
    fetchPolicy: 'no-cache',
    onCompleted: res => {
      // console.log(res, '<---get top cities by country query res');
      if (res.country) {
        const cities = res.country.cities;
        const numberOfJobsPerCity = cities
          .map(city => {
            return {
              name: city.name,
              jobs: city.jobs.length,
            };
          })
          .sort((a, b) => b.jobs - a.jobs);

        const bestCities =
          numberOfJobsPerCity.length > 3
            ? numberOfJobsPerCity.slice(0, 4)
            : numberOfJobsPerCity;

        console.log(bestCities);
        setTopCities(bestCities);
      }
    },
    onError: error =>
      console.log(error, '<---get top cities by country query error'),
  });

  useEffect(() => {
    getTopCitiesByCountry({
      variables: {
        input: {
          slug: countrySlug,
        },
      },
    });
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
      setCountrySlug,
      setCitySlug,
      percentageRemote,
      percentageOnSite,
      topCities,
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
      setCountrySlug,
      setCitySlug,
      percentageRemote,
      percentageOnSite,
      topCities,
    ],
  );

  // ** ** ** ** ** Return ** ** ** ** **
  return (
    <DataContext.Provider value={values}>{props.children}</DataContext.Provider>
  );
}
