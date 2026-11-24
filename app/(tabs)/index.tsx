import { useMemo, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";

import { useAppDispatch, useAppSelector } from "../../src/redux/hooks";
import DiaryCard from "../../src/components/DiaryCard";
import { MOODS } from "../../src/components/MoodPicker";
import { toggleFavorite } from "../../src/features/diary/diarySlice";
import { COLORS, RADIUS, SPACE, TYPO } from "../../src/styles/tokens";

const ALL = "Semua";

function StatBox({ label, value }: { label: string; value: number }) {
  return (
    <View style={styles.statBox}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

export default function HomeScreen() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const entries = useAppSelector((state) => state.diary.entries);
  const [selectedMood, setSelectedMood] = useState<string>(ALL);

  const totalFavorite = useMemo(
    () => entries.filter((entry) => entry.liked).length,
    [entries]
  );

  const filteredEntries = useMemo(
    () =>
      selectedMood === ALL
        ? entries
        : entries.filter((entry) => entry.mood === selectedMood),
    [entries, selectedMood]
  );

  const moodOptions = [ALL, ...MOODS];

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Buku Harian</Text>

      <View style={styles.statRow}>
        <StatBox label="Total Diary" value={entries.length} />
        <StatBox label="Total Favorite" value={totalFavorite} />
      </View>

      <View style={styles.filterRow}>
        {moodOptions.map((mood) => {
          const active = selectedMood === mood;
          return (
            <Pressable
              key={mood}
              onPress={() => setSelectedMood(mood)}
              style={[styles.chip, active && styles.chipActive]}
            >
              <Text style={[styles.chipText, active && styles.chipTextActive]}>
                {mood}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <FlatList
        data={filteredEntries}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <Text style={styles.empty}>
            Belum ada diary dengan mood ini. Tekan tab Tambah untuk menulis.
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
    marginBottom: SPACE.m,
  },
  statRow: {
    flexDirection: "row",
    gap: SPACE.m,
    marginBottom: SPACE.m,
  },
  statBox: {
    flex: 1,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.card,
    padding: SPACE.m,
  },
  statValue: {
    fontSize: 22,
    fontWeight: "700",
    color: COLORS.accent,
  },
  statLabel: {
    fontSize: TYPO.caption,
    color: COLORS.muted,
  },
  filterRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: SPACE.s,
    marginBottom: SPACE.m,
  },
  chip: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surface,
  },
  chipActive: {
    backgroundColor: COLORS.accent,
    borderColor: COLORS.accent,
  },
  chipText: {
    fontSize: 14,
    color: COLORS.text,
  },
  chipTextActive: {
    color: "#FFFFFF",
    fontWeight: "700",
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

