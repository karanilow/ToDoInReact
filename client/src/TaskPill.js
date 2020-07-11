import React from "react";
import PropTypes from "prop-types";

import "./TaskPill.css";

class TaskPill extends React.Component {
  constructor(props) {
    super(props);
  }

  getParentsTreeFrom(id) {
    const taskList = this.props.taskList;
    var tree = [];
    tree[0] = this.props.home;
    var parent = taskList.find((task) => task._id === id);

    while (parent !== undefined) {
      tree.push(parent);
      parent = taskList.find((task) => task._id === parent.partOfGroup);
    }

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
                <button>{parent.name} ></button>
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
  taskList: PropTypes.array.isRequired,
  home: PropTypes.object.isRequired,
};

export default TaskPill;
