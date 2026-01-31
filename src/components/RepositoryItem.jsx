import { View, Image, StyleSheet, Linking, Pressable } from "react-native";

import theme from "../theme";
import Text from "./Text";
import formatInThousands from "../utils/formatInThousands";

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.contrastWhite,
    padding: 10,
  },
  languageTag: {
    padding: 4,
    borderRadius: 4,
    backgroundColor: theme.colors.primary,
    color: theme.colors.contrastWhite,
    alignSelf: "flex-start",
  },
  avatar: {
    height: 40,
    width: 40,
    borderRadius: 4,
  },
  button: {
    padding: 15,
    borderRadius: 3,
    marginTop: 10,
    alignItems: "center",
    backgroundColor: theme.colors.primary,
  },
});

const RepositoryStat = ({ name, number }) => {
  return (
    <View style={{ gap: 3 }}>
      <Text fontWeight="bold">{formatInThousands(number)}</Text>
      <Text color="textSecondary">{name}</Text>
    </View>
  );
};

const RepositoryItem = ({ item, displayLink = false }) => {
  const handleLinkClick = () => {
    Linking.openURL(item.url);
  };

  return (
    <View testID="repositoryItem" style={styles.container}>
      <View style={{ flexDirection: "row", gap: 15, marginBottom: 15 }}>
        <Image
          style={styles.avatar}
          source={{
            uri: item.ownerAvatarUrl,
          }}
        />

        <View style={{ gap: 3, flex: 1 }}>
          <Text fontWeight="bold">{item.fullName}</Text>
          <Text color="textSecondary">{item.description}</Text>
          <Text color="contrastWhite" style={styles.languageTag}>
            {item.language}
          </Text>
        </View>
      </View>

      <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
        <RepositoryStat name="Stars" number={item.stargazersCount} />
        <RepositoryStat name="Forks" number={item.forksCount} />
        <RepositoryStat name="Reviews" number={item.reviewCount} />
        <RepositoryStat name="Rating" number={item.ratingAverage} />
      </View>

      {displayLink && (
        <Pressable onPress={handleLinkClick} style={styles.button}>
          <Text color="contrastWhite" fontWeight="bold">
            Open in GitHub
          </Text>
        </Pressable>
      )}
    </View>
  );
};

export default RepositoryItem;
