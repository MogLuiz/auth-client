import React, { createContext, ReactNode } from "react";
import { api } from "../services/api";

type TSignInCredentials = {
  email: string;
  password: string;
};

type TAuthContextData = {
  signIn(credentials: TSignInCredentials): Promise<void>;
  isAuthenticated: boolean;
};

type TAuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext({} as TAuthContextData);

export const AuthProvider = ({ children }: TAuthProviderProps) => {
  const isAuthenticated = false;

  const signIn = async ({ email, password }: TSignInCredentials) => {
    try {
      const response = await api.post("sessions", {
        email,
        password,
      });
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <AuthContext.Provider value={{ signIn, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
