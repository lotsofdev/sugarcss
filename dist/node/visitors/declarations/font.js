import { env } from '../../sugarcss.js';
import __parseArgs from '../../utils/parseArgs.js';
export default function font(v, settings) {
    const name = v.name.replace(`--${settings.prefix}font-`, '');
    const args = __parseArgs(v.value, ['family', 'size', 'lineHeight', 'weight', 'style', 'variant', 'stretch'], {
        resolve: true,
    });
    env.fonts.fonts[name] = args;
    if (settings.verbose) {
        console.log(`Registered name: <cyan>${name}</cyan>: <yellow>${JSON.stringify(env.fonts.fonts[name], null)}</yellow>`);
    }
    return [];
}
//# sourceMappingURL=font.js.map