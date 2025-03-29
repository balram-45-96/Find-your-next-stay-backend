import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './User';

@Entity('invoices') // Specify the table name (optional, defaults to class name)
export class Invoice {

  @PrimaryGeneratedColumn() // Use uuid for a universally unique ID
  id: string;

  @Column()
  propertyName: string;

  @Column()
  houseNo: string;

  @Column('date')
  date: string; // Or Date type if you prefer

  @Column('time')
  time: string; // Or Date type if you want to store date and time together

  @Column()
  phoneNumber: string;

  @Column({ unique: true }) // Make invoice number unique
  invoiceNumber: string;

  @Column({ nullable: true }) // Make todayWorkTime nullable
  todayWorkTime: string;

  @Column('decimal')
  amount: number;

  @ManyToOne(() => User, user => user.assignedInvoices) // Relationship with User (Assign By)
  @JoinColumn({ name: 'assigned_by' }) // Specify the foreign key column name
  assignBy: User;

  @Column('date')
  dueDate: string;

  @ManyToOne(() => User, user => user.completedInvoices) // Relationship with User (Complete By)
  @JoinColumn({ name: 'completed_by' }) // Specify the foreign key column name
  completeBy: User;

  @Column({ type: 'text', nullable: true }) // Use text type for longer notes
  note: string;
}