import "./App.scss";
import React from "react";
import { CompaniesList, ExperiencesList } from "data";
import { CompanyFilter } from "components";

export const App = (): React.ReactElement => {
  return (
    <div className="container">
      <header>
        <h1 className="heading-1">Interview Experiences</h1>
      </header>

      <main>
        <ul className="list">
          {ExperiencesList.map(({ _id, author, blog }) => (
            <li className="list-item" key={_id}>
              <h2 className="heading-2">
                <a
                  href={blog.link}
                  target="_blank"
                  rel="noreferrer"
                  className="link"
                >
                  {blog.heading}
                </a>
              </h2>

              <p className="author-para">
                <strong>Author :</strong>
                <a
                  href={author.profile}
                  target="_blank"
                  rel="noreferrer"
                  className="link profile-link"
                >
                  {author.name}
                </a>
              </p>
            </li>
          ))}
        </ul>
      </main>

      <aside>
        <CompanyFilter companies={CompaniesList} />
      </aside>
    </div>
  );
};
