import { Entity, PrimaryGeneratedColumn, Column, OneToMany, Generated } from 'typeorm';
import { User } from './user.entity';
import { Exclude } from 'class-transformer';

@Entity('companies') // Table name
export class Company {
  @PrimaryGeneratedColumn()
  @Exclude()
  id: number;

  @Column({ name: 'company_uuid', length: 36, unique: true })
  @Generated('uuid')
  companyUUid: string;

  @Column({ name: 'company_name', length: 255 })
  companyName: string;

  @Column({ type: 'text', nullable: true })
  address: string;

  // Primary Contact Details
  @Column({ name: 'primary_contact_name', length: 255 })
  primaryContactName: string;

  @Column({ name: 'primary_contact_email', length: 255, unique: true })
  primaryContactEmail: string;

  @Column({ name: 'primary_contact_phone', length: 15, nullable: true })
  primaryContactPhone: string;

  // Billing Details
  @Column({ name: 'billing_contact_name', length: 255, nullable: true })
  billingContactName: string;

  @Column({ name: 'billing_contact_email', length: 255, nullable: true })
  billingContactEmail: string;

  @Column({ name: 'billing_contact_phone', length: 15, nullable: true })
  billingContactPhone: string;

  @Column({
    type: 'enum',
    enum: ['Active', 'Inactive'],
    default: 'Active'
  })
  status: 'Active' | 'Inactive';

  @OneToMany(() => User, user => user.company)
  users: User[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
