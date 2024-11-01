import { useState } from "react";
import './App.css';

function App() {
  const [task, setTask] = useState("");
  const [result, setResult] = useState("");
  const [taskDescription, setTaskDescription] = useState("");


  const deleteAllTasks = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_API}/delete`, {
        method: "GET",
      })

      if (response.ok) {
        const data = await response.json();

        setResult(data.message)
      };
    } catch (error) {
      console.error(error);
    }
  }

  const createTask = async (e) => {
    const formData = new FormData(e.target);
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_API}/insert`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();

        setResult(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    const {name, value} = e.target;
    if (name === 'task') {
      setTask(value);
    }
    if (name === 'taskDescription') {
      setTaskDescription(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const submitter_name = e.nativeEvent.submitter.name;

    if (submitter_name === 'delete') {
      deleteAllTasks();
    }

    if (submitter_name === "create") {
      createTask(e);
    }

  };

  return (
    <div className="container">
      <form onSubmit={(event) => handleSubmit(event)}>
        <div className="input-group">
          <label htmlFor="task">Task name: </label>
          <input
            type="text"
            id="task"
            name="task"
            value={task}
            onChange={(event) => handleChange(event)}
          />
        </div>
        <div className="input-group">
          <label htmlFor="taskDescription">Task description: </label>
          <textarea
            name="taskDescription"
            rows={15}
            value={taskDescription}
            onChange={(event) => handleChange(event)}
          />
        </div>
        <br />
        <button type="submit" name="create">
          Create
        </button>
        <button type="submit" name="delete">
          Delete all tasks
        </button>
      </form>

      <h1>{result}</h1>
    </div>
  );
}

export default App;
