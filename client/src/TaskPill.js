import React from "react";
import PropTypes from "prop-types";

import "./TaskPill.css";

class TaskPill extends React.Component {
  constructor(props) {
    super(props);
  }

  getParentsTreeFrom(id) {
    if (this.props.currentGroup._id === "root") {
      return [];
    }

    const taskList = this.props.taskList;
    var tree = [];
    var parent = taskList.find((task) => task._id === id);

    while (parent !== undefined) {
      tree.unshift(parent);
      parent = taskList.find((task) => task._id === parent.partOfGroup);
    }
    tree.unshift(this.props.home);

    return tree;
  }

  render() {
    const pill = this.getParentsTreeFrom(this.props.currentGroup.partOfGroup);

    return (
      <div>
        <nav className="crumbs">
          <ol>
            {pill.map((parent, index) => (
              <li className="crumb" key={index}>
                <button onClick={() => this.props.handlePillsClick(parent._id)}>
                  {parent.name} >
                </button>
              </li>
            ))}
          </ol>
        </nav>
      </div>
    );
  }
}

TaskPill.propTypes = {
  currentGroup: PropTypes.object.isRequired,
  handlePillsClick: PropTypes.func.isRequired,
  taskList: PropTypes.array.isRequired,
  home: PropTypes.object.isRequired,
};

export default TaskPill;
