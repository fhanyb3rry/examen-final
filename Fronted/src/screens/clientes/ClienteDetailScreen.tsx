import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { ClientesStackParams } from '../../navigator/ClientesStackNav';
import { Fab } from '../../components/Fab';
import { clientesService } from '../../services/api';

interface Props extends StackScreenProps<ClientesStackParams, "ClienteDetailScreen"> {};

interface Cliente {
  id_cliente: number;
  nombre: string;
  apellido: string;
  correo: string;
  telefono: string;
  direccion: string;
  fecha_registro: string;
  activo: boolean;
}

export const ClienteDetailScreen = ({ navigation, route }: Props) => {
  const { clienteId } = route.params;
  const [cliente, setCliente] = useState<Cliente | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCliente();
  }, []);

  const loadCliente = async () => {
    try {
      const response = await clientesService.getById(clienteId);
      setCliente(response.data);
    } catch (error) {
      console.error('Error cargando cliente:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Cargando cliente...</Text>
      </View>
    );
  }

  if (!cliente) {
    return (
      <View style={styles.center}>
        <Text>Cliente no encontrado</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {cliente.nombre} {cliente.apellido}
      </Text>
      
      <View style={styles.card}>
        <Text style={styles.label}>ID:</Text>
        <Text style={styles.value}>#{cliente.id_cliente}</Text>
        
        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>{cliente.correo}</Text>
        
        <Text style={styles.label}>Teléfono:</Text>
        <Text style={styles.value}>{cliente.telefono}</Text>
        
        <Text style={styles.label}>Dirección:</Text>
        <Text style={styles.value}>{cliente.direccion}</Text>
        
        <Text style={styles.label}>Fecha de registro:</Text>
        <Text style={styles.value}>{cliente.fecha_registro}</Text>
        
        <Text style={styles.label}>Estado:</Text>
        <Text style={[styles.value, cliente.activo ? styles.active : styles.inactive]}>
          {cliente.activo ? 'ACTIVO' : 'INACTIVO'}
        </Text>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => navigation.navigate("PedidosScreen")}
        >
          <Text style={styles.actionText}>Ver Pedidos</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => navigation.navigate("PagosScreen")} //aqui estaba el error { clienteId })
        >
          <Text style={styles.actionText}>Ver Pagos</Text>
        </TouchableOpacity>
      </View>

      <Fab
        titulo='←'
        position="button_left"
        action={() => navigation.goBack()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#2196F3',
  },
  card: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 15,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    marginBottom: 30,
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
    fontWeight: '600',
  },
  value: {
    fontSize: 16,
    color: '#333',
    marginBottom: 16,
  },
  active: {
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  inactive: {
    color: '#F44336',
    fontWeight: 'bold',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  actionButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    elevation: 3,
  },
  actionText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
});