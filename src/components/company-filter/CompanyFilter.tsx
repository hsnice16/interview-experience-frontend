import classNames from "classnames";
import React from "react";
import { useRecoilState } from "recoil";
import { selectedCompanyState } from "recoil/atoms";
import styles from "./CompanyFilter.module.scss";
import { useQuery } from "@apollo/client";
import { GET_ORGANIZATIONS } from "utils/constants/queries";
import { useSearchParams } from "react-router-dom";

export const CompanyFilter = (): React.ReactElement => {
  const [selectedCompany, setSelectedCompany] =
    useRecoilState(selectedCompanyState);
  const [searchParam, setSearchParam] = useSearchParams();
  const { loading, data } = useQuery(GET_ORGANIZATIONS);

  const handleOnClick = (name: string) => {
    setSelectedCompany(name);

    if (searchParam.has("p")) {
      searchParam.delete("p");
      setSearchParam(searchParam);
    }
  };

  return (
    <div className={styles.container}>
      {loading ? <h3 className={styles.heading}>Loading...</h3> : null}

      {data && data.organizations ? (
        <>
          <h3 className={styles.heading}>
            Company
            <button onClick={() => setSelectedCompany("")}>Clear</button>
          </h3>

          <ul className={styles.list}>
            {data.organizations.map(({ _id, name, blogCount }) => (
              <li key={_id} className={styles.item}>
                <button
                  className={classNames({
                    [styles.selected]: selectedCompany === name,
                  })}
                  onClick={() => handleOnClick(name)}
                >
                  {name}{" "}
                  <span className={styles["blog-count"]}>{blogCount}</span>
                </button>
              </li>
            ))}
          </ul>
        </>
      ) : null}
    </div>
  );
};
