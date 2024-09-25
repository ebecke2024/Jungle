import React, { useState, createContext } from "react";
import { UserProvider } from "./components/UserContext";
import NavigationBar from "./components/Navbar/NavigationBar";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home";

import "./Image.css";
import Account from "./components/Account";
import Register from "./components/Register";
import Payment from "./components/Payment";
import Cart from "./components/Cart";
import Login from "./components/Login";
import NotFound from "./components/NotFound";
import ProductDetail from "./components/ProductDetail";

export const SearchContext = createContext();

export default function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [triggerSearch, setTriggerSearch] = useState(0);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      errorElement: <NotFound />,
    },
    {
      path: "/cart",
      element: <Cart />,
    },
    {
      path: "/account",
      element: <Account />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/payment",
      element: <Payment />,
      errorElement: <NotFound />,
    },
    {
      path: "/productdetail",
      element: <ProductDetail />,
    },
  ]);

  return (
    <div>
      <UserProvider>
        <SearchContext.Provider
          value={{
            searchQuery,
            setSearchQuery,
            triggerSearch,
            setTriggerSearch,
          }}
        >
          <NavigationBar />
          <RouterProvider router={router} />
        </SearchContext.Provider>
      </UserProvider>
    </div>
  );
}
