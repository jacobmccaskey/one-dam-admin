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
  if (serverResponse.admin === true) {
    authorize(true);
    document.cookie =
      "admin =" +
      encodeURIComponent(serverResponse.admin) +
      "; expires =" +
      expiry;
    document.cookie =
      "token =" +
      encodeURIComponent(serverResponse.token) +
      ";expires =" +
      expiry;
  }
  if (serverResponse.admin === false) {
    authorize(null);
  }
};

export const checkCookie = (authorize, setAccessToken) => {
  let token = getCookie("token");
  // if (!token) {
  //   return authorize(null);
  // }

  fetch(process.env.REACT_APP_ADMIN_VERIFY, {
    method: "GET",
    headers: {
      "x-access-token": token,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.admin === false && data.edit === false) {
        document.cookie = "token=;max-age=0";
        document.cookie = "admin=;max-age=0";
        return authorize(null);
      }
      if (data.edit === true) {
        authorize(true);
        setAccessToken(token);
      }
    });
};

export function logout(authorize, setAccessToken) {
  document.cookie = "token=;max-age=0";
  document.cookie = "admin=;max-age=0";
  authorize(null);
  setAccessToken(null);
}

function getCookie(name) {
  // Split cookie string and get all individual name=value pairs in an array
  var cookieArr = document.cookie.split(";");

  // Loop through the array elements
  for (var i = 0; i < cookieArr.length; i++) {
    var cookiePair = cookieArr[i].split("=");

    /* Removing whitespace at the beginning of the cookie name
      and compare it with the given string */
    if (name === cookiePair[0].trim()) {
      // Decode the cookie value and return
      return decodeURIComponent(cookiePair[1]);
    }
  }

  // Return null if not found
  return null;
}
