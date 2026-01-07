import { StyleSheet, View } from "react-native";

import RepositoryList from "./RepositoryList";
import AppBar from "./AppBar";
import { repositories } from "../data/repositories";

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <RepositoryList repositories={repositories} />
    </View>
  );
};

export default Main;
