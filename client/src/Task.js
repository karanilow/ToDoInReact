import React from "react";
import PropTypes from "prop-types";

import "./Task.css";

const Task = ({
  taskName,
  onIconClick,
  onTaskClick,
  status,
  isSelected,
  id,
  isTaskGroup,
}) => (
  <div className="row singleTask">
    <div>
      <button
        onClick={() => onIconClick(id)}
        type="button"
        style={
          isTaskGroup ? { visibility: "visible" } : { visibility: "hidden" }
        }
      >
        <i className="fas fa-clipboard-list "></i>
      </button>
    </div>
    <div
      className={`singleTaskName ${status} ${isSelected}`}
      onClick={() => onTaskClick(id)}
    >
      {taskName}
    </div>
  </div>
);

Task.propTypes = {
  taskName: PropTypes.string.isRequired,
  status: PropTypes.oneOf(["default", "finished"]).isRequired,
  isSelected: PropTypes.oneOf(["isSelected", "isNotSelected"]).isRequired,
  onTaskClick: PropTypes.func.isRequired,
  onIconClick: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  isTaskGroup: PropTypes.bool.isRequired,
};

export default Task;
