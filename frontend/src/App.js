import { useState } from "react";
import './App.css';

function App() {
  const [name, setName] = useState("");
  const [result, setResult] = useState("");

  const handleChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const task = formData.get('task');

    try {
      const response = await fetch(e.target.action, {
        method: "POST",
        body: formData,
      })

      if (response.ok) {
        const data = await response.json();

        setResult(data.message)
      };
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="App">
      <form
        action={`${process.env.REACT_APP_BACKEND_API}/insert`}
        method="post"
        onSubmit={(event) => handleSubmit(event)}
      >
        <label htmlFor="task">Task name: </label>
        <input
          type="text"
          id="task"
          name="task"
          value={name}
          onChange={(event) => handleChange(event)}
        />
        <br />
        <button type="submit">Create</button>
      </form>
      <h1>{result}</h1>
      {/* TODO: Make this work on ajax like the request above. */}
      <a href={`${process.env.REACT_APP_BACKEND_API}/delete`}>Delete all tasks</a>
    </div>
  );
}

export default App;
