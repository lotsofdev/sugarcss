import { __camelCase } from '@lotsof/sugar/string';
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
    let value = args.values[name];
    if (name === 'easing') {
        value = __camelCase(value);
    }
    env.sizes[name] = value;
    if (settings.verbose) {
        console.log(`Registered size argument: <cyan>${name}</cyan>: <yellow>${JSON.stringify(env.sizes[name])}</yellow>`);
    }
    return [];
}
//# sourceMappingURL=size.js.map