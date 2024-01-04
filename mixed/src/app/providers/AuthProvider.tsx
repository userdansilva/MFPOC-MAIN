"use client";

import { ReactNode, createContext } from "react";
import axios from "axios";
import useSWR from "swr";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_MAIN_MF_URL,
  withCredentials: true,
});

export const AuthContext = createContext<AuthContextProps>({});

const fetcher = (url: string) => api.post(url)

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  useSWR("/api/_/verify", fetcher, {
    refreshInterval: 20 * 1000, // 20s
  });

  return (
    <AuthContext.Provider value={{}}>
      {children}
    </AuthContext.Provider>
  )
}

/** types */
type AuthContextProps = {
}

type AuthProviderProps = {
  children: ReactNode;
}
