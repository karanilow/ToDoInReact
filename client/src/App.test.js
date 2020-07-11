import React from "react";
import { shallow } from "enzyme";
import { expect } from "chai";

import App from "./App";

describe("<App />", () => {
  it("renders without crashing", () => {
    const wrapper = shallow(<App />);
  });
  it("selected tasks should be removed correctly", () => {
    const wrapper = shallow(<App />);
    const initTaskList = Array.from({ length: 20 }, () =>
      Math.floor(Math.random() * 20).toString()
    );
    const initSelectedTasksIndices = [
      0,
      Math.floor(Math.random() * 16 + 1),
      19,
    ];
    const initFinishedTasksIndices = [
      0,
      initSelectedTasksIndices[1],
      initSelectedTasksIndices[1] + 1,
    ];
    const finalTaskList = initTaskList;
    finalTaskList.splice(initSelectedTasksIndices[1], 1);
    finalTaskList.shift();
    finalTaskList.pop();
    const finalFinishedTasksInidices = initFinishedTasksIndices;
    finalFinishedTasksInidices.pop();
    finalFinishedTasksInidices.pop();
    finalFinishedTasksInidices[0] = initFinishedTasksIndices[2] - 2;

    wrapper.setState({
      taskList: initTaskList,
      selectedTasksIndices: initSelectedTasksIndices,
      finishedTasksIndices: initFinishedTasksIndices,
    });

    wrapper.find('[name="deleteButton"]').simulate("click");

    expect(wrapper.state("taskList")).to.be.equal(finalTaskList);
    expect(wrapper.state("selectedTasksIndices")).to.be.empty();
    expect(wrapper.state("finishedTasksIndices")).to.be.equal(
      finalFinishedTasksInidices
    );
  });
  it("selected tasks should be marked as finished correctly", () => {
    const wrapper = shallow(<App />);
    const initTaskList = Array.from({ length: 20 }, () =>
      Math.floor(Math.random() * 20).toString()
    );
    const initSelectedTasksIndices = [
      0,
      Math.floor(Math.random() * 15 + 1),
      19,
    ];
    const initFinishedTasksIndices = [
      0,
      initSelectedTasksIndices[1],
      initSelectedTasksIndices[1] + 1,
    ];

    const finalFinishedTasksIndices = initFinishedTasksIndices;
    finalFinishedTasksIndices.pop();
    finalFinishedTasksIndices.pop();
    finalFinishedTasksIndices.splice(0, 0, 19);

    wrapper.setState({
      taskList: initTaskList,
      selectedTasksIndices: initSelectedTasksIndices,
      finishedTasksIndices: initFinishedTasksIndices,
    });

    wrapper.find('[name="finishedButton"]').simulate("click");

    expect(wrapper.state("taskList")).to.be.equal(initTaskList);
    expect(wrapper.state("selectedTasksIndices")).to.be.empty();
    expect(wrapper.state("finishedTasksIndices")).to.be.equal(
      finalFinishedTasksIndices
    );
  });
  it("should match its reference snapshot", () => {
    const wrapper = shallow(<App />);

    expect(wrapper).to.matchSnapshot();
  });
});
