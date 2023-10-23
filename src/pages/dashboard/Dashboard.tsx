import { InternalDashboard } from "components";
import React, { useMemo } from "react";
import { useSearchParams } from "react-router-dom";

export function Dashboard() {
  const [searchParam] = useSearchParams();
  const message = useMemo(() => {
    return searchParam.get("message");
  }, [searchParam]);

  if (message !== process.env.REACT_APP_MESSAGE_CODE) {
    return null;
  }

  return <InternalDashboard />;
}
