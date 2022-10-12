import { ExperiencesList } from "data";
import { selector } from "recoil";
import { selectedCompanyState } from "recoil/atoms";

export const filteredExperiencesState = selector({
  key: "filteredExperiencesState",
  get: ({ get }) => {
    const selectedCompany = get(selectedCompanyState);

    return ExperiencesList.filter(({ blog }) =>
      blog.heading.toLowerCase().includes(selectedCompany.toLowerCase())
    );
  },
});
