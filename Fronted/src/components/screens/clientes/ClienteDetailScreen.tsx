import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { clientesService } from '../../services/clientesService';
import { pagosService } from '../../services/pagosService';
import { Cliente, Pago } from '../../types';
import { DataCard } from '../../ui/DataCard';
import { LoadingSpinner } from '../../ui/LoadingSpinner';
import { colors } from '../../themes/colors';

export const ClienteDetailScreen = ({ route }) => {

    const [cliente, setCliente] = useState<Cliente | null>(null);
    const [pagos, setPagos] = useState<Pago[]>([]);
    const [totalPedidos, setTotalPedidos] = useState(0);
    const [cargando, setCargando] = useState(true);

    const { clienteId } = route.params;

    useEffect(() => {

        cargarDatosCliente();

    }, []);

    const cargarDatosCliente = async () => {
        try {

            const [datosCliente, datosPagos, datosTotal] = await Promise.all([
                clientesService.findAll(),
                pagosService.findPagosByCliente(clienteId),
                clientesService.getTotalPedidosByCliente(clienteId)
            ]);

            const clienteEncontrado = datosCliente.find(c => c.id_cliente === clienteId);
            setCliente(clienteEncontrado);
            setPagos(datosPagos);
            setTotalPedidos(datosTotal.total_pedidos);

        } catch (error) {

            console.error('Error:', error);

        } finally {

            setCargando(false);

        }
    };

    if (cargando) {

        return <LoadingSpinner />;

    }

    return (

        <View style={styles.container}>
            <DataCard
                titulo={`${cliente.nombre} ${cliente.apellido}`}
                contenido={`Email: ${cliente.correo}\nTel: ${cliente.telefono}\nTotal Pedidos: $${totalPedidos}`}
            />

            <FlatList
                data={pagos}
                keyExtractor={(item) => item.id_pago.toString()}
                renderItem={({ item }) => (
                    <DataCard
                        titulo={`Pago $${item.monto}`}
                        contenido={`Método: ${item.metodo_pago}\nFecha: ${item.fecha}`}
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
});





   




