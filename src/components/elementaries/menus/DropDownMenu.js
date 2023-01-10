import { Button, Menu, Divider, Provider } from "react-native-paper";
import { View } from "react-native";
import { useState } from "react";

const months = [
  { id: 0, month: "Jan" },
  { id: 1, month: "Feb" },
  { id: 2, month: "Mar" },
  { id: 3, month: "Apr" },
  { id: 4, month: "May" },
  { id: 5, month: "Jun" },
  { id: 6, month: "Jul" },
  { id: 7, month: "Aug" },
  { id: 8, month: "Sep" },
  { id: 9, month: "Oct" },
  { id: 10, month: "Nov" },
  { id: 11, month: "Dec" },
];

export const DropDownMenu = (props) => {
  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  const getMenuItem = (item) => {
    //console.log(item);
  };

  return (
    <Provider>
      <View
        style={{
          paddingTop: 50,
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={<Button onPress={openMenu}>Show menu</Button>}
        >
          {months.map((month) => {
            <Menu.Item
              onPress={() => {
                console.log("pressed");
              }}
              title={month}
            />;
          })}
          {/* <Menu.Item
            onPress={() => {
              getMenuItem("Item 1");
            }}
            title="Item 1"
          />
          <Menu.Item onPress={() => {}} title="Item 2" /> */}
        </Menu>
      </View>
    </Provider>
  );
};
