import React from "react";
import { View, TextInput, StyleSheet } from "react-native";

type Props = { value?: string; onChangeText?: (t: string) => void };
export default function SearchBar({ value = "", onChangeText = () => {} }: Props) {
  return (
    <View style={styles.wrap}>
      <TextInput placeholder="Search..." value={value} onChangeText={onChangeText} style={styles.input} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { marginVertical: 8, marginHorizontal: 16 },
  input: { backgroundColor: "#f8fafc", padding: 10, borderRadius: 8, borderWidth: 1, borderColor: "#e6e6e6" },
});
