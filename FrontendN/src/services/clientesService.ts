import { api } from './api';
import { Cliente } from '../types';

export const clientesService = {
    findClientesActivos: async (): Promise<Cliente[]> => {
        try {
            // Usa el endpoint que SÍ existe
            const response = await api.get('/clientes/con-totales'); // ⬅️ Cambia a ESTE
            
            // ⬇️ TRANSFORMA para ELIMINAR 'activo' si viene
            return response.data.map((item: any) => ({
                id_cliente: item.id_cliente,
                nombre: item.nombre,
                apellido: item.apellido,
                correo: item.correo,
                telefono: item.telefono,
                direccion: item.direccion,
                fecha_registro: item.fecha_registro,
                // ⬇️ NO incluyas 'activo' aunque venga en la respuesta
                // total_pedidos: item.total_pedidos, // Si necesitas estos campos
                // cantidad_pedidos: item.cantidad_pedidos,
            }));
        } catch (error) {
            console.error('Error en findClientesActivos:', error);
            throw error;
        }
    },

    findAll: async (): Promise<Cliente[]> => {
        try {
            const response = await api.get('/clientes/con-totales'); // ⬅️ Cambia también aquí
            
            // Misma transformación
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
            
            // Opcional: también quita 'activo' aquí si quieres consistencia
            return response.data.map((item: any) => {
                const { activo, ...rest } = item; // ⬅️ Elimina 'activo'
                return rest;
            });
        } catch (error) {
            console.error('Error en findAllClientesWithTotales:', error);
            throw error;
        }
    }
};