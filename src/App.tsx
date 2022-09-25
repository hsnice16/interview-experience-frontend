import "./App.scss";
import React from "react";
import { CompaniesList, ExperiencesList } from "data";
import { BlogList, CompanyFilter } from "components";

export const App = (): React.ReactElement => {
  return (
    <div className="container">
      <header>
        <h1 className="heading">Interview Experiences</h1>
        <input type="text" />
      </header>

      <main>
        <BlogList experiences={ExperiencesList} />
      </main>

      <aside>
        <CompanyFilter companies={CompaniesList} />
      </aside>
    </div>
  );
};
