import { Pressable, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";


import { Colors } from "../../constants/Colors";
import { getFormattedDate } from "../../util/date";

export default function UitgaveItem({ id, omschrijving, prijs, datum }) {
  const navigation = useNavigation();

  function uitgavePressHandler() {
    navigation.navigate('BeheerUitgaven', {
      uitgaveId: id
    })
  }

  return (
    <Pressable onPress={uitgavePressHandler} style={({pressed}) => pressed && styles.pressed}>
      <View style={styles.uitgaveItem}>
        <View>
          <Text style={[styles.textBase, styles.omschrijving]}>{omschrijving}</Text>
          <Text style={styles.textBase}>{getFormattedDate(datum)}</Text>
        </View>
        <View style={styles.prijsContainer}>
          <Text style={styles.prijs}>€ {prijs.toFixed(2)}</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.75
  },
  uitgaveItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 6,
    padding: 12,
    marginVertical: 8,
    backgroundColor: Colors.Primary,
    elevation: 3,
    shadowColor: Colors.Primary,
    shadowRadius: 4,
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.4
  },
  textBase: {
    color: Colors.Accent
  },
  omschrijving: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: "bold",
  },
  prijsContainer: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: Colors.Accent,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    minWidth: 80,
  },
  prijs: {
    color: Colors.Primary,
    fontWeight: 'bold',
  }
});
