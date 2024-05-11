import classNames from "classnames";
import React from "react";
import { useRecoilState } from "recoil";

import styles from "../company-filter/CompanyFilter.module.scss";
import { useQuery } from "@apollo/client";
import { GET_BLOGS } from "utils/constants/queries";
import { useSearchParams } from "react-router-dom";
import { KEYWORDS } from "utils/constants/keywords";
import { selectedKeywordState } from "recoil/atoms";

export const KeywordFilter = (): React.ReactElement => {
  const [selectedKeyword, setSelectedKeyword] =
    useRecoilState(selectedKeywordState);
  const [searchParam, setSearchParam] = useSearchParams();
  const { data, loading } = useQuery(GET_BLOGS, {
    variables: {
      limit: 2,
      offset: 0,
      filter: {
        forOrganization: "",
        searchKeywords: [],
      },
    },
  });

  const handleOnClick = (lable: string) => {
    setSelectedKeyword(lable);

    if (searchParam.has("p")) {
      searchParam.delete("p");
      setSearchParam(searchParam);
    }
  };

  return (
    <div className={styles.container}>
      {loading ? <h3 className={styles.heading}>Loading...</h3> : null}

      {data && data.blogs ? (
        <>
          <h3 className={styles.heading}>
            Keyword
            <button onClick={() => setSelectedKeyword("")}>Clear</button>
          </h3>

          <ul className={styles.list}>
            {KEYWORDS.map(({ label }) => (
              <li key={label} className={styles.item}>
                <button
                  className={classNames({
                    [styles.selected]: selectedKeyword === label,
                  })}
                  onClick={() => handleOnClick(label)}
                >
                  {label}
                </button>
              </li>
            ))}
          </ul>
        </>
      ) : null}
    </div>
  );
};
