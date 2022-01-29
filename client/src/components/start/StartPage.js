import { useState } from 'react';
import './StartPage.css';
import Messi from './Messi';
import LoginForm from '../login/LoginForm';
import RegisterForm from '../register/RegisterForm';

function StartPage(props) {
  const { onAuthChange } = props;
  const [isLoginForm, setIsLoginForm] = useState(true);
  const Form = isLoginForm ? (
    <LoginForm onAuthChange={onAuthChange} onChange={() => setIsLoginForm(false)} />
  ) : (
    <RegisterForm onAuthChange={onAuthChange} onChange={() => setIsLoginForm(true)} />
  );

  return (
    <div className="StartPage">
      <Messi></Messi>
      {Form}
    </div>
  );
}

export default StartPage;
