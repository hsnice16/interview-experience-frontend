import React from "react";
import styles from "./FooterLinks.module.scss";
import classNames from "classnames";
import { Link } from "react-router-dom";
import { ROUTE_ADD_BLOG, ROUTE_HOME } from "utils/constants/routes";

const SOCIAL_LINKS = [
  {
    title: "GitHub",
    url: "https://github.com/hsnice16/interview-experience-frontend",
  },
  {
    title: "Twitter",
    url: "https://twitter.com/hsnice16",
  },
  {
    title: "LinkedIn",
    url: "https://www.linkedin.com/in/hsnice16/",
  },
];

export const FooterLinks = () => {
  return (
    <>
      <ul className={classNames(styles.list, styles["page-links"])}>
        <li className={styles.item}>
          <Link to={ROUTE_HOME}>Home</Link>
        </li>
        <li className={styles.item}>
          <Link to={ROUTE_ADD_BLOG}>Add Blog</Link>
        </li>
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
