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

const PRODUCTS = [
  { id: "1", name: "Wireless Headphones", price: "$59.99" },
  { id: "2", name: "Mechanical Keyboard", price: "$89.99" },
  { id: "3", name: "USB-C Hub", price: "$34.99" },
];

export default function Home() {
  const router = useRouter();
  const [searchText, setSearchText] = useState("");
  const [note, setNote] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  function submitNote() {
    Alert.alert("Submitted", note || "No text entered");
  }

  return (
    <ScrollView contentContainerStyle={styles.screen} keyboardShouldPersistTaps="handled">
      <Text style={styles.heading}>Home Screen</Text>

      <Image source={{ uri: "https://picsum.photos/seed/shop/600/300" }} style={styles.banner} />

      <SearchBar value={searchText} onChangeText={setSearchText} />

      <TouchableOpacity style={styles.primaryButton} onPress={() => router.push("/orders")}>
        <Text style={styles.primaryButtonText}>Go to Orders</Text>
      </TouchableOpacity>

      <Text style={styles.sectionTitle}>Products</Text>
      <FlatList
        data={PRODUCTS}
        keyExtractor={(i) => i.id}
        renderItem={({ item }) => (
          <View style={styles.product}>
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.productPrice}>{item.price}</Text>
          </View>
        )}
        scrollEnabled={false}
      />

      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.form}>
        <TextInput
          style={styles.textInput}
          placeholder="Leave a note..."
          value={note}
          onChangeText={setNote}
          multiline
        />
        <Button title="Submit" onPress={submitNote} />
      </KeyboardAvoidingView>

      <TouchableOpacity style={styles.warnButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.warnButtonText}>Show Modal</Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} transparent animationType="fade" onRequestClose={() => { setModalVisible(false); Alert.alert("Modal Closed"); }}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text>This is a modal</Text>
            <Button title="Close" onPress={() => { setModalVisible(false); Alert.alert("Modal Closed"); }} />
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { padding: 16, backgroundColor: "#fff" },
  heading: { fontSize: 24, fontWeight: "700", marginBottom: 12 },
  banner: { width: "100%", height: 160, borderRadius: 8, marginBottom: 12 },
  sectionTitle: { fontSize: 18, marginTop: 18, marginBottom: 8 },
  product: { flexDirection: "row", justifyContent: "space-between", padding: 12, backgroundColor: "#f7f7f7", borderRadius: 8, marginBottom: 8 },
  productName: { fontSize: 15 },
  productPrice: { fontWeight: "700", color: "#2563eb" },
  primaryButton: { backgroundColor: "#2563eb", padding: 12, borderRadius: 8, alignItems: "center", marginTop: 12 },
  primaryButtonText: { color: "#fff", fontWeight: "700" },
  warnButton: { backgroundColor: "#ef4444", padding: 12, borderRadius: 8, alignItems: "center", marginTop: 12 },
  warnButtonText: { color: "#fff", fontWeight: "700" },
  form: { marginTop: 16 },
  textInput: { borderWidth: 1, borderColor: "#ddd", borderRadius: 8, padding: 10, marginBottom: 8, backgroundColor: "#fff" },
  modalOverlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "center", alignItems: "center" },
  modalBox: { backgroundColor: "#fff", padding: 20, borderRadius: 8, width: "80%" },
});
