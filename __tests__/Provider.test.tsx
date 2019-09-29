import React, { FunctionComponent } from "react";
// import { ProvideAmplitude, useAmplitude } from "../dist/index";
import { ProvideAmplitude, ConsumeAmplitude, useAmplitude } from "../src/index";
import { shallow, mount } from "enzyme";
import toJson from "enzyme-to-json";

// jest.mock("amplitude-js");

const apiKey = "a41e51ccfa11b3a8c9667d0c2eee620e";

describe("suite", () => {
  it("should render", () => {
    const component = shallow(
      <ProvideAmplitude apiKey={apiKey}></ProvideAmplitude>
    );

    expect(component.length).toBe(1);

    expect(toJson(component)).toMatchSnapshot();
  });

  it("should send event with Consumer", () => {
    const component = mount(
      <ProvideAmplitude apiKey={apiKey}>
        <ConsumeAmplitude>
          {({ logEvent }) => (
            <button onClick={() => logEvent("TEST_EVENT", { key: "value" })}>
              send
            </button>
          )}
        </ConsumeAmplitude>
      </ProvideAmplitude>
    );

    expect(component.length).toBe(1);
    component.find("button").simulate("click");

    expect(toJson(component)).toMatchSnapshot();
  });

  it("should send event with useContext", () => {
    const LogTestWrapper: FunctionComponent = () => {
      const amplitudeEvent = useAmplitude();

      return (
        <div>
          <div>{(amplitudeEvent.event || {}).toString()}</div>
          <button
            onClick={() =>
              amplitudeEvent.logEvent("TEST_EVENT", { key: "value" })
            }
          >
            send
          </button>
        </div>
      );
    };

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
