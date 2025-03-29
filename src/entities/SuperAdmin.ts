// src/entities/SuperAdmin.ts
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class SuperAdmin {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  // Make otp nullable
  @Column({ type: "text", nullable: true })
  otp?: string | null; // This can now be either a string or null

  @Column({ type: "timestamp", nullable: true })
  otpExpiration: Date | null; // This can now also be null
}
