import React from "react";
interface AmplitudeProviderProps {
    logEvent: Function;
    event: LogEventProps | null;
}
interface LogEventProps {
    key: string | null;
    payload: {
        [key: string]: any;
    };
}
export declare const ProvideAmplitude: (props: any) => JSX.Element;
export declare const ConsumeAmplitude: React.ExoticComponent<React.ConsumerProps<AmplitudeProviderProps>>;
export declare const useAmplitude: () => AmplitudeProviderProps;
export {};
