import ActualProjectPage from "../pages/ActualProjectPage";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import NotfoundPage from "../pages/NotfoundPage";
import ProjectPage from "../pages/ProjectPage";
import UserManagePage from "../pages/UserManagePage";
import HistoryLog from "../pages/HistoryLog";
import BackofficePage from "../pages/Office/BackofficePage";
import CreateMasterProjectPage from "../pages/Office/CreateMasterProjectPage";
import DetailOfficePage from "../pages/Office/DetailOfficePage";
// import CreateActualOfficePage from "../pages/Office/Actual/";
import CreateActualOfficePage from "../pages/Office/Actual/CreateActualOfficePage";
export const RouterModel = [
  {
    id: 0,
    routerName: "NotFound",
    routerPath: "*",
    routerComponent: <NotfoundPage />,
  },
  {
    id: 1,
    routerName: "Home",
    routerPath: "/",
    routerComponent: <HomePage />,
  },
  {
    id: 2,
    routerName: "Login",
    routerPath: "/login",
    routerComponent: <LoginPage />,
  },
  {
    id: 3,
    routerName: "Users",
    routerPath: "/users",
    routerComponent: <UserManagePage />,
  },
  {
    id: 4,
    routerName: "Project",
    routerPath: "/project",
    routerComponent: <ProjectPage />,
  },
  {
    id: 5,
    routerName: "Actual",
    routerPath: "/actual",
    routerComponent: <ActualProjectPage />,
  },
  {
    id: 6,
    routerName: "History",
    routerPath: "/history",
    routerComponent: <HistoryLog />,
  },
  {
    id: 7,
    routerName: "Backoffice",
    routerPath: "/back-office",
    routerComponent: <BackofficePage />,
  },
  {
    id: 8,
    routerName: "CreateMasterProjectPage",
    routerPath: "/back-office-createmaster/:project_office_ID/:month",
    routerComponent: <CreateMasterProjectPage />,
  },
  {
    id: 9,
    routerName: "DetailOfficePage",
    routerPath: "/back-office-createmaster/:project_office_ID",
    routerComponent: <DetailOfficePage />,
  },

  {
    id: 11,
    routerName: "CreateActualOfficePage",
    routerPath: "/back-office-createactual/:project_office_ID/:month",
    routerComponent: <CreateActualOfficePage />,
  },


];

