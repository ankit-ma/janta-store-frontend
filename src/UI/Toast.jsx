import React, { useEffect, useState } from "react";

const Toast = ({ message, onClose }) => {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => prev - 1);
    }, 10);

    const timeout = setTimeout(() => {
      onClose();
    }, 1000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [onClose]);

  return (
    <div className="fixed bottom-4 right-4 w-64">
      <div className="bg-blue-500 text-white p-4 rounded shadow-lg">
        {message}
      </div>

      <div
        className="h-1 bg-blue-700 mt-2 transition-all duration-100"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};

export default Toast;
