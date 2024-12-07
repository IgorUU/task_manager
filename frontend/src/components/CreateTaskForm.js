import { useState, useEffect } from "react";
import Task from "./Task";
import FormButtons from "./FormButtons";
import "../App.css";
import {
  closestCenter,
  DndContext,
  DragOverlay,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { rectSortingStrategy, SortableContext } from "@dnd-kit/sortable";
import Grid from "./Grid";
import SortableTask from "./SortableTask";
import useDNDUtilities from "./DNDUtilities";
import useTaskActions from "./TaskActions";

function CreateTaskForm() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const [taskDescription, setTaskDescription] = useState("");
  const [result, setResult] = useState("");
  const [responseStatus, setResponseStatus] = useState("");
  const { setTaskWeight, fetchTasks, deleteAllTasks, createTask } =
    useTaskActions(setTasks, setResult, setResponseStatus);
  const { handleDragStart, handleDragEnd, handleDragCancel } = useDNDUtilities(
    setTasks,
    setTaskWeight,
    setActiveId
  );
  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

  useEffect(() => {
    fetchTasks();
  }, [result, fetchTasks]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "task") {
      setTask(value);
    }
    if (name === "taskDescription") {
      setTaskDescription(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const submitter_name = e.nativeEvent.submitter.name;

    if (submitter_name === "delete") {
      deleteAllTasks();
    }
    if (submitter_name === "create") {
      createTask(e);
    }
    clearInputs();
  };

  const clearInputs = () => {
    setTask("");
    setTaskDescription("");
  };

  return (
    <>
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
          <FormButtons />
        </form>

        <h1 className={`result-message ${responseStatus}`}>{result}</h1>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
      >
        <SortableContext items={tasks} strategy={rectSortingStrategy}>
          <Grid>
            {tasks.map((task) => (
              <SortableTask key={task.id} id={task.id} task={task} />
            ))}
          </Grid>
        </SortableContext>
        <DragOverlay adjustScale style={{ transformOrigin: "0 0" }}>
          {activeId ? (
            <Task task={tasks.find((t) => t.id === activeId)} isDragging />
          ) : null}
        </DragOverlay>
      </DndContext>
    </>
  );
}

export default CreateTaskForm;
