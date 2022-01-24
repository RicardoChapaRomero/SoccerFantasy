import { useState } from 'react';
import './StartPage.css';
import Messi from './Messi';
import LoginForm from '../login/LoginForm';
import RegisterForm from '../register/RegisterForm';

function StartPage() {
  const [isLoginForm, setIsLoginForm] = useState(true);
  const Form = isLoginForm ? (
    <LoginForm onChange={() => setIsLoginForm(false)} />
  ) : (
    <RegisterForm onChange={() => setIsLoginForm(true)} />
  );

  return (
    <div className="StartPage">
      <Messi></Messi>
      {Form}
    </div>
  );
}

export default StartPage;
