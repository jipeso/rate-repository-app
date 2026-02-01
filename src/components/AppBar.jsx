import { StyleSheet, Pressable, View, ScrollView } from "react-native";
import { useNavigate } from "react-router-native";
import { useQuery } from "@apollo/client/react";
import Constants from "expo-constants";

import theme from "../theme";
import Text from "./Text";
import { ME } from "../graphql/queries";
import useSignOut from "../hooks/useSignOut";

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.textPrimary,
    flexDirection: "row",
    paddingBottom: 5,
  },
  tabItem: {
    padding: 10,
  },
});

const AppBarTab = ({ name, onPress }) => (
  <Pressable style={styles.tabItem} onPress={onPress}>
    <Text fontWeight="bold" fontSize="subheading" color="contrastWhite">
      {name}
    </Text>
  </Pressable>
);

const AppBar = () => {
  const { data } = useQuery(ME);
  const signOut = useSignOut();
  const navigate = useNavigate();
  const currentUser = data?.me;

  const handleSignOut = async () => {
    await signOut();
    navigate("/signIn");
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab name="Repositories" onPress={() => navigate("/")} />
        {currentUser ? (
          <View style={{ flexDirection: "row" }}>
            <AppBarTab
              name="Create a review"
              onPress={() => navigate("/review")}
            />
            <AppBarTab name="Sign out" onPress={handleSignOut} />
          </View>
        ) : (
          <View style={{ flexDirection: "row" }}>
            <AppBarTab name="Sign in" onPress={() => navigate("/signIn")} />
            <AppBarTab name="Sign up" onPress={() => navigate("/signUp")} />
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
