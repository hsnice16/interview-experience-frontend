import React, { useEffect, useMemo } from "react";
import styles from "./BlogList.module.scss";
import { useRecoilValue } from "recoil";
import { selectedCompanyState, selectedKeywordState } from "recoil/atoms";
import { useQuery } from "@apollo/client";
import { GET_BLOGS } from "utils/constants/queries";
import { Link, useSearchParams } from "react-router-dom";
import { ROUTE_HOME } from "utils/constants/routes";
import { Blog } from "components";
import { KEYWORDS } from "utils/constants/keywords";

const SHOW_MAX = 15;

export const BlogList = () => {
  const selectedCompany = useRecoilValue(selectedCompanyState);
  const selectedKeyword = useRecoilValue(selectedKeywordState);
  const [searchParam] = useSearchParams();
  const searchedPage = useMemo(() => {
    return Number(searchParam.get("p") ?? 0);
  }, [searchParam]);

  const searchKeywords = useMemo(() => {
    return (
      KEYWORDS.find((keyword) => keyword.label === selectedKeyword)
        ?.searchKeywords ?? []
    );
  }, [selectedKeyword]);

  const { data, loading } = useQuery(GET_BLOGS, {
    variables: {
      limit: SHOW_MAX + 1,
      offset: SHOW_MAX * searchedPage,
      filter: {
        forOrganization: selectedCompany,
        searchKeywords: searchKeywords,
      },
    },
  });

  // shuffle the blogs
  const blogs = useMemo(
    () => [...(data?.blogs ?? [])].sort((a, b) => 0.5 - Math.random()),
    [data?.blogs]
  );

  useEffect(() => {
    window.scroll({ top: 0, behavior: "smooth" });
  }, [searchedPage]);

  return (
    <ul className={styles.list}>
      {loading ? "Loading..." : null}

      {blogs.length > 0
        ? blogs.map(({ _id, author, link, title }, index) => {
            if (index === SHOW_MAX) return null;

            return (
              <li className={styles.item} key={_id}>
                <Blog title={title} link={link} author={author} />
              </li>
            );
          })
        : null}

      {blogs.length === 0 &&
      loading === false &&
      searchKeywords.length !== 0 &&
      selectedCompany !== ""
        ? "No Blogs"
        : null}

      {blogs.length > 0 && blogs.length === SHOW_MAX + 1 && (
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
