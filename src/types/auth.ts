export interface SignupDTO {
  fullname: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface LoginDTO {
  email: string;
  password: string;
}

export interface AuthStateDTO {
  user: any | null; 
  loading: boolean;
  error: string | null;
  token: string | null;
}
