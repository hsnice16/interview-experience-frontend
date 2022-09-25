type Company = {
  _id: string;
  name: string;
};

type Author = {
  name: string;
  profile: string;
};

type Blog = {
  heading: string;
  link: string;
};

type Experience = {
  _id: string;
  author: Author;
  blog: Blog;
};
