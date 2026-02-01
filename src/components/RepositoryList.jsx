import { FlatList, Pressable } from "react-native";
import { useNavigate } from "react-router-native";

import RepositoryItem from "./RepositoryItem";
import ItemSeparator from "./ItemSeparator";
import useRepositories from "../hooks/useRepositories";
import SortingMenu from "./SortingMenu";
import { useState } from "react";

export const RepositoryListContainer = ({
  repositories,
  sortOption,
  setSortOption,
}) => {
  const navigate = useNavigate();

  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  const renderItem = ({ item }) => {
    return (
      <Pressable onPress={() => navigate(`/${item.id}`)}>
        <RepositoryItem item={item} />
      </Pressable>
    );
  };

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={renderItem}
      ListHeaderComponent={() => (
        <SortingMenu selected={sortOption} onSelect={setSortOption} />
      )}
    />
  );
};

const RepositoryList = () => {
  const [sortOption, setSortOption] = useState(null);

  const { repositories } = useRepositories(
    sortOption?.orderBy,
    sortOption?.orderDirection,
  );

  return (
    <RepositoryListContainer
      repositories={repositories}
      sortOption={sortOption}
      setSortOption={setSortOption}
    />
  );
};

export default RepositoryList;
