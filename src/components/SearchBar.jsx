import { View } from "react-native";
import { Searchbar } from "react-native-paper";

const SearchBar = ({ value, onChangeText }) => {
  return (
    <View style={{ padding: 10 }}>
      <Searchbar
        mode="view"
        style={{ backgroundColor: "white", borderRadius: 3 }}
        theme={{ padding: 0 }}
        placeholder="Filter repositories"
        onChangeText={onChangeText}
        value={value}
      />
    </View>
  );
};

export default SearchBar;
