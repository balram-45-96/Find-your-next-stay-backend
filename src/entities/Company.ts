import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Company {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  companyName: string;

  @Column()
  address: string;

  @Column()
  contactEmail: string;

  @Column()
  phoneNumber: string;

  @Column()
  subscriptionPlan: string;

  @Column()
  subscriptionStartDate: Date;

  @Column()
  subscriptionEndDate: Date;

  @Column()
  paymentFrequency: string;

  @Column()
  licenseNo: string;

  @Column()
  licenseExpiryDate: Date;

  @Column()
  adminName: string;

  @Column()
  adminEmail: string;

  @Column()
  password: string;  // Store the password (hashed) here

  @Column({type: "text", nullable: true })
  otp?: string | null;

  @Column({ type: 'timestamp', nullable: true })
  otpExpiration?: Date | null;
}
