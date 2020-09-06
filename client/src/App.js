import React, { Component } from "react";
import "./App.css";
import TaskInput from "./TaskInput";
import TaskBox from "./TaskBox";

class App extends Component {
  constructor() {
    super();
    this.home = {
      _id: "root",
      name: "home",
      partOfGroup: "none",
    };
    this.pollInterval = null;
    this.state = {
      error: null,
      author: "",
      taskName: "",
      taskList: [],
      selectedTasksId: [],
      currentGroup: this.home,
    };
  }

  componentDidMount() {
    this.loadCommentsFromServer();
    if (!this.pollInterval) {
      this.pollInterval = setInterval(this.loadCommentsFromServer, 5000);
    }
  }

  componentWillUnmount() {
    if (this.pollInterval) clearInterval(this.pollInterval);
    this.pollInterval = null;
  }

  loadCommentsFromServer = () => {
    fetch("/api/tasks/")
      .then((data) => data.json())
      .then((res) => {
        if (!res.success) this.setState({ error: res.error });
        else this.setState({ taskList: res.data });
      });
  };

  // Arrow fx for binding
  handleTaskClick = (id) => {
    const { selectedTasksId } = this.state;
    const isTaskSelected = selectedTasksId.includes(id);

    isTaskSelected
      ? selectedTasksId.splice(selectedTasksId.indexOf(id), 1)
      : selectedTasksId.splice(this.sortedIndex(selectedTasksId, id), 0, id);

    this.setState({ selectedTasksId });
  };

  // Arrow fx for binding
  handleIconClick = (id) => {
    const { taskList, selectedTasksId } = this.state;
    this.setState({
      currentGroup: taskList.find((task) => task._id === id),
    });
    selectedTasksId.length = 0;
    this.setState({ selectedTasksId });
  };

  // Arrow fx for binding
  handlePillsClick = (id) => {
    const { taskList, selectedTasksId } = this.state;
    id === "root"
      ? this.setState({ currentGroup: this.home })
      : this.setState({
          currentGroup: taskList.find((task) => task._id === id),
        });
    selectedTasksId.length = 0;
    this.setState({ selectedTasksId });
  };

  sortedIndex(array, value) {
    var low = 0,
      high = array.length;

    while (low < high) {
      var mid = (low + high) >>> 1;
      array[mid] < value ? (low = mid + 1) : (high = mid);
    }
    return low;
  }

  // arrow fx for binding
  isTaskSelected = (id) => {
    const { selectedTasksId } = this.state;

    return selectedTasksId.includes(id) ? "isSelected" : "isNotSelected";
  };

  // arrow fx for binding
  saveTaskEntry = (taskName, isTaskGroup, partOfGroup) => {
    fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ taskName, isTaskGroup, partOfGroup }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (!res.success)
          this.setState({ error: res.error.message || res.error });
        else this.setState({ author: "", taskName: "", error: null });
      });
    this.loadCommentsFromServer();
  };

  updateTaskStatus(id, status) {
    fetch(`/api/tasks/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (!res.success)
          this.setState({ error: res.error.message || res.error });
      });
  }

  deleteTask(id) {
    fetch(`api/tasks/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((res) => {
        if (!res.success)
          this.setState({ error: res.error.message || res.error });
      });
  }

  getRelativesIdFrom(id) {
    var { taskList } = this.state;
    var relativeChildrensId = [];
    const task = taskList.find((task) => task._id === id);

    if (task !== undefined) {
      var exTaskList = [];
      exTaskList = taskList.slice();
      exTaskList.splice(exTaskList.indexOf(task), 1);
      if (task.isTaskGroup) {
        var otherRelatives = exTaskList.filter((t) =>
          t.partOfGroups.includes(task._id)
        );
        while (otherRelatives.length > 0) {
          const relative = otherRelatives.pop();
          relativeChildrensId.push(relative._id);
          if (relative.isTaskGroup) {
            exTaskList.splice(exTaskList.indexOf(relative), 1);
            let newOtherRelatives = exTaskList.filter((t) =>
              t.partOfGroups.includes(relative._id)
            );
            otherRelatives = [...otherRelatives, ...newOtherRelatives];
          }
        }
      }
    } else {
      console.log("Error : This task doesn't exist !!");
    }
    return relativeChildrensId;
  }

  // Arrow fx for binding
  handleFinishedClick = () => {
    const { selectedTasksId, taskList } = this.state;
    const finishedTasks = [];
    const defaultTasks = [];

    taskList.forEach((task) => {
      if (selectedTasksId.indexOf(task._id) > -1) {
        if (task.status === "finished") {
          finishedTasks.push(task);
          task.status = "default";
        } else {
          defaultTasks.push(task);
          task.status = "finished";
        }
      }
    });

    finishedTasks.forEach((task) => this.updateTaskStatus(task._id, "default"));
    defaultTasks.forEach((task) => this.updateTaskStatus(task._id, "finished"));

    selectedTasksId.length = 0;

    this.setState({
      selectedTasksId,
      taskList,
    });
  };

  // arrow fx for binding
  handleRemoveClick = () => {
    const { taskList, selectedTasksId } = this.state;
    var newTaskList = taskList.slice();

    selectedTasksId.forEach((id) => {
      let i = newTaskList.findIndex((c) => c._id === id);
      let relatives = this.getRelativesIdFrom(id);
      newTaskList = [...newTaskList.slice(0, i), ...newTaskList.slice(i + 1)];
      console.log(id, relatives);
      this.deleteTask(id);
      relatives.forEach((id) => {
        this.deleteTask(id);
      });
    });

    selectedTasksId.length = 0;

    this.setState({
      taskList: newTaskList,
      selectedTasksId,
    });
  };

  // arrow fx for binding
  getGroupList = () => {
    const { taskList } = this.state;
    return taskList.filter((task) => task.isTaskGroup);
  };

  render() {
    return (
      <div className="container">
        <h1>React To Do's</h1>
        <div className="row">
          <div className="tasks">
            <h2>Tasks: </h2>
            <TaskBox
              handleTaskClick={this.handleTaskClick}
              handleIconClick={this.handleIconClick}
              handlePillsClick={this.handlePillsClick}
              isTaskSelected={this.isTaskSelected}
              data={this.state.taskList}
              currentGroup={this.state.currentGroup}
              home={this.home}
            />
          </div>
          <div className="controls">
            <button
              name="deleteButton"
              id="delete"
              type="button"
              onClick={() => this.handleRemoveClick()}
            >
              <i className="fas fa-trash"></i>
            </button>
            <button
              name="finishedButton"
              id="finish"
              type="button"
              onClick={() => this.handleFinishedClick()}
            >
              <i className="fas fa-check"></i>
            </button>
          </div>
        </div>
        <div className="row">
          <div className="form">
            <h2>Quick task : </h2>
            <TaskInput
              groupList={this.getGroupList}
              onStored={this.saveTaskEntry}
              currentGroup={this.state.currentGroup}
            />
          </div>
        </div>
        {this.state.error && <p>{this.state.error}</p>}
      </div>
    );
  }
}

export default App;
