import { useMutation } from "@apollo/client/react";

import { CREATE_REVIEW } from "../graphql/mutations";

export const useCreateReview = () => {
  const [mutate, result] = useMutation(CREATE_REVIEW);

  const createReview = async ({ ownerName, repositoryName, rating, text }) => {
    const { data } = await mutate({
      variables: {
        review: {
          ownerName,
          repositoryName,
          rating: Number(rating),
          text,
        },
      },
    });
    console.log(data);
    return data;
  };

  return [createReview, result];
};
