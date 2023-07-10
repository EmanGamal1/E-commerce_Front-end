import React, { useState, useEffect } from "react";
import Pusher from "pusher-js";

import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
} from "reactstrap";

import { Link } from "react-router-dom";

const NotificationIcon = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [read, SetRead] = useState(false);
  const [totalRead, SetTotalRead] = useState(0);

  const pusher = new Pusher("0fc4fc03768ac1db6774", {
    cluster: "eu",
    encrypted: true,
  });
  const channel = pusher.subscribe("admin-channel");

  const notificationClick = () => {
    // setIsOpen(isOpen);
    if (isOpen) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
      console.log("notificationClick");
      SetRead(true);
      SetTotalRead(notifications.length);
    }
  };

  useEffect(() => {
    channel.bind("new-order", function (data) {
      if (
        !notifications.find((el) => {
          return el._id === data.order?._id;
        })
      ) {
        // console.log("New Order:", data);
        const newArray = [...notifications, data.order];
        setNotifications(newArray);
        // notifications.push(data.order);
        // console.log("notifications:", notifications);
      }
    });
  }, []);

  return (
    <UncontrolledDropdown nav>
      <DropdownToggle nav className="nav-link-icon" onClick={notificationClick}>
        <i
          className={`fas fa-bell text-white ${
            notifications.length - totalRead !== 0 ? "fa-beat-fade" : ""
          }`}>
          <span
            hidden={!(notifications.length - totalRead)}
            className="badge rounded-pill badge-notification bg-danger">
            {notifications.length - totalRead}
          </span>
        </i>
      </DropdownToggle>
      <DropdownMenu
        aria-labelledby="navbar-default_dropdown_1"
        className="dropdown-menu-arrow"
        right>
        {notifications.map((not) => {
          return (
            <DropdownItem key={not._id}>
              <Link key={not._id} to={"/admin/OrderDetails/" + not._id}>
                New Order From User
              </Link>
            </DropdownItem>
          );
        })}

        {/* <DropdownItem divider />
        <DropdownItem>Something else here</DropdownItem> */}
      </DropdownMenu>
    </UncontrolledDropdown>
  );
};

export default NotificationIcon;
