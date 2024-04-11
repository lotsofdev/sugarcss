import { env } from '../../sugarcss.js';
import __parseArgs from '../../utils/parseArgs.js';
export default function easing(v, settings) {
    const name = v.name.replace(`--${settings.prefix}easing-`, ''), args = __parseArgs(v.value, ['function'], {
        separator: ['white-space', 'comma'],
    });
    env.easings[name] = {
        function: args.function,
    };
    if (settings.verbose) {
        console.log(`Registered easing: <cyan>${name}</cyan>: <yellow>${JSON.stringify(args)}</yellow>`);
    }
    return [];
}
//# sourceMappingURL=easing.js.map