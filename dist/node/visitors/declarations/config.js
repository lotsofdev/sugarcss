import { env } from '../../sugarcss.js';
import __parseArgs from '../../utils/parseArgs.js';
export default function config(v, settings) {
    const name = v.name.replace(`--${settings.prefix}config-`, ''), args = __parseArgs(v.value, [], {
        separator: ['white-space', 'comma'],
    });
    env.config[name] = args;
    if (settings.verbose) {
        console.log(`Registered config: <cyan>${media}</cyan>: <yellow>${JSON.stringify(args)}</yellow>`);
    }
    return [];
}
//# sourceMappingURL=config.js.map