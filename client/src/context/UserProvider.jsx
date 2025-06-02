import React, { useContext } from "react";
import useStorage from "../hooks/useStorage";

const preffix = "kiurent-user-";

const UserContext = React.createContext();

export function useUser() {
  return useContext(UserContext);
}

const UserProvider = ({ children }) => {
  const [id, setId, removeId] = useStorage(preffix + "id", null, localStorage);

  const logOut = () => {
    removeId();
  };

  const value = {
    id,
    setId,
    logOut,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
export default UserProvider;
