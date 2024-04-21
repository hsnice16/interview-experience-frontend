import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { ROUTE_ABOUT } from "utils/constants/routes";

export function About() {
  useEffect(() => {
    window.scroll({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <>
      <header>
        <Link to={ROUTE_ABOUT}>
          <h1 className="heading">About</h1>
        </Link>
      </header>

      <main className="main-about">
        <p>
          This website provides a list of blogs for tech interview experiences
          from companies like <strong>Google</strong>,{" "}
          <strong>Microsoft</strong>, <strong>Atlassian</strong>, and many more.
          <br />
          <br />
          If you have your own interview experience to share, you can add it,
          after which someone from the team will review it (we will check if the
          link is working and if the content is appropriate) and then it will be
          available for everyone to see.
        </p>

        <h2>What's the purpose</h2>
        <p>
          The purpose of this website is to provide a platform where people can
          share their interview experiences and help others prepare for their
          interviews.
        </p>

        <h2>Have any queries?</h2>
        <p>Feel free to reach out.</p>
      </main>
    </>
  );
}
