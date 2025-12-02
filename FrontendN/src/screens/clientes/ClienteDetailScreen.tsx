import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { Cliente, Pago } from '../../types'; // Asegúrate que estas interfaces estén actualizadas
import { clientesService } from '../../services/clientesService'; 
import { pagosService } from '../../services/pagosService';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
import { DataCard } from '../../components/ui/DataCard';
import { colors } from '../../themes/colors';

type ClienteDetailRouteProp = RouteProp<{ params: { clienteId: number } }, 'params'>;

export const ClienteDetailScreen = () => {
    const route = useRoute<ClienteDetailRouteProp>();
    const { clienteId } = route.params;
    
    const [cliente, setCliente] = useState<Cliente | null>(null);
    const [pagos, setPagos] = useState<Pago[]>([]);
    const [totalPedidos, setTotalPedidos] = useState(0);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        cargarDatosCliente();
    }, [clienteId]);

    const cargarDatosCliente = async () => {
        try {
            setCargando(true);
            
            // ⚠️ CORRECCIÓN: `clientesService.findAll()` trae TODOS los clientes
            // Es ineficiente. Mejor crear un endpoint específico: GET /clientes/{id}
            
            // Opción A: Si tienes endpoint para cliente específico:
            // const [datosCliente, datosPagos, datosTotal] = await Promise.all([
            //     clientesService.getClienteById(clienteId),
            //     pagosService.findPagosByCliente(clienteId),
            //     clientesService.getTotalPedidosByCliente(clienteId)
            // ]);
            
            // Opción B: Temporal - usa el endpoint que trae todos y filtra
            const [datosClientes, datosPagos, datosTotal] = await Promise.all([
                clientesService.findAll(), // Esto podría ser clientesService.findClientes()
                pagosService.findPagosByCliente(clienteId),
                clientesService.getTotalPedidosByCliente(clienteId)
            ]);
            
            // Busca el cliente en el array
            const clienteEncontrado = datosClientes.find((c: Cliente) => c.id_cliente === clienteId);
            
            if (!clienteEncontrado) {
                console.warn(`Cliente con ID ${clienteId} no encontrado`);
                setCliente(null);
            } else {
                // ⚠️ Asegúrate que la interface Cliente NO tenga 'activo'
                // o si lo tiene, asegúrate que sea opcional o lo manejes
                setCliente(clienteEncontrado);
            }
            
            setPagos(datosPagos || []);
            setTotalPedidos(datosTotal?.total_pedidos || 0);
        } catch (error) {
            console.error('Error cargando datos del cliente:', error);
        } finally {
            setCargando(false);
        }
    };

    if (cargando) {
        return <LoadingSpinner />;
    }

    if (!cliente) {
        return (
            <View style={styles.container}>
                <DataCard
                    titulo="Cliente no encontrado"
                    contenido={`No se encontró el cliente con ID: ${clienteId}`}
                />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <DataCard
                titulo={`${cliente.nombre} ${cliente.apellido}`}
                contenido={
                    `📧 ${cliente.correo}\n` +
                    `📱 ${cliente.telefono}\n` +
                    `📍 ${cliente.direccion}\n` +
                    `📅 Registro: ${new Date(cliente.fecha_registro).toLocaleDateString()}\n` +
                    `💰 Total en Pedidos: $${totalPedidos.toFixed(2)}`
                }
            />
            
            <View style={styles.seccionTitulo}>
                <DataCard
                    titulo={`Pagos (${pagos.length})`}
                    contenido={`Historial de pagos del cliente`}
                />
            </View>
            
            {pagos.length === 0 ? (
                <DataCard
                    titulo="Sin pagos registrados"
                    contenido="Este cliente no tiene pagos registrados en el sistema"
                />
            ) : (
                <FlatList
                    data={pagos}
                    keyExtractor={(item) => item.id_pago.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.pagoItem}>
                            <DataCard
                                titulo={`Pago #${item.id_pago}`}
                                contenido={
                                    `💵 $${item.monto.toFixed(2)}\n` +
                                    `📋 ${item.metodo_pago}\n` +
                                    `📅 ${new Date(item.fecha).toLocaleDateString()}\n` +
                                    `🔗 ${item.referencia || 'Sin referencia'}`
                                }
                            />
                        </View>
                    )}
                    contentContainerStyle={styles.listaPagos}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.gris_fondo,
        padding: 10,
    },
    seccionTitulo: {
        marginTop: 15,
        marginBottom: 10,
    },
    pagoItem: {
        marginBottom: 10,
    },
    listaPagos: {
        paddingBottom: 20,
    },
});