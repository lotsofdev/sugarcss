import { env } from '../../sugarcss.js';
import __parseArgs from '../../utils/parseArgs.js';
export default function size(v, settings) {
    const name = v.name.replace(`--${settings.prefix}size-`, ''), validArgs = ['easing', 'min', 'max'];
    if (!validArgs.includes(name)) {
        throw new Error(`Invalid size argument: ${name}. Valid arguments are: ${validArgs.join(', ')}`);
    }
    const args = __parseArgs(v.value, [name], {
        separator: ['white-space', 'comma'],
    });
    let value = args[name];
    env.sizes[name] = value;
    if (settings.verbose) {
        console.log(`Registered size argument: <cyan>${name}</cyan>: <yellow>${JSON.stringify(env.spaces[name])}</yellow>`);
    }
    return [];
}
//# sourceMappingURL=size.js.map