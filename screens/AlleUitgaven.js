import { useContext } from "react";

import UitgavenOutput from "../components/uitgaven/UitgavenOutput";
import { UitgavenContext } from "../store/uitgaven-context";

export default function AlleUitgaven() {
  const uitgavenCtx = useContext(UitgavenContext);

  return (
    <UitgavenOutput
      uitgaven={uitgavenCtx.uitgaven}
      periode="Totaal"
      text={"Geen uitgaven geregistreerd."}
    />
  );
}
