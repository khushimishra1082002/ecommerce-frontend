import React, { ReactNode } from "react";

interface ErrorMessagessProps {
  children: ReactNode;
}

const ErrorMessagess: React.FC<ErrorMessagessProps> = ({ children }) => {
  return (
    <div className="font-body text-sm text-orange-600">
      {children}
    </div>
  );
};

export default ErrorMessagess;
