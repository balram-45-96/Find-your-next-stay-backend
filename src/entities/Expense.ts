import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Employee } from './Employees'; // Import your Employee entity

@Entity('expenses')
export class Expense {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @Column('decimal')
  amount: number;

  @Column('date')
  date: string;

  @Column()
  status: string;

    @Column()
    phoneNumber: string;

  @ManyToOne(() => Employee, employee => employee.id) // Use Employee entity
  @JoinColumn({ name: 'employee_id' }) // Foreign key column
  employee: Employee; 
}