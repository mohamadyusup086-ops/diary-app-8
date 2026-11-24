import { useState } from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useRouter } from "expo-router";

import { useAppDispatch } from "../../src/redux/hooks";
import MoodPicker from "../../src/components/MoodPicker";
import { addDiary } from "../../src/features/diary/diarySlice";
import { COLORS, RADIUS, SPACE, TYPO } from "../../src/styles/tokens";

export default function CreateScreen() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  // State lokal: hanya dipakai di form ini
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [mood, setMood] = useState("😊");

  const saveDiary = () => {
    if (title.trim().length < 3) {
      Alert.alert("Validasi", "Judul minimal 3 karakter.");
      return;
    }

    if (!body.trim()) {
      Alert.alert("Validasi", "Isi diary wajib diisi.");
      return;
    }

    const today = new Date().toISOString().slice(0, 10);

    // Data dipindahkan ke global state (Redux Store)
    dispatch(
      addDiary({
        title: title.trim(),
        date: today,
        preview: body.trim().slice(0, 100),
        body: body.trim(),
        mood,
      })
    );

    setTitle("");
    setBody("");
    setMood("😊");

    router.replace("/");
  };

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.heading}>Tambah Diary</Text>

      <Text style={styles.label}>Judul</Text>
      <TextInput
        value={title}
        onChangeText={setTitle}
        placeholder="Judul diary (minimal 3 karakter)"
        placeholderTextColor={COLORS.muted}
        style={styles.input}
      />
      <Text style={styles.hint}>{title.trim().length} / 3 karakter</Text>

      <Text style={styles.label}>Isi</Text>
      <TextInput
        value={body}
        onChangeText={setBody}
        placeholder="Ceritakan harimu..."
        placeholderTextColor={COLORS.muted}
        multiline
        style={[styles.input, styles.bodyInput]}
      />

      <Text style={styles.label}>Mood</Text>
      <MoodPicker value={mood} onChange={setMood} />

      <Pressable onPress={saveDiary} style={styles.button}>
        <Text style={styles.buttonText}>Simpan ke Redux</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  container: {
    padding: SPACE.l,
    gap: SPACE.s,
  },
  heading: {
    fontSize: 24,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: SPACE.s,
  },
  label: {
    fontSize: TYPO.body,
    fontWeight: "600",
    color: COLORS.text,
    marginTop: SPACE.s,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.card,
    padding: 12,
    backgroundColor: COLORS.surface,
    color: COLORS.text,
    fontSize: 16,
  },
  bodyInput: {
    minHeight: 140,
    textAlignVertical: "top",
  },
  hint: {
    fontSize: TYPO.caption,
    color: COLORS.muted,
  },
  button: {
    marginTop: SPACE.l,
    padding: 14,
    borderRadius: RADIUS.card,
    backgroundColor: COLORS.accent,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 16,
  },
});

