/**
 * global context in order to have user data through entire app
 *
 */

import { useState, createContext } from "react";

export const userContext = createContext("");
function GlobalWrapper(props) {
  const [currentUser, setCurrentUser] = useState(null);

  function setUser(payload) {
    setCurrentUser(payload);
  }
  function getUser() {
    return currentUser;
  }

  function logout() {
    setCurrentUser(null);
  }

  return (
    <userContext.Provider value={{ setUser, getUser, logout }}>
      {props.children}
    </userContext.Provider>
  );
}
export default GlobalWrapper;
