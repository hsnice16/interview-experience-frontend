import React, { useEffect, useMemo } from "react";
import styles from "./BlogList.module.scss";
import { useRecoilValue } from "recoil";
import { selectedCompanyState } from "recoil/atoms";
import { useQuery } from "@apollo/client";
import { GET_BLOGS } from "utils/constants/queries";
import { Link, useSearchParams } from "react-router-dom";
import { ROUTE_HOME } from "utils/constants/routes";
import { Blog } from "components";

const SHOW_MAX = 12;

export const BlogList = () => {
  const selectedCompany = useRecoilValue(selectedCompanyState);
  const [searchParam] = useSearchParams();
  const searchedPage = useMemo(() => {
    return Number(searchParam.get("p") ?? 0);
  }, [searchParam]);

  const { data, loading } = useQuery(GET_BLOGS, {
    variables: {
      limit: 13,
      offset: SHOW_MAX * searchedPage,
      filter: {
        forOrganization: selectedCompany,
      },
    },
  });

  useEffect(() => {
    window.scroll({ top: 0, behavior: "smooth" });
  }, [searchedPage]);

  return (
    <ul className={styles.list}>
      {loading ? "Loading..." : null}

      {data && data.blogs
        ? data.blogs.map(({ _id, author, link, title }, index) => {
            if (index === SHOW_MAX) return null;

            return (
              <li className={styles.item} key={_id}>
                <Blog title={title} link={link} author={author} />
              </li>
            );
          })
        : null}

      {data && data.blogs && data.blogs.length === SHOW_MAX + 1 && (
        <Link
          to={`${ROUTE_HOME}?p=${searchedPage + 1}`}
          className={styles.more}
        >
          More
        </Link>
      )}
    </ul>
  );
};
