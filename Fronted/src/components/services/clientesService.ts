import { myApi } from './api';
import { Cliente } from '../types';

export const clientesService = {

    findAll: (): Promise<Cliente[]> =>
        myApi.get('http://localhost:3000/api/clientes').then(response => response.data),

    findClientesActivos: (): Promise<Cliente[]> =>
        myApi.get('http://localhost:3000/api/clientes/activos').then(response => response.data),

    getTotalPedidosByCliente: (id: number): Promise<any> =>
        myApi.get(`http://localhost:3000/api/clientes/${id}/total-pedidos`).then(response => response.data),

    findAllClientesWithTotales: (): Promise<any[]> =>
        myApi.get('http://localhost:3000/api/clientes/con-totales').then(response => response.data)

};