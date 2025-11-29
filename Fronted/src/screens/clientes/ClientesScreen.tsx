import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { ClientesStackParams } from '../../navigator/ClientesStackNav';
import { Fab } from '../../components/Fab';
import { clientesService } from '../../services/api';

interface Props extends StackScreenProps<ClientesStackParams, "ClientesScreen"> {};

interface Cliente {
  id_cliente: number;
  nombre: string;
  apellido: string;
  correo: string;
  activo: boolean;
  total_pedidos?: number;
}

export const ClientesScreen = ({ navigation }: Props) => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadClientes();
  }, []);

  const loadClientes = async () => {
    try {
      const response = await clientesService.getWithTotales();
      setClientes(response.data);
    } catch (error) {
      console.error('Error cargando clientes:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Cargando clientes...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Clientes</Text>
      
      <FlatList
        data={clientes}
        keyExtractor={(item) => item.id_cliente.toString()}
        renderItem={({ item }) => (
          <View style={styles.clienteCard}>
            <Text style={styles.clienteName}>
              {item.nombre} {item.apellido}
            </Text>
            <Text style={styles.clienteEmail}>{item.correo}</Text>
            <Text style={styles.clienteTotal}>
              Total pedidos: ${item.total_pedidos?.toFixed(2) || '0.00'}
            </Text>
            <View style={[
              styles.statusBadge, 
              { backgroundColor: item.activo ? '#4CAF50' : '#F44336' }
            ]}>
              <Text style={styles.statusText}>
                {item.activo ? 'ACTIVO' : 'INACTIVO'}
              </Text>
            </View>
          </View>
        )}
      />

      <Fab
        titulo='📦'
        position="button_right"
        action={() => navigation.navigate("PedidosScreen")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  clienteCard: {
    backgroundColor: 'white',
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    elevation: 2,
  },
  clienteName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  clienteEmail: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  clienteTotal: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  statusBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
});