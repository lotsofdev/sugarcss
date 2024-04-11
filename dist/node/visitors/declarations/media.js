import { env } from '../../sugarcss.js';
import __parseArgs from '../../utils/parseArgs.js';
export default function media(v, settings) {
    const media = v.name.replace(`--${settings.prefix}media-`, ''), args = __parseArgs(v.value, ['min', 'max'], {
        separator: ['white-space', 'comma'],
    });
    if (!env.medias[media]) {
        env.medias[media] = {};
    }
    env.medias[media].min = parseInt(args.min);
    env.medias[media].max = parseInt(args.max);
    if (settings.verbose) {
        console.log(`Registered media: <cyan>${media}</cyan>: <yellow>${JSON.stringify(args)}</yellow>`);
    }
    return [];
}
//# sourceMappingURL=media.js.map