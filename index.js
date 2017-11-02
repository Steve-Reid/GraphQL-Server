import express from 'express';
import bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';

import typeDefs from './server/schema';
import resolvers from './server/graphql/resolvers/resolvers';

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

const PORT = 8080;
const app = express();
const graphqlEndpoint = '/graphql';

app.use(graphqlEndpoint, bodyParser.json(), graphqlExpress({ schema }));

app.use('/graphiql', graphiqlExpress({ endpointURL: graphqlEndpoint }));
app.listen(PORT, () => {
  console.log('------------------------------------');
  console.log(`GraphQL server running on port: ${PORT}`);
  console.log('------------------------------------');
});
