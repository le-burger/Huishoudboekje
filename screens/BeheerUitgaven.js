import { View, StyleSheet } from "react-native";
import { useContext, useLayoutEffect } from "react";
import { Ionicons } from "@expo/vector-icons";

import UitgaveForm from "../components/beheer-uitgaven/UitgaveForm";
import { UitgavenContext } from "../store/uitgaven-context";
import { Colors } from "../constants/Colors";

export default function BeheerUitgaven({ route, navigation }) {
  const uitgavenCtx = useContext(UitgavenContext);
  const bewerkteUitgaveId = route.params?.uitgaveId;
  const IsBewerkt = !!bewerkteUitgaveId;

  const geselecteerdeUitgave = uitgavenCtx.uitgaven.find(
    (uitgave) => uitgave.id === bewerkteUitgaveId
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: IsBewerkt ? "Uitgave Bewerken" : "Uitgave Toevoegen",
    });
  }, [navigation, IsBewerkt]);

  function deleteExpenseHandler() {
    uitgavenCtx.deleteUitgave(bewerkteUitgaveId);
    navigation.goBack();
  }

  function cancelHandler() {
    navigation.goBack();
  }

  function confirmHandler(uitgaveData) {
    if (IsBewerkt) {
      uitgavenCtx.updateUitgave(bewerkteUitgaveId, uitgaveData);
    } else {
      uitgavenCtx.addUitgave({ ...uitgaveData, id: id });
    }
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <UitgaveForm
        submitButtonLabel={IsBewerkt ? "Bijwerken" : "Toevoegen"}
        onSubmit={confirmHandler}
        onCancel={cancelHandler}
        defaultValues={geselecteerdeUitgave}
      />
      {IsBewerkt && (
        <View style={styles.deleteContainer}>
          <Ionicons
            name="trash"
            size={48}
            color={Colors.Error}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: Colors.Secondary,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: Colors.Accent,
    alignItems: "center",
  },
});
