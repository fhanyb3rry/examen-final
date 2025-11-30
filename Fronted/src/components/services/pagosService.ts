import { myApi } from './api';
import { Pago } from '../types';

export const pagosService = {

    findPagosByCliente: (id: number): Promise<Pago[]> =>
        myApi.get(`http://localhost:3000/api/clientes/pagos/cliente/${id}`).then(response => response.data),

    countPagosByMetodo: (metodo: string): Promise<any> =>
        myApi.get(`http://localhost:3000/api/clientes/pagos/metodo/${metodo}`).then(response => response.data)

};