import { useState } from "react";
import $ from "jquery";
import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [result, setResult] = useState("");

  const handleChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = $(e.target);
    $.ajax({
      type: "POST",
      url: form.attr("action"),
      data: form.serialize(),
      success(data) {
        setResult(data);
      },
    });
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
