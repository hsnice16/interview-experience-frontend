export const APP_NAME = "Tech Interview Experience";

export const APP_URL = "https://techinterviewexp.site";

export const APP_DESCRIPTION =
  "Read and share real tech interview experiences from companies like Google, Microsoft, Atlassian, and many more. A free, community-driven resource to help you prepare for your next software engineering interview.";

export const APP_KEYWORDS = [
  "tech interview experience",
  "interview preparation",
  "coding interview",
  "software engineer interview",
  "Google interview",
  "Microsoft interview",
  "Atlassian interview",
  "FAANG interview",
  "interview questions",
  "interview blogs",
  "placement preparation",
].join(", ");

export const APP_AUTHOR = "Himanshu Singh";

export const REPO_URL =
  "https://github.com/hsnice16/interview-experience-frontend";

export const TWITTER_HANDLE = "@hsnice16";

export const OG_IMAGE = `${APP_URL}/IE.png`;
export const OG_IMAGE_WIDTH = "180";
export const OG_IMAGE_HEIGHT = "180";

export const canonicalUrl = (path = "/"): string => {
  if (path === "/") return `${APP_URL}/`;
  return `${APP_URL}${path.startsWith("/") ? path : `/${path}`}`;
};
