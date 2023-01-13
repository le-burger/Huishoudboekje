import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import Input from "./Input";
import Button from "../ui/Button";
import { getFormattedDate } from "../../util/date";
import { Colors } from "../../constants/Colors";

export default function UitgaveForm({
  submitButtonLabel,
  onCancel,
  onSubmit,
  defaultValues,
}) {
  const [inputs, setInputs] = useState({
    prijs: {
      value: defaultValues ? defaultValues.prijs.toString() : "",
      isValid: true,
    },
    datum: {
      value: defaultValues ? getFormattedDate(defaultValues.datum) : "",
      isValid: true,
    },
    omschrijving: {
      value: defaultValues ? defaultValues.omschrijving : "",
      isValid: true,
    },
  });

  function inputChangedHandler(inputIdentifier, enteredValue) {
    setInputs((curInputs) => {
      return {
        ...curInputs,
        [inputIdentifier]: {value: enteredValue, isValid: true},
      };
    });
  }

  function submitHandler() {
    const uitgaveData = {
      prijs: +inputs.prijs.value,
      datum: new Date(inputs.datum.value),
      omschrijving: inputs.omschrijving.value,
    };

    const prijsIsValid = !isNaN(uitgaveData.prijs) && uitgaveData.prijs > 0;
    const datumIsValid = uitgaveData.datum.toString() !== "Invalid Date";
    const omschrijvingIsValid = uitgaveData.omschrijving.trim().length > 0;

    if (!prijsIsValid || !datumIsValid || !omschrijvingIsValid) {
    setInputs((curInputs) => {
        return {
            prijs: { value: curInputs.prijs.value, isValid: prijsIsValid },
            datum: { value: curInputs.datum.value, isValid: datumIsValid },
            omschrijving: { value: curInputs.omschrijving.value, isValid: omschrijvingIsValid },
        }
    })``
      return;
    }

    onSubmit(uitgaveData);
  }

  const formIsInvalid = !inputs.prijs.isValid || !inputs.datum.isValid || !inputs.omschrijving.isValid

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Uitgave</Text>
      <View style={styles.inputsRow}>
        <Input
          style={styles.rowInput}
          label="Prijs"
          invalid={!inputs.prijs.isValid}
          textInputConfig={{
            keyboardType: "decimal-pad",
            onChangeText: inputChangedHandler.bind(this, "prijs"),
            value: inputs.prijs.value,
          }}
        />
        <Input
          style={styles.rowInput}
          label="Datum"
          invalid={!inputs.datum.isValid}
          textInputConfig={{
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            onChangeText: inputChangedHandler.bind(this, "datum"),
            value: inputs.datum.value,
          }}
        />
      </View>
      <Input
        label="Omschrijving"
        invalid={!inputs.omschrijving.isValid}
        textInputConfig={{
          multiline: true,
          onChangeText: inputChangedHandler.bind(this, "omschrijving"),
          value: inputs.omschrijving.value,
        }}
      />
      {formIsInvalid && <Text style={styles.errorText}>Ongeldige input - controleer de ingevulde waardes!</Text>}
      <View style={styles.buttonContainer}>
        <Button style={styles.button} mode="flat" onPress={onCancel}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={submitHandler}>
          {submitButtonLabel}
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    marginTop: 80,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.Accent,
    marginVertical: 24,
    textAlign: "center",
  },
  inputsRow: {
    flexDirection: "row",
    alignItems: "space-between",
  },
  rowInput: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
  errorText: {
    textAlign: 'center',
    color: Colors.Error,
  }
});