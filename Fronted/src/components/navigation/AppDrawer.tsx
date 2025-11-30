import { createDrawerNavigator } from "@react-navigation/drawer";
import { useWindowDimensions } from "react-native";
import { colors } from "../themes/colors";
import { ClientesScreen } from "../screens/clientes/ClientesScreen";
import { PedidosScreen } from "../screens/pedidos/PedidosScreen";
import { PagosScreen } from "../screens/pagos/PagosScreen";

export type RootDrawerNavigator = {

    ClientesScreen: undefined;
    PedidosScreen: undefined;
    PagosScreen: undefined;
    DashboardScreen: undefined;

}

const Drawer = createDrawerNavigator<RootDrawerNavigator>();

export const AppDrawer = () => 
{

    const { width } = useWindowDimensions();

    return(

        <Drawer.Navigator
            initialRouteName = "ClientesScreen"
            screenOptions = {{

                headerShown: true,
                drawerType:width >= 768 ? "permanent" : "front",
                drawerPosition: "right",
                drawerStyle: {
                    backgroundColor: colors.gris_fondo,
                    width: width * 0.7
                }
            }}

        >

            <Drawer.Screen name="ClientesScreen" component={ClientesScreen} />
            <Drawer.Screen name="PedidosScreen" component={PedidosScreen} />
            <Drawer.Screen name="PagosScreen" component={PagosScreen} />
            <Drawer.Screen name="DashboardScreen" component={DashboardScreen} />

        </Drawer.Navigator>
    );
}
