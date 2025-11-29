import { Controller, Get, Param } from '@nestjs/common';
import { ClientesService } from './clientes.service';
import { MetodoPago } from './enum';

@Controller('clientes/pagos')
export class PagosController {

    constructor(private readonly clientesService: ClientesService) {}

    @Get('cliente/:id')
    findPagosByCliente(@Param('id') id: number) {
        return this.clientesService.findPagosByCliente(id);
    }

    @Get('metodo/:metodo')
    countPagosByMetodo(@Param('metodo') metodo: string){
        const metodoPago = metodo.toUpperCase() as MetodoPago;
        return this.clientesService.countPagosByMetodo(metodoPago);
    }




}