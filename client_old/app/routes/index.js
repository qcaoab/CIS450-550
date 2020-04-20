import React from "react";
import { Route, Switch, Redirect } from "react-router";

// ----------- Pages Imports ---------------
// import Analytics from "./Dashboards/Analytics";
// import ProjectsDashboard from "./Dashboards/Projects";
// import System from "./Dashboards/System";
// import Monitor from "./Dashboards/Monitor";
// import Financial from "./Dashboards/Financial";
// import Stock from "./Dashboards/Stock";
// import Reports from "./Dashboards/Reports";

// import Widgets from "./Widgets";

// import Cards from "./Cards/Cards";
// import CardsHeaders from "./Cards/CardsHeaders";

import NavbarOnly from "./Layouts/NavbarOnly";
// import SidebarDefault from "./Layouts/SidebarDefault";
// import SidebarA from "./Layouts/SidebarA";
// import DragAndDropLayout from "./Layouts/DragAndDropLayout";
import SidebarWithNavbar from "./Layouts/SidebarWithNavbar";

// import Accordions from "./Interface/Accordions";
// import Alerts from "./Interface/Alerts";
// import Avatars from "./Interface/Avatars";
// import BadgesLabels from "./Interface/BadgesLabels";
// import Breadcrumbs from "./Interface/Breadcrumbs";
// import Buttons from "./Interface/Buttons";
// import Colors from "./Interface/Colors";
// import Dropdowns from "./Interface/Dropdowns";
// import Images from "./Interface/Images";
// import ListGroups from "./Interface/ListGroups";
// import MediaObjects from "./Interface/MediaObjects";
// import Modals from "./Interface/Modals";
// import Navbars from "./Interface/Navbars";
// import Paginations from "./Interface/Paginations";
// import ProgressBars from "./Interface/ProgressBars";
// import TabsPills from "./Interface/TabsPills";
// import TooltipPopovers from "./Interface/TooltipsPopovers";
// import Typography from "./Interface/Typography";
// import Notifications from "./Interface/Notifications";
// import CropImage from "./Interface/CropImage";
// import DragAndDropElements from "./Interface/DragAndDropElements";
// import Calendar from "./Interface/Calendar";
// import ReCharts from "./Graphs/ReCharts";

// import Forms from "./Forms/Forms";
// import FormsLayouts from "./Forms/FormsLayouts";
// import InputGroups from "./Forms/InputGroups";
// import Wizard from "./Forms/Wizard";
// import TextMask from "./Forms/TextMask";
// import Typeahead from "./Forms/Typeahead";
// import Toggles from "./Forms/Toggles";
// import Editor from "./Forms/Editor";
// import DatePicker from "./Forms/DatePicker";
// import Dropzone from "./Forms/Dropzone";
// import Sliders from "./Forms/Sliders";

// import Tables from "./Tables/Tables";
// import ExtendedTable from "./Tables/ExtendedTable";
// import AgGrid from "./Tables/AgGrid";

// import AccountEdit from "./Apps/AccountEdit";
// import BillingEdit from "./Apps/BillingEdit";
// import Chat from "./Apps/Chat";
// import Clients from "./Apps/Clients";
// import EmailDetails from "./Apps/EmailDetails";
// import Files from "./Apps/Files";
// import GalleryGrid from "./Apps/GalleryGrid";
// import GalleryTable from "./Apps/GalleryTable";
// import ImagesResults from "./Apps/ImagesResults";
// import Inbox from "./Apps/Inbox";
// import NewEmail from "./Apps/NewEmail";
// import ProfileDetails from "./Apps/ProfileDetails";
// import ProfileEdit from "./Apps/ProfileEdit";
// import Projects from "./Apps/Projects";
// import SearchResults from "./Apps/SearchResults";
// import SessionsEdit from "./Apps/SessionsEdit";
// import SettingsEdit from "./Apps/SettingsEdit";
// import Tasks from "./Apps/Tasks";
// import TasksDetails from "./Apps/TasksDetails";
// import TasksKanban from "./Apps/TasksKanban";
// import Users from "./Apps/Users";
// import UsersResults from "./Apps/UsersResults";
// import VideosResults from "./Apps/VideosResults";

// import ComingSoon from "./Pages/ComingSoon";
// import Confirmation from "./Pages/Confirmation";
// import Danger from "./Pages/Danger";
// import Error404 from "./Pages/Error404";
// import ForgotPassword from "./Pages/ForgotPassword";
// import LockScreen from "./Pages/LockScreen";
// import Login from "./Pages/Login";
// import Register from "./Pages/Register";
// import Success from "./Pages/Success";
// import Timeline from "./Pages/Timeline";

// import Icons from "./Icons";

// ----------- Layout Imports ---------------
import { DefaultNavbar } from "./../layout/components/DefaultNavbar";
import { DefaultSidebar } from "./../layout/components/DefaultSidebar";

import { SidebarANavbar } from "./../layout/components/SidebarANavbar";
import { SidebarASidebar } from "./../layout/components/SidebarASidebar";
import BookPage from "./Books";
import Search from "./Search";
import Discover from "./Discover";
import Trivia from "./Trivia";
import Profile from "./Profile";
import Test from "./Test";

//------ Route Definitions --------
// eslint-disable-next-line no-unused-vars
export const RoutedContent = () => {
  return (
    <Switch>
      <Redirect from="/" to="/discover" exact />
      <Route component={Discover} path="/discover" />
      <Route component={BookPage} path="/books/:book_id" />
      <Route component={Search} path="/search" />
      <Route component={Trivia} path="/trivia" />
      <Route component={Test} path="/test" />
      <Route component={Profile} path="/profile" />

      {/*    404    */}
      <Redirect to="/pages/error-404" />
    </Switch>
  );
};

//------ Custom Layout Parts --------
export const RoutedNavbars = () => (
  <Switch>
    {/* Other Navbars: */}
    <Route component={SidebarANavbar} path="/layouts/sidebar-a" />
    <Route component={NavbarOnly.Navbar} path="/layouts/navbar" />
    <Route
      component={SidebarWithNavbar.Navbar}
      path="/layouts/sidebar-with-navbar"
    />
    {/* Default Navbar: */}
    <Route component={DefaultNavbar} />
  </Switch>
);

export const RoutedSidebars = () => (
  <Switch>
    {/* Other Sidebars: */}
    <Route component={SidebarASidebar} path="/layouts/sidebar-a" />
    <Route
      component={SidebarWithNavbar.Sidebar}
      path="/layouts/sidebar-with-navbar"
    />
    {/* Default Sidebar: */}
    <Route component={DefaultSidebar} />
  </Switch>
);
