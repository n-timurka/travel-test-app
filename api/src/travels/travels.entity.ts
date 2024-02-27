import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('travels')
export class TravelsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 255 })
  name: string;

  @Column('varchar', { length: 255, unique: true })
  slug: string;

  @Column('text')
  description: string;

  @Column('date', { name: 'starting_date' })
  startingDate: string;

  @Column('date', { name: 'ending_date' })
  endingDate: string;

  @Column('int')
  price: number;

  @Column('tinyint')
  seats: number;

  @Column('tinyint', { default: 0 })
  booked: number;

  @Column('json')
  moods: string;

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
