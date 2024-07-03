
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./Router/Routes.jsx";
import { AuthProvider } from "./Components/AuthProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
      <RouterProvider router={router}></RouterProvider>
  </AuthProvider>
);
