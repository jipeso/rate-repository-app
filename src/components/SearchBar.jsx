import { View } from "react-native";
import { Searchbar } from "react-native-paper";

import theme from "../theme";

const SearchBar = ({ value, onChangeText }) => {
  return (
    <View style={{ padding: 10 }}>
      <Searchbar
        mode="view"
        style={{ backgroundColor: theme.colors.contrastWhite, borderRadius: 3 }}
        inputStyle={{ fontSize: theme.fontSizes.body, minHeight: 0 }}
        placeholder="Filter repositories"
        onChangeText={onChangeText}
        value={value}
      />
    </View>
  );
};

export default SearchBar;
