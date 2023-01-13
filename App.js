import { AntDesign, Ionicons } from "@expo/vector-icons";
import { StyleSheet, Button } from "react-native";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import AlleUitgaven from "./screens/AlleUitgaven";
import BeheerUitgaven from "./screens/BeheerUitgaven";
import RecenteUitgaven from "./screens/RecenteUitgaven";
import { Colors } from "./constants/Colors";
import UitgavenContextProvider from "./store/uitgaven-context";

export default function App() {
  const Stack = createNativeStackNavigator();
  const BottomTabs = createBottomTabNavigator();

  function UitgavenOverzicht() {
    return (
      <BottomTabs.Navigator
        screenOptions={({ navigation }) => ({
          headerStyle: { backgroundColor: Colors.Primary },
          headerTintColor: Colors.Accent,
          tabBarStyle: { backgroundColor: Colors.Primary },
          tabBarActiveTintColor: Colors.Accent,
          headerRight: ({ tintColor }) => (
            <AntDesign
              style={{ marginHorizontal: 10 }}
              name="edit"
              size={24}
              color={tintColor}
              onPress={() => {
                navigation.navigate("BeheerUitgaven");
              }}
            />
          ),
        })}
      >
        <BottomTabs.Screen
          name="RecenteUitgaven"
          component={RecenteUitgaven}
          options={{
            title: "Recente Uitgaven",
            tabBarLabel: "Recent",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="hourglass" size={size} color={color} />
            ),
          }}
        />
        <BottomTabs.Screen
          name="AlleUitgaven"
          component={AlleUitgaven}
          options={{
            title: "Alle Uitgaven",
            tabBarLabel: "Totaal",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="calendar" size={size} color={color} />
            ),
          }}
        />
      </BottomTabs.Navigator>
    );
  }
  return (
    <>
      <StatusBar style="light" />
      <UitgavenContextProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerStyle: { backgroundColor: Colors.Background },
              headerTintColor: Colors.Primary,
            }}
          >
            <Stack.Screen
              name="UitgavenOverzicht"
              component={UitgavenOverzicht}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="BeheerUitgaven"
              component={BeheerUitgaven}
              options={({ navigation }) => ({
                presentation: "modal",
                headerRight: ({ tintColor }) => (
                  <Ionicons
                    name="close"
                    size={36}
                    color={tintColor}
                    onPress={() => {
                      navigation.goBack();
                    }}
                  />
                ),
              })}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </UitgavenContextProvider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.Background,
    alignItems: "center",
    justifyContent: "center",
  },
});
