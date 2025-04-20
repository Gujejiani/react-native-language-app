import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

// Create an HTTP link to your GraphQL API
const httpLink = createHttpLink({
  uri: 'http://172.20.10.2:3000/graphql', // Replace with your actual GraphQL API endpoint
});

// Create the Apollo Client instance
export const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
    },
  },
}); 