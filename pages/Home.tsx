// Home.tsx
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { fetchTasks, updateTask, deleteTask } from "../redux/tasksSlice";
import { FontAwesome5 } from "@expo/vector-icons";
import ErrorMessage from "../components/ErrorMessage";
import TaskCard from "../components/TaskCard";
import { styles } from "../styles/Home.styles";
import { HomeProps, RootState, Task } from "../interfaces/Home.types";
import { useAppDispatch } from "../redux/store";

const Home: React.FC<HomeProps> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const [errorVisible, setErrorVisible] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const { tasks, loading, error } = useSelector(
    (state: RootState) => state.tasks
  );

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      setErrorMessage(error);
      setErrorVisible(true);
    }
  }, [error]);

  const handleError = (error: Error): void => {
    setErrorMessage(error.message || "Something went wrong");
    setErrorVisible(true);
  };

  const handleDismissError = (): void => {
    setErrorVisible(false);
  };

  const handleRetry = async (): Promise<void> => {
    try {
      setErrorVisible(false);
      await dispatch(fetchTasks());
    } catch (error) {
      handleError(error as Error);
    }
  };

  const handleUpdateTask = (
    id: string,
    status: "pending" | "completed"
  ): void => {
    dispatch(updateTask({ id, status }));
  };

  const handleEditTask = (task: Task): void => {
    navigation.navigate("TaskForm", {
      isEditing: true,
      selectedTask: task,
    });
  };

  const handleDeleteTask = (id: string): void => {
    dispatch(deleteTask(id));
  };

  const ListHeaderComponent = (): JSX.Element => {
    return (
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Task List</Text>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("TaskForm", {
              isEditing: false,
              selectedTask: null,
            })
          }
          hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}>
          <FontAwesome5
            name="plus"
            size={20}
            color="#007AFF"
            style={{ marginRight: 15 }}
          />
        </TouchableOpacity>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={ListHeaderComponent}
        stickyHeaderIndices={[0]}
        bounces={false}
        renderItem={({ item }) => (
          <TaskCard
            task={item}
            onStatusUpdate={handleUpdateTask}
            onEdit={handleEditTask}
            onDelete={handleDeleteTask}
          />
        )}
        style={styles.list}
        contentContainerStyle={styles.listContent}
      />

      <ErrorMessage
        visible={errorVisible}
        message={errorMessage}
        onDismiss={handleDismissError}
        onRetry={handleRetry}
      />
    </View>
  );
};

export default Home;
