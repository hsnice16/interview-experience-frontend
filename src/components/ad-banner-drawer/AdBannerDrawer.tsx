import React, { useEffect, useState } from "react";
import styles from "./AdBannerDrawer.module.scss";
import { DownArrow } from "assets";
import classNames from "classnames";

export function AdBannerDrawer() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    function handleDocumentLoad() {
      setTimeout(() => {
        setIsOpen(
          localStorage.getItem("ad-banner-drawer") === "closed" ? false : true
        );
      }, 300);
    }

    window.addEventListener("load", handleDocumentLoad);
    return () => window.removeEventListener("load", handleDocumentLoad);
  }, []);

  const handleDownArrowClick = () => {
    localStorage.setItem("ad-banner-drawer", isOpen ? "closed" : "open");
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={classNames(styles["ad-banner-drawer"], {
        [styles.close]: !isOpen,
      })}
    >
      <button onClick={handleDownArrowClick}>
        <DownArrow className={styles["down-arrow"]} />
      </button>

      <p>
        Thank you for checking out{" "}
        <a href="https://techinterviewexp.site/">techinterviewexp.site</a>{" "}
        <span>🙌</span>. You can learn more about our purpose with this project
        from the <a href="https://techinterviewexp.site/about">About</a>
        page.
        <br /> <br />
        If you want to keep this project alive then please consider{" "}
        <em>
          <strong>
            <a
              href="https://github.com/sponsors/hsnice16"
              target="_blank"
              rel="noreferrer"
            >
              sponsoring
            </a>
          </strong>
        </em>
        the author on GitHub, your sponsorship will go into paying the server
        bills. We want to keep the experience free from Ads, that's why we are
        not considering Google Adsense.
        <br /> <br />
        This is a community project and it's public on{" "}
        <a
          href="https://github.com/hsnice16/interview-experience-frontend"
          target="_blank"
          rel="noreferrer"
        >
          GitHub
        </a>
        .
        <br />
        Show some community love ❤️
      </p>
    </div>
  );
}
