import React, { createContext, ReactNode } from "react";

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
    console.log(email, password);
  };

  return (
    <AuthContext.Provider value={{ signIn, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
