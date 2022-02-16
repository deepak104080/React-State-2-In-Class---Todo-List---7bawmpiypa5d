import React, { useState, useEffect } from "react";

function App() {
  const [toDoItem, setToDoItem] = useState("");
  const [toDoList, setToDoList] = useState([]);
  const [editStatus, setEditStatus] = useState("");
  const [editText, setEditText] = useState("");
  const [toDoItemEdit, setToDoItemEdit] = useState("");

  const handleChange = (e) => {
    //console.log("Inside Handle Change - ", e.target.value);
    setToDoItem(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let obj = {};
    obj.id = "abc" + Math.random();
    obj.todotext = toDoItem;
    obj.donestatus = false;
    setToDoList([...toDoList, obj]);
    setToDoItem("");
  };

  const handleChangeEdit = (e) => {
    //console.log("Inside Handle Change - ", e.target.value);
    setToDoItemEdit(e.target.value);
  };

  const handleSubmitEdit = (e) => {
    e.preventDefault();
    let updatedList;
    if (toDoItemEdit !== "") {
      updatedList = toDoList.map((item) => {
        if (item.id === editStatus) {
          item.todotext = toDoItemEdit;
        }
        return item;
      });
    } else {
      updatedList = toDoList.map((item) => {
        if (item.id === editStatus) {
          item.todotext = editText;
        }
        return item;
      });
    }
    setToDoList(updatedList);
    setToDoItemEdit("");
    setEditStatus("");
  };

  useEffect(() => {
    //console.log(toDoList);
  }, [toDoList]);

  const markEdit = (id, text) => {
    //console.log("mark edit", id);
    setEditStatus(id);
    setEditText(text);
    const updatedList = toDoList.map((item) => {
      if (item.id === id) {
        item.donestatus = !item.donestatus;
      }
      return item;
    });
    setToDoList(updatedList);
  };

  const markDelete = (id) => {
    //console.log(id);
    const updatedList = toDoList.filter((item) => {
      return item.id !== id;
    });
    setToDoList(updatedList);
  };

  return (
    <div id="main">
      <br></br>
      <h3>To Do App</h3>
      <br></br>
      <form onSubmit={handleSubmit}>
        <textarea
          id="task"
          value={toDoItem}
          placeholder="Enter a new to do"
          onChange={handleChange}
        />
        <br></br>
        <button variant="primary" type="submit" id="btn">
          Add
        </button>
      </form>
      <br></br>
      {toDoList &&
        toDoList.map((item) => (
          <div className="list">
            <span>{item.todotext}</span>
            {((editStatus !== "" && editStatus !== item.id) ||
              editStatus === "") && (
              <span>
                <button
                  className="edit"
                  onClick={() => markEdit(item.id, item.todotext)}
                >
                  Edit
                </button>
                <button className="delete" onClick={() => markDelete(item.id)}>
                  Delete
                </button>
              </span>
            )}
            {editStatus !== "" && editStatus === item.id && (
              <span>
                <form onSubmit={handleSubmitEdit}>
                  <textarea
                    value={toDoItemEdit}
                    placeholder={editText}
                    className="editTask"
                    onChange={handleChangeEdit}
                  />

                  <button variant="primary" type="submit" className="saveTask">
                    Save
                  </button>
                </form>
              </span>
            )}
            <br></br>
            <br></br>
          </div>
        ))}
    </div>
  );
}

export default App;
