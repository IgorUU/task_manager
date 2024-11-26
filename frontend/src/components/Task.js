import { forwardRef } from "react";

const Task = forwardRef(({ withOpacity, isDragging, style, task, ...props }, ref) => {
  const inlineStyles = {
    opacity: withOpacity ? "0.5" : "1",
    transformOrigin: "50% 50%",
    cursor: isDragging ? "grabbing" : "grab",
    boxShadow: isDragging
      ? "rgb(63 63 68 / 5%) 0px 2px 0px 2px, rgb(34 33 81 / 15%) 0px 2px 3px 2px"
      : "rgb(63 63 68 / 5%) 0px 0px 0px 1px, rgb(34 33 81 / 15%) 0px 1px 3px 0px",
    transform: isDragging ? "scale(1.05)" : "scale(1)",
    ...style,
  };

  return (
    <div ref={ref} className="task" style={inlineStyles} {...props}>
      <h3>{task.task}</h3>
      <p className="task-description">{task.task_description}</p>
    </div>
  );
});

export default Task;
