import { StyleSheet } from "react-native";
import Constants from "expo-constants";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },

  logo: {
    width: 130,
    height: 25,
  },

  body: {
    flex: 1,
    marginTop: 30,
    alignItems: "center",
    justifyContent: 'center'
  },

  bodyDescription: {
    fontSize: 25,
    textAlign: 'center',
    lineHeight: 40,
    color: '#8A8284',
    marginHorizontal: 20,
  },

  bodyImage: {
    marginVertical: 30,
    height: 300,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: Constants.statusBarHeight + 10,
    marginHorizontal: 20,
  },

  footerContainer: {
    justifyContent: "flex-end",
  },

  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 40,
    paddingVertical: 30,
    backgroundColor: "#4F46BA",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },

  blockIcon: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F9896B",
    height: 50,
    width: 50,
    borderRadius: 10,
  },

  footerPreTitle: {
    color: "#FFF",
    fontSize: 15,
  },

  footerTitle: {
    color: "#FFF",
    fontSize: 28,
  },

});
