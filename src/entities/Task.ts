import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Property } from './Property';

@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Property, property => property.tasks)
  @JoinColumn({ name: 'property_id' })
  property: Property;

  @Column()
  taskCategory: string;

  @Column()
  taskName: string;

  @Column()
  taskDescription: string;

  @Column('decimal')
  taskPrice: number;

  @Column()
  cleaningRequirements: string;
}