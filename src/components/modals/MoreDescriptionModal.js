import { Modal, View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-paper";

export const MoreDescription = (props) => {
  const onDoneHandler = () => {
    props.modalClose();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={props.modalShow}
      statusBarTranslucent={true}
    >
      <View style={styles.container}>
        <View style={styles.modalView}>
          <Text style={styles.text}>{props.description}</Text>
          <Button
            mode="outlined"
            color="#2196F3"
            onPress={() => onDoneHandler()}
          >
            DONE
          </Button>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  text: {
    fontSize: 14,
    fontWeight: "bold",
    paddingBottom: 40,
    alignSelf: "center",
  },

  modalView: {
    margin: 20,
    backgroundColor: "white",
    width: "75%",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
