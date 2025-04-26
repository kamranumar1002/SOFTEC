const customFetch = async (url, options = {}) => {
  const accessToken = localStorage.getItem("access_token");
  const refreshToken = localStorage.getItem("refresh_token");

  const headers = options.headers || {};
  if (accessToken) {
    headers.Authorization = `Bearer ${accessToken}`;
  }

  const finalOptions = {
    ...options,
    headers,
  };

  let response = await fetch(url, finalOptions);

  if (response.status === 401 && refreshToken) {
    const refreshResponse = await fetch("http://localhost:5000/api/auth/refreshToken", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: refreshToken }),
    });

    if (refreshResponse.ok) {
      const data = await refreshResponse.json();
      localStorage.setItem("access_token", data.token);

      finalOptions.headers.Authorization = `Bearer ${data.token}`;
      response = await fetch(url, finalOptions);
    } else {
      localStorage.clear();
      window.location.href = "/login";
      throw new Error("Token refresh failed");
    }
  }

  return response;
};

export default customFetch;