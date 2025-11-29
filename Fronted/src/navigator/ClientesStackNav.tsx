import { createStackNavigator } from "@react-navigation/stack";
import { ClientesScreen } from "../screens/clientes/ClientesScreen";
import { ClienteDetailScreen } from "../screens/clientes/ClienteDetailScreen";
import { PedidosScreen } from "../screens/pedidos/PedidosScreen";
import { PagosScreen } from "../screens/pagos/PagosScreen";

export type ClientesStackParams = {
    ClientesScreen: undefined;
    ClienteDetailScreen: { clienteId: number };
    PedidosScreen: undefined;
    PagosScreen: undefined;
}

export const ClientesStackNav = () => {

    const Stack = createStackNavigator<ClientesStackParams>();

    return(
        <Stack.Navigator
            initialRouteName="ClientesScreen"
            screenOptions={{
                headerMode: "float",
                headerShown: true,
                headerStyle:{
                    height: 50,
                    shadowColor: "violet",
                    backgroundColor: "pink",
                    borderWidth: 6,
                    borderColor: "gray",
                    borderRadius: 20,
                    opacity: 0.7
                },
                headerTitleStyle:{
                    fontWeight: "bold",
                    color: "violet"
                },
                headerTintColor: "violet",
                cardStyle: {
                    backgroundColor: "white"
                }
            }}
        >
            <Stack.Screen
                name="ClientesScreen"
                component={ ClientesScreen }
                options={{ title: "Lista de Clientes" }}
            />
            <Stack.Screen
                name="ClienteDetailScreen"
                component={ ClienteDetailScreen }
                options={{ title: "Detalle del Cliente" }}
            />
            <Stack.Screen
                name="PedidosScreen"
                component={ PedidosScreen }
                options={{ title: "Pedidos" }}
            />
            <Stack.Screen
                name="PagosScreen"
                component={ PagosScreen }
                options={{ title: "Pagos" }}
            />
        </Stack.Navigator>
    );
}