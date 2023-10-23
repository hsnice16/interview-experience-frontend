import "./App.scss";
import React from "react";
import { FooterLinks } from "components";
import { Route, Routes } from "react-router-dom";
import { Home } from "pages/home/Home";
import { AddBlog } from "pages/add-blog/AddBlog";
import { ROUTE_ADD_BLOG, ROUTE_HOME } from "utils/constants/routes";
import { Dashboard } from "pages/dashboard/Dashboard";
import { BlankPage } from "pages/BlankPage";

export const App = (): React.ReactElement => {
  return (
    <div className="container">
      <Routes>
        <Route path={ROUTE_HOME} element={<Home />} />
        <Route path={ROUTE_ADD_BLOG} element={<AddBlog />} />
        <Route path="/protected/internal/dashboard" element={<Dashboard />} />
        <Route path="*" element={<BlankPage />} />
      </Routes>

      <footer>
        <FooterLinks />
      </footer>
    </div>
  );
};
