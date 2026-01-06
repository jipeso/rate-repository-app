import { FlatList, View, StyleSheet } from "react-native";
import RepositoryItem from "./RepositoryItem";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const renderItem = ({ item }) => {
  return <RepositoryItem item={item} />;
};

const RepositoryList = ({ repositories }) => {
  return (
    <FlatList
      data={repositories}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={renderItem}
    />
  );
};

export default RepositoryList;
