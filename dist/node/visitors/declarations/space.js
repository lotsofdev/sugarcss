import { env } from '../../sugarcss.js';
import __parseArgs from '../../utils/parseArgs.js';
export default function space(v, settings) {
    const name = v.name.replace(`--${settings.prefix}space-`, ''), validArgs = ['easing', 'min', 'max'];
    if (!validArgs.includes(name)) {
        throw new Error(`Invalid space argument: ${name}. Valid arguments are: ${validArgs.join(', ')}`);
    }
    const args = __parseArgs(v.value, [name], {
        separator: ['white-space', 'comma'],
    });
    let value = args[name];
    if (name === 'min' || name === 'max') {
        value = parseInt(value);
    }
    env.spaces[name] = value;
    console.log(env.spaces);
    if (settings.verbose) {
        console.log(`Registered space argument: <cyan>${name}</cyan>: <yellow>${JSON.stringify(args)}</yellow>`);
    }
    return [];
}
//# sourceMappingURL=space.js.map