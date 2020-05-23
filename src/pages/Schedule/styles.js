import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  title: {
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 10,
    fontWeight: "bold",
    fontSize: 18,
    color: "#666",
  },
  nextSchedule: {
    height: 180,
    marginHorizontal: 20,
    borderRadius: 10,
    backgroundColor: "#FFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  headerNextSchedule: {
    height: 60,
    backgroundColor: "#4F46BA",
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  headerTitleNextSchedule: {
    color: "#FFF",
  },
  headerDateNextSchedule: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  bodyNextSchedule: {
    flex: 1,
    flexDirection: "row",
    justifyContent: 'space-between',
    alignItems: "center",
    paddingHorizontal: 10,
  },
  avatarBodyNextSchedule: {
    height: 60,
    width: 60,
    borderRadius: 15,
  },
  doctorNameBodyNextSchedule: {
    color: "#555",
    fontWeight: "bold",
    fontSize: 18,
    marginLeft: 10,
  },
  doctorDescriptionBodyNextSchedule: {
    color: "#F9896B",
    marginLeft: 10,
  },
  footerTextNextSchedule: {
    marginBottom: 10,
    color: '#F9896B',
  },
  footerNextSchedule: {
    marginHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  }
});
