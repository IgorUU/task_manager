function Task({ task }) {

    return (
        <div>
            <h3>{task.task}</h3>
            <p>{task.task_description}</p>
        </div>
    );
}

export default Task;
