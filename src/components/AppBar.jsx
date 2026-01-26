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

  const handleSignOut = async () => {
    await signOut();
    navigate("/signIn");
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab name="Repositories" onPress={() => navigate("/")} />
        {data?.me ? (
          <AppBarTab name="Sign out" onPress={handleSignOut} />
        ) : (
          <AppBarTab name="Sign in" onPress={() => navigate("/signIn")} />
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
