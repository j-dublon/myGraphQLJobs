import gql from 'graphql-tag';

export default gql`
  query Countries {
    countries {
      name
      cities {
        name
        jobs {
          id
        }
      }
    }
  }
`;
