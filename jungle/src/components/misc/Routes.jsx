import { createBrowserRouter } from "react-router-dom";
// import pages here
import Home from "../../pages/Home";
import NotFound from "../../pages/NotFound";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
        errorElement: <NotFound />
    },
]);