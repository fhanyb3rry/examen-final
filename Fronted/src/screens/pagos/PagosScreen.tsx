import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { ClientesStackParams } from '../../navigator/ClientesStackNav';
import { Fab } from '../../components/Fab';

interface Props extends StackScreenProps<ClientesStackParams, "PagosScreen"> {};

export const PagosScreen = ({ navigation }: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pantalla de Pagos</Text>
      <Text style={styles.subtitle}>Lista de pagos</Text>
      
      <Fab
        titulo='←'
        position="button_left"
        action={() => navigation.goBack()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});