import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TextInput,
  Button,
  TouchableOpacity,
  KeyboardAvoidingView,
  Modal,
  Alert,
  FlatList,
  Platform,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";
import SearchBar from "../components/SearchBar";

type Product = {
  id: string;
  name: string;
  price: string;
};

const products: Product[] = [
  { id: "1", name: "Wireless Headphones", price: "$59.99" },
  { id: "2", name: "Mechanical Keyboard", price: "$89.99" },
  { id: "3", name: "USB-C Hub", price: "$34.99" },
  { id: "4", name: "Webcam HD", price: "$49.99" },
  { id: "5", name: "Mouse Pad XL", price: "$19.99" },
];

export default function HomeScreen() {
  const router = useRouter();
  const [searchText, setSearchText] = useState("");
  const [inputText, setInputText] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  function handleCloseModal() {
    setModalVisible(false);
    Alert.alert("Modal Closed", "You closed the modal.");
  }

  function handleSubmit() {
    Alert.alert("Submitted", `You entered: ${inputText}`);
  }

  function renderProduct({ item }: { item: Product }) {
    return (
      <View style={styles.productCard}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productPrice}>{item.price}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.screen} keyboardShouldPersistTaps="handled">
      <View style={styles.container}>
        <Text style={styles.heading}>Home Screen</Text>

        <Image
          source={{ uri: "https://picsum.photos/seed/shop/600/300" }}
          style={styles.banner}
          resizeMode="cover"
        />

        <SearchBar value={searchText} onChangeText={setSearchText} />

        <TouchableOpacity
          style={styles.ordersButton}
          onPress={() => router.push("/orders")}
        >
          <Text style={styles.ordersButtonText}>Go to Orders Screen</Text>
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>Featured Products</Text>
        <FlatList
          data={products}
          keyExtractor={(item) => item.id}
          renderItem={renderProduct}
          scrollEnabled={false}
        />

        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.formSection}
        >
          <Text style={styles.sectionTitle}>Leave a Note</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Type something here..."
            value={inputText}
            onChangeText={setInputText}
            multiline
          />
          <Button title="Submit Note" onPress={handleSubmit} color="#4a90e2" />
        </KeyboardAvoidingView>

        <TouchableOpacity
          style={styles.modalButton}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.modalButtonText}>Show Modal</Text>
        </TouchableOpacity>

        <Modal
          visible={modalVisible}
          transparent
          animationType="fade"
          onRequestClose={handleCloseModal}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalBox}>
              <Text style={styles.modalText}>This is a modal</Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={handleCloseModal}
              >
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <View style={{ height: 40 }} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#fff",
  },
  heading: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
    marginBottom: 12,
    color: "#222",
  },
  banner: {
    width: "100%",
    height: 180,
  },
  container: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginHorizontal: 16,
    marginTop: 20,
    marginBottom: 8,
    color: "#333",
  },
  productCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#f9f9f9",
    marginHorizontal: 16,
    marginBottom: 8,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#eee",
  },
  productName: {
    fontSize: 15,
    color: "#333",
  },
  productPrice: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#4a90e2",
  },
  ordersButton: {
    backgroundColor: "#4a90e2",
    marginHorizontal: 16,
    marginTop: 16,
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  ordersButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  formSection: {
    marginHorizontal: 16,
    marginTop: 8,
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    fontSize: 15,
    minHeight: 80,
    textAlignVertical: "top",
    marginBottom: 10,
    backgroundColor: "#fafafa",
  },
  modalButton: {
    backgroundColor: "#e74c3c",
    marginHorizontal: 16,
    marginTop: 20,
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  modalButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBox: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 30,
    width: "75%",
    alignItems: "center",
    elevation: 10,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    color: "#333",
  },
  closeButton: {
    backgroundColor: "#4a90e2",
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 6,
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
  },
});
