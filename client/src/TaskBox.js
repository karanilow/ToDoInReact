import React from "react";
import PropTypes from "prop-types";

import "./TaskBox.css";
import Task from "./Task";
import TaskPill from "./TaskPill";

const TaskBox = (props) => {
  const taskToRender = props.data.filter((task) =>
    task.partOfGroup.includes(props.currentGroup._id)
  );

  const taskNodes = taskToRender.map((task) => (
    <Task
      taskName={task.name}
      key={task._id}
      onIconClick={props.handleIconClick}
      onTaskClick={props.handleTaskClick}
      status={task.status}
      isSelected={props.isTaskSelected(task._id)}
      id={task._id}
      isTaskGroup={task.isTaskGroup}
    />
  ));
  return (
    <div>
      <TaskPill
        currentGroup={props.currentGroup}
        handlePillsClick={props.handlePillsClick}
        taskList={props.data}
        home={props.home}
      />
      <h3>{props.currentGroup.name}</h3>
      {taskNodes}
    </div>
  );
};

TaskBox.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      partOfGroup: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
      isTaskGroup: PropTypes.bool.isRequired,
    })
  ),
  handleTaskClick: PropTypes.func.isRequired,
  handleIconClick: PropTypes.func.isRequired,
  handlePillsClick: PropTypes.func.isRequired,
  isTaskSelected: PropTypes.func.isRequired,
  currentGroup: PropTypes.object.isRequired,
  home: PropTypes.object.isRequired,
};

TaskBox.defaultProps = {
  data: [],
};

export default TaskBox;
