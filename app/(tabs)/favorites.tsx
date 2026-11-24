import { useMemo } from "react";
import { Alert, FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";

import { useAppDispatch, useAppSelector } from "../../src/redux/hooks";
import DiaryCard from "../../src/components/DiaryCard";
import {
  clearAllFavorites,
  toggleFavorite,
} from "../../src/features/diary/diarySlice";
import { COLORS, RADIUS, SPACE, TYPO } from "../../src/styles/tokens";

export default function FavoritesScreen() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const entries = useAppSelector((state) => state.diary.entries);

  // Derived state: dihitung dari entries, tidak disimpan terpisah
  const favoriteEntries = useMemo(
    () => entries.filter((entry) => entry.liked),
    [entries]
  );

  const confirmClear = () => {
    Alert.alert(
      "Hapus Semua Favorit",
      "Semua tanda favorit akan dihapus (diary tidak ikut terhapus).",
      [
        { text: "Batal", style: "cancel" },
        {
          text: "Hapus",
          style: "destructive",
          onPress: () => dispatch(clearAllFavorites()),
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Favorit</Text>

      <View style={styles.topRow}>
        <Text style={styles.counter}>{favoriteEntries.length} diary favorit</Text>
        {favoriteEntries.length > 0 && (
          <Pressable onPress={confirmClear} style={styles.clearButton}>
            <Text style={styles.clearText}>Hapus Semua Favorit</Text>
          </Pressable>
        )}
      </View>

      <FlatList
        data={favoriteEntries}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <Text style={styles.empty}>
            Belum ada favorit. Tekan ♡ pada diary di Home untuk menambahkannya.
          </Text>
        }
        renderItem={({ item }) => (
          <DiaryCard
            title={item.title}
            date={item.date}
            preview={item.preview}
            mood={item.mood}
            liked={item.liked}
            onPress={() =>
              router.push({
                pathname: "/detail/[id]",
                params: { id: String(item.id) },
              })
            }
            onToggleFavorite={() => dispatch(toggleFavorite(item.id))}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: SPACE.l,
    backgroundColor: COLORS.background,
  },
  header: {
    fontSize: TYPO.h1,
    fontWeight: "700",
    color: COLORS.text,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: SPACE.m,
  },
  counter: {
    color: COLORS.muted,
  },
  clearButton: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: RADIUS.card,
    borderWidth: 1,
    borderColor: COLORS.danger,
  },
  clearText: {
    color: COLORS.danger,
    fontWeight: "600",
    fontSize: 13,
  },
  listContent: {
    paddingBottom: SPACE.xl,
  },
  empty: {
    textAlign: "center",
    color: COLORS.muted,
    marginTop: 40,
  },
});

