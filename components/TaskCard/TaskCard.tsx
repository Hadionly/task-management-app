import React from "react";
import { View, Animated, Easing } from "react-native";
import { Card, Text, Button, IconButton } from "react-native-paper";
import { TaskCardProps } from "../../interfaces/TaskCard.types";
import { styles } from "../../styles/TaskCard.styles";

const TaskCard: React.FC<TaskCardProps> = ({
  task,
  onStatusUpdate,
  onEdit,
  onDelete,
}) => {
  const { id, title, description, status } = task;

  // Animation values
  const fadeAnim = new Animated.Value(0);
  const translateY = new Animated.Value(50);

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
        easing: Easing.out(Easing.ease),
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
        easing: Easing.out(Easing.ease),
      }),
    ]).start();
  }, []);

  return (
    <Animated.View
      style={[
        styles.card,
        {
          opacity: fadeAnim,
          transform: [{ translateY }],
        },
      ]}>
      <Card>
        <Card.Content
          style={[
            styles.cardContent,
            { backgroundColor: status === "completed" ? "#e8f5e9" : "#fff" },
          ]}>
          <View style={styles.header}>
            <Text style={styles.title}>{title}</Text>
            <View style={styles.actions}>
              <IconButton
                icon="pencil"
                size={20}
                onPress={() => onEdit(task)}
              />
              <IconButton
                icon="delete"
                size={20}
                onPress={() => onDelete(id)}
              />
            </View>
          </View>

          <Text style={styles.description}>{description}</Text>

          <View style={styles.footer}>
            <Button
              mode="outlined"
              onPress={() =>
                onStatusUpdate(
                  id,
                  status === "pending" ? "completed" : "pending"
                )
              }
              style={[
                styles.statusButton,
                status === "completed" && styles.completedButton,
              ]}
              labelStyle={{
                color: status === "completed" ? "#4caf50" : "#007AFF",
              }}>
              {status === "pending" ? "Mark Complete" : "Mark Pending"}
            </Button>
            <Text
              style={[
                styles.status,
                status === "completed" && styles.completedText,
              ]}>
              {status.toUpperCase()}
            </Text>
          </View>
        </Card.Content>
      </Card>
    </Animated.View>
  );
};

export default TaskCard;
