import { env } from '../../sugarcss.js';
import __parseArgs from '../../utils/parseArgs.js';
export default function space(v, settings) {
    var _a, _b;
    const name = v.name.replace(`--${settings.prefix}space-`, ''), validArgs = ['easing', 'min', 'max'];
    if (!validArgs.includes(name)) {
        throw new Error(`Invalid space argument: ${name}. Valid arguments are: ${validArgs.join(', ')}`);
    }
    const args = __parseArgs(v.value, [name], {
        separator: ['white-space', 'comma'],
    });
    let value = args[name];
    if (name === 'min' || name === 'max') {
        value = (_b = (_a = value.value) === null || _a === void 0 ? void 0 : _a.value) !== null && _b !== void 0 ? _b : 0;
    }
    env.spaces[name] = value;
    if (settings.verbose) {
        console.log(`Registered space argument: <cyan>${name}</cyan>: <yellow>${JSON.stringify(env.spaces[name])}</yellow>`);
    }
    return [];
}
//# sourceMappingURL=space.js.map