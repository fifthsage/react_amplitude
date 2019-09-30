# REACT AMPLITUDE

[![Build Status](https://travis-ci.org/fifthsage/react_amplitude.svg?branch=master)](https://travis-ci.org/fifthsage/react_amplitude)

# USAGE

### 컨텍스트 사용

```jsx
import { ProvideAmplitude, useAmplitude } from "@fifthsage/react_amplitude";

const App = props => {
  const amplitudeEvent = useAmplitude();

  return (
    <ProvideAmplitude apiKey={apiKey}>
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
    </ProvideAmplitude>
  );
};
```

### 컨슈머 사용

```jsx
import { ProvideAmplitude, ConsumeAmplitude } from "@fifthsage/react_amplitude";

const App = props => {
  const amplitudeEvent = useAmplitude();

  return (
    <ProvideAmplitude apiKey={apiKey}>
      {({ event, logEvent }) => (
        <div>
          <div>{(event || {}).toString()}</div>
          <button onClick={() => logEvent("TEST_EVENT", { key: "value" })}>
            send
          </button>
        </div>
      )}
    </ProvideAmplitude>
  );
};
```
