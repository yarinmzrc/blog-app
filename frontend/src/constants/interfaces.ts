import { FormEvent, ReactNode } from "react";
import { PostCategory } from "./constants";

//components interfaces

export interface TForm {
  handleOnSubmit: (e: FormEvent) => void;
  children: ReactNode;
  styles?: string;
}

export interface TInput {
  placeholder: string;
  type: string;
  id: string;
  value: string;
  onChange: (e: FormEvent<HTMLInputElement>) => void;
}

export interface TButton {
  typeBtn: string | null;
  handleClick?: (e: FormEvent) => void;
  children: ReactNode;
}

export interface TLabel {
  htmlFor: string;
  children: ReactNode;
}

//slice interfaces
export interface userInterface {
  name?: string;
  email?: string;
  _id?: string;
}

export interface TUserSignUp {
  name: string;
  email: string;
  password: string;
}

export interface TMessage {
  data: string;
  isError: boolean;
}

export interface userState {
  user: userInterface | null;
  token: string | null;
  message: TMessage | null;
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

export interface TPostUserDetails {
  _id: string;
  name: string;
}

export interface TPostCard {
  post: TPost;
}

export interface TComment {
  _id: string;
  text: string;
  createdAt: string;
  userId: TPostUserDetails;
  postId: string;
}

export interface TAddComment {
  postId: string;
  userId: string;
  text: string;
}

export interface TGetPostResponse {
  post: TPost;
  comments: TComment[];
}

export interface TPost {
  _id: string;
  body: string;
  image: string;
  title: string;
  category: PostCategory;
  createdAt: string;
  updatedAt: string;
  userId: TPostUserDetails;
}

export interface TEditFormInfo {
  title: string;
  body: string;
  image: string;
}

export interface TEditPostQuery extends TEditFormInfo {
  postId: string;
}
