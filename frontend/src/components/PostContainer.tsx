import React, { ReactNode } from "react";

interface PostContainerProps {
  children?: ReactNode;
  title?: string;
}

export const PostContainer = ({ title, children }: PostContainerProps) => {
  return (
    <div className="w-full my-8">
      <h1 className="text-3xl font-bold">{title || ""}</h1>
      <div className="w-full flex flex-wrap justify-center items-center gap-14 my-8">
        {children}
      </div>
    </div>
  );
};
