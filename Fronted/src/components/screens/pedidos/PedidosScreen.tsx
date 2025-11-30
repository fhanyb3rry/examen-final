import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { pedidosService } from '../../services/pedidosService';
import { Pedido } from '../../types';
import { DataCard } from '../../ui/DataCard';
import { LoadingSpinner } from '../../ui/LoadingSpinner';
import { colors } from '../../themes/colors';

export const PedidosScreen = () => {

    const [pedidosPendintes, setPedidosPendientes] = useState<Pedido[]>([]);
    const [pedidosMonto, setPedidosMonto] = useState<Pedido[]>([]);
    const [cargando, setCargando] = useState(true);

    useEffect (() => {

        cargarPedidos();
    
    }, []);

    const cargarPedidos = async () => {

        try {

            const [pendientes, montoAlto] = await Promise.all([

                pedidosService.findPedidosPendientes(),
                pedidosService.findPedidosByTotalMinimo(500)

            ]);

            setPedidosPendientes(pendientes);

            setPedidosMonto(montoAlto);

        } catch (error){

            console.error("Error al cargar los pedidos", error);

        } finally {

            setCargando(false);

        }

    };

    return (

        <View
        style={styles.container}>
            <DataCard
            titulo="Pedidos Pendientes"
            contenido={"Total: ${pedidosPendientes.lenght}"}
            />
            <FlatList

            data={pedidosPendintes}
            keyExtractor={(item) => item.id_pedido.toString()}

            renderItem={({ item }) => (

                <DataCard 

                titulo={`Pedido #${item.id_pedido}`}

            contenido={`Total: $${item.total}\nEstatus: ${item.estatus}`}

        />
        )}
         />
        </View>
    );
}

const styles = StyleSheet.create({

    container: {

        flex: 1,
        backgroundColor: colors.gris_fondo,
        padding: 16

    }



})



    









    






