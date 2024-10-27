import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Table } from './table.entity';

@Entity()
export class Place {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', nullable: true, default: null })
  userId?: number | null;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'varchar', length: 255, nullable: true, default: null })
  address: string;

  @OneToMany(() => Table, (table) => table.place)
  tables: Table[];
}

