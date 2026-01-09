import { View, Image, StyleSheet } from "react-native";

import theme from "../theme";
import Text from "./Text";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 10,
  },
  languageTag: {
    padding: 4,
    borderRadius: 4,
    backgroundColor: theme.colors.primary,
    color: theme.colors.textContrast,
    alignSelf: "flex-start",
  },
  avatar: {
    height: 40,
    width: 40,
    borderRadius: 4,
  },
});

const RepositoryStat = ({ name, number }) => {
  return (
    <View style={{ gap: 3 }}>
      <Text fontWeight="bold">{number}</Text>
      <Text fontColor="textSecondary">{name}</Text>
    </View>
  );
};

const RepositoryItem = ({ item }) => {
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", gap: 15, marginBottom: 15 }}>
        <Image
          style={styles.avatar}
          source={{
            uri: item.ownerAvatarUrl,
          }}
        />

        <View style={{ gap: 3 }}>
          <Text fontWeight="bold">{item.fullName}</Text>
          <Text color="textSecondary">{item.description}</Text>
          <Text style={styles.languageTag}>{item.language}</Text>
        </View>
      </View>

      <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
        <RepositoryStat name="Stars" number={item.stargazersCount} />
        <RepositoryStat name="Forks" number={item.forksCount} />
        <RepositoryStat name="Reviews" number={item.reviewCount} />
        <RepositoryStat name="Rating" number={item.ratingAverage} />
      </View>
    </View>
  );
};

export default RepositoryItem;
