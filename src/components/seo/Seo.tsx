import React from "react";
import { Helmet } from "react-helmet-async";
import { APP_DESCRIPTION, APP_NAME, canonicalUrl } from "utils/constants/seo";

type SeoProps = {
  path?: string;
  title?: string;
  noindex?: boolean;
  description?: string;
  jsonLd?: Record<string, unknown>;
};

const DEFAULT_TITLE = `${APP_NAME} — Real Interview Stories from Top Companies`;

export const Seo = ({
  title,
  jsonLd,
  path = "/",
  noindex = false,
  description = APP_DESCRIPTION,
}: SeoProps): React.ReactElement => {
  const pageTitle = title ? `${title} · ${APP_NAME}` : DEFAULT_TITLE;
  const canonical = canonicalUrl(path);

  return (
    <Helmet prioritizeSeoTags>
      <title>{pageTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      <meta
        name="robots"
        content={
          noindex
            ? "noindex, nofollow"
            : "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
        }
      />

      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />

      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={description} />

      {jsonLd ? (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      ) : null}
    </Helmet>
  );
};
