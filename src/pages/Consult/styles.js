import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  title: {
    marginHorizontal: 20,
    marginTop: 20,
    fontWeight: "bold",
    fontSize: 20,
    color: "#666",
  },
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 5,
    height: 100,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: "#FFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  cardLeftSide: {
    flexDirection: "row",
    alignItems: "center",
  },
  cardRightSide: {
    flexDirection: "column",
    justifyContent: "center",
  },
  doctorAvatar: {
    height: 60,
    width: 60,
    borderRadius: 15,
  },
  textContainer: {
    marginLeft: 10,
  },
  doctorName: {
    fontSize: 18,
    fontWeight: "bold",
    color: '#555'
  },
  doctorDescription: {
    color: "#555",
  },
  iconContainer: {
    marginRight: 20,
    flexDirection: "column",
    alignItems: "center",
  },
  textIcon: {
    color: "#4F46BA",
    fontWeight: "bold",
  },
});
