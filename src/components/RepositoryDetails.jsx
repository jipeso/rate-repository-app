import { FlatList, View, StyleSheet } from "react-native";
import { useParams } from "react-router-native";

import useRepository from "../hooks/useRepository";
import RepositoryItem from "./RepositoryItem";
import ItemSeparator from "./ItemSeparator";
import Text from "./Text";
import theme from "../theme";
import { formatDate } from "../utils/formatDate";

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.contrastWhite,
    padding: 10,
  },
  rating: {
    width: 50,
    height: 50,
    borderColor: theme.colors.primary,
    borderWidth: 3,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  ratingText: {
    color: theme.colors.primary,
    fontWeight: "bold",
    fontSize: 16,
  },
});

const RepositoryDetails = () => {
  const { id } = useParams();
  const { repository, loading } = useRepository(id);

  if (loading) return <Text>Loading...</Text>;

  const reviews = repository.reviews.edges.map((edge) => edge.node);

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ItemSeparatorComponent={ItemSeparator}
      ListHeaderComponent={() => (
        <>
          <RepositoryItem item={repository} displayLink={true} />
          <ItemSeparator />
        </>
      )}
    />
  );
};

const ReviewItem = ({ review }) => {
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", gap: 15 }}>
        <View style={styles.rating}>
          <Text style={styles.ratingText}>{review.rating}</Text>
        </View>
        <View style={{ gap: 5, flex: 1 }}>
          <Text fontWeight="bold">{review.user.username}</Text>
          <Text color="textSecondary">{formatDate(review.createdAt)}</Text>
          <Text>{review.text}</Text>
        </View>
      </View>
    </View>
  );
};

export default RepositoryDetails;
