import React, { useState, useEffect, useContext, createContext } from "react";

let amplitude = null;

if (typeof window !== "undefined") {
  amplitude = require("amplitude-js/amplitude");
}

const instance = amplitude ? amplitude.getInstance() : null;

interface AmplitudeProviderProps {
  logEvent: Function;
  event: LogEventProps | null;
}

interface LogEventProps {
  key: string | null;
  payload: { [key: string]: any };
}

const amplitudeContext = createContext<AmplitudeProviderProps>({
  logEvent: Function,
  event: null
});

function useProvideAmplitude(): AmplitudeProviderProps {
  const [event, setEvent] = useState<LogEventProps>({
    key: null,
    payload: {}
  });

  const logEvent = (key: string, payload: { [key: string]: any }) => {
    if (instance) {
      instance.logEvent(key, payload);

      setEvent({
        key: key,
        payload: payload
      });
    }

    return;
  };

  useEffect(() => {
    return;
  }, []);

  return {
    event,
    logEvent
  };
}

export const ProvideAmplitude = (props: any) => {
  const {
    apiKey,
    userId = null,
    config = {},
    disabled = false,
    children
  } = props;

  const defaultOptions = {
    saveEvents: true,
    includeUtm: true,
    includeReferrer: true,
    trackingOptions: {
      city: false,
      ip_address: false
    }
  };

  if (instance && !disabled) {
    instance.init(apiKey, userId, Object.assign(defaultOptions, config));
  }

  const _amplitude = useProvideAmplitude();

  return (
    <amplitudeContext.Provider value={_amplitude}>
      {children}
    </amplitudeContext.Provider>
  );
};

export const ConsumeAmplitude = amplitudeContext.Consumer;

export const useAmplitude = () => {
  return useContext(amplitudeContext);
};
