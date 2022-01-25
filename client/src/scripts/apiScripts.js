const doFetch = (url, method = 'GET', params = {}) => {
  if (method === 'GET') {
    fetch(`${url}?${new URLSearchParams(params).toString()}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.message);
      });
  } else {
    fetch(url, {
      method: method,
      body: JSON.stringify(params)
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response.message);
      });
  }
};

// Google Login Handlers
export function googleAuthOnSuccess(response) {
  const userProfile = response.profileObj;
  const userData = {
    method: 'google',
    email: userProfile.email,
    name: userProfile.name
  };

  doFetch('/login', 'GET', userData);
}

export function googleAuthOnFailure(response) {
  console.log('Login Failed:');
  console.log(response);
}

// Form Login Handlers
export function loginAuth(email, password) {
  const userData = {
    method: 'form',
    email: email,
    password: password
  };

  doFetch('/login', 'GET', userData);
}
