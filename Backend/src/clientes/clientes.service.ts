import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cliente } from './entities/cliente.entity';
import { Pedido } from './entities/pedido.entity';
import { Pago } from './entities/pago.entity';
import { EstatusPedido } from './enum/estatus-pedido.enum';
import { MetodoPago } from './enum/metodo-pago.enum';

@Injectable()
export class ClientesService {

    constructor(

        @InjectRepository(Cliente)
        private readonly clienteRepo: Repository<Cliente>,
        @InjectRepository(Pedido)
        private readonly pedidoRepo: Repository<Pedido>,
        @InjectRepository(Pago)
        private readonly pagoRepo: Repository<Pago>,

    ) {}

    //listar pagos

    async findAll() {

        return await this.clienteRepo.find({

            relations: ['pedidos', 'pagos'],
            order: { id_cliente: 'ASC' }

        });
    }

    async generateMockData() {

        //clin clinnn

        await this.pagoRepo.createQueryBuilder().delete().execute();
        await this.pedidoRepo.createQueryBuilder().delete().execute();
        await this.clienteRepo.createQueryBuilder().delete().execute();

        //50 clientes para comenzar :)

        const clientes = this.generateClientes(100);
        const savedClientes = await this.clienteRepo.save(clientes);

        //200 pedidos :)

        const pedidos = this.generatePedidos(200, savedClientes);
        const savedPedidos = await this.pedidoRepo.save(pedidos);

        //150 pagos :3

        const pagos = this.generatePagos(150, savedClientes, savedPedidos);
        await this.pagoRepo.save(pagos);

        return {

            message: 'Datos generados :)',
            clientes: savedClientes.length,
            pedidos: savedPedidos.length,
            pagos: pagos.length,
        };
    }

    private generateClientes(cantidad: number): Partial<Cliente>[] {

        const nombres = ["Stephany", "Edith", "Giovanni", "Ximena", "Alexa", "Marlon", "Karol", "Santiago", "Emilio", "Aranza", "Cris", "Alejandra"];
        const apellidos = ['García', 'Martínez', 'López', 'González', 'Rodríguez', 'Pérez', 'Sánchez', 'Ramírez', 'Torres', 'Flores'];
        
        const clientes: Partial<Cliente>[] = [];

        for (let i = 1; i <= cantidad; i++) {

            const nombre = nombres[Math.floor(Math.random() * nombres.length)];
            const apellido = apellidos[Math.floor(Math.random() * apellidos.length)];

            clientes.push({

                nombre: nombre,
                apellido: apellido,
                correo: `${nombre.toLowerCase()}.${apellido.toLowerCase()}${i}@gmail.com`,
                telefono: `+52 55 ${Math.floor(1000 + Math.random() * 9000)} ${Math.floor(1000 + Math.random() * 9000)}`,
                direccion: `Av. ${apellido} #${i}, Col. Centro, CDMX`,
                fecha_registro: new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1),
                activo: Math.random() > 0.1,

            });
        }

        return clientes;

    }
    
    private generatePedidos(cantidad: number, clientes: Cliente[]): Partial<Pedido>[] {

        const pedidos: Partial<Pedido>[] = [];
        const estatuses = Object.values(EstatusPedido);

        for (let i = 1; i <= cantidad; i++){

            const cliente = clientes[Math.floor(Math.random() * clientes.length)];

            pedidos.push({

                cliente: cliente,
                fecha: new Date(2024, i % 12, (i % 28) + 1),
                total: Math.random() * 1000 + 50,
                estatus: estatuses[Math.floor(Math.random() * estatuses.length)],

            });
        }

        return pedidos;

    }

    private generatePagos(cantidad: number, clientes: Cliente[], pedidos: Pedido[]): Partial<Pago>[] {

        const pagos: Partial<Pago>[] = [];
        const metodos = Object.values(MetodoPago);

        for (let i = 1; i <= cantidad; i++){

            const cliente = clientes[Math.floor(Math.random() * clientes.length)];
            const pedido = Math.random() > 0.3 ? pedidos[Math.floor(Math.random() * pedidos.length)] : null;

        pagos.push({

            cliente: cliente,
            pedido: pedido,
            fecha: new Date(2024, i % 12, (i % 28) + 1),
            monto: Math.random() * 500 + 20,
            metodo_pago: metodos[Math.floor(Math.random() * metodos.length)],
            referencia: `REF-${Date.now()}-${i}`,

        });
    }

    return pagos;

    }

    async findPedidosPendientes() {

        return await this.pedidoRepo.find({
            where:{
                estatus: EstatusPedido.PENDIENTE
            },
            relations: ['cliente'],
            order: { fecha: 'DESC' }
        });
    }

    async findClientesActivos() {
        return await this.clienteRepo.find({
            where: {
                activo: true
            },
            order: { nombre: 'ASC' }
        });
    }

    async findPagosByCliente(idCliente: number) {

        return await this.pagoRepo.find({

            where: {

                cliente: { id_cliente: idCliente }

            },

            relations: ['cliente', 'pedido'],
            order: { fecha: 'DESC' }

        });
    }
    
    async countPagosByMetodo(metodoPago: MetodoPago) {
        const count = await this.pagoRepo.count({
            where: {
                metodo_pago: metodoPago
            }
        });

        return {
            metodo_pago: metodoPago,
            total_pagos: count,
            mensaje: `Se encontraron ${count} pagos realizados con ${metodoPago.toLowerCase()}`
        };
    }

    async findPedidosByTotalMinimo(totalMinimo: number) {
        return await this.pedidoRepo
        .createQueryBuilder('pedido')
        .leftJoinAndSelect('pedido.cliente', 'cliente')
        .where('pedido.total > :totalMinimo', { totalMinimo })
        .orderBy('pedido.total', 'DESC')
        .getMany();
    }

    async getTotalPedidosByCliente(idCliente: number){
        const result = await this.pedidoRepo
        .createQueryBuilder('pedido')
        .select('SUM(pedido.total)', 'total_pedidos')
        .addSelect('COUNT(pedido.id_pedido)', 'cantidad_pedidos')
        .where('pedido.cliente.id_cliente = :idCliente', { idCliente })
        .getRawOne();

        const cliente = await this.clienteRepo.findOne({
            where: { id_cliente: idCliente }
        });

        return {
            cliente: {
                id_cliente: cliente.id_cliente,
                nombre: cliente.nombre,
                apellido: cliente.apellido
            },
            total_pedidos: parseFloat(result.total_pedidos) || 0,
            cantidad_pedidos: parseInt(result.cantidad_pedidos) || 0,
            promedio_pedido: parseFloat(result.total_pedidos) / parseInt(result.cantidad_pedidos) || 0
        };
    }

    async findAllClientesWithTotales(){
        const clientes = await this.clienteRepo.find({
            order: { nombre: 'ASC' }
        });

        const clientesConTotales = await Promise.all(
            clientes.map(async (cliente) => {
                const totales = await this.pedidoRepo
                .createQueryBuilder('pedido')
                .select('SUM(pedido.total)', 'total_pedidos')
                .addSelect('COUNT(pedido.id_pedido)', 'cantidad_pedidos')
                .where('pedido.cliente.id_cliente = :idCliente', { idCliente: cliente.id_cliente })
                .getRawOne();

                return{
                    ...cliente,
                    total_pedidos: parseFloat(totales.total_pedidos) || 0,
                    cantidad_pedidos: parseInt(totales.cantidad_pedidos) || 0,
                    promedio_pedido: parseFloat(totales.total_pedidos) / parseInt(totales.cantidad_pedidos) || 0
                };
            })  
        );

        return clientesConTotales;

    }
    
    }





