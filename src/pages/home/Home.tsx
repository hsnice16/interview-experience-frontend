import { BlogList, CompanyFilter, KeywordFilter, Seo } from "components";
import { initResizeEventListener, logPageViewEvent } from "hooks";
import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { ROUTE_HOME } from "utils/constants/routes";

export function Home() {
  logPageViewEvent()("Home");

  const rightAsideRef = useRef<HTMLElement>();
  const leftAsideRef = useRef<HTMLElement>();

  initResizeEventListener()({ ref: leftAsideRef, type: "keyword" });
  initResizeEventListener()({ ref: rightAsideRef, type: "company" });

  return (
    <>
      <Seo path={ROUTE_HOME} />

      <header>
        <Link to={ROUTE_HOME}>
          <h1 className="heading">Interview Experience</h1>
        </Link>
      </header>

      <aside className="left" ref={leftAsideRef}>
        <KeywordFilter />
      </aside>

      <main className="main-home">
        <BlogList />
      </main>

      <aside className="right" ref={rightAsideRef}>
        <CompanyFilter />
      </aside>
    </>
  );
}
