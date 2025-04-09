// src/entities/user.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Generated } from 'typeorm';
import { Company } from './company.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_uuid', length: 36, unique: true })
  @Generated('uuid')
  userUUid: string;

  @Column({ length: 255 })
  name: string;

  @Column({ length: 255, unique: true })
  email: string;

  @Column({ name: 'password_hash', length: 255 })
  passwordHash: string;

  @Column({
    type: 'enum',
    enum: ['Superadmin', 'Admin', 'Supervisor', 'Agent']
  })
  role: 'Superadmin' | 'Admin' | 'Supervisor' | 'Agent';

  @ManyToOne(() => Company, company => company.users, { onDelete: 'CASCADE' })
  company: Company;

  @Column({ name: 'created', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({
    name: 'modified',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP'
  })
  updatedAt: Date;
}
