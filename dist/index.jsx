"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const amplitude_js_1 = __importDefault(require("amplitude-js"));
const instance = amplitude_js_1.default.getInstance();
const amplitudeContext = react_1.createContext({
    logEvent: () => { },
    event: null
});
function useProvideAmplitude() {
    const [event, setEvent] = react_1.useState(null);
    const logEvent = (key, payload) => {
        instance.logEvent(key, payload);
        setEvent(() => ({
            key: key,
            payload: payload
        }));
        return;
    };
    react_1.useEffect(() => {
        return;
    }, []);
    return {
        logEvent,
        event
    };
}
exports.ProvideAmplitude = (props) => {
    const { apiKey, userId = null, config = {}, children } = props;
    instance.init(apiKey, userId, config);
    const _amplitude = useProvideAmplitude();
    return (<amplitudeContext.Provider value={_amplitude}>
      {children}
    </amplitudeContext.Provider>);
};
exports.useAmplitude = () => {
    return react_1.useContext(amplitudeContext);
};
//# sourceMappingURL=index.jsx.map