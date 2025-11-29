import { Controller, Get, Param } from '@nestjs/common';
import { ClientesService } from './clientes.service';

@Controller('clientes/pedidos')
export class PedidosController {

    constructor(private readonly clientesService: ClientesService) {}

    @Get('pendientes')
    findPedidosPendientes() {
        return this.clientesService.findPedidosPendientes();
    }

    @Get('pagos/cliente/:id')
    findPagosByCliente(@Param('id') id: number){
        return this.clientesService.findPagosByCliente(id);
    }

    @Get('total-minimo/:total')
    findPedidosByTotalMinimo(@Param('total') total: number){
        return this.clientesService.findPedidosByTotalMinimo(Number(total));
    }
}