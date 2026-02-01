import { StyleSheet, View } from "react-native";
import { Route, Routes } from "react-router-native";
import { PaperProvider } from "react-native-paper";

import theme from "../theme";
import AppBar from "./AppBar";
import RepositoryList from "./RepositoryList";
import RepositoryDetails from "./RepositoryDetails";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
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
    <PaperProvider>
      <View style={styles.container}>
        <AppBar />
        <Routes>
          <Route path="/" element={<RepositoryList />} />
          <Route path="/:id" element={<RepositoryDetails />} />
          <Route path="/signIn" element={<SignIn />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/review" element={<ReviewForm />} />
        </Routes>
      </View>
    </PaperProvider>
  );
};

export default Main;
