import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { Cliente } from "./cliente.entity";
import { Pedido } from "./pedido.entity";
import { MetodoPago } from "../enum/metodo-pago.enum";

@Entity("pago")
export class Pago {

    @PrimaryGeneratedColumn({ name: "id_pago" })
    id_pago: number;

    @ManyToOne(() => Cliente, (cliente) => cliente.pagos)
    @JoinColumn({ name: "id_cliente" })
    cliente: Cliente;

    @ManyToOne(() => Pedido, { nullable: true })
    @JoinColumn({ name: "id_pedido" })
    pedido: Pedido;

    @Column({ type: "date" })
    fecha: Date;

    @Column({ type: "decimal", precision: 10, scale: 2 })
    monto: number;
    
    @Column({

        type: "enum",
        enum: MetodoPago

    })
    metodo_pago: MetodoPago;

    @Column({ nullable: true })
    referencia: string;

}