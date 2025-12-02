import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ClientesModule } from "./clientes/clientes.module";

@Module({

    imports: [

        TypeOrmModule.forRoot({

            type: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'postgres',
            password: 'pass',
            database: 'sistema_clientes',
            entities: [__dirname + '/**/*.entity{.ts,.js}'],
            synchronize: true,
            dropSchema: true

        }),

        ClientesModule,

    ],
})
export class AppModule {}