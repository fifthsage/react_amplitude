/// <reference types="react" />
interface AmplitudeProviderProps {
    logEvent: Function;
    event: LogEventProps | null;
}
interface LogEventProps {
    key: string;
    payload: {
        [key: string]: any;
    };
}
export declare const ProvideAmplitude: (props: any) => JSX.Element;
export declare const useAmplitude: () => AmplitudeProviderProps;
export {};
