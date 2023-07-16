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
import UserProfile from "./Components/UserProfile/UserProfile";
import BloodDonor from "./Components/Blood-Donor/Blood-Donor";

const route = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        index: true,
        // element: <SignupPage />,
        // element:<UserProfile/>,
        element:<BloodDonor/>
      },
      {
        path: "signup",
        element: <SignupPage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path:"userprofile",
        element:<UserProfile/>
      },
      {
        path:"blood-donor",
        element:<BloodDonor/>
      }
    ],
  },
]);
export default function App() {
  return <RouterProvider router={route} />;
}
