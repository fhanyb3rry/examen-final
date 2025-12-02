import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { clientesService } from '../../services/clientesService';
import { Cliente } from '../../types';
import { DataCard } from '../../components/ui/DataCard';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
import { colors } from '../../themes/colors';

type RootStackParamList = {
    Clientes: undefined;
    ClienteDetail: { clienteId: number };
    Pedidos: undefined;
    Pagos: undefined;
    Dashboard: undefined;
};

type ClientesScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Clientes'>;

export const ClientesScreen = () => {
    const [clientes, setClientes] = useState<Cliente[]>([]);
    const [cargando, setCargando] = useState(true);
    const navigation = useNavigation<ClientesScreenNavigationProp>();

    useEffect(() => {
        cargarClientesActivos();
    }, []);

    const cargarClientesActivos = async () => {
        try {
            const datos = await clientesService.findClientesActivos();
            
            // ⬇️ SOLUCIÓN: Filtra 'activo' si viene en los datos
            const datosLimpios = datos.map((item: any) => ({
                id_cliente: item.id_cliente,
                nombre: item.nombre,
                apellido: item.apellido,
                correo: item.correo,
                telefono: item.telefono,
                direccion: item.direccion,
                fecha_registro: item.fecha_registro,
                // NO incluyas 'activo' aunque venga
            })) as Cliente[];
            
            setClientes(datosLimpios);
        } catch (error) {
            console.error('Error cargando clientes:', error);
        } finally {
            setCargando(false);
        }
    };

    const handleClientePress = (cliente: Cliente) => {
        navigation.navigate('ClienteDetail', { 
            clienteId: cliente.id_cliente 
        });
    };

    if (cargando) {
        return <LoadingSpinner />;
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={clientes}
                keyExtractor={(item) => item.id_cliente.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => handleClientePress(item)}>
                        <DataCard
                            titulo={`${item.nombre} ${item.apellido}`}
                            contenido={
                                `📧 ${item.correo}\n` +
                                `📱 ${item.telefono}\n` +
                                `📍 ${item.direccion}\n` +
                                `📅 Registro: ${new Date(item.fecha_registro).toLocaleDateString()}`
                            }
                        />
                    </TouchableOpacity>
                )}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <DataCard
                            titulo="No hay clientes"
                            contenido="No se encontraron clientes registrados"
                        />
                    </View>
                }
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.gris_fondo,
        padding: 10,
    },
    emptyContainer: {
        marginTop: 20,
    },
});