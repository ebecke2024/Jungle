import React from "react";
import { UserProvider } from "./components/UserContext";
import Home from "./components/Home";
import AccountLogin from "./components/AccountLogin"; // Import the login component

export default function App() {
  return (
    <UserProvider>
      <Home />
      <AccountLogin /> {/* Include the login component as needed */}
    </UserProvider>
  );
}
