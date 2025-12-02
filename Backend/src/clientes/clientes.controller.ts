import { Controller, Post, Get, Param } from '@nestjs/common';
import { ClientesService } from './clientes.service';


@Controller('clientes')
export class ClientesController {
    constructor(private readonly clientesService: ClientesService) {}

    // endpoint para los mocksss

    @Post('mocks')
    generateMocks() {

        return this.clientesService.generateMockData();

    }

    @Get('generate-mocks')
    generateMocksGet(){

        return this.clientesService.generateMockData();

    }

    //listar clientecitos

    @Get()
    findAll() {

        return this.clientesService.findAll();

    }

    @Get('pedidos/pendientes')
    findPedidosPendientes(){
        return this.clientesService.findPedidosPendientes();
    }

    //@Get('activos')
    //findClientesActivos(){
    //    return this.clientesService.findClientesActivos();
    //}

    @Get(':id/total-pedidos')
    getTotalPedidosByCliente(@Param('id') id: number) {
        return this.clientesService.getTotalPedidosByCliente(id);
    }

    @Get('con-totales')
    findAllClientesWithTotales(){
        return this.clientesService.findAllClientesWithTotales();
    }
}
