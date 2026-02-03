import { FlatList, View, StyleSheet } from "react-native";
import { useQuery } from "@apollo/client/react";

import Text from "./Text";
import { formatDate } from "../utils/formatDate";
import ItemSeparator from "./ItemSeparator";
import theme from "../theme";
import { ME } from "../graphql/queries";

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
    fontSize: theme.fontSizes.subheading,
  },
});

const ReviewList = () => {
  const { data, loading } = useQuery(ME, {
    variables: { includeReviews: true },
  });

  if (loading) return <Text>Loading...</Text>;

  const reviews = data?.me.reviews.edges.map((edge) => edge.node);

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ItemSeparatorComponent={ItemSeparator}
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
          <Text fontWeight="bold">{review.repository.fullName}</Text>
          <Text color="textSecondary">{formatDate(review.createdAt)}</Text>
          <Text>{review.text}</Text>
        </View>
      </View>
    </View>
  );
};

export default ReviewList;
