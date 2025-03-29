import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Property } from './Property';

@Entity('clients')
export class Client {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  clientName: string;

  @Column({ nullable: true })
  clientEmail: string;

  @Column({ nullable: true })
  clientAddress: string;

  @Column({ nullable: true })
  clientPhoneNumber: string;

  @OneToMany(() => Property, property => property.client)
  properties: Property[];
}