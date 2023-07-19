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
import OTPVerification from "./Components/OTPpage/OTPVerification";
import UserDetails from "./Components/UserDetails/UserDetails";
import Post from "./Components/PostPage/Post";
import Home from "./Components/HomePage/Home";



const route = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        index: true,
        // element: <SignupPage />,
        // element:<UserDetails/>
        element:<UserProfile/>,
        // element:<BloodDonor/>,
        // element:<OTPVerification/>
      },
      {
        path: "signup",
        element: <SignupPage />,
      },
      {
        path:"OTPVerification",
        element:<OTPVerification/>
      },
      {
        path: "login",
        element: <LoginPage/>,
      },
      {
        path:"home",
        element:<Home/>
      },
      {
        path:"userprofile",
        element:<UserProfile/>
      },
      {
        path:"blood-donor",
        element:<BloodDonor/>
      },
      {
        path:"userdetails",
        element:<UserDetails/>
      }
    ],
  },
]);
export default function App() {

  return <RouterProvider router={route} />;
}
