import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Pedido } from './pedido.entity';
import { Pago } from './pago.entity';

@Entity('clientes')
export class Cliente {
  @PrimaryGeneratedColumn({ name: 'id_cliente' })
  id_cliente: number;

  @Column({ length: 100 })
  nombre: string;

  @Column({ length: 100 })
  apellido: string;

  @Column({ length: 150, unique: true })
  correo: string;

  @Column({ length: 20 })
  telefono: string;

  @Column({ length: 200 })
  direccion: string;

  @Column({ name: 'fecha_registro', type: 'date' })
  fecha_registro: Date;

  // ⬇ QUITAR COMPLETAMENTE ESTE CAMPO ⬇
  // @Column({ type: 'boolean', default: true })
  // activo: boolean;

  @OneToMany(() => Pedido, (pedido) => pedido.cliente)
  pedidos: Pedido[];

  @OneToMany(() => Pago, (pago) => pago.cliente)
  pagos: Pago[];
}
