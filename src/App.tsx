import "./App.scss";
import React, { useRef } from "react";
import { CompaniesList } from "data";
import { BlogList, CompanyFilter, FooterLinks } from "components";
import { initResizeEventListener } from "hooks";

export const App = (): React.ReactElement => {
  const asideRef = useRef<HTMLElement>();

  initResizeEventListener()(asideRef);

  return (
    <div className="container">
      <header>
        <h1 className="heading">Interview Experience</h1>
      </header>

      <main>
        <BlogList />
      </main>

      <aside ref={asideRef}>
        <CompanyFilter companies={CompaniesList} />
      </aside>

      <footer>
        <FooterLinks />
      </footer>
    </div>
  );
};
