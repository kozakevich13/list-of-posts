import React from "react";

interface NotificationComponentProps {
  message: string;
  onClose: () => void;
}

const NotificationComponent: React.FC<NotificationComponentProps> = ({
  message,
  onClose,
}) => {
  if (!message) return null;

  return (
    <div
      style={{
        position: "absolute",
        top: "20px",
        right: "20px",
        padding: "10px",
        border: "1px solid #ccc",
        backgroundColor: "#f8f8f8",
        zIndex: 1000,
      }}
    >
      <p>{message}</p>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default NotificationComponent;
