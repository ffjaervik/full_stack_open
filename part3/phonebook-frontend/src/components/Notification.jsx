/* eslint-disable react/prop-types */

const Notification = ({ text, type }) => {
  const styles = {
    box: {
      background: "lightgrey",
      fontSize: 20,
      borderStyle: "solid",
      borderRadius: 5,
      padding: 10,
      marginBottom: 10,
    },
    success: {
      color: "green",
    },
    error: {
      color: "red",
    },
  };
  if (text === null) {
    return null;
  }
  return (
    <div
      style={
        type === "success"
          ? { ...styles.box, ...styles.success }
          : type === "error"
          ? { ...styles.box, ...styles.error }
          : null
      }
    >
      {text}
    </div>
  );
};
export default Notification;
