import React from "react";
import { OpenInNew } from "assets";
import styles from "./BlogList.module.scss";
import classNames from "classnames";

type BlogListProps = {
  experiences: Experience[];
};

export const BlogList = ({ experiences }: BlogListProps) => {
  return (
    <ul className={styles.list}>
      {experiences.map(({ _id, author, blog }) => (
        <li className={styles.item} key={_id}>
          <h2 className={styles.heading}>
            <a
              href={blog.link}
              target="_blank"
              rel="noreferrer"
              className={styles.link}
            >
              {blog.heading}
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
        </li>
      ))}
    </ul>
  );
};
