const BASE_URL =
  "https://strangers-things.herokuapp.com/api/2206-VPI-RM-WEB-PT";

export const fetchPosts = async (token) => {
  console.log("token", token);
  try {
    const response = await fetch(`${BASE_URL}/posts`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchUser = async (token) => {
  const response = await fetch(`${BASE_URL}/users/me`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const info = await response.json();
  console.log("THE USER INFO: ", info);
  return info;
};

export const registerUser = async (username, password) => {
  const response = await fetch(`${BASE_URL}/users/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user: {
        username,
        password,
      },
    }),
  });
  const info = await response.json();
  return info;
};

export const loginUser = async (username, password) => {
  const response = await fetch(`${BASE_URL}/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user: {
        username,
        password,
      },
    }),
  });
  const info = await response.json();
  return info;
};

export const createNewPost = async (
  token,
  title,
  description,
  price,
  location,
  willDeliver
) => {
  const response = await fetch(`${BASE_URL}/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      post: {
        title,
        description,
        price,
        location,
        willDeliver,
      },
    }),
  });
  const info = await response.json();
  return info;
};

export const editPostByID = async (
  id,
  token,
  title,
  description,
  price,
  location,
  willDeliver
) => {
  const response = await fetch(`${BASE_URL}/posts/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      post: {
        title,
        description,
        price,
        location,
        willDeliver,
      },
    }),
  });
  const info = await response.json();
  return info;
};

export const deletePostByID = async (postId, token) => {
  try {
    const response = await fetch(`${BASE_URL}/posts/${postId}`, {
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

export const messageUserRequest = async (postId, token, message) => {
  try {
    const response = await fetch(`${BASE_URL}/posts/${postId}/messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        message: {
          content: `${message}`,
        },
      }),
    });
    const info = await response.json();
    return info;
  } catch (error) {
    console.error(error);
  }
};
