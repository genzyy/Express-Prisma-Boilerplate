import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import typeDefs from './typeDefs';
import logger from '../logger';

const startApolloServer = async () => {
  const server = new ApolloServer({ typeDefs });
  const { url } = await startStandaloneServer(server);

  logger.info(`Apollo server running at: ${url}`);
};

export { startApolloServer };
