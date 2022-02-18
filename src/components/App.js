import React, { useState, useReducer, useRef } from "react";
import "./../styles/App.css";

function Lister(props) {
  return (
    <>
      <div className="list col-6 bg-light p-3 mt-3 justify-content-center align-self-center">
        {props.item.name}
      </div>
      <div className="col-3 bg-light p-3 mt-3">
        <button
          className="edit btn btn-success w-100"
          onClick={() => props.edit(props.index)}
        >
          Edit
        </button>
      </div>
      <div className="col-3 bg-light p-3 mt-3">
        <button
          className="delete btn btn-danger w-100"
          onClick={() => props.dlt(props.index)}
        >
          Delete
        </button>
      </div>
    </>
  );
}

function Editor(props) {
  const [val, setVal] = useState(props.item.name);

  return (
    <>
      <div className="col-9 bg-light p-3 mt-3 justify-content-center align-self-center">
        <textarea
          rows="1"
          className="editTask w-100"
          onChange={(e) => {
            setVal(e.target.value);
          }}
          value={val}
        />
      </div>
      <div className="col-3 bg-light p-3 mt-3">
        <button
          className="saveTask btn btn-success w-100"
          onClick={() => props.edit({ index: props.index, val })}
        >
          Save
        </button>
      </div>
    </>
  );
}

function App() {
  let mainInput = useRef(null);

  const [input, controlInput] = useState("");

  const [tasks, addTask] = useReducer((tasks, task) => {
    let temp = [...tasks];
    let tt = {
      name: task,
      edit: false
    };
    if (task !== "") {
      mainInput.current.value = "";
      temp.push(tt);
    }
    return temp;
  }, []);

  const [edit1, editTaskState] = useReducer((edit1, index) => {
    let temp = [...tasks];
    temp[index].edit = true;
    return temp;
  }, "");

  const [edit2, editTaskInfo] = useReducer((edit2, { index, val }) => {
    let temp = [...tasks];
    if (val !== "") {
      temp[index].name = val;
      temp[index].edit = false;
    }
    return temp;
  }, "");

  const [edit3, deleteTaskInfo] = useReducer((edit3, index) => {
    let temp = [...tasks];
    tasks.splice(index, 1);
    return temp;
  }, "");

  return (
    <div id="main" className="container">
      <div className="jumbotron row mb-0">
        <div className="col-12 mb-3 p-2 text-center">
          <h3>To Do List</h3>
        </div>
        <div className="offset-1 col-8">
          <textarea
            ref={mainInput}
            rows="1"
            className="w-100 h-100"
            name="task"
            id="task"
            onChange={(e) => {
              e.preventDefault();
              controlInput(e.target.value);
            }}
          />
        </div>
        <div className="col-2">
          <button
            className="w-100 btn btn-primary"
            id="btn"
            onClick={() => {
              addTask(input);
            }}
          >
            Add
          </button>
        </div>
      </div>
      <div className="row p-2">
        {tasks.map((item, index) =>
          item.edit ? (
            <Editor key={index} item={item} index={index} edit={editTaskInfo} />
          ) : (
            <Lister
              key={index}
              item={item}
              index={index}
              edit={editTaskState}
              dlt={deleteTaskInfo}
            />
          )
        )}
      </div>
    </div>
  );
}

export default App;
