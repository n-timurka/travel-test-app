import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import OrderStatus from '../enums/order-status.enum';
import { TravelsEntity } from '../../travels/travels.entity';

@Entity('orders')
export class OrdersEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', name: 'travel_id' })
  travelId: string;

  @ManyToOne(() => TravelsEntity)
  @JoinColumn({ name: 'travel_id' })
  travel: TravelsEntity;

  @Column('varchar', { length: 255 })
  email: string;

  @Column({ type: 'tinyint', width: 3 })
  seats: number;

  @Column('int')
  total: number;

  @Column({ type: 'enum', enum: OrderStatus, default: OrderStatus.NEW })
  status: OrderStatus;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
