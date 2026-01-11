import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

const createApolloClient = () => {
  return new ApolloClient({
    link: new HttpLink({ uri: "http://192.168.1.91:4000/graphql" }),
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;
