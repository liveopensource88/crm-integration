export interface Account {
  id: string;
  accountName: string;
  email: string;
  url: string;
  phone: string;
}

export interface AccountResponse {
  data: Account[];
}

export interface Ticket {
  id: string;
  assigneeId: string;
  departmentId: string;
  subject: string;
  ticketNumber: string;
  phone: string;
  dueDate: string;
  email: string;
  status: string;
}

export interface TicketResponse {
  data: Ticket[];
}
export interface ConfigurationResponse {
  data: Record<string, string>;
}
export interface Crm {
  id: string;
  name: string;
  description: string;
  image: string;
  status: string;
  isConfigured?: boolean;
}

export interface Config {
  [key: string]: string | number | boolean | null; // Define possible value types
}

export interface CrmResponse {
  data: Crm[];
}

export interface FormResponse {
  data: { name: string; id: string }[];
}
export interface Service {
  name: string;
  policyId: string;
}
export interface CallHistory {
  date: string;
  attendedBy: string;
  communicationMethod: string;
  status: string;
}
