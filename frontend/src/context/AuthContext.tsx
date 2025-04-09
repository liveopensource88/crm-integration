import { createContext } from 'react';
import { AuthenticationResultType } from '@aws-sdk/client-cognito-identity-provider';

export interface AuthContextType {
  isAuthenticated: boolean;
  idToken: string | null;
  userId: string | null;
  login: (username: string, password: string) => Promise<AuthenticationResultType | null>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
