import { expect } from "chai";
import React from "react";
import { mount } from "enzyme";
import sinon from "sinon";

import TaskInput from "./TaskInput";

describe("<TaskInput />", () => {
  it("should trigger its `onStored` prop when submit with an unempty value", () => {
    const onSubmit = sinon.spy();
    const wrapper = mount(<TaskInput onStored={onSubmit} />);

    wrapper.setState({ taskName: "Test Task Name" });

    wrapper.simulate("submit");

    expect(onSubmit).to.have.been.calledWith("Test Task Name");
    wrapper.unmount();
  });
});
