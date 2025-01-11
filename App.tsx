import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TaskForm from "./pages/TaskForm";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import Home from "./pages/Home";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { RootStackParamList } from "./interfaces/navigation.types";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <Provider store={store}>
            <NavigationContainer>
              <Stack.Navigator
                screenOptions={{
                  headerShown: false,
                }}>
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen
                  name="TaskForm"
                  component={TaskForm}
                  options={{
                    title: "Task Form",
                  }}
                />
              </Stack.Navigator>
            </NavigationContainer>
          </Provider>
        </GestureHandlerRootView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
