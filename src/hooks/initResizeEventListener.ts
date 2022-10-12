import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { selectedCompanyState } from "recoil/atoms";

export const initResizeEventListener = () => {
  return (asideRef: React.MutableRefObject<HTMLElement>) => {
    const [selectedCompany, setSelectedCompany] =
      useRecoilState(selectedCompanyState);

    useEffect(() => {
      const handleWindowResize = () => {
        if (
          getComputedStyle(asideRef.current).display === "none" &&
          selectedCompany !== ""
        ) {
          setSelectedCompany("");
        }
      };

      window.addEventListener("resize", handleWindowResize);

      return () => {
        window.removeEventListener("resize", handleWindowResize);
      };
    }, [asideRef, selectedCompany, setSelectedCompany]);
  };
};
