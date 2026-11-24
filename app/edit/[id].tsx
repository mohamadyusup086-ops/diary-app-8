import { useState } from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

import { useAppDispatch, useAppSelector } from "../../src/redux/hooks";
import MoodPicker from "../../src/components/MoodPicker";
import { editDiary } from "../../src/features/diary/diarySlice";
import { COLORS, RADIUS, SPACE, TYPO } from "../../src/styles/tokens";

export default function EditScreen() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { id } = useLocalSearchParams<{ id: string }>();

  const entry = useAppSelector((state) =>
    state.diary.entries.find((item) => item.id === Number(id))
  );

  // State lokal untuk form edit, diisi dari data di Redux saat layar dibuka
  const [title, setTitle] = useState(entry?.title ?? "");
  const [body, setBody] = useState(entry?.body ?? "");
  const [mood, setMood] = useState(entry?.mood ?? "😊");

  if (!entry) {
    return <Text style={styles.notFound}>Diary tidak ditemukan.</Text>;
  }

  const saveChanges = () => {
    if (title.trim().length < 3) {
      Alert.alert("Validasi", "Judul minimal 3 karakter.");
      return;
    }

    if (!body.trim()) {
      Alert.alert("Validasi", "Isi diary wajib diisi.");
      return;
    }

    dispatch(
      editDiary({
        id: entry.id,
        title: title.trim(),
        body: body.trim(),
        mood,
        preview: body.trim().slice(0, 100),
      })
    );

    router.back();
  };

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
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
        multiline
        style={[styles.input, styles.bodyInput]}
      />

      <Text style={styles.label}>Mood</Text>
      <MoodPicker value={mood} onChange={setMood} />

      <Pressable onPress={saveChanges} style={styles.button}>
        <Text style={styles.buttonText}>Simpan Perubahan</Text>
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
  notFound: {
    padding: 16,
    color: COLORS.text,
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

