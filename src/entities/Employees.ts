import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
  } from "typeorm";
  
  @Entity("employees")
  export class Employee {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ nullable: false })
    firstName: string;
  
    @Column({ nullable: false })
    lastName: string;
  
    @Column({ nullable: true })
    jobPosition: string;
  
    @Column({ type: "date", nullable: true })
    startDate: Date;
  
    @Column({ type: "text", nullable: true })
    workHours: string;
  
    @Column({ type: "text", nullable: true })
    qualifications: string;
  
    @Column({ type: "text", nullable: true })
    workExperience: string;
  
    @Column({ type: "text", nullable: true })
    languageSkills: string;
  
    @Column({ type: "text", nullable: true })
    specialSkills: string;
  
    @Column({ type: "text", nullable: true })
    assignmentAreas: string;
  
    @Column({ type: "text", nullable: true })
    medicalInfo: string;
  
    @Column({ type: "text", nullable: true })
    emergencyContacts: string;
  
    @Column({ nullable: true })
    socialSecurityNumber: string;
  
    @Column({ type: "text", nullable: true })
    taxInformation: string;
  
    @Column({ type: "date", nullable: true })
    dateOfBirth: Date;
  
    @Column({ type: "text", nullable: true })
    privateAddress: string;
  
    @Column({ type: "text", nullable: true })
    privatePhoneNumber: string;
  
    @Column({ nullable: true })
    numberOfChildren: number;
  
    @Column({ type: "text", nullable: true })
    childrenBirthDates: string;
  
    @Column({ type: "text", nullable: true })
    salaryDetails: string;
  
    @Column({ type: "text", nullable: true })
    bankAccountInfo: string;
  
    @Column({ type: "text", nullable: true })
    bonusDetails: string;
  
    @Column({ type: "text", nullable: true })
    performanceEvaluations: string;
  
    @Column({ type: "text", nullable: true })
    disciplinaryActions: string;
  
    @Column({ type: "text", nullable: true })
    futurePlans: string;
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
  }
  