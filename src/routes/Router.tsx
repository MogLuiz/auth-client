// Packages
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// Pages
import { Dashboard, Login } from "../pages";

// Components
export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}
