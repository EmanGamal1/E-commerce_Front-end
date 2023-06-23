import React, { useEffect, useState } from "react";

const ProtectedRouteHook = () => {
  const [userData, setUserData] = useState(
    JSON.parse(localStorage.getItem("user"))
  );
  const [adminData, setAdminData] = useState(
    JSON.parse(localStorage.getItem("admin-user"))
  );
  const [isUser, setIsUser] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isGuest, setIsGuest] = useState(false);

  useEffect(() => {
    if (userData != null) {
      setIsUser(true);
    }
     if (adminData != null) {
       setIsAdmin(true);
     }
    if (userData === null && adminData === null) { //
      setIsGuest(true);
    }
  }, []);

  return [isUser, isAdmin, isGuest, userData];
};

export default ProtectedRouteHook;
