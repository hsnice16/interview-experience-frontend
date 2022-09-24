import React from "react";
import styles from "./CompanyFilter.module.scss";

type CompanyFilterProps = {
  companies: Company[];
};

export const CompanyFilter = ({
  companies,
}: CompanyFilterProps): React.ReactElement => {
  return (
    <div className={styles.container}>
      <h3 className={styles.heading}>
        Company
        <button>Clear</button>
      </h3>

      <ul className={styles.list}>
        {companies.map(({ _id, name }) => (
          <li key={_id} className={styles.item}>
            <button>{name}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};
