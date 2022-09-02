const BASE_URL =
  "https://strangers-things.herokuapp.com/api/2206-VPI-RM-WEB-PT";

export const fetchPosts = async () => {
  try {
    const response = await fetch(`${BASE_URL}/posts`);
    const data = await response.json();
    return data.data.posts;
  } catch (error) {
    console.error(error);
  }
};
