import { api } from './api';
import { Pago } from '../types';

export const pagosService = {
    findPagosByCliente: async (id: number): Promise<Pago[]> => {
        try {
            const response = await api.get(`/clientes/pagos/cliente/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error en findPagosByCliente:', error);
            throw error;
        }
    },

    countPagosByMetodo: async (metodo: string): Promise<any> => {
        try {
            const response = await api.get(`/clientes/pagos/metodo/${metodo}`);
            return response.data;
        } catch (error) {
            console.error('Error en countPagosByMetodo:', error);
            throw error;
        }
    }
};