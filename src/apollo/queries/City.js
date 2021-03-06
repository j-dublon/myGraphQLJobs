import gql from 'graphql-tag';

export default gql`
  query City($input: LocationInput!) {
    city(input: $input) {
      name
      jobs {
        id
        remotes {
          name
        }
      }
    }
  }
`;
