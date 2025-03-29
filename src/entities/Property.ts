import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Client } from './Client';
import { Task } from './Task';

@Entity('properties')
export class Property {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Client, client => client.properties)
  @JoinColumn({ name: 'client_id' })
  client: Client;

  @Column()
  propertyAddress: string;

  @Column({ nullable: true })
  propertyType: string;

  @Column({ nullable: true })
  propertyAmenities: string;

  @Column({ nullable: true })
  noOfPetAllowed: number;

  @OneToMany(() => Task, task => task.property)
  tasks: Task[];

  @Column({ nullable: true })
  specialFeatureStartDate: string;

  @Column({ nullable: true })
  specialFeatureEndDate: string;
}