import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Button, Portal, Modal, List } from "react-native-paper";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    margin: 20,
  },
});

const sortingOptions = [
  {
    label: "Latest repositories",
    orderBy: "CREATED_AT",
    orderDirection: "DESC",
  },
  {
    label: "Highest rated repositories",
    orderBy: "RATING_AVERAGE",
    orderDirection: "DESC",
  },
  {
    label: "Lowest rated repositories",
    orderBy: "RATING_AVERAGE",
    orderDirection: "ASC",
  },
];

const SortingMenu = ({ selected, onSelect }) => {
  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const handleSelectOption = (option) => {
    if (onSelect) onSelect(option);
    closeMenu();
  };

  const label = (selected && selected.label) || sortingOptions[0].label;

  return (
    <View style={{ padding: 10 }}>
      <Button onPress={openMenu} icon="menu-down">
        {label}
      </Button>

      <Portal>
        <Modal
          visible={visible}
          onDismiss={closeMenu}
          contentContainerStyle={styles.container}
        >
          <List.Section>
            <List.Subheader>Select an item...</List.Subheader>
            {sortingOptions.map((option) => (
              <List.Item
                key={option.label}
                title={option.label}
                onPress={() => handleSelectOption(option)}
              />
            ))}
          </List.Section>
        </Modal>
      </Portal>
    </View>
  );
};

export default SortingMenu;
