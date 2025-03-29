import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Invoice } from './Invoice';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  username: string;

  // ... other user fields

  @OneToMany(() => Invoice, invoice => invoice.assignBy)
  assignedInvoices: Invoice[];

  @OneToMany(() => Invoice, invoice => invoice.completeBy)
  completedInvoices: Invoice[];
}