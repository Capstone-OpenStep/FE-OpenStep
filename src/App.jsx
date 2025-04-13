import "./styles.css";

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from "./components/Header";
import IssueItemMain from "./components/IssueItemMain"

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
        </Routes>
      </BrowserRouter>
    </div>
  );
}
