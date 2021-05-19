import gql from 'graphql-tag';

export default gql`
  query Jobs {
    jobs {
      title
      commitment {
        title
      }
      cities {
        name
      }
      remotes {
        name
        type
      }
      description
      company {
        name
        websiteUrl
      }
      applyUrl
      postedAt
    }
  }
`;
