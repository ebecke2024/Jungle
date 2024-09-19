import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from './App';
import NotFound from './components/NotFound';
import Payment from './components/Payment';

const root = ReactDOM.createRoot(document.getElementById('root'));

const router = createBrowserRouter([
  {
      path: "/",
      element: <App />,
      errorElement: <NotFound />
  },
  {
      path: "/payment",
      element: <Payment />,
      errorElement: <NotFound />
  },
]);

root.render(
  <React.StrictMode>
    {/* looking to use ThemeProvider from MUI here */}
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
