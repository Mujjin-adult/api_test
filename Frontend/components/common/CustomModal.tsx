import React from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useFonts } from "expo-font";

interface CustomModalProps {
  visible: boolean;
  title: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel?: () => void;
  type?: "success" | "error" | "info" | "warning";
}

export default function CustomModal({
  visible,
  title,
  message,
  confirmText = "확인",
  cancelText,
  onConfirm,
  onCancel,
  type = "info",
}: CustomModalProps) {
  const [fontsLoaded] = useFonts({
    "Pretendard-Bold": require("../../assets/fonts/Pretendard-Bold.ttf"),
    "Pretendard-Regular": require("../../assets/fonts/Pretendard-Regular.ttf"),
    "Pretendard-SemiBold": require("../../assets/fonts/Pretendard-SemiBold.ttf"),
  });

  if (!fontsLoaded) return null;

  const getTypeColor = () => {
    switch (type) {
      case "success":
        return "#4CAF50";
      case "error":
        return "#FF6B6B";
      case "warning":
        return "#FFA726";
      default:
        return "#3366FF";
    }
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onCancel || onConfirm}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={[styles.title, { color: getTypeColor() }]}>{title}</Text>
          {message && <Text style={styles.message}>{message}</Text>}
          <View style={styles.buttonContainer}>
            {cancelText && onCancel && (
              <TouchableOpacity
                onPress={onCancel}
                style={[styles.button, styles.cancelButton]}
              >
                <Text style={styles.cancelButtonText}>{cancelText}</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              onPress={onConfirm}
              style={[
                styles.button,
                styles.confirmButton,
                { backgroundColor: getTypeColor() },
                cancelText ? { flex: 1 } : { paddingHorizontal: 40 },
              ]}
            >
              <Text style={styles.confirmButtonText}>{confirmText}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 30,
    alignItems: "center",
    marginHorizontal: 40,
    minWidth: 280,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontFamily: "Pretendard-Bold",
    fontSize: 18,
    marginBottom: 12,
    textAlign: "center",
  },
  message: {
    fontFamily: "Pretendard-Regular",
    fontSize: 14,
    color: "#666666",
    marginBottom: 20,
    textAlign: "center",
    lineHeight: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 10,
  },
  button: {
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  confirmButton: {
    backgroundColor: "#3366FF",
  },
  cancelButton: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  confirmButtonText: {
    fontFamily: "Pretendard-SemiBold",
    fontSize: 16,
    color: "#FFFFFF",
  },
  cancelButtonText: {
    fontFamily: "Pretendard-SemiBold",
    fontSize: 16,
    color: "#666666",
  },
});
