import { useContext } from "react";

import UitgavenOutput from "../components/uitgaven/UitgavenOutput";
import { UitgavenContext } from "../store/uitgaven-context";
import { getDateMinusDays } from "../util/date";

export default function RecenteUitgaven() {
  const uitgavenCtx = useContext(UitgavenContext);

  const recenteUitgaven = uitgavenCtx.uitgaven.filter((uitgave) => {
    const vandaag = new Date();
    const datum7DagenTerug = getDateMinusDays(vandaag, 7);
    return uitgave.datum >= datum7DagenTerug && uitgave.datum <= vandaag;
  });

  return (
    <UitgavenOutput
      uitgaven={recenteUitgaven}
      periode="Afgelopen 7 dagen"
      text={"Geen uitgaven geregistreerd afgelopen 7 dagen"}
    />
  );
}
