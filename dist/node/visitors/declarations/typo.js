import { env } from '../../sugarcss.js';
import __parseArgs from '../../utils/parseArgs.js';
export default function typo(v, settings) {
    const typo = v.name.replace(`--${settings.prefix}typo-`, '');
    const args = __parseArgs(v.value, ['family', 'size', 'lineHeight', 'weight', 'style', 'variant', 'stretch'], {
        resolve: true,
    });
    env.typos[typo] = args;
    if (settings.verbose) {
        console.log(`Registered typo: <cyan>${typo}</cyan>: <yellow>${JSON.stringify(env.typos[typo], null)}</yellow>`);
    }
    return [];
}
//# sourceMappingURL=typo.js.map