import React from "react";
import styles from "./FooterLinks.module.scss";

export const FooterLinks = () => {
  return (
    <ul className={styles.list}>
      <li className={styles.item}>
        <a
          href="https://github.com/hsnice16/Interview-Experiences"
          target="_blank"
          rel="noreferrer"
        >
          GitHub
        </a>
      </li>
      <li className={styles.item}>
        <a href="https://twitter.com/hsnice16" target="_blank" rel="noreferrer">
          Twitter
        </a>
      </li>
      <li className={styles.item}>
        <a
          href="https://www.linkedin.com/in/hsnice16/"
          target="_blank"
          rel="noreferrer"
        >
          LinkedIn
        </a>
      </li>
    </ul>
  );
};
