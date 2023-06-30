import React from "react";

const Notification = ({ message }) => {
  const success = {
    color: "green",
    fontStyle: "italic",
    fontSize: 16,
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
  return <div className={success}>{message}</div>;
};
export default Notification;
