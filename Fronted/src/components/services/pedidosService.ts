import { myApi } from './api';
import { Pedido } from '../types';

export const pedidosService = {

    findPedidosPendientes: (): Promise<Pedido[]> =>
        myApi.get('http://localhost:3000/api/clientes/pedidos/pendientes').then(response => response.data),

    findPedidosByTotalMinimo: (total: number): Promise<Pedido[]> =>
        myApi.get(`http://localhost:3000/api/clientes/pedidos/total-minimo/${total}`).then(response => response.data)

};