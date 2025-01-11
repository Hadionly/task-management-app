import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { TextInput } from "react-native-gesture-handler";
import { addTask, updateTask } from "../redux/tasksSlice";
import { useSelector } from "react-redux";
import { FormValues, TaskFormProps } from "../interfaces/TaskForm.types";
import { styles } from "../styles/TaskForm.styles";
import { RootState } from "../interfaces/Home.types";
import { useAppDispatch } from "../redux/store";
import { FontAwesome5 } from "@expo/vector-icons";
import { generateResponse } from "../apis/openAI";

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  description: Yup.string()
    .required("Description is required")
    .min(10, "Description must be at least 10 characters long"),
});

const COLORS = [
  "#FF99A3", // Darker pink
  "#70D970", // Darker pale green
  "#4FB3F7", // Darker sky blue
  "#CF82CF", // Darker plum
  "#DBD25D", // Darker khaki
  "#FF8C61", // Darker salmon
  "#1A9999", // Darker sea green
  "#FF8C9E", // Darker light pink
  "#5CAEE3", // Darker sky blue
  "#E6C200", // Darker gold
];

const TaskForm: React.FC<TaskFormProps> = ({ navigation, route }) => {
  const [isLoadingDescription, setIsLoadingDescription] =
    React.useState<boolean>(false);
  const [randomTitles, setRandomTitles] = React.useState<string[]>([]);
  const [isLoadingTitles, setIsLoadingTitles] = React.useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { isEditing, selectedTask } = route.params;
  const loading = useSelector((state: RootState) => state.tasks.loading);
  const initialValues = isEditing ? selectedTask : null;

  React.useEffect(() => {
    if (!isEditing) {
      setIsLoadingTitles(true);
      generateRandomTitles()
        .then(setRandomTitles)
        .finally(() => setIsLoadingTitles(false));
    }
  }, []);

  const onSubmit = (values: FormValues) => {
    if (isEditing && selectedTask) {
      dispatch(updateTask({ id: selectedTask.id, ...values }));
    } else {
      dispatch(addTask(values));
    }
    navigation.goBack();
  };

  // * Header with back button
  const Header = (): JSX.Element => (
    <View style={styles.headerContainer}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}>
        <FontAwesome5 name="arrow-left" size={24} color="#000" />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>
        {isEditing ? "Update Task" : "Create A New Task"}
      </Text>
      <View style={{ width: 40 }} />
    </View>
  );

  //* generateTaskDescription function
  const generateTaskDescription = async (
    title: string,
    setFieldValue: (field: string, value: any) => void
  ) => {
    try {
      if (!title.trim()) {
        // Add trim() to check for empty strings
        Alert.alert(
          "Missing Title", // Title
          "Title is required to generate description", // Message
          [{ text: "OK" }] // Buttons
        );
        return;
      }
      setIsLoadingDescription(true);
      const response = await generateResponse(
        "Generate a concise description in first person for a task with the title: " +
          title +
          "\n Return only the description text, without bullet points or lists"
      );
      if (response.text && !response.error) {
        setFieldValue("description", response.text);
      }
    } catch (error) {
      console.error("AI suggestion failed:", error);
    } finally {
      setIsLoadingDescription(false);
    }
  };

  // Generate random task titles function
  const generateRandomTitles = async (): Promise<string[]> => {
    try {
      const prompt = `Generate 10 interesting and creative task titles. 
      Make them diverse, specific, actionable, and no more than 3 words.
      Return only the raw titles, one per line, without numbers, dashes, bullet points or lists`;

      const response = await generateResponse(prompt);

      if (response.text && !response.error) {
        // Split response into array and clean up
        const titles = response.text
          .split("\n")
          .map((title) => title.trim())
          .filter((title) => title.length > 0)
          .slice(0, 10); // Ensure we only get 10 items

        return titles;
      }

      return [];
    } catch (error) {
      console.error("Failed to generate task titles:", error);
      return [];
    }
  };

  // Helper function to split array into chunks
  const chunkArray = (array: string[], size: number): string[][] => {
    const chunks = [];
    for (let i = 0; i < array.length; i += size) {
      chunks.push(array.slice(i, i + size));
    }
    return chunks;
  };

  // helper function to get index-based color
  const getColorForIndex = (index: number): string => {
    return COLORS[index % COLORS.length];
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}>
      <ScrollView
        style={styles.mainContainer}
        stickyHeaderIndices={[0]}
        bounces={false}>
        <Header />
        <Formik
          initialValues={
            initialValues || { title: "", description: "", status: "pending" }
          }
          validationSchema={validationSchema}
          onSubmit={onSubmit}
          enableReinitialize>
          {({
            handleChange,
            handleSubmit,
            setFieldValue,
            values,
            errors,
            touched,
          }) => (
            <View style={styles.container}>
              <Text style={styles.sectionTitle}>Task Title</Text>
              <TextInput
                placeholder="Write a task title"
                value={values.title}
                onChangeText={handleChange("title")}
                style={styles.input}
              />
              {touched.title && errors.title && (
                <Text style={styles.errorText}>{errors.title}</Text>
              )}
              {!isEditing && (
                <View style={styles.sectionHeader}>
                  <Text style={styles.sectionTitle}>Suggested Tasks</Text>
                  <TouchableOpacity
                    style={styles.refreshButton}
                    onPress={async () => {
                      setIsLoadingTitles(true);
                      const titles = await generateRandomTitles();
                      setRandomTitles(titles);
                      setIsLoadingTitles(false);
                    }}
                    disabled={isLoadingTitles}>
                    <FontAwesome5
                      name="sync-alt"
                      size={16}
                      color="#007AFF"
                      style={[
                        styles.refreshIcon,
                        isLoadingTitles && {
                          transform: [{ rotate: "180deg" }],
                        },
                      ]}
                    />
                  </TouchableOpacity>
                </View>
              )}
              {isLoadingTitles ? (
                <View style={styles.loadingContainer}>
                  <ActivityIndicator size="large" color="#007AFF" />
                  <Text style={styles.loadingText}>Generating titles...</Text>
                </View>
              ) : (
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.randomTitlesContainer}>
                  <View style={styles.titlesRows}>
                    {chunkArray(randomTitles, randomTitles.length / 2).map(
                      (row, rowIndex) => (
                        <View key={rowIndex} style={styles.titleRow}>
                          {row.map((title, titleIndex) => {
                            const colorIndex =
                              rowIndex * (randomTitles.length / 2) + titleIndex;
                            return (
                              <TouchableOpacity
                                key={title}
                                style={[
                                  styles.randomTitle,
                                  rowIndex === 1 && { marginTop: 10 },
                                  {
                                    backgroundColor:
                                      getColorForIndex(colorIndex) + "33", // Add opacity
                                    // borderColor: "transparent",
                                    borderWidth: 0.5,
                                    borderColor: getColorForIndex(colorIndex),
                                  },
                                ]}
                                onPress={() => {
                                  setFieldValue("title", title);
                                  generateTaskDescription(title, setFieldValue);
                                }}>
                                <Text
                                  style={[
                                    styles.randomTitleText,
                                    { color: getColorForIndex(colorIndex) }, // Dark text for readability
                                  ]}>
                                  {title}
                                </Text>
                              </TouchableOpacity>
                            );
                          })}
                        </View>
                      )
                    )}
                  </View>
                </ScrollView>
              )}
              <Text style={styles.sectionTitle}>Task Description</Text>

              <View style={styles.descriptionContainer}>
                {/* Typing effect */}
                <TextInput
                  style={styles.descriptionInput}
                  placeholder="Description"
                  onChangeText={(text) => {
                    handleChange("description")(text);
                  }}
                  value={values.description}
                  multiline
                />

                <TouchableOpacity
                  style={styles.aiButton}
                  onPress={() =>
                    generateTaskDescription(values.title, setFieldValue)
                  }
                  disabled={isLoadingDescription}>
                  {isLoadingDescription ? (
                    <ActivityIndicator size="small" color="#007AFF" />
                  ) : (
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}>
                      <Text style={{ color: "#007AFF", marginRight: 10 }}>
                        AI Description Writer
                      </Text>
                      <FontAwesome5 name="robot" size={20} color="#007AFF" />
                    </View>
                  )}
                </TouchableOpacity>
              </View>
              {touched.description && errors.description && (
                <Text style={styles.errorText}>{errors.description}</Text>
              )}
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={[styles.button, styles.submitButton]}
                  onPress={() => handleSubmit()}
                  disabled={loading}>
                  {loading ? (
                    <ActivityIndicator color="white" />
                  ) : (
                    <Text style={styles.buttonText}>
                      {isEditing ? "Update Task" : "Add Task"}
                    </Text>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          )}
        </Formik>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default TaskForm;
