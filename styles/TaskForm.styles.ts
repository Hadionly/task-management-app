import { Platform, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  container: {
    // flex: 1,
    padding: 20,
    backgroundColor: "white",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 10,
    paddingHorizontal: 5,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 5,
    marginBottom: 10,
  },
  refreshButton: {
    padding: 8,
  },
  refreshIcon: {
    opacity: 0.8,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
    width: "100%",
  },
  inputContainer: {
    // flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    marginTop: 0,
  },
  aiButton: {
    marginTop: Platform.OS === "ios" ? 10 : 0,
    backgroundColor: "transparent",
    padding: 10,
    width: "100%",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#007AFF",
    justifyContent: "center",
    alignItems: "center",
  },
  descriptionContainer: {
    minHeight: 120, // Adjust based on your needs
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    width: "100%",
  },
  descriptionInput: {
    // flex: 1,
    width: "100%",
    textAlignVertical: "top",
    fontSize: 16,
    // lineHeight: 24,
  },
  buttonContainer: {
    marginTop: 20,
  },
  button: {
    padding: 15,
    borderRadius: 8,
    backgroundColor: "#446B91",
  },
  submitButton: {
    backgroundColor: "#446B91",
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginBottom: 10,
    marginTop: -15,
  },
  // * Header
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginBottom: 10,
    backgroundColor: "#fff", // Match your app's background
    elevation: 2, // Android shadow
    shadowColor: "#000", // iOS shadow
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    zIndex: 1000,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
  },
  // * Random Titles
  // randomTitlesContainer: {
  //   paddingHorizontal: 5,
  //   marginBottom: 20,
  //   height: 80,
  // },
  titlesRows: {
    flexDirection: "column",
  },
  titleRow: {
    flexDirection: "row",
    marginBottom: 5,
  },
  randomTitlesContainer: {
    paddingHorizontal: 5,
    paddingVertical: 10,
  },
  // randomTitle: {
  //   backgroundColor: "#f5f5f5",
  //   paddingVertical: 8,
  //   paddingHorizontal: 12,
  //   alignItems: "center",
  //   justifyContent: "center",
  //   borderRadius: 6,
  //   marginRight: 8,
  //   borderWidth: 1,
  //   borderColor: "#e0e0e0",
  //   shadowColor: "#000",
  //   shadowOffset: {
  //     width: 0,
  //     height: 1,
  //   },
  //   shadowOpacity: 0.1,
  //   shadowRadius: 1,
  //   elevation: 1,
  //   width: 150, // Fixed width for consistent layout
  // },
  // randomTitleText: {
  //   fontSize: 14,
  //   color: "#333",
  // },
  randomTitle: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 12,
    marginRight: 8,
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.15,
    // shadowRadius: 3,
    // elevation: 3,
  },
  randomTitleText: {
    fontSize: 14,
    fontWeight: "600",
  },
  loadingContainer: {
    height: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    color: "#666",
    fontSize: 14,
  },
});
