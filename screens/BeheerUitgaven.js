import { View, StyleSheet } from "react-native";
import { useContext, useLayoutEffect } from "react";
import { Ionicons } from "@expo/vector-icons";

import UitgaveForm from "../components/beheer-uitgaven/UitgaveForm";
import { UitgavenContext } from "../store/uitgaven-context";
import { Colors } from "../constants/Colors";
import { deleteUitgave, updateUitgave, addUitgave } from "../util/http";

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

  async function deleteExpenseHandler() {
    try {
      await deleteUitgave(bewerkteUitgaveId);
      uitgavenCtx.deleteUitgave(bewerkteUitgaveId);
    } catch (error) {
      console.log(error);
    }
    navigation.goBack();
  }

  function cancelHandler() {
    navigation.goBack();
  }

  async function confirmHandler(uitgaveData) {
    try {
        if (IsBewerkt) {
          await updateUitgave(bewerkteUitgaveId, uitgaveData)
          uitgavenCtx.updateUitgave(bewerkteUitgaveId, uitgaveData);
        } else {
          console.log(uitgaveData)
          const id = await addUitgave(uitgaveData);
          uitgavenCtx.addUitgave({ ...uitgaveData, id: id });
        }
      } catch (error) {
        console.log(error);
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
