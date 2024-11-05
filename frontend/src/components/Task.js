function Task({ task }) {
  return (
    <div className="task">
      <h3>{task.task}</h3>
      <p className="task-description">{task.task_description}</p>
    </div>
  );
}

export default Task;
