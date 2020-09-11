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
  let expiry = new Date(
    new Date().getTime() + 60 * 60 * 24 * 1000
  ).toUTCString();
  console.log(expiry);
  if (serverResponse.admin === true) {
    authorize(true);
    document.cookie = "admin =" + serverResponse.admin + "; expires =" + expiry;
    document.cookie = "token =" + serverResponse.token + ";expires =" + expiry;
  }
  if (serverResponse.admin === false) {
    authorize(null);
  }
};

export const checkLogin = (authorize, setAccessToken) => {
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
      if (data.admin === "admin") {
        authorize(true);
        setAccessToken(token);
        console.log("token validated");
      }
    });
};
