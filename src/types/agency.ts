export interface AgencyContact {
  id?: number;
  firstName: string;
  lastName: string;
  agencyName: string;
  details?: string;
  createdAt?: string;
}

export interface AgencyContactResponse {
  success: boolean;
  message: string;
  data?: AgencyContact | AgencyContact[];
}

