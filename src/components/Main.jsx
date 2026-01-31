import { StyleSheet, View } from "react-native";
import { Route, Routes } from "react-router-native";

import theme from "../theme";
import AppBar from "./AppBar";
import RepositoryList from "./RepositoryList";
import RepositoryDetails from "./RepositoryDetails";
import SignIn from "./SignIn";
import ReviewForm from "./ReviewForm";

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: theme.colors.mainBackground,
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Routes>
        <Route path="/" element={<RepositoryList />} />
        <Route path="/:id" element={<RepositoryDetails />} />
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/review" element={<ReviewForm />} />
      </Routes>
    </View>
  );
};

export default Main;
