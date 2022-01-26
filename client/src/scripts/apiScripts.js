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
      body: JSON.stringify(params),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response.message);
      });
  }
};

// Login Google Handlers
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
  // Todo
  console.log('Login Failed:');
  console.log(response);
}

// Login Form Handler
export function formAuth(email, password) {
  const userData = {
    method: 'form',
    email: email,
    password: password
  };

  doFetch('/login', 'GET', userData);
}

// Register Form Handler
export function formRegister(email, password, team, name) {
  const userData = {
    email: email,
    password: password,
    name: name,
    team: team
  };

  doFetch('/register', 'POST', userData);
}
