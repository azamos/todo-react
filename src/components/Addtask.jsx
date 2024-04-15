import { useState } from "react";
const AddTask = ({ addTaskHandler }) => {
  const [value, setValue] = useState("");
  const onInput = e => setValue(e.target.value);
  const onSubmit = e => {
    addTaskHandler(value.trim());
    setValue("");
  };
  return (
    <div>
      <input className="addTask" onInput={onInput} value={value}></input>
      <button onClick={onSubmit}>Submit task</button>
    </div>
  );
};

export default AddTask;
