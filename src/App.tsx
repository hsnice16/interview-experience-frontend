import "./App.scss";
import React from "react";
import { FooterLinks } from "components";
import { Route, Routes } from "react-router-dom";
import { Home } from "pages/home/Home";
import { AddBlog } from "pages/add-blog/AddBlog";
import { About } from "pages/about/About";
import {
  ROUTE_ABOUT,
  ROUTE_ADD_BLOG,
  ROUTE_HOME,
  ROUTE_OTHER,
  ROUTE_PROTECTED,
} from "utils/constants/routes";
import { Dashboard } from "pages/dashboard/Dashboard";
import { BlankPage } from "pages/BlankPage";

export const App = (): React.ReactElement => {
  return (
    <div className="container">
      <Routes>
        <Route path={ROUTE_HOME} element={<Home />} />
        <Route path={ROUTE_ADD_BLOG} element={<AddBlog />} />
        <Route path={ROUTE_ABOUT} element={<About />} />
        <Route path={ROUTE_PROTECTED} element={<Dashboard />} />
        <Route path={ROUTE_OTHER} element={<BlankPage />} />
      </Routes>

      <footer>
        <FooterLinks />
      </footer>
    </div>
  );
};
