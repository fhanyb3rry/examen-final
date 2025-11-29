import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { Cliente } from "./cliente.entity";
import { EstatusPedido } from "../enum/estatus-pedido.enum";

@Entity("pedido")
export class Pedido {

    @PrimaryGeneratedColumn({ name: "id_pedido" })
    id_pedido: number;

    @ManyToOne(() => Cliente, (cliente) => cliente.pedidos)
    @JoinColumn({ name: "id_cliente" })
    cliente: Cliente;

    @Column({ type: "date" })
    fecha: Date;

    @Column({ type: "decimal", precision: 10, scale: 2 })
    total: number;

    @Column({

        type: "enum",
        enum: EstatusPedido,
        default: EstatusPedido.PENDIENTE

    })
    estatus: EstatusPedido;
}


