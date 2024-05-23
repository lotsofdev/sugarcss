import { env } from '../../sugarcss.js';
import __parseArgs from '../../utils/parseArgs.js';
import __argsToCustomPropertiesAst from '../../utils/argsToCustomPropertiesAst.js';
export default function font(v, settings) {
    const name = v.name.replace(`--${settings.prefix}font-`, '');
    const args = __parseArgs(v.value, [
        'family',
        'size',
        'lineHeight',
        'weight',
        'style',
        'variant',
        'stretch',
    ]);
    env.fonts.fonts[name] = args.values;
    if (settings.verbose) {
        console.log(`Registered name: <cyan>${name}</cyan>: <yellow>${JSON.stringify(args.values)}</yellow>`);
    }
    const result = __argsToCustomPropertiesAst(v.name, args);
    return result;
}
//# sourceMappingURL=font.js.map