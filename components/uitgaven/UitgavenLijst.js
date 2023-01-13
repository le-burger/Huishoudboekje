import { FlatList } from "react-native";
import UitgaveItem from "./UitgaveItem";

function renderUitgaveItem(itemData) {
  return <UitgaveItem {...itemData.item} />;
}
export default function UitgavenLijst({ uitgaven }) {
  return (
    <FlatList
      data={uitgaven}
      renderItem={renderUitgaveItem}
      keyExtractor={(item) => item.id}
    />
  );
}
