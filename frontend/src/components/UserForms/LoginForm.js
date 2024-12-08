import { useState } from "react";

function LoginForm() {
  const [action, setAction] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    // TODO: Maybe have 2 different functions handleLogin and handleRegister.
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_API}/${action}`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      if (response.ok) {
        // TODO: If login, show the notes.
        // TODO: If register, show the thank you page.
        console.log(response);
      } else {
        console.log(data.error)
      }
    }
    catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <h1>Login form</h1>
      <button onClick={() => setAction("login")}>Login</button>
      <button onClick={() => setAction("register")}>Register</button>
      {action && (
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" />

          {action === "register" && (
            <>
              <label htmlFor="username">Username</label>
              <input type="text" id="username" name="username" />
            </>
          )}

          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" />

          {action === "register" && (
            <input
              type="password"
              id="confirm_password"
              name="confirm_password"
            />
          )}

          <input type="submit" value="Submit" />
        </form>
      )}
    </>
  );
}

export default LoginForm;
