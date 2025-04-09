import React, { useState, useEffect, useRef } from 'react';
import { AuthContext } from './AuthContext'; // Import the AuthContext from the separate file
import { AuthenticationResultType } from '@aws-sdk/client-cognito-identity-provider';
import {
  CognitoIdentityProviderClient,
  InitiateAuthCommand,
  InitiateAuthCommandInput
} from '@aws-sdk/client-cognito-identity-provider';
import { Toast } from 'primereact/toast';
import { AWS_CONFIG } from '@/config';
import axiosInstance from '@/utils/axios';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<{
    isAuthenticated: boolean;
    idToken: string | null;
    userId: string | null;
  }>({
    isAuthenticated: localStorage.getItem('isAuthenticated') === 'true',
    idToken: localStorage.getItem('idToken') || null,
    userId: localStorage.getItem('userId') || null
  });

  const toast = useRef<Toast>(null);
  const cognitoClient = new CognitoIdentityProviderClient({ region: AWS_CONFIG.Auth.region });

  const login = async (
    username: string,
    password: string
  ): Promise<AuthenticationResultType | null> => {
    const params: InitiateAuthCommandInput = {
      AuthFlow: 'USER_PASSWORD_AUTH',
      ClientId: AWS_CONFIG.Auth.userPoolClientId,
      AuthParameters: {
        USERNAME: username,
        PASSWORD: password
      }
    };

    try {
      const command = new InitiateAuthCommand(params);
      const authResult = await cognitoClient.send(command);
      console.log(authResult);
      if (authResult.AuthenticationResult) {
        const { IdToken } = authResult.AuthenticationResult;

        if (IdToken) {
          const decodedToken = JSON.parse(atob(IdToken.split('.')[1]));
          const userId = decodedToken.sub;

          setAuthState({
            isAuthenticated: true,
            idToken: IdToken,
            userId
          });

          localStorage.setItem('isAuthenticated', 'true');
          localStorage.setItem('idToken', IdToken);
          localStorage.setItem('userId', userId);

          axiosInstance.defaults.headers['Authorization'] = IdToken;
          axiosInstance.defaults.headers['User-ID'] = userId;

          return authResult.AuthenticationResult;
        }
      }
      return null;
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Authentication failed.';
      toast.current?.show({ severity: 'error', detail: errorMessage });
      throw new Error(errorMessage);
    }
  };

  const logout = () => {
    setAuthState({
      isAuthenticated: false,
      idToken: null,
      userId: null
    });

    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('idToken');
    localStorage.removeItem('userId');
    delete axiosInstance.defaults.headers['Authorization'];
    delete axiosInstance.defaults.headers['User-ID'];
  };

  useEffect(() => {
    if (authState.idToken) {
      axiosInstance.defaults.headers['Authorization'] = authState.idToken;
    } else {
      delete axiosInstance.defaults.headers['Authorization'];
    }
    if (authState.userId) {
      axiosInstance.defaults.headers['User-ID'] = authState.userId;
    } else {
      delete axiosInstance.defaults.headers['User-ID'];
    }
  }, [authState]);

  return (
    <AuthContext.Provider value={{ ...authState, login, logout }}>
      <Toast ref={toast} />
      {children}
    </AuthContext.Provider>
  );
};
