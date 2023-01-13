import { StyleSheet, Text, View } from "react-native";

import { Colors } from "../../constants/Colors";
import UitgavenLijst from "../uitgaven/UitgavenLijst"
import UitgavenOverzicht from "../uitgaven/UitgavenOverzicht"

export default function UitgavenOutput({uitgaven, periode, text}) {
    let content = <Text style={styles.infoText}>{text}</Text>

    if (uitgaven.length > 0) {
        content = <UitgavenLijst uitgaven={uitgaven}/>
    }

     return <View style={styles.container}>
        <UitgavenOverzicht uitgaven={uitgaven} periode={periode}/>
        {content}
     </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: Colors.Secondary
    },
    infoText: {
        color: Colors.Primary,
        fontSize: 16,
        textAlign: 'center',
        marginTop: 32
    }
    
})