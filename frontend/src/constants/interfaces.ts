import { FormEvent, ReactNode } from "react";

//components interfaces

export interface TForm {
  handleOnSubmit: (e: FormEvent) => void;
  children: ReactNode;
}

export interface TInput {
  placeholder: string;
  type: string;
  id: string;
  value: string;
  onChange: (e: FormEvent<HTMLInputElement>) => void;
}

export interface TLabel {
  htmlFor: string;
  children: ReactNode;
}

//slice interfaces
export interface userInterface {
  name?: string;
  email?: string;
}

export interface TUserSignUp {
  name: string;
  email: string;
  password: string;
}

export interface userState {
  user: userInterface | null;
  token: string | null;
}

export interface TLoginUser {
  email: string;
  password: string;
}

export interface TRequireAuthResponse {
  name: string;
  email: string;
  id: string;
  password: string;
}

export interface TProtectedRoute {
  children?: ReactNode;
}
