import { InternalDashboard, Seo } from "components";
import React, { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { ROUTE_PROTECTED } from "utils/constants/routes";

export function Dashboard() {
  const [searchParam] = useSearchParams();
  const message = useMemo(() => {
    return searchParam.get("message");
  }, [searchParam]);

  if (message !== process.env.REACT_APP_MESSAGE_CODE) {
    return null;
  }

  return (
    <>
      <Seo title="Dashboard" path={ROUTE_PROTECTED} noindex />
      <InternalDashboard />
    </>
  );
}
