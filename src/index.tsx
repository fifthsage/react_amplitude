import React, { useState, useEffect, useContext, createContext } from "react";

let amplitude = null;

if (typeof window !== "undefined") {
  amplitude = require("amplitude-js");
}

const instance = amplitude ? amplitude.getInstance() : null;

interface AmplitudeProviderProps {
  logEvent: Function;
  event: LogEventProps | null;
}

interface LogEventProps {
  key: string;
  payload: { [key: string]: any };
}

const amplitudeContext = createContext<AmplitudeProviderProps>({
  logEvent: () => {},
  event: null
});

function useProvideAmplitude(): AmplitudeProviderProps {
  const [event, setEvent] = useState<LogEventProps | null>(null);

  const logEvent = (key: string, payload: { [key: string]: any }) => {
    if (instance) {
      instance.logEvent(key, payload);

      setEvent(() => ({
        key: key,
        payload: payload
      }));
    }

    return;
  };

  useEffect(() => {
    return;
  }, []);

  return {
    logEvent,
    event
  };
}

export const ProvideAmplitude = (props: any) => {
  const { apiKey, userId = null, config = {}, children } = props;

  if (instance) {
    instance.init(apiKey, userId, config);
  }

  const _amplitude = useProvideAmplitude();

  return (
    <amplitudeContext.Provider value={_amplitude}>
      {children}
    </amplitudeContext.Provider>
  );
};

export const useAmplitude = () => {
  return useContext(amplitudeContext);
};
