# REACT AMPLITUDE

[![Build Status](https://travis-ci.org/fifthsage/react_amplitude.svg?branch=master)](https://travis-ci.org/fifthsage/react_amplitude)

# USAGE

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
