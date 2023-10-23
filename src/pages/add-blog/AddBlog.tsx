import React, {
  ChangeEvent,
  FormEvent,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Link } from "react-router-dom";
import styles from "./AddBlog.module.scss";
import { ROUTE_ADD_BLOG } from "utils/constants/routes";
import { MessageModal, CustomInput } from "components";
import { isValidHttpUrl } from "utils/functions/isValidHttpUrl";
import { useMutation } from "@apollo/client";
import { CREATE_BLOG } from "utils/constants/mutations";
import { getEncryptedMessage } from "utils/functions/getEncryptedMessage";

const BLOG_INITIAL_VALUE = {
  author: {
    name: "",
    profile: "",
  },
  title: "",
  link: "",
  forOrganization: "",
};

export function AddBlog() {
  const [blogInfo, setBlogInfo] = useState(BLOG_INITIAL_VALUE);
  const [error, setError] = useState({});
  const [createBlog, { loading, data, error: customError }] =
    useMutation(CREATE_BLOG);
  const [showMessageModal, setShowMessageModal] = useState(false);

  const submitDisabled = useMemo(() => {
    return (
      blogInfo.author.name === "" ||
      blogInfo.author.profile === "" ||
      blogInfo.forOrganization === "" ||
      blogInfo.link === "" ||
      blogInfo.title === ""
    );
  }, [blogInfo]);

  useEffect(() => {
    window.scroll({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (data && data.createBlog._id) {
      setBlogInfo(BLOG_INITIAL_VALUE);
      setShowMessageModal(true);
    } else if (customError) {
      setShowMessageModal(true);
    }
  }, [data, customError]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    let _error;

    if (["link", "author.profile"].includes(name) && !isValidHttpUrl(value)) {
      _error = 'Make sure it starts with "http"';
    }

    if (_error) {
      setError((prevError) => ({ ...prevError, [name]: _error }));
    } else {
      setError((prevError) => ({ ...prevError, [name]: undefined }));
    }

    if (name.includes("author")) {
      const authorField = name.split(".")[1];

      setBlogInfo((prevInfo) => ({
        ...prevInfo,
        author: { ...prevInfo.author, [authorField]: value },
      }));
    } else {
      setBlogInfo((prevInfo) => ({
        ...prevInfo,
        [name]: value,
      }));
    }
  };

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const encryptedMessage = getEncryptedMessage();
    createBlog({ variables: { ...blogInfo, messageCode: encryptedMessage } });
  };

  return (
    <>
      {showMessageModal ? (
        <MessageModal
          error={customError}
          handleClose={() => setShowMessageModal(false)}
        />
      ) : null}

      <header>
        <Link to={ROUTE_ADD_BLOG}>
          <h1 className="heading">Add Blog</h1>
        </Link>
      </header>

      <main className="main-add-blog">
        <form className={styles.form} onSubmit={handleFormSubmit}>
          <div>
            <p>Blog -</p>

            <CustomInput
              label="Title"
              required
              id="blog-title"
              type="text"
              placeholder="UX design interview experience at Google..."
              name="title"
              value={blogInfo.title}
              onChange={handleInputChange}
              error={error["title"]}
            />

            <CustomInput
              label="URL"
              required
              type="text"
              id="blog-url"
              placeholder="https://medium.com/design..."
              name="link"
              value={blogInfo.link}
              onChange={handleInputChange}
              error={error["link"]}
            />

            <CustomInput
              label="For Organization"
              required
              type="text"
              id="blog-for-organization"
              placeholder="Google"
              name="forOrganization"
              value={blogInfo.forOrganization}
              onChange={handleInputChange}
              error={error["forOrganization"]}
            />

            <div className={styles["author-info"]}>
              <p>Author</p>

              <div>
                <div>
                  <CustomInput
                    label="Name"
                    required
                    type="text"
                    id="blog-author-name"
                    placeholder="John Tilak"
                    name="author.name"
                    value={blogInfo.author.name}
                    onChange={handleInputChange}
                    error={error["author.name"]}
                  />
                </div>

                <div>
                  <CustomInput
                    label="Profile URL"
                    required
                    type="text"
                    id="blog-author-url"
                    placeholder="https://www.linkedin..."
                    name="author.profile"
                    value={blogInfo.author.profile}
                    onChange={handleInputChange}
                    error={error["author.profile"]}
                  />
                </div>
              </div>
            </div>
          </div>

          <p>
            <button disabled={submitDisabled || loading}>
              {loading ? "Saving..." : "Submit"}
            </button>
            <span>(* Make sure you have checked the info)</span>
          </p>
        </form>
      </main>
    </>
  );
}
