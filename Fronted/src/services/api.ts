import axios from "axios";

export const myApi = axios.create();

export const clientesService = {
    getAll: () => myApi.get("http://localhost:3000/api/clientes"),
    getActivos: () => myApi.get("http://localhost:3000/api/clientes/activos"),
    getWithTotales: () => myApi.get("http://localhost:3000/api/clientes/con-totales"),
    getById: (id: number) => myApi.get(`http://localhost:3000/api/clientes/${id}`),
    getTotalPedidos: (id: number) => myApi.get(`http://localhost:3000/api/clientes/${id}/total-pedidos`),
};

export const pedidosService = {
    getPendientes: () => myApi.get("http://localhost:3000/api/clientes/pedidos/pendientes"),
    getByTotalMinimo: (total: number) => myApi.get(`http://localhost:3000/api/clientes/pedidos/total-minimo/${total}`),
};

export const pagosService = {
    getByCliente: (id: number) => myApi.get(`http://localhost:3000/api/clientes/pagos/cliente/${id}`),
    countByMetodo: (metodo: string) => myApi.get(`http://localhost:3000/api/clientes/pagos/metodo/${metodo}`),
};

export const mockService = {
    generateMockData: () => myApi.post("http://localhost:3000/api/clientes/generate-mocks"),
};