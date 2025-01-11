import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { styles } from "../../styles/ErrorMessage.styles";
import { ErrorMessageProps } from "../../interfaces/ErrorMessage.types";

const ErrorMessage: React.FC<ErrorMessageProps> = ({
  message,
  onRetry,
  visible,
  onDismiss,
}) => {
  const opacity = new Animated.Value(0);
  const scale = new Animated.Value(0.8);

  React.useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.spring(scale, {
          toValue: 1,
          tension: 50,
          friction: 7,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible]);

  return (
    <Modal
      transparent
      visible={visible}
      onRequestClose={onDismiss}
      animationType="fade">
      <TouchableWithoutFeedback onPress={onDismiss}>
        <View style={styles.modalOverlay}>
          <TouchableWithoutFeedback>
            <Animated.View
              style={[
                styles.modalContainer,
                {
                  opacity,
                  transform: [{ scale }],
                },
              ]}>
              <TouchableOpacity style={styles.closeButton} onPress={onDismiss}>
                <FontAwesome5 name="times" size={20} color="#666" />
              </TouchableOpacity>

              <FontAwesome5
                name="exclamation-circle"
                size={50}
                color="#FF4444"
              />
              <Text style={styles.message}>{message}</Text>
              {onRetry && (
                <TouchableOpacity onPress={onRetry} style={styles.retryButton}>
                  <Text style={styles.retryText}>Try Again</Text>
                </TouchableOpacity>
              )}
            </Animated.View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default ErrorMessage;
