import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  UpdateDateColumn,
} from 'typeorm';
import { Place } from './place.entity';

@Entity()
export class Table {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', unique: true })
  number: number;

  @Column({ type: 'int', nullable: true, default: null })
  userId?: number | null;

  @Column({ type: 'int', default: 0 })
  ojeda?: number;

  @Column({ type: 'int', default: 0 })
  castro?: number;

  @Column({ type: 'int', default: 0 })
  abasolo?: number;

  @Column({ type: 'int', default: 0 })
  blanks?: number;

  @Column({ type: 'int', default: 0 })
  nulls?: number;

  @ManyToOne(() => Place, (place) => place.tables) // Asegúrate de que la relación esté definida
  place: Place;

  @UpdateDateColumn()
  updatedAt: Date;
}
