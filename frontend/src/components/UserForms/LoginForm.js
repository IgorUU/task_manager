import { useState } from "react";

function LoginForm() {
  const [showLoginInputs, setShowLoginInputs] = useState(false);
  const [showRegisterInputs, setShowRegisterInputs] = useState(false);

  const handleClick = (action) => {
    setShowLoginInputs(action === 'login');
    setShowRegisterInputs(action === 'register');
  }

  return (
    <>
      <h1>Login form</h1>
      <button onClick={() => handleClick("login")}>Login</button>
      <button onClick={() => handleClick("register")}>Register</button>

      {showLoginInputs && (
        <>
          <input type="text" name="email"></input>
          <input type="password" name="password"></input>
        </>
      )}
      {showRegisterInputs && (
        <>
          <input type="text" name="email" placeholder="Email" />
          <input type="text" name="username" placeholder="Username" />
          <input type="password" name="password" placeholder="Password" />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
          />
        </>
      )}
    </>
  );
}

export default LoginForm;
