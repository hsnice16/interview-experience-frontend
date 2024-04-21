import React from "react";
import styles from "./FooterLinks.module.scss";
import classNames from "classnames";
import { Link } from "react-router-dom";
import {
  ROUTE_ABOUT,
  ROUTE_ADD_BLOG,
  ROUTE_HOME,
} from "utils/constants/routes";
import { LogoIE } from "assets";

const PAGE_LINKS = [
  {
    title: "Home",
    link_to: ROUTE_HOME,
  },
  {
    title: "Add Blog",
    link_to: ROUTE_ADD_BLOG,
  },
  {
    title: "About",
    link_to: ROUTE_ABOUT,
  },
];

const SOCIAL_LINKS = [
  {
    title: "Sponsor",
    url: "https://github.com/sponsors/hsnice16",
  },
  {
    title: "GitHub",
    url: "https://github.com/hsnice16/interview-experience-frontend",
  },
];

export const FooterLinks = () => {
  return (
    <>
      <div className={styles["logo-container"]}>
        <img src={LogoIE} alt="IE logo" />
        <p>
          Building in public at{" "}
          <a
            href="https://twitter.com/hsnice16"
            target="_blank"
            rel="noreferrer"
          >
            @hsnice16
          </a>
        </p>
      </div>

      <ul className={classNames(styles.list, styles["page-links"])}>
        {[...PAGE_LINKS].map((link) => (
          <li className={styles.item} key={link.title}>
            <Link to={link.link_to}>{link.title}</Link>
          </li>
        ))}
      </ul>

      <ul className={classNames(styles.list, styles["social-links"])}>
        {SOCIAL_LINKS.map((link) => (
          <li className={styles.item} key={link.title}>
            <a href={link.url} target="_blank" rel="noreferrer">
              {link.title}
            </a>
          </li>
        ))}
      </ul>
    </>
  );
};
