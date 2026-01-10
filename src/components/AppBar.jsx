import { StyleSheet, Pressable, View, ScrollView } from "react-native";
import { Link } from "react-router-native";
import Constants from "expo-constants";

import theme from "../theme";
import Text from "./Text";

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

const AppBarTab = ({ name, path }) => {
  return (
    <Pressable style={styles.tabItem} onPress={() => {}}>
      <Link to={path}>
        <Text fontWeight="bold" fontSize="subheading" color="contrastWhite">
          {name}
        </Text>
      </Link>
    </Pressable>
  );
};

const AppBar = () => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab name="Repositories" path="/" />
        <AppBarTab name="Sign in" path="/signIn" />
      </ScrollView>
    </View>
  );
};

export default AppBar;
