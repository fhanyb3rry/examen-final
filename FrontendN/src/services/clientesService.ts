import { api } from './api';
import { Cliente } from '../types';

export const clientesService = {
    findClientesActivos: async (): Promise<Cliente[]> => {
        try {
            
            const response = await api.get('/clientes/con-totales'); 
            
            
            return response.data.map((item: any) => ({
                id_cliente: item.id_cliente,
                nombre: item.nombre,
                apellido: item.apellido,
                correo: item.correo,
                telefono: item.telefono,
                direccion: item.direccion,
                fecha_registro: item.fecha_registro,
                

            }));
        } catch (error) {
            console.error('Error en findClientesActivos:', error);
            throw error;
        }
    },

    findAll: async (): Promise<Cliente[]> => {
        try {
            const response = await api.get('/clientes/con-totales'); 
            
            
            return response.data.map((item: any) => ({
                id_cliente: item.id_cliente,
                nombre: item.nombre,
                apellido: item.apellido,
                correo: item.correo,
                telefono: item.telefono,
                direccion: item.direccion,
                fecha_registro: item.fecha_registro,
            }));
        } catch (error) {
            console.error('Error en findAll:', error);
            throw error;
        }
    },

    getTotalPedidosByCliente: async (id: number): Promise<any> => {
        try {
            const response = await api.get(`/clientes/${id}/total-pedidos`);
            return response.data;
        } catch (error) {
            console.error('Error en getTotalPedidosByCliente:', error);
            throw error;
        }
    },

    findAllClientesWithTotales: async (): Promise<any[]> => {
        try {
            const response = await api.get('/clientes/con-totales');
            
            
            return response.data.map((item: any) => {
                const { activo, ...rest } = item; 
                return rest;
            });
        } catch (error) {
            console.error('Error en findAllClientesWithTotales:', error);
            throw error;
        }
    }
};