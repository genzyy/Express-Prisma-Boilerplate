import gql from 'graphql-tag';

const typeDefs = gql`
  input QueryUserRequest {
    uuid: String
  }

  type UserResponse {
    uuid: String!
    email: String
    name: String!
    created: DateTime
  }

  type ApiError {
    statusCode: Int!
    message: String!
  }

  type Query {
    queryUserDetails(request: QueryUserRequest): QueryUserResponse
  }
`;

export default typeDefs;
