import React, { useState } from "react";
import {
  View,
  Text,
  SectionList,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from "react-native";

type Order = {
  id: string;
  item: string;
  status: string;
};

type Section = {
  title: string;
  data: Order[];
};

const orderSections: Section[] = [
  {
    title: "Processing",
    data: [
      { id: "p1", item: "Wireless Headphones", status: "Being prepared" },
      { id: "p2", item: "USB-C Hub", status: "Awaiting shipment" },
    ],
  },
  {
    title: "Shipped",
    data: [
      { id: "s1", item: "Mechanical Keyboard", status: "In transit" },
      { id: "s2", item: "Webcam HD", status: "Out for delivery" },
    ],
  },
  {
    title: "Delivered",
    data: [
      { id: "d1", item: "Mouse Pad XL", status: "Delivered on Jan 15" },
      { id: "d2", item: "Phone Stand", status: "Delivered on Jan 10" },
    ],
  },
];

export default function OrdersScreen() {
  const [selected, setSelected] = useState<string | null>(null);

  function handleOrderPress(order: Order) {
    setSelected(order.id);
    Alert.alert("Order Selected", `You tapped: ${order.item}`);
  }

  function renderItem({ item }: { item: Order }) {
    const isSelected = selected === item.id;
    return (
      <TouchableOpacity
        style={[styles.orderCard, isSelected && styles.orderCardSelected]}
        onPress={() => handleOrderPress(item)}
      >
        <Text style={styles.orderItem}>{item.item}</Text>
        <Text style={styles.orderStatus}>{item.status}</Text>
      </TouchableOpacity>
    );
  }

  function renderSectionHeader({ section }: { section: Section }) {
    return (
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionHeaderText}>{section.title}</Text>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <Text style={styles.heading}>Orders Screen</Text>
      <SectionList
        sections={orderSections}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        contentContainerStyle={{ paddingBottom: 40 }}
      />
    </View>
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
    marginVertical: 20,
    color: "#222",
  },
  sectionHeader: {
    backgroundColor: "#4a90e2",
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  sectionHeaderText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  orderCard: {
    marginHorizontal: 16,
    marginVertical: 6,
    padding: 14,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#eee",
  },
  orderCardSelected: {
    borderColor: "#4a90e2",
    backgroundColor: "#eaf2ff",
  },
  orderItem: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  orderStatus: {
    fontSize: 13,
    color: "#888",
    marginTop: 4,
  },
});
