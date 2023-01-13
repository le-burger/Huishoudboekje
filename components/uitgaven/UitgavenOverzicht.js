import { View, Text, StyleSheet } from "react-native";

import { Colors } from '../../constants/Colors'

export default function UitgavenOverzicht({uitgaven, periode}) {
    const uitgavenTotaal = uitgaven.reduce((totaal, uitgave) => {
        return totaal + uitgave.prijs
    }, 0);

  return (
    <View style={styles.constainer}>
      <Text style={styles.periode}>{periode}</Text>
      <Text style={styles.sum}>€ {uitgavenTotaal.toFixed(2)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
    constainer: {
      padding: 8,
      backgroundColor: Colors.Primary,
      borderRadius: 6,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    periode: {
      fontSize: 12,
      color: Colors.Secondary
    },
    sum: {
      fontSize: 16,
      fontWeight: 'bold',
      color: Colors.Accent
    },
})
