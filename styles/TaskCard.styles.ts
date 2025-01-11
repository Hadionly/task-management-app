import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  card: {
    marginBottom: 10,
    elevation: 2,
    marginHorizontal: 20,
  },
  cardContent: {
    borderRadius: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    flex: 1,
  },
  description: {
    fontSize: 14,
    color: "#666",
    marginBottom: 15,
  },
  actions: {
    flexDirection: "row",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  statusButton: {
    borderRadius: 20,
  },
  completedButton: {
    backgroundColor: "#e8f5e9",
    borderColor: "#4caf50",
  },
  status: {
    fontSize: 12,
    color: "#f57c00",
    fontWeight: "bold",
  },
  completedText: {
    color: "#4caf50",
  },
});
