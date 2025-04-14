import 'react-native-gesture-handler';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Scan from '../screens/Scan';
import AddDetails from '../screens/AddDetails';
import WeatherDetails from '../screens/WeatherDetails';

const Stack = createNativeStackNavigator();

export const AppNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Scan"
      screenOptions={{
        headerShown: true,
        headerTitleAlign: "left",
      }}
    >
      <Stack.Screen
        name="Scan"
        component={Scan}
        options={{ title: 'Scanner Barcode' }}
      />
      <Stack.Screen
        name="AddDetails"
        component={AddDetails}
        options={{ title: 'Add City' }}
      />
        <Stack.Screen
        name="WeatherDetails"
        component={WeatherDetails}
        options={{ title: 'Weather Details' }}
      />
    </Stack.Navigator>
  );
};