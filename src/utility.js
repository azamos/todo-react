import { HEADERS } from "./constants";
const fetchNparse = async (uri, method = "GET", payload = null) => {
  const reqWbodyOptions = {
    method,
    headers: HEADERS,
    body: JSON.stringify({ ...payload }),
  };
  const httpResponse = await fetch(
    uri,
    method == "GET" ? null : reqWbodyOptions
  );
  const responseData = await httpResponse.json();
  return responseData;
};

const mapTasks = (tasks) =>
  tasks.map((task) => {
    return { ...task, id: task._id };
  });

export { fetchNparse, mapTasks };
