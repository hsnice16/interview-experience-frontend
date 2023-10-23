import React from "react";
import styles from "./MessageModal.module.scss";
import { ApolloError } from "@apollo/client";

type MessageModalProps = {
  error: ApolloError;
  handleClose: () => void;
};

export function MessageModal({ error, handleClose }: MessageModalProps) {
  return (
    <div className={styles["modal-container"]} onClick={handleClose}>
      <div className={styles.modal} onClick={(event) => event.preventDefault()}>
        {error ? (
          <p className={styles.error}>Error: {error.message}</p>
        ) : (
          <p>
            Thank you for taking the time to do this 🤗
            <br />
            <br />
            Someone from the team will check the details, and soon you will find
            it live on the site.
            <br />
            <br />
            We really appreciate it 🙌
          </p>
        )}

        <button onClick={handleClose}>Close</button>
      </div>
    </div>
  );
}
