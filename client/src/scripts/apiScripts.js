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
    email: userProfile.email.toLowerCase(),
    name: userProfile.name
  };

  return await doFetch('/login', 'GET', userData);
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
    email: email.toLowerCase(),
    password: password
  };

  return await doFetch('/login', 'GET', userData);
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
    email: email.toLowerCase(),
    password: password,
    name: name,
    teamName: teamName
  };

  const res = await doFetch('/register', 'POST', userData);
  return res;
}

/** Verify Token Handler
 * 
 * doFetch returns:
 * {
 *  message: { 
 *    userId: id
 *  }
 * }
 * */
export async function verifyUserToken(token) {
  return await doFetch('/verifyToken', 'GET', { token: token });
}

/** Verify Token Handler
 * 
 * doFetch returns:
 * {
 *  message: { 
 *    userIsRegistered: true/false
 *  }
 * }
 * */
export async function verifyUser(id) {
  return await doFetch('/verifyUser', 'GET', { userId: id });
}

export async function getFantasy(id) {
  return await doFetch(`/fantasy/getFantasy/${id}`, 'GET', {});
}

/**
 * {
 *   team: {
 *     _id: new ObjectId("61fcb06452befb154342728b"),
 *     user_id: '61fb2081766859b8e9ddb024',
 *     lineup: '4-3-3',
 *     budget: 5000000,
 *     team_lineup: {
 *       goalkeeper: '',
 *       defense: [Array],
 *       midfield: [Array],
 *       attack: [Array],
 *       bench: [],
 *       dt: []
 *     },
 *     __v: 0
 *   }
 * }
 * 
*/
export async function saveFantasy(id, team) {
  return await doFetch(`/fantasy/saveFantasy/${id}`, 'POST', team);
}

export async function getPlayers(players) {
  return await doFetch('/fantasy/getPlayer', 'GET', { players: players });
}
