import React from "react";
import { UserProvider } from "./components/UserContext";
import Home from "./components/Home";
import AccountLogin from "./components/AccountLogin"; // Import the login component
import './Image.css'
export default function App() {
  return (
    <UserProvider>
      <Home />
    </UserProvider>
  );
}
