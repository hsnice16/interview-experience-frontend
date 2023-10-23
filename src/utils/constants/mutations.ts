import { gql } from "@apollo/client";

export const CREATE_BLOG = gql`
  mutation CreateBlog(
    $messageCode: String!
    $title: String!
    $link: String!
    $forOrganization: String!
    $author: NewAuthor!
  ) {
    createBlog(
      messageCode: $messageCode
      title: $title
      link: $link
      forOrganization: $forOrganization
      author: $author
    ) {
      _id
      status
    }
  }
`;

export const UPDATE_BLOG_STATUS = gql`
  mutation UpdateBlogStatus($messageCode: String!, $id: ID!, $status: String!) {
    updateBlogStatus(messageCode: $messageCode, _id: $id, status: $status) {
      _id
    }
  }
`;
