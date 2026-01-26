import { gql } from "@apollo/client";

export const GET_REPOSITORIES = gql`
  query {
    repositories {
      edges {
        node {
          ownerAvatarUrl
          stargazersCount
          ratingAverage
          description
          forksCount
          fullName
          language
          id
          reviewCount
        }
      }
    }
  }
`;

export const ME = gql`
  query {
    me {
      username
      id
    }
  }
`;
