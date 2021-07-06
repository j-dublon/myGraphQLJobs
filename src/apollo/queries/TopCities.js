/*
 * Jira Ticket:
 * Created Date: Tue, 6th Jul 2021, 14:24:34 pm
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2021 The Distance
 */

import gql from 'graphql-tag';

export default gql`
  query TopCities($input: LocationInput!) {
    country(input: $input) {
      cities {
        name
        jobs {
          id
        }
      }
    }
  }
`;
