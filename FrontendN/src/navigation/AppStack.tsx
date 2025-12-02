import { createStackNavigator } from '@react-navigation/stack';
import { View, Text } from 'react-native';

const Stack = createStackNavigator();

const PantallaPrueba = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Pantalla de prueba</Text>
  </View>
);

export const AppStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Prueba" component={PantallaPrueba} />
    </Stack.Navigator>
  );
};