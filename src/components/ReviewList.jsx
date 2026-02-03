import { FlatList } from "react-native";
import { useQuery } from "@apollo/client/react";

import Text from "./Text";
import ItemSeparator from "./ItemSeparator";
import ReviewItem from "./ReviewItem";
import { ME } from "../graphql/queries";

const ReviewList = () => {
  const { data, loading, refetch } = useQuery(ME, {
    variables: { includeReviews: true },
    fetchPolicy: "cache-and-network",
  });

  if (loading) return <Text>Loading...</Text>;

  const reviews = data?.me.reviews.edges.map((edge) => edge.node);

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} refetch={refetch} />}
      keyExtractor={({ id }) => id}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
};

export default ReviewList;
