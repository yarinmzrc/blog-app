export const BLOG_APP_LOCAL_STORAGE_PREFIX = "blog-app";

export const LOCAL_BASE_URL = "http://127.0.0.1:5000";

export enum PostCategory {
  Programming = "Programming",
  Data = "Data",
  Lifestyle = "Lifestyle",
}

export const postCategories = [
  PostCategory.Programming,
  PostCategory.Data,
  PostCategory.Lifestyle,
];

export const modalCustomStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    width: "750px",
    height: "max-content",
    background: "none",
    border: "0",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

export const defaultImageSrc =
  "https://images.unsplash.com/photo-1644906999518-71b776c4b750?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80";
