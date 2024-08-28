import { logPageViewEvent } from "hooks";
import React from "react";

export function BlankPage() {
  logPageViewEvent()("Wrong Page");

  return <div>Wrong page...</div>;
}
