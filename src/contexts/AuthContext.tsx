import React, { createContext, ReactNode, useState } from "react";
import { api } from "../services/api";

type TUser = {
  email: string;
  permissions: string[];
  roles: string[];
};

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
  const [user, setUser] = useState<TUser>();
  const isAuthenticated = false;

  const signIn = async ({ email, password }: TSignInCredentials) => {
    try {
      const response = await api.post("sessions", {
        email,
        password,
      });

      const { permissions, roles } = response.data;

      setUser({ email, permissions, roles });
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
