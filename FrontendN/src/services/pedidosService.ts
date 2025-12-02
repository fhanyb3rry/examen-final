import { api } from './api';
import { Pedido } from '../types';

export const pedidosService = {
    findPedidosPendientes: async (): Promise<Pedido[]> => {
        try {
            const response = await api.get('/clientes/pedidos/pendientes');
            return response.data;
        } catch (error) {
            console.error('Error en findPedidosPendientes:', error);
            throw error;
        }
    },

    findPedidosByTotalMinimo: async (total: number): Promise<Pedido[]> => {
        try {
            const response = await api.get(`/clientes/pedidos/total-minimo/${total}`);
            return response.data;
        } catch (error) {
            console.error('Error en findPedidosByTotalMinimo:', error);
            throw error;
        }
    }
};