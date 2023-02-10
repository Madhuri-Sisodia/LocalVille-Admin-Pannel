import React from 'react';
import NotificationAlert from "react-notification-alert";

const Notification = ({ place, type, message, icon, autoDismiss }) => {
  const notificationAlertRef = React.useRef(null);

  const notify = () => {
    var color = Math.floor(Math.random() * 5 + 1);
    var type;
    switch (color) {
      case 1:
        type = "primary";
        break;
      case 2:
        type = "success";
        break;
      case 3:
        type = "danger";
        break;
      case 4:
        type = "warning";
        break;
      case 5:
        type = "info";
        break;
      default:
        break;
    }
    var options = {};
    options = {
      place: {place},
      message: (
        <div>
          <div>
            <b>{message}</b>
          </div>
        </div>
      ),
      type: {type},
      icon: {icon},
      autoDismiss: {autoDismiss},
    };

    notificationAlertRef.current.notificationAlert(options);
  };

  return (
    <div className="rna-container">
        <NotificationAlert ref={notificationAlertRef} />
      </div>
  );
};

export default Notification;