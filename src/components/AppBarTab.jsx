import { Pressable, StyleSheet } from "react-native";

import Text from "./Text";

const styles = StyleSheet.create({
  tabItem: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
});

const AppBarTab = ({ name }) => {
  return (
    <Pressable style={styles.tabItem} onPress={() => {}}>
      <Text color="textAppBar" fontWeight="bold" fontSize="subheading">
        {name}
      </Text>
    </Pressable>
  );
};

export default AppBarTab;
