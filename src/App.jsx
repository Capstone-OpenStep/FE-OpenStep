import "./styles.css";

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Outlet } from 'react-router-dom';
import { AuthProvider } from './components/AuthContext';
import Header from "./components/Header";
import Home from "./pages/Home"
import SignUp from "./pages/SignUp";
import Project from "./pages/Project"
import Issue from "./pages/Issue"
import Dashboard from "./pages/Dashboard"
import Ranking from "./pages/Ranking"
import Login from "./pages/Login"

const Layout = () => (
  <>
    <Header />
    <Outlet />
  </>
);

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "", element: <Home /> },
        { path: "signup", element: <SignUp /> },
        { path: "project", element: <Project /> },
        { path: "issue", element: <Issue /> },
        { path: "dashboard", element: <Dashboard /> },
        { path: "ranking", element: <Ranking /> },
        { path: "login", element: <Login /> },
      ],
    },
  ],
  {
    future: {
      v7_startTransition: true,
    },
  }
);

export default function App() {
  return (
    <div>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </div>
  );
}
