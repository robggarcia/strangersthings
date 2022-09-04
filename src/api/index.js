const BASE_URL =
  "https://strangers-things.herokuapp.com/api/2206-VPI-RM-WEB-PT";

export const fetchPosts = async (token) => {
  try {
    const response = await fetch(`${BASE_URL}/posts`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    console.log(data);
    return data.data.posts;
  } catch (error) {
    console.error(error);
  }
};

export const editPostByID = async (id, token) => {};

export const deletePostByID = async (id, token) => {
  try {
    const response = await fetch(`${BASE_URL}/posts/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const info = await response.json();
    return info;
  } catch (error) {
    console.error(error);
  }
};
