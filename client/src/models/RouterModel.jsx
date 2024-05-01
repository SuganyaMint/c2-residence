import ActualProjectPage from "../pages/ActualProjectPage";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import NotfoundPage from "../pages/NotfoundPage";
import ProjectPage from "../pages/ProjectPage";
import UserManagePage from "../pages/UserManagePage";

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
    id: 4,
    routerName: "Actual",
    routerPath: "/actual",
    routerComponent: <ActualProjectPage />,
  },
];
