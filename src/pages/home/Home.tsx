import { BlogList, CompanyFilter } from "components";
import { initResizeEventListener } from "hooks";
import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { ROUTE_HOME } from "utils/constants/routes";

export function Home() {
  const asideRef = useRef<HTMLElement>();

  initResizeEventListener()(asideRef);

  return (
    <>
      <header>
        <Link to={ROUTE_HOME}>
          <h1 className="heading">Interview Experience</h1>
        </Link>
      </header>

      <main className="main-home">
        <BlogList />
      </main>

      <aside ref={asideRef}>
        <CompanyFilter />
      </aside>
    </>
  );
}
