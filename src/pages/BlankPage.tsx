import { Seo } from "components";
import { logPageViewEvent } from "hooks";
import React from "react";

export function BlankPage() {
  logPageViewEvent()("Wrong Page");

  return (
    <>
      <Seo title="Page Not Found" noindex />
      <div>Wrong page...</div>
    </>
  );
}
