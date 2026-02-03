import { View, StyleSheet, Pressable, Alert } from "react-native";
import { useMutation } from "@apollo/client/react";
import { useNavigate } from "react-router-native";

import Text from "./Text";
import theme from "../theme";
import { formatDate } from "../utils/formatDate";
import { DELETE_REVIEW } from "../graphql/mutations";

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.contrastWhite,
    padding: 10,
  },
  rowContainer: {
    flexDirection: "row",
    gap: 10,
    justifyContent: "center",
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
  button: {
    flex: 1,
    padding: 15,
    borderRadius: 3,
    marginTop: 10,
    alignItems: "center",
  },
});

const ReviewItem = ({ review, refetch }) => {
  const navigate = useNavigate();
  const [deleteReview] = useMutation(DELETE_REVIEW);

  const handleDelete = () => {
    Alert.alert(
      "Delete review",
      "Are you sure you want to delete this review?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: async () => {
            await deleteReview({ variables: { deleteReviewId: review.id } });
            refetch();
          },
        },
      ],
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.rowContainer}>
        <View style={styles.rating}>
          <Text style={styles.ratingText}>{review.rating}</Text>
        </View>

        <View style={{ gap: 5, flex: 1, marginBottom: 5 }}>
          <Text fontWeight="bold">{review.repository.fullName}</Text>
          <Text color="textSecondary">{formatDate(review.createdAt)}</Text>
          <Text>{review.text}</Text>
        </View>
      </View>

      <View style={styles.rowContainer}>
        <Pressable
          onPress={() => navigate(`/${review.repositoryId}`)}
          style={{ ...styles.button, backgroundColor: theme.colors.primary }}
        >
          <Text color="contrastWhite" fontWeight="bold">
            View repository
          </Text>
        </Pressable>

        <Pressable
          onPress={handleDelete}
          style={{ ...styles.button, backgroundColor: theme.colors.error }}
        >
          <Text color="contrastWhite" fontWeight="bold">
            Delete review
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default ReviewItem;
