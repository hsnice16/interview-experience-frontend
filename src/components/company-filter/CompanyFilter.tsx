import classNames from "classnames";
import React from "react";
import { useRecoilState } from "recoil";
import { selectedCompanyState } from "recoil/atoms";
import styles from "./CompanyFilter.module.scss";

type CompanyFilterProps = {
  companies: Company[];
};

export const CompanyFilter = ({
  companies,
}: CompanyFilterProps): React.ReactElement => {
  const [selectedCompany, setSelectedCompany] =
    useRecoilState(selectedCompanyState);

  return (
    <div className={styles.container}>
      <h3 className={styles.heading}>
        Company
        <button onClick={() => setSelectedCompany("")}>Clear</button>
      </h3>

      <ul className={styles.list}>
        {companies.map(({ _id, name }) => (
          <li key={_id} className={styles.item}>
            <button
              className={classNames({
                [styles.selected]: selectedCompany === name,
              })}
              onClick={() => setSelectedCompany(name)}
            >
              {name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
