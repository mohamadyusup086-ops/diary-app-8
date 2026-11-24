import { Pressable, StyleSheet, Text, View } from "react-native";

import { COLORS, SPACE } from "../styles/tokens";

export const MOODS = ["😊", "🎯", "😔", "😴"];

type Props = {
  value: string;
  onChange: (mood: string) => void;
};

export default function MoodPicker({ value, onChange }: Props) {
  return (
    <View style={styles.row}>
      {MOODS.map((item) => (
        <Pressable
          key={item}
          onPress={() => onChange(item)}
          style={[styles.button, value === item && styles.selected]}
        >
          <Text style={styles.emoji}>{item}</Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    gap: SPACE.s,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    backgroundColor: COLORS.surface,
  },
  selected: {
    borderColor: COLORS.accent,
    borderWidth: 2,
    backgroundColor: COLORS.moodBg,
  },
  emoji: {
    fontSize: 24,
  },
});
