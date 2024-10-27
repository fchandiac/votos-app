import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Session {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.sessions)
  user: User; // Relación bidireccional hacia la entidad User

  @Column({ unique: true })
  socketId: string;

  @CreateDateColumn()
  connectedAt: Date;

  @Column({ nullable: true })
  disconnectedAt: Date;
}
