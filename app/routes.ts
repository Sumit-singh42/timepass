import { createBrowserRouter } from "react-router";
import Root from "@/app/components/Root";
import Home from "@/app/pages/Home";
import MyCattle from "@/app/pages/MyCattle";
import Alerts from "@/app/pages/Alerts";
import Profile from "@/app/pages/Profile";
import Camera from "@/app/pages/Camera";
import History from "@/app/pages/History";
import Settings from "@/app/pages/Settings";
import Login from "@/app/pages/Login";
import EditProfile from "@/app/pages/EditProfile";
import PrivacyPolicy from "@/app/pages/PrivacyPolicy";
import HelpSupport from "@/app/pages/HelpSupport";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "cattle", Component: MyCattle },
      { path: "alerts", Component: Alerts },
      { path: "profile", Component: Profile },
      { path: "camera", Component: Camera },
      { path: "history", Component: History },
      { path: "settings", Component: Settings },
    ],
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/edit-profile",
    Component: EditProfile,
  },
  {
    path: "/privacy",
    Component: PrivacyPolicy,
  },
  {
    path: "/help",
    Component: HelpSupport,
  },
]);