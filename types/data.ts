export interface AuthState {
  signIn: {
    token: string | null;
    error: string | null;
    isLoading: boolean;
  };
  signUp: {
    data: any;
    error: string | null;
    isLoading: boolean;
  };
}

export interface ApplicationData {
  id: number;
  status: string;
  statusId: number;
  companyName: string;
  position: string;
  employmentType: string;
  portal: string;
  offering: string;
  progressDate: string;
}

export interface UpdateApplicationData {
  calendarDate: string;
  progress: string;
  selectedStatus: string;
}
