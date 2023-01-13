import { createContext, useReducer } from "react";

const UITGAVEN = [
  {
    id: "e1",
    omschrijving: "Schoenen",
    prijs: 69.99,
    datum: new Date("2022-12-24"),
  },
  {
    id: "e2",
    omschrijving: "Broek",
    prijs: 49.5,
    datum: new Date("2022-11-29"),
  },
  {
    id: "e3",
    omschrijving: "Netflix sub",
    prijs: 14.99,
    datum: new Date("2022-12-01"),
  },
  {
    id: "e4",
    omschrijving: "Boeken",
    prijs: 29.99,
    datum: new Date("2022-12-25"),
  },
  {
    id: "e5",
    omschrijving: "MacDonalds",
    prijs: 23.15,
    datum: new Date("2022-12-22"),
  },
];

export const UitgavenContext = createContext({
  uitgaven: [],
  addUitgave: ({ omschrijving, prijs, datum }) => {},
  setUitgaven: (uitgaven) => {},
  deleteUitgave: (id) => {},
  updateUitgave: (id, { omschrijving, prijs, datum }) => {},
});

function uitgavenReducer(state, action) {
  switch (action.type) {
    case "ADD":
      return [{ ...action.payload }, ...state];

    case "SET":
      const inverted =  action.payload.reverse()
      return inverted 

    case "UPDATE":
      const updatableUitgaveIndex = state.findIndex(
        (uitgave) => uitgave.id === action.payload.id
      );
      const updatableUitgave = state[updatableUitgaveIndex];
      const updatedItem = { ...updatableUitgave, ...action.payload.data };
      const updatedUitgaven = [...state];
      updatedUitgaven[updatableUitgaveIndex] = updatedItem;
      return updatedUitgaven;

    case "DELETE":
      return state.filter((uitgave) => uitgave.id !== action.payload);
    default:
      return state;
  }
}

export default function UitgavenContextProvider({ children }) {
  const [uitgavenState, dispatch] = useReducer(uitgavenReducer, UITGAVEN);

  function addUitgave(uitgavenData) {
    dispatch({ type: "ADD", payload: uitgavenData });
  }

  function setUitgaven(uitgaven) {
    dispatch({ type: "SET", payload: uitgaven})
  }

  function deleteUitgave(id) {
    dispatch({ type: "DELETE", payload: id });
  }

  function updateUitgave(id, uitgavenData) {
    dispatch({ type: "UPDATE", payload: { id: id, data: uitgavenData } });
  }

  const value = {
    uitgaven: uitgavenState,
    setUitgaven: setUitgaven,
    addUitgave: addUitgave,
    deleteUitgave: deleteUitgave,
    updateUitgave: updateUitgave,
  };

  return (
    <UitgavenContext.Provider value={value}>
      {children}
    </UitgavenContext.Provider>
  );
}