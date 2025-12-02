import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { clientesService } from '../../services/clientesService';
import { DataCard } from '../../components/ui/DataCard';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
import { colors } from '../../themes/colors';

interface ClienteConTotal {
    id_cliente: number;
    nombre: string;
    apellido: string;
    total_pedidos: number;
    cantidad_pedidos: number;
}

export const DashboardScreen = () => {
    const [clientesConTotales, setClientesConTotales] = useState<ClienteConTotal[]>([]);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        cargarClientesConTotales();
    }, []);

    const cargarClientesConTotales = async () => {
        try {
            const datos: ClienteConTotal[] = await clientesService.findAllClientesWithTotales();
            setClientesConTotales(datos);
        } catch (error) {
            console.error('Error cargando dashboard:', error);
        } finally {
            setCargando(false);
        }
    };

    if (cargando) {
        return <LoadingSpinner />;
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={clientesConTotales}
                keyExtractor={(item) => item.id_cliente.toString()}
                renderItem={({ item }) => (
                    <DataCard
                        titulo={`${item.nombre} ${item.apellido}`}
                        contenido={`Total Pedidos: $${item.total_pedidos}\nCantidad Pedidos: ${item.cantidad_pedidos}`}
                    />
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.gris_fondo
    }
});