import __parseArgs from '../../utils/parseArgs.js';
export default function scalable(value, settings) {
    const args = __parseArgs(value.arguments);
    console.log(value);
    const result = {
        raw: '',
    };
    for (let [key, value] of Object.entries(args)) {
        result.raw += `calc(${value} + var(--${settings.prefix}scale, 1))`;
    }
    return result;
}
//# sourceMappingURL=scalable.js.map