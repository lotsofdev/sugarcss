import { env } from '../../sugarcss.js';
import __parseArgs from '../../utils/parseArgs.js';
export default function media(v, settings) {
    var _a, _b, _c, _d, _e, _f;
    const media = v.name.replace(`--${settings.prefix}media-`, ''), args = __parseArgs(v.value, ['min', 'max'], {
        separator: ['white-space', 'comma'],
    });
    if (!env.medias[media]) {
        env.medias[media] = {};
    }
    env.medias[media].min = (_c = (_b = (_a = args.min) === null || _a === void 0 ? void 0 : _a.value) === null || _b === void 0 ? void 0 : _b.value) !== null && _c !== void 0 ? _c : 0;
    env.medias[media].max = (_f = (_e = (_d = args.max) === null || _d === void 0 ? void 0 : _d.value) === null || _e === void 0 ? void 0 : _e.value) !== null && _f !== void 0 ? _f : 0;
    if (settings.verbose) {
        console.log(`Registered media: <cyan>${media}</cyan>: <yellow>${JSON.stringify(env.medias[media])}</yellow>`);
    }
    return [];
}
//# sourceMappingURL=media.js.map