import { useCallback } from "react";
import { arrayMove } from "@dnd-kit/sortable";

function useDNDUtilities(setTasks, setTaskWeight, setActiveId) {
  const handleDragStart = useCallback(
    (event) => {
      setActiveId(event.active.id);
    },
    [setActiveId]
  );

  const handleDragEnd = useCallback(
    (event) => {
      const { active, over } = event;

      if (active.id !== over?.id) {
        setTasks((prevTasks) => {
          // Find indexes of the active and over items
          const oldIndex = prevTasks.findIndex((task) => task.id === active.id);
          const newIndex = prevTasks.findIndex((task) => task.id === over.id);

          // Reorder the tasks and update the weight.
          const orderedTasks = arrayMove(prevTasks, oldIndex, newIndex);
          orderedTasks.forEach((task, index) => {
            task["weight"] = index + 1;
          });
          setTaskWeight(orderedTasks);

          return orderedTasks;
        });
      }

      setActiveId(null);
    },
    [setTasks, setActiveId, setTaskWeight]
  );

  const handleDragCancel = useCallback(() => {
    setActiveId(null);
  }, [setActiveId]);

  return { handleDragStart, handleDragEnd, handleDragCancel };
}

export default useDNDUtilities;
