import React, { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <main className="flex justify-center items-center h-screen">
      {children}
    </main>
  );
};

export default layout;
