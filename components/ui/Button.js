import { Pressable, StyleSheet, Text, View } from "react-native";
import { Colors } from "../../constants/Colors";

export default function Button({ children, onPress, mode, style }) {
  return (
    <View style={style}>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => pressed && styles.pressed}
      >
        <View style={[styles.button, mode === "flat" && styles.flat]}>
          <Text style={[styles.buttonText, mode === "flat" && styles.flatText]}>
            {children}
          </Text>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 4,
    padding: 8,
    backgroundColor: Colors.Primary,
  },
  flat: {
    backgroundColor: Colors.Error,
  },
  buttonText: {
    color: Colors.Accent,
    textAlign: "center",
  },
  flatText: {
    color: Colors.Primary,
  },
  pressed: {
    opacity: 0.75,
    backgroundColor: Colors.Primary,
    borderRadius: 4,
  },
});
