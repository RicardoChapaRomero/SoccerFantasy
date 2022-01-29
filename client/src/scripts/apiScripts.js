const doFetch = async (url, method = 'GET', params = {}) => {
  if (method === 'GET') {
    return await fetch(`${url}?${new URLSearchParams(params).toString()}`)
      .then((res) => res.json())
      .then((data) => {
        return data.message;
      });
  } else {
    return await fetch(url, {
      method: method,
      body: JSON.stringify(params),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then((res) => res.json())
      .then((data) => {
        return data.message;
      });
  }
};


/** Login Google Handler
 * 
 * doFetch returns:
 * {
 *  message: { 
 *    userIsRegistered: true/false
 *  }
 * }
 * */ 
export async function googleAuthOnSuccess(response) {
  const userProfile = response.profileObj;
  const userData = {
    method: 'google',
    email: userProfile.email,
    name: userProfile.name
  };

 const res =  await doFetch('/login', 'GET', userData);
 return res.userIsRegistered;
}

export function googleAuthOnFailure(response) {
  alert(
    `Something went wrong with Google Login.`
      `Try with your email and password`);
}

/** Login Form Handler
 * 
 * doFetch returns:
 * {
 *  message: { 
 *    userIsRegistered: true/false
 *  }
 * }
 * */ 
export async function formAuth(email, password) {
  const userData = {
    method: 'form',
    email: email,
    password: password
  };

  const res = await doFetch('/login', 'GET', userData);
  return res.userIsRegistered;
}

/** Register Form Handler
 * 
 * doFetch returns:
 * {
 *  message: {
 *    alreadyRegistered: true/false,
 *    registered: true
 *  }
 * }
 * 
 * */
export async function formRegister(email, password, teamName, name) {
  const userData = {
    email: email,
    password: password,
    name: name,
    teamName: teamName
  };

  const res = await doFetch('/register', 'POST', userData);
  return res;
}
