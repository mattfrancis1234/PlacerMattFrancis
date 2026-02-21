import React, { useState } from "react";
import { View, Text, SectionList, TouchableOpacity, Alert, StyleSheet } from "react-native";
import SearchBar from "../components/SearchBar";

type Order = { id: string; item: string };

const SECTIONS = [
  { title: "Processing", data: [{ id: "p1", item: "Wireless Headphones" }, { id: "p2", item: "USB-C Hub" }] },
  { title: "Shipped", data: [{ id: "s1", item: "Mechanical Keyboard" }, { id: "s2", item: "Webcam HD" }] },
  { title: "Delivered", data: [{ id: "d1", item: "Mouse Pad XL" }, { id: "d2", item: "Phone Stand" }] },
];

export default function Orders() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <View style={styles.screen}>
      <Text style={styles.heading}>Orders</Text>
      <SearchBar value={""} onChangeText={() => {}} />
      <SectionList
        sections={SECTIONS}
        keyExtractor={(item) => item.id}
        renderSectionHeader={({ section: { title } }) => (
          <View style={styles.header}><Text style={styles.headerText}>{title}</Text></View>
        )}
        renderItem={({ item }: { item: Order }) => (
          <TouchableOpacity style={[styles.item, selected === item.id && styles.itemSelected]} onPress={() => { setSelected(item.id); Alert.alert("Order Selected", item.item); }}>
            <Text style={styles.itemText}>{item.item}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, padding: 16, backgroundColor: "#fff" },
  heading: { fontSize: 24, fontWeight: "700", marginBottom: 12 },
  header: { backgroundColor: "#0ea5e9", padding: 8, borderRadius: 6, marginVertical: 6 },
  headerText: { color: "#fff", fontWeight: "700" },
  item: { padding: 12, backgroundColor: "#f3f4f6", borderRadius: 8, marginVertical: 6 },
  itemSelected: { backgroundColor: "#e0f2fe", borderColor: "#0ea5e9", borderWidth: 1 },
  itemText: { fontSize: 16 },
});
