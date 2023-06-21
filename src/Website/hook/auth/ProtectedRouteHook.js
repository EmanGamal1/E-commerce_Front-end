import React, { useEffect, useState } from "react";

const ProtectedRouteHook = () => {
  const [userData, setUserData] = useState(
    JSON.parse(localStorage.getItem("user"))
  );
  const [adminData, setAdminData] = useState(
    JSON.parse(localStorage.getItem("admin-user"))
  );
  const [isUser, setIsUser] = useState();
  const [isAdmin, setIsAdmin] = useState();
  const [isGuest, setIsGuest] = useState();

  useEffect(() => {
    if (userData != null) {
      setIsUser(true);
      setIsAdmin(false);
      setIsGuest(false);
    }
    if (adminData != null) {
      setIsAdmin(true);
      setIsGuest(false);
    }
    if (userData === null && adminData === null) {
      setIsGuest(true);
      setIsAdmin(false);
      setIsUser(false);
    }
  }, []);
  return [isUser, isAdmin, isGuest, userData];
};

export default ProtectedRouteHook;
