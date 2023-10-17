import React from "react";
import styles from "./FooterLinks.module.scss";
import classNames from "classnames";

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
          <a href="/">Home</a>
        </li>
        <li className={styles.item}>
          <a href="/">Add a new blog</a>
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
