import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { clientesService } from '../../services/clientesService';
import { Cliente } from '../../types';
import { DataCard } from '../../ui/DataCard';
import { LoadingSpinner } from '../../ui/LoadingSpinner';
import { colors } from '../../themes/colors';

export const ClientesScreen = () => {

    const [clientes, setClientes] = useState<Cliente[]>([]);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {

        cargarClientesActivos();

    }, []);

    const cargarClientesActivos = async () => {

        try{

            const datos = await clientesService.findClientesActivos();
            setClientes(datos);

        } catch (error) {

            console.error('Error cargando clientes:', error);

        } finally {

            setCargando(false);

        }

    };

    if (cargando) {

        return <LoadingSpinner />;

    }

    return (

        <View style={style.container}>
            <FlatList
                data={clientes}
                keyExtractor={(item) => item.id_cliente.toString()}
                renderItem={({ item }) => (

                    <DataCard
                        titulo={`${item.nombre} ${item.apellido}`}
                        contenido={`Email: ${item.correo}\nTel: ${item.telefono}`}
                    />
                )}
            />
        </View>
    );
}

const style = StyleSheet.create ({

    container: {

        flex: 1,
        backgroundColor: colors.gris_fondo,
        padding: 16
    }
});
