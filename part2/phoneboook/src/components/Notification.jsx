import React from "react";
//deleted removed
const Notification = ({ message }) => {
  console.log("message", message);
  const success = {
    color: "green",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };
  const error = {
    color: "red",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };

  if (message === null) {
    return null;
  }
  return (
    <div
      style={
        message.includes("deleted") || message.includes("removed")
          ? error
          : success
      }
    >
      {message}
    </div>
  );
};
export default Notification;
