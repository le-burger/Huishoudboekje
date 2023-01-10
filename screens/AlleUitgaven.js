import { View, Text, StyleSheet } from "react-native";

export default function AlleUitgaven() {
    return <View style={styles.container}><Text>Alle Uitgaven</Text></View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        justifyContent: 'center',
        alignItems: 'center'
    }
})