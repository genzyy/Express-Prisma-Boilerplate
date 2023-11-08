import gql from 'graphql-tag';

const typeDefs = gql`
  input UserRequest {
    uuid: String
  }

  type UserResponse {
    uuid: String!
    email: String
    name: String!
    created: DateTime!
  }

  type ApiError {
    statusCode: Int!
    message: String!
  }

  type Query {
    userDetails(request: UserRequest): UserResponse
  }
`;

export default typeDefs;
