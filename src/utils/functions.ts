export const getAccessToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("access_token");
  }
};

export const setAccessToken = (val: any) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("access_token", val);
  }
};

export const removeAccessToken = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("access_token");
  }
};
