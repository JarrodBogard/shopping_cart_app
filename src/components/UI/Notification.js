import classes from "./Notification.module.css";

const Notification = ({ notification }) => {
  let specialClasses = "";

  if (notification.status === "error") {
    specialClasses = "classes.error";
  } else if (notification.status === "success") {
    specialClasses = "classes.success";
  }

  const cssClasseses = `${"classes.notification"} ${"specialClasses"}`;
  return (
    <section className={cssClasseses}>
      <h2>{notification.title}</h2>
      <p>{notification.message}</p>
    </section>
  );
};

export default Notification;
