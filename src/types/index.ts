// Database Types
export interface Company {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zip_code: string;
  phone: string;
  email: string;
  website: string;
  created_at: string;
  updated_at: string;
}

export interface Location {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zip_code: string;
  country: string;
  criticality: string;
  created_at: string;
  updated_at: string;
  company_id: string;
}

export interface Circuit {
  id: string;
  carrier: string;
  type: string;
  purpose: string;
  status: string;
  bandwidth: string;
  monthlycost: number;
  static_ips: number;
  upload_bandwidth: string;
  contract_start_date: string;
  contract_term: number;
  contract_end_date: string;
  billing: string;
  usage_charges: boolean;
  installation_cost: number;
  notes: string;
  location_id: string;
}

// Component Props Types
export interface DashboardCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  description?: string;
}

export interface TableProps<T> {
  data: T[];
  columns: {
    header: string;
    accessorKey: keyof T;
    cell?: (value: any) => React.ReactNode;
  }[];
  onRowClick?: (row: T) => void;
}

export interface UserProfile {
  id: string;
  user_id: string;
  is_admin: boolean;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  phone: string | null;
  address: string | null;
  created_at: string;
  updated_at: string;
}

export interface CompanyFormData {
  name: string;
  address: string;
  city: string;
  state: string;
  zip_code: string;
  phone: string;
  email: string;
  website?: string;
}