import {
  BrowserRouter,
  Navigate,
  Route,
  RouterProvider,
  Routes,
  createBrowserRouter,
} from "react-router-dom";
import { LoginPage } from "./Components/Login/LoginPage";
import SignupPage from "./Components/Signup/SignupPage";

const route = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        index: true,
        element: <SignupPage />,
      },
      {
        path: "signup",
        element: <SignupPage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
    ],
  },
]);
export default function App() {
  return <RouterProvider router={route} />;
}
