import "./App.css";
import { RouterProvider, createBrowserRouter, Navigate, Outlet } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import { Toaster } from "react-hot-toast";
import Login from "./components/auth/login.jsx";
import Register from "./components/auth/reg.jsx";
import NavBar from "./components/layout/Navbar.jsx";
import Dashboard from "./components/jobs/showJobs.jsx";
import CreateJob from "./components/jobs/createJob.jsx";
import UpdateJob from "./components/jobs/updateJob.jsx";
import KanbanBoard from "./components/jobs/kanban.jsx";
import Sidebar from "./components/layout/sideBar.jsx";
import ProfileSection from "./components/layout/profileSection.jsx";
import UpdateUser from "./components/layout/updateProfile.jsx";
import Home from "./components/layout/root.jsx";



const NotFound = () => {
  const token = localStorage.getItem("token");
  return token ? <Navigate to="/dashboard" replace /> : <Navigate to="/userLogin" replace />;
};
const Layout = ({ isLoggedIn, setIsLoggedIn }) => {
  if (!isLoggedIn) {
    return <Outlet />;
  }
  
  return (
    <div className="app-layout">
      <Sidebar />
      <div className="main-content">
        <NavBar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        <main className="page-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
const route = (isLoggedIn, setIsLoggedIn) => createBrowserRouter([
  {
    path: "/",
    element: <Layout isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "userRegister",
        element: <Register />,
      },
      {
        path: "userLogin",
        element: <Login setIsLoggedIn={setIsLoggedIn} />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path:"kanban",
        element:<KanbanBoard />
      },
      {
        path: "profile",
        element: <ProfileSection />,
      },
      {
        path:"updateProfile/:id",
        element:<UpdateUser />
      },
      {
        path: "createJob",
        element: <CreateJob />,
      },
      {
        path: "updateJob/:id",
        element: <UpdateJob />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  // useMemo prevents recreating the router on every re-render unless auth state changes
  const routerInstance = useMemo(() => route(isLoggedIn, setIsLoggedIn), [isLoggedIn]);

  return (
    <>
      <div className="App">
        <Toaster position="top-right" />
        <RouterProvider router={routerInstance} />
      </div>
    </>
  );
}

export default App;
