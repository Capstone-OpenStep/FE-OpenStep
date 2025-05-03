import "./styles.css";

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from "./components/Header";
import Home from "./pages/Home"
import SignUp from "./pages/SignUp";
import Project from "./pages/Project"
import Issue from "./pages/Issue"
import Dashboard from "./pages/Dashboard"
import Ranking from "./pages/Ranking"

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/project" element={<Project />}></Route>
          <Route path="/issue" element={<Issue />}></Route>
          <Route path="/dashboard" element={<Dashboard />}></Route>
          <Route path="/ranking" element={<Ranking />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
