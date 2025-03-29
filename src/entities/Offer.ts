import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Client } from './Client';
import { Property } from './Property';
import { Task } from './Task';

@Entity('offers')
export class Offer {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Client, client => client.id)
  @JoinColumn({ name: 'client_id' })
  client: Client;

  @ManyToOne(() => Property, property => property.id)
  @JoinColumn({ name: 'property_id' })
  property: Property;

  @OneToMany(() => Task, task => task.id)
  tasks: Task[];

  @Column('decimal')
  totalAmount: number;

  @Column({ type: 'int' }) // Or appropriate type for total time
  totalTime: number; // Store total time in a consistent unit (e.g., days, hours, minutes)

  @Column({ nullable: true, type: 'decimal' }) // Discount can be optional
  discount: number;

  @Column({ nullable: true })
  commentEndDate: string;

  @Column({ nullable: true })
  status: string;

  @Column({ nullable: true })
  comment: string;

    @Column({ nullable: true })
    offerEmail: string;

    @Column({ nullable: true })
    offerPhone: string;
}