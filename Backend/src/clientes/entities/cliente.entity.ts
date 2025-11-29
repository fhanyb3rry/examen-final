import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Pedido } from "./pedido.entity";
import { Pago } from "./pago.entity";

@Entity("cliente")
export class Cliente {

    @PrimaryGeneratedColumn({ name: "id_cliente" })
    id_cliente!: number;

    @Column()
    nombre!: string;

    @Column()
    apellido!: string;

    @Column()
    correo!: string;

    @Column()
    telefono!: string;

    @Column()
    direccion!: string;

    @Column ({ type: "date" })
    fecha_registro: Date;

    @Column({ default: "true" })
    activo: boolean;

    @OneToMany(() => Pedido, (pedido) => pedido.cliente )
    pedidos: Pedido[];

    @OneToMany(() => Pago, (pago) => pago.cliente)
    pagos: Pago[];

}
