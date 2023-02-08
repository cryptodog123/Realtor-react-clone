import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react";
const useAuthStatus = () => {
  const [loggedIn, setLoggedIn] = useState();
  const [checkingStatus, setCheckingStatus] = useState(true);
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(
      auth,
      (user) => {
        if (user) {
          setLoggedIn(true);
        }
        setCheckingStatus(false);
      },
      []
    );
  });

  return { loggedIn, checkingStatus };
};

export default useAuthStatus;
