import { StyleSheet, View } from "react-native";
import { Route, Routes } from "react-router-native";
import { useQuery } from "@apollo/client/react";

import AppBar from "./AppBar";
import RepositoryList from "./RepositoryList";
import SignIn from "./SignIn";
import Text from "./Text";
import theme from "../theme";

import { GET_REPOSITORIES } from "../graphql/queries";

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: theme.colors.mainBackground,
  },
});

const Main = () => {
  const { data, error, loading } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: "cache-and-network",
  });

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>loading repositories</Text>
      </View>
    );
  }

  const repositoryNodes = data
    ? data.repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <View style={styles.container}>
      <AppBar />
      <Routes>
        <Route
          path="/"
          element={<RepositoryList repositories={repositoryNodes} />}
        />
        <Route path="/signIn" element={<SignIn />} />
      </Routes>
    </View>
  );
};

export default Main;
