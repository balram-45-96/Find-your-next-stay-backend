import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Employee } from './Employees'; // Assuming you have an Employee entity

@Entity('payroll')
export class Payroll {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Employee, employee => employee.id)
  @JoinColumn({ name: 'employee_id' })
  employee: Employee;

  @Column('decimal')
  salary: number;

  @Column('date')
  date: string;

  @Column()
  status: string; // e.g., 'Pending', 'Paid'

  @Column()
  phoneNumber: string;

  @Column('decimal', { nullable: true }) // Bonuses can be optional
  bonuses: number;
}