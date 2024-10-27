import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToMany } from 'typeorm';
import { Session } from './session.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userName: string;

  @Column()
  name: string;

  @Column({type: 'varchar', length: 14, default: ''})
  phone: string;

  @Column({ unique: true })
  email: string;

  //@Column({ select: false })
  @Column()
  password: string;

  @Column({ default: false })
  isOnline: boolean;

  @Column({ nullable: true, default: '' })
  socketId: string;

  @Column({ nullable: true })
  lastConnected: Date;

  @Column({ default: 'user' })
  role: string; 

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToMany(() => Session, (session) => session.user)
  sessions: Session[]; // Relación bidireccional para acceder a las sesiones de un usuario
}
