// types.ts

export interface User {
    id: string;
    email: string;
    password: string;
    name?: string | null;
    createdAt: Date;
    updatedAt: Date;
    customers: Customer[];
  }
  
  export interface Customer {
    id: string;
    name: string;
    email?: string | null;
    phone?: string | null;
    address?: string | null;
    externalCustomerId?: string | null;
    createdAt: Date;
    updatedAt: Date;
    invoices: Invoice[];
    userId: string;
    user: User;
  }
  
  export interface Invoice {
    id: string;
    invoiceNumber: string;
    externalInvoiceId?: string | null;
    amount: number;
    dueDate: Date;
    status: "Pending" | "Paid" | "Past Due";
    createdAt: Date;
    updatedAt: Date;
    customerId: string;
    customer: Customer;
    logs: InvoiceLog[];
  }
  
  export interface InvoiceLog {
    id: string;
    invoiceId: string;
    invoice: Invoice;
    changedField: string;
    oldValue?: string | null;
    newValue?: string | null;
    createdAt: Date;
  }
  