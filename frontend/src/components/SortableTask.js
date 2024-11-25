import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Task from "./Task";

const SortableTask = ({ id, task, ...props }) => {
  const {
    isDragging,
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition || undefined,
  };

  return (
    <Task
      ref={setNodeRef}
      style={style}
      withOpacity={isDragging}
      task={task}
      {...props}
      {...attributes}
      {...listeners}
    />
  );
};

export default SortableTask;
