import React, { Component } from "react";
import PropTypes from "prop-types";

import "./TaskInput.css";

class TaskInput extends Component {
  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
    this.checkboxRef = React.createRef();
    this.selectRef = React.createRef();
    this.state = {
      taskName: "",
      optionsVisible: false,
    };
  }

  // arrow fx for binding
  handleNewTaskUpdate = (event) => {
    this.setState({ taskName: event.target.value });
  };

  // arrow fx for binding
  persistNewTask = (event) => {
    const { taskName } = this.state;
    event.preventDefault();
    taskName.length > 0 &&
      this.props.onStored(
        taskName,
        this.checkboxRef.current.checked,
        this.selectRef.current.value
      );
    this.checkboxRef.current.checked = false;
    this.setState({ taskName: "" });
  };

  componentDidMount() {
    this.inputRef.current.focus();
  }

  toggleDisplay = () => {
    this.setState({ optionsVisible: !this.state.optionsVisible });
  };

  render() {
    let dropdownClassName = "dropdown-content";
    if (this.state.optionsVisible) {
      dropdownClassName += "visible";
    }
    return (
      <form onSubmit={this.persistNewTask}>
        <div className="newTaskInput">
          <label>
            <input
              placeholder="New Task .. "
              type="text"
              autoFocus
              onChange={this.handleNewTaskUpdate}
              value={this.state.taskName}
              ref={this.inputRef}
            />
          </label>
          <button type="submit">Push</button>
        </div>
        <div className="dropdown">
          <span id="options" onClick={this.toggleDisplay}>
            options <i className="fas fa-sort-down"></i>
          </span>
          <div className={dropdownClassName}>
            <div>
              <label>
                is a group
                <input
                  type="checkbox"
                  id="isTaskGroup"
                  name="checkbox"
                  ref={this.checkboxRef}
                />
              </label>
            </div>
            <div>
              <label>
                part of
                <select
                  ref={this.selectRef}
                  defaultValue={this.props.currentGroup._id}
                  name="select"
                  id="partOfGroup"
                >
                  <optgroup label="Current group">
                    <option value={this.props.currentGroup._id}>
                      {this.props.currentGroup.name}
                    </option>
                  </optgroup>
                  <optgroup label="All groups">
                    <option value="root">home</option>
                    {this.props.groupList().map((group, index) => (
                      <option key={index} value={group._id}>
                        {group.name}
                      </option>
                    ))}
                  </optgroup>
                </select>
              </label>
            </div>
          </div>
        </div>
      </form>
    );
  }
}

TaskInput.propTypes = {
  onStored: PropTypes.func.isRequired,
  groupList: PropTypes.func.isRequired,
  currentGroup: PropTypes.object.isRequired,
};

export default TaskInput;
