import { gql } from "@apollo/client";

export const GET_BLOGS = gql`
  query GetBlogs($limit: Int!, $offset: Int!, $filter: BlogFilter) {
    blogs(limit: $limit, offset: $offset, filter: $filter) {
      author {
        name
        profile
      }
      _id
      link
      title
    }
  }
`;

export const GET_ORGANIZATIONS = gql`
  query GetOrganizations {
    organizations {
      _id
      blogCount
      name
    }
  }
`;

export const GET_STAGING_BLOGS = gql`
  query GetStagingBlogs($messageCode: String!, $status: String!) {
    stagingBlogs(messageCode: $messageCode, status: $status) {
      _id
      author {
        name
        profile
      }
      forOrganization
      link
      title
    }
  }
`;
