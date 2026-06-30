import "./App.scss";
import React, { useMemo } from "react";
import { FooterLinks } from "components";
import { Route, Routes, useLocation } from "react-router-dom";
import { Home } from "pages/home/Home";
import { AddBlog } from "pages/add-blog/AddBlog";
import { About } from "pages/about/About";
import {
  ROUTE_ABOUT,
  ROUTE_ADD_BLOG,
  ROUTE_HOME,
  ROUTE_OTHER,
  ROUTE_PROTECTED,
  ROUTE_STRIPE,
} from "utils/constants/routes";
import { Dashboard } from "pages/dashboard/Dashboard";
import { BlankPage } from "pages/BlankPage";
import { Stripe } from "pages/stripe/Stripe";

export const App = (): React.ReactElement => {
  const location = useLocation();
  const isStripeRoute = useMemo(() => {
    return location.pathname === ROUTE_STRIPE;
  }, [location.pathname]);

  return (
    <>
      {/* {isStripeRoute ? null : (
        <div className="banner">
          <strong>Keep the Preparation Going!</strong> Help maintain this
          project with just a $1 contribution
          <a href={ROUTE_STRIPE} target="_blank" rel="noreferrer">
            Stripe
          </a>
        </div>
      )} */}

      <div className="container">
        <Routes>
          <Route path={ROUTE_HOME} element={<Home />} />
          <Route path={ROUTE_ADD_BLOG} element={<AddBlog />} />
          <Route path={ROUTE_ABOUT} element={<About />} />
          <Route path={ROUTE_PROTECTED} element={<Dashboard />} />
          <Route path={ROUTE_OTHER} element={<BlankPage />} />
          <Route path={ROUTE_STRIPE} element={<Stripe />} />
        </Routes>

        {isStripeRoute ? null : (
          <footer>
            <FooterLinks />
          </footer>
        )}
      </div>
    </>
  );
};
