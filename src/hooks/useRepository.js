import { useQuery } from "@apollo/client/react";

import { GET_REPOSITORY } from "../graphql/queries";

const useRepository = (id) => {
  const { data, ...result } = useQuery(GET_REPOSITORY, {
    fetchPolicy: "cache-and-network",
    variables: { repositoryId: id },
  });

  return { repository: data ? data.repository : undefined, ...result };
};

export default useRepository;
