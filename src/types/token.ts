export interface TokenPayload {
  id: string;
  name: string;
  email: string;
  role?: string; 
  exp?: number;
  iat?: number;
}
