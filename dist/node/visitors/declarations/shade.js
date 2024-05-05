import { env } from '../../sugarcss.js';
import __parseArgs from '../../utils/parseArgs.js';
export default function share(v, settings) {
    const shade = v.name.replace(`--${settings.prefix}shade-`, '');
    const args = __parseArgs(v.value, ['modifiers']);
    env.shades[shade] = args.modifiers;
    if (settings.verbose) {
        console.log(`Registered shade: <cyan>${shade}</cyan>: <yellow>${JSON.stringify(args.modifiers, null)}</yellow>`);
    }
    return [];
}
//# sourceMappingURL=shade.js.map