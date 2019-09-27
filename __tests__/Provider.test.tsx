import React, { FunctionComponent } from "react";
import { ProvideAmplitude, useAmplitude } from "../src";
import { shallow, mount } from "enzyme";
import toJson from "enzyme-to-json";

// jest.mock("amplitude-js");

const apiKey = "a41e51ccfa11b3a8c9667d0c2eee620e";

const LogTestWrapper: FunctionComponent = () => {
  const amplitudeEvent = useAmplitude();

  return (
    <div>
      <div>{(amplitudeEvent.event || {}).toString()}</div>
      <button
        onClick={() => amplitudeEvent.logEvent("TEST_EVENT", { key: "value" })}
      >
        send
      </button>
    </div>
  );
};

describe("suite", () => {
  it("should render", () => {
    const component = shallow(
      <ProvideAmplitude apiKey={apiKey}></ProvideAmplitude>
    );

    expect(component.length).toBe(1);

    expect(toJson(component)).toMatchSnapshot();
  });

  it("should render with Log Test", () => {
    const component = mount(
      <ProvideAmplitude apiKey={apiKey}>
        <LogTestWrapper />
      </ProvideAmplitude>
    );

    expect(component.length).toBe(1);
    expect(component.find(LogTestWrapper).length).toBe(1);
    component.find("button").simulate("click");

    expect(toJson(component)).toMatchSnapshot();
  });
});
