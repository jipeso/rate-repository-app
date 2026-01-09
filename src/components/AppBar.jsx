import { StyleSheet, Pressable, View } from "react-native";
import { Link } from "react-router-native";
import Constants from "expo-constants";
import Text from "./Text";

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#24292e",
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
        <Text
          style={{ color: "white" }}
          fontWeight="bold"
          fontSize="subheading"
        >
          {name}
        </Text>
      </Link>
    </Pressable>
  );
};

const AppBar = () => {
  return (
    <View style={styles.container}>
      <AppBarTab name="Repositories" path="/" />
      <AppBarTab name="Sign in" path="/signIn" />
    </View>
  );
};

export default AppBar;
