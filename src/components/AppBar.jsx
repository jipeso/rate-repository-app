import { StyleSheet, Pressable, View } from "react-native";
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

const AppBarTab = ({ name }) => {
  return (
    <Pressable style={styles.tabItem} onPress={() => {}}>
      <Text style={{ color: "white" }} fontWeight="bold" fontSize="subheading">
        {name}
      </Text>
    </Pressable>
  );
};

const AppBar = () => {
  return (
    <View style={styles.container}>
      <AppBarTab name="Repositories" />
    </View>
  );
};

export default AppBar;
