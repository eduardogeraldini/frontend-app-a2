import { StyleSheet } from "react-native";
import Constants from "expo-constants";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  userContainer: {
    marginTop: 20,
    flexDirection: "column",
    alignItems: "center",
  },
  userAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 5,
  },
  description: {
    fontSize: 15,
    color: "#333",
  },

  inputContainer: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  inputLabel: {
    fontWeight: "bold",
    color: "#8A8284",
  },
  inputText: {
    color: "#666",
    height: 40,
    borderColor: "#8A8284",
    borderBottomWidth: 1,
  },
  inputTextArea: {
    color: "#666",
    height: 100,
    borderColor: "#8A8284",
    textAlignVertical: 'top',
    paddingTop: 10,
    paddingBottom: 5,
    borderBottomWidth: 1,
  },
  inputContainerSwitch: {
    marginHorizontal: 20,
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
});
