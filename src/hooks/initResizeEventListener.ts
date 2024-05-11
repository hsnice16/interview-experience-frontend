import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { selectedCompanyState, selectedKeywordState } from "recoil/atoms";

type InitResizeEventListenerReturnParam = {
  ref: React.MutableRefObject<HTMLElement>;
  type: "keyword" | "company";
};

export const initResizeEventListener = () => {
  return ({ ref, type }: InitResizeEventListenerReturnParam) => {
    const [selectedCompany, setSelectedCompany] =
      useRecoilState(selectedCompanyState);
    const [selectedKeyword, setSelectedKeyword] =
      useRecoilState(selectedKeywordState);

    useEffect(() => {
      const handleWindowResize = () => {
        if (getComputedStyle(ref.current).display === "none") {
          if (type === "keyword" && selectedKeyword !== "") {
            setSelectedKeyword("");
          }

          if (type === "company" && selectedCompany !== "") {
            setSelectedCompany("");
          }
        }
      };

      window.addEventListener("resize", handleWindowResize);

      return () => {
        window.removeEventListener("resize", handleWindowResize);
      };
    }, [
      ref,
      selectedCompany,
      selectedKeyword,
      setSelectedCompany,
      setSelectedKeyword,
      type,
    ]);
  };
};
