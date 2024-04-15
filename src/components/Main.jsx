import { ACTIVE, COMPLETED, ALL, URL, POST, DELETE, PUT } from "../constants";

import { fetchNparse, mapTasks } from "../utility";

import { tasks } from "../mock";

import { useState, useEffect } from "react";
import Task from "./Task";
import AddTask from "./Addtask";
import Navbar from "./Navbar";

const publishTask = async (description) => {
  return await fetchNparse(URL, POST, { description });
};

const fetchTasks = async () => {
  try {
    const response = await fetch(URL);
    const resData = await response.json();
    return mapTasks(resData);
  } catch (err) {
    console.log(err);
    return tasks;
  }
};

const Main = () => {
  const [tasksList, setTasksList] = useState([]);

  const [filteredTasksList, setFilteredTasksList] = useState([]);

  const [selected, setSelected] = useState(ALL);

  useEffect(() => {
    (async () => {
      const fetchedTasks = await fetchTasks();
      setTasksList(fetchedTasks);
    })();
  }, []);

  const addTask = async (description) => {
    const newTask = await publishTask(description);
    setTasksList((oldTasksList) => [
      ...oldTasksList,
      { ...newTask, id: newTask._id },
    ]);
  };

  const removeTask = async (id) => {
    const updatedList = await fetchNparse(URL + "/deleteTask", DELETE, { id });
    setTasksList(mapTasks(updatedList));
  };

  const toggleActive = (id) => {
    (async () => {
      const resData = await fetchNparse(`${URL}/toggleActive`, PUT, { id });
      setTasksList(mapTasks(resData));
    })();
  };

  const clearCompleted = () => {
    (async () => {
      const resData = await fetchNparse(`${URL}/clearCompleted`);
      setTasksList(mapTasks(resData));
    })();
  };

  const alterSelected = (newSelect) => setSelected(newSelect);

  useEffect(
    () =>
      setFilteredTasksList((oldList) =>
        tasksList.filter((task) => {
          switch (selected) {
            case ACTIVE:
              return task.active;
            case COMPLETED:
              return !task.active;
            default:
              return true;
          }
        })
      ),
    [tasksList, selected]
  );

  return (
    <div className="main">
      <h1>TODO</h1>
      <div>
        <AddTask addTaskHandler={addTask} />
      </div>
      <div className="taskList">
        {filteredTasksList.map(({ id, description, active }) => (
          <Task
            key={id}
            id={id}
            removeTask={removeTask}
            description={description}
            active={active}
            toggleComplete={toggleActive}
          />
        ))}
      </div>
      <div>
        <Navbar
          filterHandler={alterSelected}
          clearHandler={clearCompleted}
          counter={tasksList.length}
        />
      </div>
    </div>
  );
};

export default Main;
