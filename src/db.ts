import { DataSource, Repository } from 'typeorm';
import { SuperAdmin } from './entities/SuperAdmin';
import { Company } from './entities/Company';
import { Employee } from './entities/Employees';
import { Expense } from './entities/Expense';
import { Invoice } from './entities/Invoice';
import { Payroll } from './entities/Payroll';

export let superAdminRepo: Repository<SuperAdmin>;
export let companyRepository: Repository<Company>;
export let employeeRepository: Repository<Employee>;
export let invoiceRepository: Repository<Invoice>; // Add invoiceRepository initialization here if needed
export let expenseRepository: Repository<Expense>; // Add expenseRepository initialization here if needed
export let payrollRepository: Repository<Payroll>; // Add taxRep

// This function initializes the repositories using the new DataSource
export function initialize(dataSource: DataSource) {
  superAdminRepo = dataSource.getRepository(SuperAdmin);
  companyRepository = dataSource.getRepository(Company);
  expenseRepository = dataSource?.getRepository(Expense);
  invoiceRepository = dataSource?.getRepository(Invoice);
  payrollRepository = dataSource?.getRepository(Payroll);
  employeeRepository = dataSource.getRepository(Employee); // Add employeeRepository initialization here if needed
}


export function getSuperAdminRepo() {
  return superAdminRepo;
}


export function getCompanyRepository() {
  // You can create a new function to get the company repository here
  return companyRepository;
}

export function getEmployeeRepository() {
  return employeeRepository;
}