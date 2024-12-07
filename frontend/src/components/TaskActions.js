import { useCallback } from "react";

function useTaskActions(setTasks, setResult, setResponseStatus) {
  const setTaskWeight = async (orderedTasks) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_API}/update`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(orderedTasks),
        }
      );

      if (!response.ok) {
        console.error("Error from the server:", await response.json());
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchTasks = useCallback(async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_API}/getTasks`
      );
      const data = await response.json();
      const sortedData = data.sort((a, b) => a.weight - b.weight);
      setTasks(sortedData);
    } catch (error) {
      console.error("Error fecthing tasks:", error);
    }
  }, [setTasks]);

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

  return { setTaskWeight, fetchTasks, deleteAllTasks, createTask };
}

export default useTaskActions;
