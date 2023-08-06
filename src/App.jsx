import {
  RouterProvider,
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
import ClubRegistration from "./Components/Club-Registration/ClubRegisration";
import MemeberRequest from "./Components/MemberRequest/MemberRequest";
import NewPost from "./Components/NewPost/NewPost";
import UserProfileEdit from "./Components/UserProfile/UserProfileEdit"
import TextPost from "./Components/NewPost/TextPost";
import ImagePost from "./Components/NewPost/ImagePost";
import Committee from "./Components/Committee/Commitee";
import MainAdmin from "./Components/MainAdmin/MainAdmin";


const route = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        index: true,
        element:<LoginPage/>
        // element: <SignupPage />,
        // element:<UserDetails/>
        // element:<UserProfile/>,
        // element:<ClubRegistration/>
        // element:<BloodDonor/>,
        // element:<MemeberRequest/>
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
      },
      {
        path:"clubregistration",
        element:<ClubRegistration/>
      },
      {
        path:"memberRequest",
        element:<MemeberRequest/>
      },
      {
        path:"newPost",
        element:<NewPost/>
      },
      {
        path:"editProfile",
        element:<UserProfileEdit/>
      },
      {
        path:"textPost",
        element:<TextPost/>
      },
      {
        path:"imagePost",
        element:<ImagePost/>
      },
      {
        path:"committee",
        element:<Committee />
      },
      {
        path:"mainadmin",
        element:<MainAdmin/>
      }
    ],
  },
]);
export default function App() {

  return <RouterProvider router={route} />;
}
