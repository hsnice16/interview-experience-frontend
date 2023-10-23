import React from "react";
import styles from "./Blog.module.scss";
import classNames from "classnames";
import { OpenInNew } from "assets";

type BlogProps = {
  title: string;
  link: string;
  forOrganization?: string;
  author: {
    name: string;
    profile: string;
  };
};

export function Blog({ title, link, forOrganization, author }: BlogProps) {
  return (
    <>
      <h2 className={styles.heading}>
        <a href={link} target="_blank" rel="noreferrer" className={styles.link}>
          {title}
          <OpenInNew className={styles["open-in-new"]} />
        </a>
      </h2>

      <p className={styles["author-para"]}>
        <strong>Author :</strong>
        <a
          href={author.profile}
          target="_blank"
          rel="noreferrer"
          className={classNames(styles.link, styles["profile-link"])}
        >
          {author.name}
        </a>
      </p>

      {forOrganization ? (
        <p className={styles["author-para"]}>
          <strong>forOrganization : </strong>
          <span>{forOrganization}</span>
        </p>
      ) : null}
    </>
  );
}
