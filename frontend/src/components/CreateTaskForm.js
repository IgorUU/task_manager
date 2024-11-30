import { useState, useEffect, useCallback } from "react";
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
import {
  arrayMove,
  rectSortingStrategy,
  SortableContext,
} from "@dnd-kit/sortable";
import Grid from "./Grid";
import SortableTask from "./SortableTask";

function CreateTaskForm() {
  const [task, setTask] = useState("");
  const [activeId, setActiveId] = useState(null);
  const [result, setResult] = useState("");
  const [responseStatus, setResponseStatus] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [tasks, setTasks] = useState([]);
  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

  useEffect(() => {
    fetchTasks();
  }, [result]);

  const fetchTasks = () => {
    return fetch(`${process.env.REACT_APP_BACKEND_API}/getTasks`)
      .then((res) => res.json())
      .then((data) => setTasks(data));
  };

  const deleteAllTasks = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_API}/delete`,
        {
          method: "GET",
        }
      );

      if (response.ok) {
        const data = await response.json();

        setResult(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const createTask = async (e) => {
    const formData = new FormData(e.target);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_API}/insert`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      if (response.ok) {
        setResponseStatus("success");
        setResult(data.message);
      } else {
        setResponseStatus("error");
        setResult(data.error);
      }
    } catch (error) {
      console.error(error);
    }
  };

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

  const handleDragStart = useCallback((event) => {
    setActiveId(event.active.id);
  }, []);

  const handleDragEnd = useCallback((event) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setTasks((prevTasks) => {
        // Find indexes of the active and over items
        const oldIndex = prevTasks.findIndex((task) => task.id === active.id);
        const newIndex = prevTasks.findIndex((task) => task.id === over.id);

        // Reorder the tasks
        const newTasks = arrayMove(prevTasks, oldIndex, newIndex);

        // TODO: Update the weight at this point.
        return newTasks;
      });
    }

    setActiveId(null);
  }, []);

  const handleDragCancel = useCallback(() => {
    setActiveId(null);
  }, []);

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
