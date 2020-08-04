export const addToStore = async (url, name, description, price) => {
  let body = {
    name: name,
    price: price,
    description: description,
    imageUrl: url,
  };
  fetch(process.env.REACT_APP_ADDITEM, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  })
    .then((res) => res.json())
    .then((data) => data)
    .catch((err) => console.error(err));
};

export const serverAuthorize = (authorize, serverResponse) => {
  if (serverResponse.admin === true) {
    authorize(true);
    localStorage.setItem("admin", serverResponse.admin);
    localStorage.setItem("token", serverResponse.token);
  }
  if (serverResponse.admin === false) {
    authorize(null);
    localStorage.setItem("admin", null);
    localStorage.setItem("token", null);
  }
};

export const checkLogin = (authorize) => {
  let token = localStorage.getItem("token");
  if (!token) {
    return authorize(null);
  }

  fetch(process.env.REACT_APP_ADMIN_VERIFY, {
    method: "GET",
    headers: {
      "x-access-token": token,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.admin === false && data.edit === false) {
        console.log("token not validated");
        authorize(null);
      }
      if (data.admin === "admin" && data.edit === true) {
        authorize(true);
        console.log("token validated");
      }
    });
};
