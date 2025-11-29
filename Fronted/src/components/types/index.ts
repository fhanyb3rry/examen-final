export interface Cliente {

    id_cliente: number;
    nombre: string;
    apellido: string;
    correo: string;
    telefono: string;
    direccion: string;
    fecha_registro: string;
    activo: boolean;
    pedidos?: Pedido[];
    pagos?: Pago[];

}

export interface Pedido {

    id_pedido: number;
    id_cliente: number;
    fecha: string;
    total: number;
    estatus: 'PENDIENTE' | 'ENVIADO' | 'ENTREGADO' | 'CANCELADO';

}

export interface Pago {

    id_pago: number;
    id_cliente: number;
    id_pedido?: number;
    fecha: string;
    monto: number;
    metodo_pago: 'TARJETA' | 'EFECTIVO' | 'TRANSFERENCIA';
    referencia: string;

}