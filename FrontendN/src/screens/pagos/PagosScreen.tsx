import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { pagosService } from '../../services/pagosService';
import { Pago } from '../../types';
import { DataCard } from '../../components/ui/DataCard';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
import { colors } from '../../themes/colors';

export const PagosScreen = () => {
    const [pagosCliente, setPagosCliente] = useState<Pago[]>([]);
    const [pagosTarjeta, setPagosTarjeta] = useState<{total_pagos: number}>({total_pagos: 0});
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        cargarPagos();
    }, []);

    const cargarPagos = async () => {
        try {
            const [recientes, tarjeta] = await Promise.all([
                pagosService.findPagosByCliente(1),
                pagosService.countPagosByMetodo('TARJETA')
            ]);
            
            setPagosCliente(recientes);
            setPagosTarjeta(tarjeta);
        } catch (error) {
            console.error('Error cargando pagos:', error);
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
                titulo="Pagos con Tarjeta"
                contenido={`Total: ${pagosTarjeta.total_pagos}`}
            />
            
            <FlatList
                data={pagosCliente}
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
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.gris_fondo
    }
});