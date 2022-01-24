// client/src/App.js

import React from "react";
import { GoogleLogin } from 'react-google-login'


const clientID = process.env.REACT_APP_AUTH_CLIENT_ID;
function Login() {
  const onSuccess = (response) => {
    console.log('[Login Success] currentUser:', response.profileObj);
  };

  const onFailure = (response) => {
    console.log('[Login failed] res:', response);
  };

  return (
    <div>
      <GoogleLogin
        clientId={clientID}
        buttonText='Login'
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={'single_host_origin'}
        isSignedIn={true}
      />
    </div>
  );
}

export default Login;
