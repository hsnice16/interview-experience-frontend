import { analytics } from "../firebase";
import { logEvent } from "firebase/analytics";
import { useEffect } from "react";

export const logPageViewEvent = () => {
  return (pageTitle: string) => {
    useEffect(() => {
      logEvent(analytics, "page_view", {
        page_title: pageTitle,
        page_location: window.location.href,
        page_path: window.location.pathname,
      });
    }, [pageTitle]);
  };
};
