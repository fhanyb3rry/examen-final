import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientesController } from "./clientes.controller";
import { ClientesService } from "./clientes.service";
import { Cliente } from './entities/cliente.entity';
import { Pedido } from './entities/pedido.entity';
import { Pago } from './entities/pago.entity';
import { PedidosController } from './pedidos.controller';
import { PagosController } from './pagos.controller';

@Module({

    imports: [

        TypeOrmModule.forFeature([Cliente, Pedido, Pago])

    ],

    controllers: [ClientesController, PedidosController, PagosController],
    providers: [ClientesService],

})
export class ClientesModule {}
