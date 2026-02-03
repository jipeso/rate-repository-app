import React, { useState } from "react";
import { FlatList, Pressable } from "react-native";
import { useNavigate } from "react-router-native";
import { useDebounce } from "use-debounce";

import useRepositories from "../hooks/useRepositories";
import RepositoryItem from "./RepositoryItem";
import ItemSeparator from "./ItemSeparator";
import SortingMenu from "./SortingMenu";
import SearchBar from "./SearchBar";

const RepositoryListHeader = ({
  searchKeyword,
  setSearchKeyword,
  sortOption,
  setSortOption,
}) => {
  return (
    <>
      <SearchBar value={searchKeyword} onChangeText={setSearchKeyword} />
      <SortingMenu selected={sortOption} onSelect={setSortOption} />
    </>
  );
};

export class RepositoryListContainer extends React.Component {
  renderHeader = () => {
    const { searchKeyword, setSearchKeyword, sortOption, setSortOption } =
      this.props;
    return (
      <RepositoryListHeader
        searchKeyword={searchKeyword}
        setSearchKeyword={setSearchKeyword}
        sortOption={sortOption}
        setSortOption={setSortOption}
      />
    );
  };

  render() {
    const { repositories, navigate } = this.props;

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
        ListHeaderComponent={this.renderHeader}
        keyExtractor={(item) => item.id}
      />
    );
  }
}

const RepositoryList = () => {
  const [sortOption, setSortOption] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [debouncedSearchKeyword] = useDebounce(searchKeyword, 500);

  const navigate = useNavigate();

  const { repositories } = useRepositories(
    sortOption?.orderBy,
    sortOption?.orderDirection,
    debouncedSearchKeyword,
  );

  return (
    <RepositoryListContainer
      repositories={repositories}
      sortOption={sortOption}
      setSortOption={setSortOption}
      searchKeyword={searchKeyword}
      setSearchKeyword={setSearchKeyword}
      navigate={navigate}
    />
  );
};

export default RepositoryList;
