import { env } from '../../sugarcss.js';
import __parseArgs from '../../utils/parseArgs.js';
export default function media(v, settings) {
    var _a, _b;
    const media = v.name.replace(`--${settings.prefix}media-`, ''), args = __parseArgs(v.value, ['min', 'max'], {
        separator: ['white-space', 'comma'],
    });
    if (!env.medias[media]) {
        env.medias[media] = {};
    }
    env.medias[media].min = (_a = args.values.min) !== null && _a !== void 0 ? _a : 0;
    env.medias[media].max = (_b = args.values.max) !== null && _b !== void 0 ? _b : 0;
    if (settings.verbose) {
        console.log(`Registered media: <cyan>${media}</cyan>: <yellow>${JSON.stringify(env.medias[media])}</yellow>`);
    }
    return [];
}
//# sourceMappingURL=media.js.map