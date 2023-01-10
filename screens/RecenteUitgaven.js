import { View, Text, StyleSheet } from "react-native";

export default function RecenteUitgaven() {
    return <View style={styles.container}><Text>Recente Uitgaven</Text></View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        justifyContent: 'center',
        alignItems: 'center'
    }
})