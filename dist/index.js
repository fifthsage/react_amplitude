"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var amplitude = null;
if (typeof window !== "undefined") {
    amplitude = require("amplitude-js/amplitude");
}
var instance = amplitude ? amplitude.getInstance() : null;
var amplitudeContext = react_1.createContext({
    logEvent: Function,
    event: null
});
function useProvideAmplitude() {
    var _a = react_1.useState({
        key: null,
        payload: {}
    }), event = _a[0], setEvent = _a[1];
    var logEvent = function (key, payload) {
        if (instance) {
            instance.logEvent(key, payload);
            setEvent({
                key: key,
                payload: payload
            });
        }
        return;
    };
    react_1.useEffect(function () {
        return;
    }, []);
    return {
        event: event,
        logEvent: logEvent
    };
}
exports.ProvideAmplitude = function (props) {
    var apiKey = props.apiKey, _a = props.userId, userId = _a === void 0 ? null : _a, _b = props.config, config = _b === void 0 ? {} : _b, children = props.children;
    var defaultOptions = {
        saveEvents: true,
        includeUtm: true,
        includeReferrer: true,
        trackingOptions: {
            city: false,
            ip_address: false
        }
    };
    if (instance) {
        instance.init(apiKey, userId, Object.assign(defaultOptions, config));
    }
    var _amplitude = useProvideAmplitude();
    return (react_1.default.createElement(amplitudeContext.Provider, { value: _amplitude }, children));
};
exports.ConsumeAmplitude = amplitudeContext.Consumer;
exports.useAmplitude = function () {
    return react_1.useContext(amplitudeContext);
};
//# sourceMappingURL=index.js.map