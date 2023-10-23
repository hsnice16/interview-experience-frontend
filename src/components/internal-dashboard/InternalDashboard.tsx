import { useMutation, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { GET_STAGING_BLOGS } from "utils/constants/queries";
import { getEncryptedMessage } from "utils/functions/getEncryptedMessage";
import styles from "./InternalDashboard.module.scss";
import { Blog } from "components";
import classNames from "classnames";
import { UPDATE_BLOG_STATUS } from "utils/constants/mutations";

const messageCode = getEncryptedMessage();

export function InternalDashboard() {
  const [status, setStatus] = useState<"pending" | "rejected">("pending");
  const [clicked, setClicked] = useState<"Approve" | "Reject" | "">("");

  const { data, loading } = useQuery(GET_STAGING_BLOGS, {
    variables: {
      messageCode,
      status,
    },
  });

  const [updateBlogStatus, { loading: mutationLoading }] = useMutation(
    UPDATE_BLOG_STATUS,
    { refetchQueries: ["GetStagingBlogs"] }
  );

  const handleApproveClick = (_id: string) => {
    setClicked("Approve");

    updateBlogStatus({
      variables: {
        messageCode,
        id: _id,
        status: "approved",
      },
    });
  };

  const handleRejectClick = (_id: string) => {
    setClicked("Reject");

    updateBlogStatus({
      variables: {
        messageCode,
        id: _id,
        status: "rejected",
      },
    });
  };

  return (
    <>
      <header className={styles["header-internal-dashboard"]}>
        <button
          className={classNames({ [styles.selected]: status === "pending" })}
          onClick={() => setStatus("pending")}
        >
          Pending
        </button>
        <button
          className={classNames({ [styles.selected]: status === "rejected" })}
          onClick={() => setStatus("rejected")}
        >
          Rejected
        </button>
      </header>

      <main className="main-add-blog">
        <ul className={styles.list}>
          {loading ? "Loading..." : null}

          {data && data.stagingBlogs ? (
            data.stagingBlogs.length ? (
              data.stagingBlogs.map(
                ({ _id, author, link, title, forOrganization }) => {
                  return (
                    <li className={styles.item} key={_id}>
                      <Blog
                        title={title}
                        link={link}
                        author={author}
                        forOrganization={forOrganization}
                      />

                      {status === "pending" ? (
                        <div
                          className={styles["btn-mutation-action-container"]}
                        >
                          <button
                            className={styles.approve}
                            onClick={() => handleApproveClick(_id)}
                            disabled={mutationLoading}
                          >
                            {clicked === "Approve" && mutationLoading
                              ? "Approving"
                              : "Approve"}
                          </button>

                          <button
                            className={styles.reject}
                            onClick={() => handleRejectClick(_id)}
                            disabled={mutationLoading}
                          >
                            {clicked === "Reject" && mutationLoading
                              ? "Rejecting"
                              : "Reject"}
                          </button>
                        </div>
                      ) : null}
                    </li>
                  );
                }
              )
            ) : (
              <span>Empty...</span>
            )
          ) : null}
        </ul>
      </main>
    </>
  );
}
